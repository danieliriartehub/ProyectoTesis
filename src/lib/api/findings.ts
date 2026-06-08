import { api } from "./client";
import type { Finding, FindingStatus, Severity } from "@/types";

export interface FindingCreate {
  session_id: string;
  evidence_id: string;
  job_id?: string;
  category: string;
  severity: Severity;
  confidence: number;
  description: string;
  recommendation?: string;
  bbox?: { x: number; y: number; w: number; h: number };
  geo?: { lat: number; lng: number };
}

export interface FindingUpdate {
  status?: FindingStatus;
  severity?: Severity;
  description?: string;
  recommendation?: string;
}

export const findingsApi = {
  list(params?: { session_id?: string; evidence_id?: string }): Promise<Finding[]> {
    const qs = new URLSearchParams();
    if (params?.session_id) qs.set("session_id", params.session_id);
    if (params?.evidence_id) qs.set("evidence_id", params.evidence_id);
    const q = qs.toString();
    return api.get(`/api/v1/findings${q ? `?${q}` : ""}`);
  },

  get(id: string): Promise<Finding> {
    return api.get(`/api/v1/findings/${id}`);
  },

  create(data: FindingCreate): Promise<Finding> {
    return api.post("/api/v1/findings", data);
  },

  update(id: string, data: FindingUpdate): Promise<Finding> {
    return api.patch(`/api/v1/findings/${id}`, data);
  },
};
