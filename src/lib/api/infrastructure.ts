import { api } from "./client";
import type { Infrastructure, InfrastructureType } from "@/types";

export interface InfrastructureCreate {
  name: string;
  type: InfrastructureType;
  location: string;
  asset_code: string;
  latitude: number;
  longitude: number;
  operator?: string;
  commissioned_year?: number;
}

export interface InfrastructureUpdate extends Partial<InfrastructureCreate> {}

export const infrastructureApi = {
  list(): Promise<Infrastructure[]> {
    return api.get("/api/v1/infrastructure");
  },

  get(id: string): Promise<Infrastructure> {
    return api.get(`/api/v1/infrastructure/${id}`);
  },

  create(data: InfrastructureCreate): Promise<Infrastructure> {
    return api.post("/api/v1/infrastructure", data);
  },

  update(id: string, data: InfrastructureUpdate): Promise<Infrastructure> {
    return api.patch(`/api/v1/infrastructure/${id}`, data);
  },
};
