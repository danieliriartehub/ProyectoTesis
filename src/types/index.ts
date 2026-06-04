export type UserRole = "admin" | "inspector" | "engineer" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export type SessionStatus =
  | "Draft"
  | "Capturing"
  | "Processing"
  | "Review"
  | "Completed";

export type InfrastructureType =
  | "Power Line"
  | "Wind Turbine"
  | "Solar Farm"
  | "Bridge"
  | "Pipeline"
  | "Telecom Tower"
  | "Dam"
  | "Building";

export interface Infrastructure {
  id: string;
  name: string;
  type: InfrastructureType;
  location: string;
  coordinates: { lat: number; lng: number };
  assetCode: string;
  operator?: string;
  commissionedYear?: number;
}

export interface Session {
  id: string;
  code: string;
  title: string;
  status: SessionStatus;
  infrastructure: Infrastructure;
  createdAt: string;
  updatedAt: string;
  scheduledFor?: string;
  completedAt?: string;
  leadInspectorId: string;
  teamIds: string[];
  evidenceCount: number;
  findingsCount: number;
  criticalFindings: number;
  progress: number; // 0..100
  weather?: string;
  notes?: string;
}

export type EvidenceType = "rtmp" | "image" | "video" | "pdf";
export type EvidenceStatus =
  | "uploaded"
  | "queued"
  | "processing"
  | "analyzed"
  | "failed";

export interface Evidence {
  id: string;
  sessionId: string;
  type: EvidenceType;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
  uploadedBy: string;
  status: EvidenceStatus;
  thumbnailUrl?: string;
  durationSec?: number;
  rtmpUrl?: string;
  capturedAt?: string;
  geo?: { lat: number; lng: number; alt?: number };
  tags?: string[];
}

export type JobStatus = "queued" | "running" | "succeeded" | "failed";

export interface AnalysisJob {
  id: string;
  sessionId: string;
  evidenceId: string;
  model: string; // e.g. "YOLOv8-Infra"
  status: JobStatus;
  progress: number;
  startedAt?: string;
  finishedAt?: string;
  inferenceTimeMs?: number;
  findingsProduced: number;
  error?: string;
}

export type Severity = "critical" | "high" | "medium" | "low" | "info";
export type FindingStatus =
  | "pending"
  | "validated"
  | "rejected"
  | "needs_review";

export interface Finding {
  id: string;
  sessionId: string;
  evidenceId: string;
  jobId?: string;
  category: string; // e.g. "Corrosion", "Crack", "Hot-spot"
  severity: Severity;
  confidence: number; // 0..1
  status: FindingStatus;
  description: string;
  detectedAt: string;
  validatedBy?: string;
  validatedAt?: string;
  bbox?: { x: number; y: number; w: number; h: number };
  geo?: { lat: number; lng: number };
  recommendation?: string;
}

export interface Observation {
  id: string;
  findingId: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  comment: string;
  action?: "validated" | "rejected" | "flagged" | "comment";
}

export type ReportStatus = "draft" | "generated" | "signed" | "archived";

export interface Report {
  id: string;
  sessionId: string;
  code: string;
  title: string;
  status: ReportStatus;
  generatedAt: string;
  generatedBy: string;
  format: "pdf" | "docx";
  pages: number;
  fileUrl?: string;
  summary: string;
}