import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  FileText,
  Image as ImageIcon,
  Video,
  Radio as RadioIcon,
  FileType,
  Upload,
  Play,
  Sparkles,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  observations,
} from "@/lib/mocks";
import {
  useSession,
  useSessionEvidences,
  useSessionFindings,
  useSessionJobs,
  useSessionReport,
  useUploadEvidence,
  useCreateJob,
  useGenerateReport,
} from "@/lib/queries";
import {
  SessionStatusBadge,
  SeverityBadge,
  FindingStatusBadge,
  JobStatusBadge,
  EvidenceStatusBadge,
} from "@/components/badges";
import type { EvidenceType } from "@/types";

export const Route = createFileRoute("/sessions/$sessionId")({
  component: SessionDetail,
});

const typeIcon: Record<EvidenceType, React.ComponentType<{ className?: string }>> = {
  image: ImageIcon,
  video: Video,
  rtmp: RadioIcon,
  pdf: FileType,
};

function formatBytes(b: number) {
  if (b === 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = b;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(1)} ${units[i]}`;
}

function SessionDetail() {
  const { sessionId } = Route.useParams();
  const { data: session, isLoading, error } = useSession(sessionId);
  const { data: evidence = [] } = useSessionEvidences(sessionId);
  const { data: findings = [] } = useSessionFindings(sessionId);
  const { data: jobs = [] } = useSessionJobs(sessionId);
  const { data: report } = useSessionReport(sessionId);
  const createJob = useCreateJob(sessionId);
  const generateReport = useGenerateReport(sessionId);

  const handleGenerateReport = () => {
    toast.info("Generando reporte técnico...");
    generateReport.mutate(undefined, {
      onSuccess: () => toast.success("Reporte generado exitosamente"),
      onError: () => toast.error("Hubo un error al generar el reporte"),
    });
  };

  const handleLaunchAnalysis = () => {
    const toAnalyze = evidence.filter(e => e.type !== "rtmp" && !jobs.some(j => j.evidenceId === e.id));
    if (toAnalyze.length === 0) {
      toast.info("No hay nuevas evidencias estáticas para analizar.");
      return;
    }

    toast.info(`Iniciando análisis para ${toAnalyze.length} evidencias con yolo26x...`);
    
    for (const ev of toAnalyze) {
      createJob.mutate({
        session_id: sessionId,
        evidence_id: ev.id,
        model: "yolo26x",
      });
    }
  };

  if (isLoading) return <div className="p-12 text-center text-muted-foreground">Cargando sesión...</div>;
  if (error || !session) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-xl font-semibold">Sesión no encontrada</h2>
        <p className="text-muted-foreground mt-2 mb-4">La sesión solicitada no existe o fue eliminada.</p>
        <Button variant="outline" asChild><Link to="/sessions">Volver a sesiones</Link></Button>
      </div>
    );
  }

  const reports = report ? [report] : [];
  const lead = { name: "Inspector" };

  return (
    <div className="p-6 space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-3 -ml-2">
          <Link to="/sessions"><ArrowLeft className="h-3.5 w-3.5" /> Sesiones</Link>
        </Button>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{session.code}</span>
              <SessionStatusBadge status={session.status} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mt-1">{session.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {session.infrastructure.location}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {new Date(session.createdAt).toLocaleDateString("es-PE")}</span>
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {session.teamIds.length} miembros</span>
              <span className="font-mono text-xs">{session.infrastructure.assetCode}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <UploadEvidenceDialog />
            <Button variant="outline" onClick={handleLaunchAnalysis} disabled={createJob.isPending}>
              <Sparkles className="h-4 w-4" /> Lanzar análisis
            </Button>
            <Button onClick={handleGenerateReport} disabled={generateReport.isPending}>
              <FileText className="h-4 w-4" /> {generateReport.isPending ? "Generando..." : "Generar reporte"}
            </Button>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatBox label="Progreso" value={`${session.progress}%`}>
          <Progress value={session.progress} className="h-1 mt-2" />
        </StatBox>
        <StatBox label="Evidencias" value={evidence.length} />
        <StatBox label="Hallazgos" value={findings.length} />
        <StatBox label="Críticos" value={findings.filter(f => f.severity === "critical").length} accent="critical" />
        <StatBox label="Jobs IA" value={jobs.length} />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="font-mono uppercase tracking-widest text-[10px]">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="evidence">Evidencias ({evidence.length})</TabsTrigger>
          <TabsTrigger value="findings">Hallazgos ({findings.length})</TabsTrigger>
          <TabsTrigger value="jobs">Procesamiento IA</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Infraestructura</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <Info label="Activo" value={session.infrastructure.name} />
                <Info label="Tipo" value={session.infrastructure.type} />
                <Info label="Código" value={session.infrastructure.assetCode} mono />
                <Info label="Operador" value={session.infrastructure.operator ?? "—"} />
                <Info label="Coordenadas" value={`${session.infrastructure.coordinates.lat}, ${session.infrastructure.coordinates.lng}`} mono />
                <Info label="Año comisionado" value={String(session.infrastructure.commissionedYear ?? "—")} />
                {session.weather && <Info label="Clima" value={session.weather} />}
                <Info label="Inspector líder" value={lead?.name ?? "—"} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Mapa</CardTitle></CardHeader>
              <CardContent>
                <div className="aspect-square rounded border border-border bg-muted relative overflow-hidden"
                  style={{
                    backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                      <div className="relative h-3 w-3 rounded-full bg-primary ring-4 ring-primary/30" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 font-mono text-[10px] text-muted-foreground bg-background/60 px-1.5 py-0.5 rounded">
                    {session.infrastructure.coordinates.lat.toFixed(3)}, {session.infrastructure.coordinates.lng.toFixed(3)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {session.notes && (
            <Card>
              <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Notas</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">{session.notes}</CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="evidence" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                {evidence.map((e) => {
                  const Icon = typeIcon[e.type];
                  return (
                    <div key={e.id} className="rounded border border-border p-3 hover:border-primary/40 transition-colors">
                      <div className="aspect-video rounded bg-muted flex items-center justify-center mb-3 relative overflow-hidden group">
                        {(e.thumbnailUrl || (e.type === "image" && e.storageUrl)) ? (
                          <img 
                            src={e.thumbnailUrl || e.storageUrl} 
                            alt={e.filename} 
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                        ) : (
                          <Icon className="h-8 w-8 text-muted-foreground" />
                        )}
                        {e.type === "rtmp" && (
                          <span className="absolute top-2 left-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-severity-critical">
                            <span className="h-1.5 w-1.5 rounded-full bg-severity-critical animate-pulse" />
                            Live
                          </span>
                        )}
                        {e.type === "video" && !e.thumbnailUrl && (
                          <Play className="absolute h-10 w-10 text-primary/70" />
                        )}
                        {e.type === "video" && e.thumbnailUrl && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                            <Play className="h-10 w-10 text-white drop-shadow-md" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs truncate" title={e.filename}>{e.filename}</span>
                        <EvidenceStatusBadge status={e.status} />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        <span>{e.type}</span>
                        <span>{formatBytes(e.sizeBytes)}</span>
                      </div>
                    </div>
                  );
                })}
                {evidence.length === 0 && (
                  <div className="md:col-span-2 lg:col-span-3 text-center py-12 text-muted-foreground">
                    Sin evidencias cargadas. Usa "Cargar evidencia" para empezar.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="findings" className="mt-4 space-y-3">
          {findings.map((f) => {
            const obs = observations.filter((o) => o.findingId === f.id);
            return (
              <Card key={f.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <SeverityBadge severity={f.severity} />
                        <FindingStatusBadge status={f.status} />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          conf {Math.round(f.confidence * 100)}%
                        </span>
                      </div>
                      <h3 className="font-semibold mt-2">{f.category}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{f.description}</p>
                      {f.recommendation && (
                        <div className="mt-2 rounded border border-border bg-muted/40 p-2 text-xs">
                          <span className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground">Recomendación · </span>
                          {f.recommendation}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <ValidateDialog findingId={f.id} category={f.category} />
                      <Button size="sm" variant="ghost" onClick={() => toast.error("Hallazgo rechazado")}>
                        <XCircle className="h-3.5 w-3.5" /> Rechazar
                      </Button>
                    </div>
                  </div>
                  {obs.length > 0 && (
                    <div className="mt-3 border-t border-border pt-3 space-y-2">
                      {obs.map((o) => (
                        <div key={o.id} className="flex gap-2 text-xs">
                          <MessageSquare className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                          <div>
                            <span className="font-semibold">{o.authorName}</span>
                            <span className="text-muted-foreground"> · {new Date(o.createdAt).toLocaleString("es-PE")}</span>
                            <p className="text-muted-foreground">{o.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          {findings.length === 0 && (
            <Card><CardContent className="text-center py-12 text-muted-foreground">Aún no hay hallazgos. Procesa evidencias para generarlos.</CardContent></Card>
          )}
        </TabsContent>

        <TabsContent value="jobs" className="mt-4">
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {jobs.map((j) => (
                <div key={j.id} className="p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{j.model}</span>
                      <JobStatusBadge status={j.status} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground font-mono">
                      Evidencia {j.evidenceId} · {j.findingsProduced} hallazgos
                      {j.inferenceTimeMs && ` · ${(j.inferenceTimeMs / 1000).toFixed(1)}s`}
                      {j.error && <span className="text-destructive"> · {j.error}</span>}
                    </div>
                  </div>
                  <div className="w-40">
                    <Progress value={j.progress} className="h-1.5" />
                    <div className="text-right font-mono text-[10px] text-muted-foreground mt-1">{j.progress}%</div>
                  </div>
                </div>
              ))}
              {jobs.length === 0 && <div className="p-12 text-center text-muted-foreground">Sin jobs IA</div>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-4 space-y-3">
          {reports.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-primary/15 text-primary flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{r.code}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider bg-muted px-1.5 py-0.5 rounded">{r.status}</span>
                    </div>
                    <h3 className="font-semibold mt-0.5">{r.title}</h3>
                    <p className="text-xs text-muted-foreground">{r.pages} págs · {r.format.toUpperCase()} · {new Date(r.generatedAt).toLocaleDateString("es-PE")}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  if (r.fileUrl) window.open(r.fileUrl, "_blank");
                  else toast.info("El PDF aún no ha sido subido. (Generador PDF en desarrollo Fase 5)");
                }}>
                  <Download className="h-3.5 w-3.5" /> Descargar
                </Button>
              </CardContent>
            </Card>
          ))}
          {reports.length === 0 && (
            <Card><CardContent className="text-center py-12 text-muted-foreground">Sin reportes generados aún.</CardContent></Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Info({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={mono ? "font-mono text-sm mt-0.5" : "text-sm mt-0.5"}>{value}</div>
    </div>
  );
}

function StatBox({ label, value, accent, children }: { label: string; value: string | number; accent?: "critical"; children?: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className={`text-2xl font-bold font-mono mt-1 ${accent === "critical" ? "text-severity-critical" : ""}`}>{value}</div>
        {children}
      </CardContent>
    </Card>
  );
}

function UploadEvidenceDialog() {
  const { sessionId } = Route.useParams();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"image" | "video" | "pdf" | "rtmp">("image");
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const uploadMutation = useUploadEvidence(sessionId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (type !== "rtmp" && !file) {
      toast.error("Por favor selecciona un archivo");
      return;
    }
    
    if (type !== "rtmp" && file) {
      uploadMutation.mutate(
        { file, meta: { session_id: sessionId, type, tags: notes } },
        {
          onSuccess: () => {
            setOpen(false);
            setFile(null);
            setNotes("");
            toast.success("Evidencia cargada exitosamente");
          },
          onError: (err: any) => {
            toast.error(err.message || "Error al cargar la evidencia");
          }
        }
      );
    } else if (type === "rtmp") {
      toast.error("RTMP stream en desarrollo");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) { setFile(null); setNotes(""); } }}>
      <DialogTrigger asChild>
        <Button variant="outline"><Upload className="h-4 w-4" /> Cargar evidencia</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cargar evidencia</DialogTitle>
          <DialogDescription>
            Sube imágenes (JPG, PNG, WEBP, TIFF), videos (MP4, MOV, AVI, MKV), PDF o conecta un stream RTMP.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Tipo</Label>
            <Select value={type} onValueChange={(val: any) => setType(val)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Imagen</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="rtmp">RTMP Live</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {type === "rtmp" ? (
            <div className="space-y-1.5">
              <Label>URL RTMP</Label>
              <Input placeholder="rtmp://stream.infrainspect.ai/live/clave" className="font-mono" />
            </div>
          ) : (
            <div className="relative rounded border-2 border-dashed border-border p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleFileChange}
                accept={type === 'image' ? 'image/*,.webp,.tiff' : type === 'video' ? 'video/*' : 'application/pdf'}
              />
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm">
                {file ? <span className="font-semibold text-primary">{file.name}</span> : "Arrastra archivos aquí o haz clic para seleccionar"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Un archivo a la vez"}
              </p>
            </div>
          )}
          <div className="space-y-1.5">
            <Label>Notas</Label>
            <Textarea 
              rows={2} 
              placeholder="Contexto, condiciones de captura…" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={uploadMutation.isPending}>Cancelar</Button>
          <Button onClick={handleUpload} disabled={uploadMutation.isPending || (type !== "rtmp" && !file)}>
            {uploadMutation.isPending ? "Cargando..." : "Cargar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ValidateDialog({ findingId, category }: { findingId: string; category: string }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><CheckCircle2 className="h-3.5 w-3.5" /> Validar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Validar hallazgo</DialogTitle>
          <DialogDescription>{category} · #{findingId}</DialogDescription>
        </DialogHeader>
        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Observación de validación…" rows={4} />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => { setOpen(false); toast.success("Hallazgo validado"); }}>Confirmar validación</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}