import { api } from "./client";
import type { AnalysisJob, JobStatus } from "@/types";

export interface JobCreate {
  session_id: string;
  evidence_id: string;
  /** "yolo-evidencias-x" for uploads, "yolo-drone-n" for RTMP streams */
  model: string;
}

export interface JobUpdate {
  status?: JobStatus;
  progress?: number;
  findings_produced?: number;
  error?: string;
}

export const jobsApi = {
  create(data: JobCreate): Promise<AnalysisJob> {
    return api.post("/api/v1/analysis-jobs", data);
  },

  get(id: string): Promise<AnalysisJob> {
    return api.get(`/api/v1/analysis-jobs/${id}`);
  },

  update(id: string, data: JobUpdate): Promise<AnalysisJob> {
    return api.patch(`/api/v1/analysis-jobs/${id}`, data);
  },
};
