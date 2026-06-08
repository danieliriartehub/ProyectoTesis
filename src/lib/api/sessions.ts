import { api } from "./client";
import type { Session, SessionStatus, Evidence, Finding, Report } from "@/types";
import type { AnalysisJob } from "@/types";

export interface SessionCreate {
  title: string;
  infrastructure_id: string;
  lead_inspector_id: string;
  team_ids?: string[];
  scheduled_for?: string;
  notes?: string;
  weather?: string;
}

export interface SessionUpdate {
  title?: string;
  status?: SessionStatus;
  notes?: string;
  weather?: string;
  team_ids?: string[];
  progress?: number;
}

export interface SessionListResponse {
  items: Session[];
  total: number;
  skip: number;
  limit: number;
}

export const sessionsApi = {
  list(params?: { skip?: number; limit?: number }): Promise<SessionListResponse> {
    const qs = new URLSearchParams();
    if (params?.skip != null) qs.set("skip", String(params.skip));
    if (params?.limit != null) qs.set("limit", String(params.limit));
    const q = qs.toString();
    return api.get(`/api/v1/sessions${q ? `?${q}` : ""}`);
  },

  get(id: string): Promise<Session> {
    return api.get(`/api/v1/sessions/${id}`);
  },

  create(data: SessionCreate): Promise<Session> {
    return api.post("/api/v1/sessions", data);
  },

  update(id: string, data: SessionUpdate): Promise<Session> {
    return api.patch(`/api/v1/sessions/${id}`, data);
  },

  evidences(sessionId: string): Promise<Evidence[]> {
    return api.get(`/api/v1/sessions/${sessionId}/evidences`);
  },

  findings(sessionId: string): Promise<Finding[]> {
    return api.get(`/api/v1/sessions/${sessionId}/findings`);
  },

  jobs(sessionId: string): Promise<AnalysisJob[]> {
    return api.get(`/api/v1/sessions/${sessionId}/jobs`);
  },

  report(sessionId: string): Promise<Report> {
    return api.get(`/api/v1/sessions/${sessionId}/report`);
  },
};
