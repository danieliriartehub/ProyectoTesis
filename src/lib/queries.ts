/**
 * Centralized React Query keys and hooks.
 * Import these in route components instead of importing from @/lib/mocks.
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionsApi, type SessionCreate, type SessionUpdate } from "./api/sessions";
import { infrastructureApi, type InfrastructureCreate } from "./api/infrastructure";
import { evidencesApi, type EvidenceUploadMeta } from "./api/evidences";
import { findingsApi, type FindingUpdate } from "./api/findings";
import { jobsApi } from "./api/jobs";
import { observationsApi, type ObservationCreate } from "./api/observations";
import { reportsApi } from "./api/reports";
import { authApi } from "./api/auth";

// ─── Query keys ───────────────────────────────────────────────────────────────
export const QK = {
  me: ["me"] as const,
  sessions: (params?: object) => ["sessions", params] as const,
  session: (id: string) => ["sessions", id] as const,
  sessionEvidences: (id: string) => ["sessions", id, "evidences"] as const,
  sessionFindings: (id: string) => ["sessions", id, "findings"] as const,
  sessionJobs: (id: string) => ["sessions", id, "jobs"] as const,
  sessionReport: (id: string) => ["sessions", id, "report"] as const,
  findings: (params?: object) => ["findings", params] as const,
  jobs: ["jobs"] as const,
  infrastructure: ["infrastructure"] as const,
};

// ─── Auth ─────────────────────────────────────────────────────────────────────
export function useMe() {
  return useQuery({ queryKey: QK.me, queryFn: authApi.me, retry: false });
}

// ─── Sessions ─────────────────────────────────────────────────────────────────
export function useSessions(params?: { skip?: number; limit?: number }) {
  return useQuery({
    queryKey: QK.sessions(params),
    queryFn: () => sessionsApi.list(params),
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: QK.session(id),
    queryFn: () => sessionsApi.get(id),
    enabled: !!id,
  });
}

export function useCreateSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SessionCreate) => sessionsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sessions"] }),
  });
}

export function useUpdateSession(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SessionUpdate) => sessionsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QK.session(id) });
      qc.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
}

// ─── Evidences ────────────────────────────────────────────────────────────────
export function useSessionEvidences(sessionId: string) {
  return useQuery({
    queryKey: QK.sessionEvidences(sessionId),
    queryFn: () => sessionsApi.evidences(sessionId),
    enabled: !!sessionId,
  });
}

export function useUploadEvidence(sessionId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, meta }: { file: File; meta: EvidenceUploadMeta }) =>
      evidencesApi.upload(file, meta),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QK.sessionEvidences(sessionId) });
      qc.invalidateQueries({ queryKey: QK.session(sessionId) });
      // Also refresh jobs — backend may enqueue a YOLO job automatically
      qc.invalidateQueries({ queryKey: QK.sessionJobs(sessionId) });
    },
  });
}

// ─── Findings ─────────────────────────────────────────────────────────────────
export function useSessionFindings(sessionId: string) {
  return useQuery({
    queryKey: QK.sessionFindings(sessionId),
    queryFn: () => sessionsApi.findings(sessionId),
    enabled: !!sessionId,
  });
}

export function useFindings(params?: { session_id?: string; evidence_id?: string }) {
  return useQuery({
    queryKey: QK.findings(params),
    queryFn: () => findingsApi.list(params),
  });
}

export function useUpdateFinding(sessionId?: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FindingUpdate }) =>
      findingsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["findings"] });
      if (sessionId) qc.invalidateQueries({ queryKey: QK.sessionFindings(sessionId) });
    },
  });
}

// ─── Analysis Jobs ────────────────────────────────────────────────────────────
export function useSessionJobs(sessionId: string) {
  return useQuery({
    queryKey: QK.sessionJobs(sessionId),
    queryFn: () => sessionsApi.jobs(sessionId),
    enabled: !!sessionId,
    // Poll every 5s while there are active jobs
    refetchInterval: (query) => {
      const jobs = query.state.data;
      if (!jobs) return false;
      const active = jobs.some((j) => j.status === "queued" || j.status === "running");
      return active ? 5000 : false;
    },
  });
}

/** All jobs across sessions — used in /jobs page */
export function useAllJobs(sessionIds: string[]) {
  return useQuery({
    queryKey: [...QK.jobs, sessionIds],
    queryFn: async () => {
      const all = await Promise.all(sessionIds.map((id) => sessionsApi.jobs(id)));
      return all.flat();
    },
    enabled: sessionIds.length > 0,
    refetchInterval: 5000,
  });
}

// ─── Infrastructure ───────────────────────────────────────────────────────────
export function useInfrastructure() {
  return useQuery({
    queryKey: QK.infrastructure,
    queryFn: infrastructureApi.list,
  });
}

export function useCreateInfrastructure() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: InfrastructureCreate) => infrastructureApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.infrastructure }),
  });
}

// ─── Reports ──────────────────────────────────────────────────────────────────
export function useSessionReport(sessionId: string) {
  return useQuery({
    queryKey: QK.sessionReport(sessionId),
    queryFn: () => sessionsApi.report(sessionId),
    enabled: !!sessionId,
    retry: false,
  });
}

export function useGenerateReport(sessionId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => reportsApi.generate(sessionId),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.sessionReport(sessionId) }),
  });
}

// ─── Observations ─────────────────────────────────────────────────────────────
export function useCreateObservation(findingId: string, sessionId?: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ObservationCreate) => observationsApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["findings"] });
      if (sessionId) qc.invalidateQueries({ queryKey: QK.sessionFindings(sessionId) });
    },
  });
}
