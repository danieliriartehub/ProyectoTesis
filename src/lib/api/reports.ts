import { api } from "./client";
import type { Report, ReportStatus } from "@/types";

export interface ReportUpdate {
  title?: string;
  status?: ReportStatus;
  summary?: string;
}

export const reportsApi = {
  generate(sessionId: string): Promise<Report> {
    return api.post(`/api/v1/reports/generate/${sessionId}`, {});
  },

  get(id: string): Promise<Report> {
    return api.get(`/api/v1/reports/${id}`);
  },

  update(id: string, data: ReportUpdate): Promise<Report> {
    return api.patch(`/api/v1/reports/${id}`, data);
  },
};
