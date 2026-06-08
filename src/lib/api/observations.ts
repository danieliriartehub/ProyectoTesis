import { api } from "./client";
import type { Observation } from "@/types";

export interface ObservationCreate {
  finding_id: string;
  comment: string;
  action?: "validated" | "rejected" | "flagged" | "comment";
}

export const observationsApi = {
  list(findingId: string): Promise<Observation[]> {
    return api.get(`/api/v1/observations?finding_id=${findingId}`);
  },

  create(data: ObservationCreate): Promise<Observation> {
    return api.post("/api/v1/observations", data);
  },
};
