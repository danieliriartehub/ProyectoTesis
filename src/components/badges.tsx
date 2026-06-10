import { cn } from "@/lib/utils";
import type { FindingStatus, JobStatus, SessionStatus, Severity, EvidenceStatus } from "@/types";

const severityMap: Record<Severity, { label: string; cls: string }> = {
  critical: { label: "Crítico", cls: "bg-severity-critical/15 text-severity-critical border-severity-critical/40" },
  high: { label: "Alto", cls: "bg-severity-high/15 text-severity-high border-severity-high/40" },
  medium: { label: "Medio", cls: "bg-severity-medium/15 text-severity-medium border-severity-medium/40" },
  low: { label: "Bajo", cls: "bg-severity-low/15 text-severity-low border-severity-low/40" },
  info: { label: "Info", cls: "bg-severity-info/15 text-severity-info border-severity-info/40" },
};

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  const s = severityMap[severity];
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-xs font-mono uppercase tracking-wider",
      s.cls,
      className,
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

const sessionStatusMap: Record<SessionStatus, string> = {
  Draft: "bg-destructive/15 text-destructive border-destructive/40",
  Capturing: "bg-[#f97316]/15 text-[#f97316] border-[#f97316]/40",
  Processing: "bg-[#eab308]/15 text-[#eab308] border-[#eab308]/40",
  Review: "bg-primary/15 text-primary border-primary/40",
  Completed: "bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/40",
};

export function SessionStatusBadge({ status, className }: { status: SessionStatus; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-xs font-mono uppercase tracking-wider",
      sessionStatusMap[status],
      className,
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      {status}
    </span>
  );
}

const findingStatusMap: Record<FindingStatus, { label: string; cls: string }> = {
  pending: { label: "Pendiente", cls: "bg-muted text-muted-foreground border-border" },
  validated: { label: "Validado", cls: "bg-severity-low/15 text-severity-low border-severity-low/40" },
  rejected: { label: "Rechazado", cls: "bg-destructive/15 text-destructive border-destructive/40" },
  needs_review: { label: "Revisar", cls: "bg-severity-medium/15 text-severity-medium border-severity-medium/40" },
};

export function FindingStatusBadge({ status }: { status: FindingStatus }) {
  const s = findingStatusMap[status];
  return (
    <span className={cn("inline-flex items-center rounded border px-2 py-0.5 text-xs font-mono uppercase tracking-wider", s.cls)}>
      {s.label}
    </span>
  );
}

const jobStatusMap: Record<JobStatus, { label: string; cls: string }> = {
  queued: { label: "En cola", cls: "bg-muted text-muted-foreground border-border" },
  running: { label: "Ejecutando", cls: "bg-primary/15 text-primary border-primary/40" },
  succeeded: { label: "Completado", cls: "bg-severity-low/15 text-severity-low border-severity-low/40" },
  failed: { label: "Fallido", cls: "bg-destructive/15 text-destructive border-destructive/40" },
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const s = jobStatusMap[status];
  return (
    <span className={cn("inline-flex items-center rounded border px-2 py-0.5 text-xs font-mono uppercase tracking-wider", s.cls)}>
      {s.label}
    </span>
  );
}

const evidenceStatusMap: Record<EvidenceStatus, { label: string; cls: string }> = {
  uploaded: { label: "Cargado", cls: "bg-muted text-muted-foreground border-border" },
  queued: { label: "En cola", cls: "bg-accent/15 text-accent border-accent/40" },
  processing: { label: "Procesando", cls: "bg-primary/15 text-primary border-primary/40" },
  analyzed: { label: "Analizado", cls: "bg-severity-low/15 text-severity-low border-severity-low/40" },
  failed: { label: "Fallido", cls: "bg-destructive/15 text-destructive border-destructive/40" },
};

export function EvidenceStatusBadge({ status }: { status: EvidenceStatus }) {
  const s = evidenceStatusMap[status];
  return (
    <span className={cn("inline-flex items-center rounded border px-2 py-0.5 text-xs font-mono uppercase tracking-wider", s.cls)}>
      {s.label}
    </span>
  );
}