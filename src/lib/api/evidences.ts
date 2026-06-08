import { api } from "./client";
import type { Evidence, EvidenceStatus } from "@/types";

export interface EvidenceUploadMeta {
  session_id: string;
  type?: "image" | "video" | "pdf";
  captured_at?: string;
  geo_lat?: number;
  geo_lng?: number;
  geo_alt?: number;
  tags?: string;
}

export interface RtmpRegister {
  session_id: string;
  rtmp_url: string;
  filename?: string;
}

export const evidencesApi = {
  /**
   * Upload a file as multipart/form-data.
   * The backend triggers a Celery job automatically (Fase 3+).
   */
  upload(file: File, meta: EvidenceUploadMeta): Promise<Evidence> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("session_id", meta.session_id);
    if (meta.type) fd.append("type", meta.type);
    if (meta.captured_at) fd.append("captured_at", meta.captured_at);
    if (meta.geo_lat != null) fd.append("geo_lat", String(meta.geo_lat));
    if (meta.geo_lng != null) fd.append("geo_lng", String(meta.geo_lng));
    if (meta.geo_alt != null) fd.append("geo_alt", String(meta.geo_alt));
    if (meta.tags) fd.append("tags", meta.tags);
    return api.upload("/api/v1/evidences", fd);
  },

  /** Register an RTMP drone stream (Fase 4) */
  registerRtmp(data: RtmpRegister): Promise<Evidence> {
    return api.post("/api/v1/evidences/rtmp", data);
  },

  get(id: string): Promise<Evidence> {
    return api.get(`/api/v1/evidences/${id}`);
  },

  updateStatus(id: string, status: EvidenceStatus): Promise<Evidence> {
    return api.patch(`/api/v1/evidences/${id}/status`, { status });
  },
};
