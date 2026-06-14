import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect, Suspense, lazy } from "react";
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
  MessageSquare,
  Download,
  Fingerprint,
  Loader2,
  XCircle,
  RotateCcw,
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
import { Badge } from "@/components/ui/badge";
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
  useUpdateFinding,
  useUpdateSession,
  useDeleteJob,
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

const MapView = lazy(() => import("@/components/MapView"));
const LiveStreamView = lazy(() => import("@/components/LiveStreamView"));

const typeIcon: Record<EvidenceType, React.ComponentType<{ className?: string }>> = {
  image: ImageIcon,
  video: Video,
  rtmp: RadioIcon,
  pdf: FileType,
};

export const FINDINGS_TRANSLATIONS: Record<string, string> = {
  "Spalling": "Descorchamiento",
  "Abscission": "Desprendimiento",
  "Crack": "Grieta",
  "Efflorescence": "Eflorescencia",
  "Exposed Rebars": "Acero Expuesto",
  "Rust": "Óxido",
  "Corrosion": "Corrosión",
  "Corrosión severa": "Corrosión severa",
  "Aislador roto": "Aislador roto",
  "Vegetación invasiva": "Vegetación invasiva",
  "Erosión por borde de ataque": "Erosión por borde de ataque",
  "Fisura en concreto": "Fisura en concreto",
  "Pintura deteriorada": "Pintura deteriorada",
  "Hot-spot termográfico": "Hot-spot termográfico",
  "Suciedad acumulada": "Suciedad acumulada"
};
const getCategoryName = (category: string) => FINDINGS_TRANSLATIONS[category] || category;

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
  const deleteJob = useDeleteJob(sessionId);
  const generateReport = useGenerateReport(sessionId);
  const updateFinding = useUpdateFinding(sessionId);

  const [threshold, setThreshold] = useState(0.65);
  const [reportReady, setReportReady] = useState(false);

  const updateSession = useUpdateSession(sessionId);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'REPORT_READY') {
        setReportReady(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("infrainspect_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.threshold !== undefined) setThreshold(parsed.threshold);
      } catch (e) {}
    }
  }, []);

  const [activeTab, setActiveTab] = useState("overview");

  const handleToggleStatus = (findingId: string, currentDisplayStatus: string) => {
    const newStatus = currentDisplayStatus === "validated" ? "rejected" : "validated";
    toast.promise(updateFinding.mutateAsync({ id: findingId, data: { status: newStatus } as any }), {
      loading: "Actualizando revisión...",
      success: `Diagnóstico revertido a ${newStatus === 'validated' ? 'Validado' : 'Rechazado'}`,
      error: "Error al actualizar",
    });
  };

  const handleGenerateReport = () => {
    if (session?.status !== "Review" && session?.status !== "Completed") {
      updateSession.mutate({ status: "Review" });
    }

    // Call the backend to create the report record if it doesn't exist
    generateReport.mutate(undefined, {
      onSuccess: () => {
        // Go to reports tab to view/download
        setActiveTab("reports");
        toast.success("Vista previa del reporte generada");
      },
      onError: () => toast.error("Hubo un error al registrar el reporte"),
    });
  };

  const handleLaunchAnalysis = () => {
    const toAnalyze = evidence.filter(e => e.type !== "rtmp" && (jobs.length > 0 ? true : !jobs.some(j => j.evidenceId === e.id)));
    if (toAnalyze.length === 0) {
      toast.info("No hay nuevas evidencias estáticas para analizar.");
      return;
    }

    // Leer configuración
    const saved = localStorage.getItem("infrainspect_settings");
    let targetModel = "yolo26n";
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.model) targetModel = parsed.model;
      } catch (e) {}
    }

    if (session?.status === "Draft" || session?.status === "Capturing") {
      updateSession.mutate({ status: "Processing" });
    }

    toast.info(`Iniciando análisis para ${toAnalyze.length} evidencias con ${targetModel.toUpperCase()}...`);
    
    for (const ev of toAnalyze) {
      createJob.mutate({
        session_id: sessionId,
        evidence_id: ev.id,
        model: targetModel,
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
              <SessionStatusBadge status={session.status} />
              <span className="font-mono text-xs text-muted-foreground">({session.code})</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mt-1">{session.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {session.infrastructure.coordinates.lat.toFixed(4)}, {session.infrastructure.coordinates.lng.toFixed(4)}</span>
              <span className="text-muted-foreground/50">·</span>
              <span suppressHydrationWarning className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {new Date(session.createdAt).toLocaleDateString("es-PE")}</span>
              <span className="text-muted-foreground/50">·</span>
              <span className="flex items-center gap-1.5 font-mono"><Fingerprint className="h-3.5 w-3.5" /> {session.infrastructure.assetCode}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <UploadEvidenceDialog isPrimary={evidence.length === 0} sessionStatus={session.status} />
            <Button 
              variant={evidence.length > 0 && session.status !== "Review" && session.status !== "Completed" ? "default" : "outline"}
              onClick={handleLaunchAnalysis} 
              disabled={createJob.isPending || evidence.length === 0}
            >
              {createJob.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />} 
              {createJob.isPending ? "Procesando..." : (jobs.length > 0 ? "Reprocesar" : "Procesar con IA")}
            </Button>
            <Button 
              variant="outline"
              onClick={handleGenerateReport} 
              disabled={generateReport.isPending || findings.length === 0}
            >
              <FileText className="h-4 w-4 mr-2" /> {generateReport.isPending ? "Generando..." : "Generar reporte"}
            </Button>
            {session.status === "Review" && (
              <Button 
                variant="default"
                onClick={() => {
                  toast.promise(updateSession.mutateAsync({ status: "Completed" }), {
                    loading: "Finalizando sesión...",
                    success: "Sesión finalizada",
                    error: "Error al finalizar sesión"
                  });
                }}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" /> Terminar Sesión
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quick stats */}
      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(() => {
          const calculatedProgress = session.status === "Completed" ? 100 : session.status === "Review" ? 90 : session.status === "Processing" ? 60 : session.status === "Capturing" ? 30 : 10;
          return (
            <StatBox label="Progreso" value={`${calculatedProgress}%`}>
              <Progress 
                value={calculatedProgress} 
                className="h-1.5 mt-3" 
                indicatorClassName={calculatedProgress === 100 ? "bg-[#22c55e]" : ""}
              />
            </StatBox>
          );
        })()}
        <StatBox label="Evidencias" value={evidence.length} />
        <StatBox label="Hallazgos" value={findings.length} />
        <StatBox label="Jobs IA" value={jobs.length} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="font-mono uppercase tracking-widest text-[10px]">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="evidence">Evidencias ({evidence.length})</TabsTrigger>
          <TabsTrigger value="live">Stream Dron</TabsTrigger>
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
                <Info label="Coordenadas" value={`${session.infrastructure.coordinates.lat}, ${session.infrastructure.coordinates.lng}`} mono />
                {session.weather && <Info label="Clima" value={session.weather} />}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Mapa</CardTitle></CardHeader>
              <CardContent className="p-0 overflow-hidden rounded-b-xl">
                <div className="aspect-square relative z-0">
                  <Suspense fallback={<div className="flex items-center justify-center h-full bg-muted text-muted-foreground">Cargando mapa satelital...</div>}>
                    <MapView 
                      lat={session.infrastructure.coordinates.lat} 
                      lng={session.infrastructure.coordinates.lng} 
                    />
                  </Suspense>
                  <div className="absolute bottom-2 left-2 z-[400] font-mono text-[10px] text-white bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-white/10 shadow-lg">
                    {session.infrastructure.coordinates.lat.toFixed(5)}, {session.infrastructure.coordinates.lng.toFixed(5)}
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="aspect-video rounded bg-muted flex items-center justify-center mb-3 relative overflow-hidden group cursor-pointer">
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
                        </DialogTrigger>
                        {(e.thumbnailUrl || e.storageUrl) && (
                          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none shadow-2xl flex justify-center items-center overflow-hidden [&>button]:text-white">
                             <img src={e.storageUrl || e.thumbnailUrl} alt={e.filename} className="max-w-full max-h-[95vh] object-contain" />
                          </DialogContent>
                        )}
                      </Dialog>
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

        <TabsContent value="live" className="mt-4">
          <Suspense fallback={<div className="p-12 text-center text-muted-foreground font-mono text-sm">Cargando visor...</div>}>
            <LiveStreamView sessionId={sessionId} />
          </Suspense>
        </TabsContent>

        <TabsContent value="findings" className="mt-4 space-y-3">
          {findings.map((f) => {
            const ev = evidence.find((e) => e.id === f.evidenceId);
            const obs = observations.filter((o) => o.findingId === f.id);
            
            const isAutoRejected = f.confidence < threshold;
            let displayStatus = f.status;
            if (f.status === "pending" || f.status === "needs_review") {
              displayStatus = isAutoRejected ? "rejected" : "validated";
            }

            return (
              <Card key={f.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {ev && (ev.storageUrl || ev.thumbnailUrl) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="relative w-32 h-24 shrink-0 bg-black/10 rounded overflow-hidden cursor-pointer group">
                            <img src={ev.storageUrl || ev.thumbnailUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="preview" />
                            {f.bbox && (
                              <div 
                                className={`absolute border-[3px] ${displayStatus === "validated" ? "border-[#39ff14] bg-[#39ff14]/20 shadow-[0_0_8px_#39ff14]" : "border-[#ff073a] bg-[#ff073a]/20 shadow-[0_0_8px_#ff073a]"}`}
                                style={{
                                  left: `${(f.bbox.x - f.bbox.w / 2) * 100}%`,
                                  top: `${(f.bbox.y - f.bbox.h / 2) * 100}%`,
                                  width: `${f.bbox.w * 100}%`,
                                  height: `${f.bbox.h * 100}%`,
                                }}
                              />
                            )}
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none shadow-2xl flex justify-center items-center overflow-hidden [&>button]:text-white">
                           <div className="relative inline-block">
                             <img src={ev.storageUrl || ev.thumbnailUrl} alt="full" className="max-w-full max-h-[95vh] object-contain" />
                             {f.bbox && (
                                <div 
                                  className={`absolute border-[3px] ${displayStatus === "validated" ? "border-[#39ff14] bg-[#39ff14]/20 shadow-[0_0_8px_#39ff14]" : "border-[#ff073a] bg-[#ff073a]/20 shadow-[0_0_8px_#ff073a]"}`}
                                  style={{
                                    left: `${(f.bbox.x - f.bbox.w / 2) * 100}%`,
                                    top: `${(f.bbox.y - f.bbox.h / 2) * 100}%`,
                                    width: `${f.bbox.w * 100}%`,
                                    height: `${f.bbox.h * 100}%`,
                                  }}
                                />
                             )}
                           </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={f.severity === 'critical' ? 'destructive' : 'secondary'} className="uppercase">
                          {f.severity}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mt-2">{getCategoryName(f.category)}</h3>
                      {!f.description.includes("con confianza") && (
                        <p className="text-sm text-muted-foreground mt-1">{f.description}</p>
                      )}
                      <div className="mt-2.5 flex items-center gap-2">
                        <div className="flex gap-[2px]">
                          {[1, 2, 3, 4, 5].map((level) => {
                            const active = level <= Math.round(f.confidence * 5);
                            let colorClass = "bg-muted";
                            if (active) {
                              if (f.confidence > 0.8) colorClass = "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]";
                              else if (f.confidence > 0.5) colorClass = "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]";
                              else colorClass = "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]";
                            }
                            return (
                              <div key={level} className={`h-1.5 w-4 rounded-[1px] transition-colors ${colorClass}`} />
                            );
                          })}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Certeza AI</span>
                      </div>
                      {f.recommendation && (
                        <div className="mt-2 rounded border border-border bg-muted/40 p-2 text-xs">
                          <span className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground">Recomendación · </span>
                          {f.recommendation}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <div className={`flex items-center justify-center py-2 px-3 rounded-md text-xs font-semibold ${displayStatus === "validated" ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"}`}>
                        {displayStatus === "validated" ? <><CheckCircle2 className="h-4 w-4 mr-2" /> Validado</> : <><XCircle className="h-4 w-4 mr-2" /> Rechazado</>}
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleToggleStatus(f.id, displayStatus)}>
                        <RotateCcw className="h-3.5 w-3.5 mr-2" /> Revisión
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
                            <span suppressHydrationWarning className="text-muted-foreground"> · {new Date(o.createdAt).toLocaleString("es-PE")}</span>
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
          {findings.length > 0 && (
            <div className="mt-8 border-t border-border pt-4">
              <h4 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-widest font-mono">Leyenda de Hallazgos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div><span className="font-semibold text-foreground">Descorchamiento:</span> Desprendimiento superficial del concreto.</div>
                <div><span className="font-semibold text-foreground">Desprendimiento:</span> Pérdida profunda de material.</div>
                <div><span className="font-semibold text-foreground">Grieta:</span> Fisura o fractura en el material.</div>
                <div><span className="font-semibold text-foreground">Eflorescencia:</span> Manchas blancas producidas por sales.</div>
                <div><span className="font-semibold text-foreground">Acero Expuesto:</span> Armadura visible por pérdida de recubrimiento.</div>
                <div><span className="font-semibold text-foreground">Óxido:</span> Corrosión visible en elementos metálicos.</div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="jobs" className="mt-4">
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {jobs.map((j) => (
                <div key={j.id} className="p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Ejecución de Evaluación con InfraInspect AI - {j.model.toUpperCase()}</span>
                      <JobStatusBadge status={j.status} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground font-mono">
                      Evidencia {j.evidenceId} · {j.findingsProduced} hallazgos
                      {j.createdAt && <span suppressHydrationWarning> · {new Date(j.createdAt).toLocaleString("es-PE")}</span>}
                      {j.error && <span className="text-destructive"> · {j.error}</span>}
                    </div>
                  </div>
                  <div className="w-40 flex flex-col items-end gap-2">
                    <div className="w-full">
                      <Progress value={j.progress} className="h-1.5" />
                      <div className="text-right font-mono text-[10px] text-muted-foreground mt-1">{j.progress}%</div>
                    </div>
                    {(j.status === 'running' || j.status === 'queued' || j.status === 'failed') && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive text-xs"
                        onClick={() => {
                          if (confirm("¿Estás seguro de cancelar o eliminar este Job? La evidencia volverá a estar disponible para procesarse.")) {
                            toast.promise(deleteJob.mutateAsync(j.id), {
                              loading: "Cancelando job...",
                              success: "Job cancelado con éxito",
                              error: "Error al cancelar job"
                            });
                          }
                        }}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Cancelar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {jobs.length === 0 && <div className="p-12 text-center text-muted-foreground">Sin jobs IA</div>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Vista Previa del Reporte de IA</h3>
            <Button 
              disabled={!reportReady}
              onClick={() => {
                window.open(`/reports/print/${sessionId}?download=true`, "_blank");
              }}
            >
              <Download className="h-4 w-4 mr-2" /> 
              {reportReady ? "Descargar PDF" : "Generando insights..."}
            </Button>
          </div>
          <div className="border border-border rounded-lg overflow-hidden bg-white/5 relative">
            <iframe 
              src={`/reports/print/${sessionId}?preview=true`} 
              className="w-full h-[70vh] bg-white border-0"
              title="Report Preview"
            />
          </div>
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
    <Card className="shadow-none bg-muted/20">
      <CardContent className="p-5">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className={`text-3xl font-light tracking-tight mt-2 ${accent === "critical" ? "text-severity-critical font-medium" : "text-foreground"}`}>{value}</div>
        {children}
      </CardContent>
    </Card>
  );
}

function UploadEvidenceDialog({ isPrimary, sessionStatus }: { isPrimary?: boolean; sessionStatus?: string }) {
  const { sessionId } = Route.useParams();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"image" | "video" | "pdf" | "rtmp">("image");
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const uploadMutation = useUploadEvidence(sessionId);
  const updateSession = useUpdateSession(sessionId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (type !== "rtmp" && files.length === 0) {
      toast.error("Por favor selecciona al menos un archivo");
      return;
    }
    
    if (type !== "rtmp" && files.length > 0) {
      setIsUploading(true);
      try {
        // Ejecutar las subidas de forma secuencial o en paralelo
        // Usamos en paralelo con Promise.all (hasta el límite del navegador)
        await Promise.all(files.map(file => 
          uploadMutation.mutateAsync({ file, meta: { session_id: sessionId, type, tags: notes } })
        ));
        
        setOpen(false);
        setFiles([]);
        setNotes("");
        toast.success(`${files.length} evidencia(s) cargada(s) exitosamente`);
        if (sessionStatus === "Draft") {
          updateSession.mutate({ status: "Capturing" });
        }
      } catch (err: any) {
        toast.error(err.message || "Error al cargar las evidencias");
      } finally {
        setIsUploading(false);
      }
    } else if (type === "rtmp") {
      toast.error("RTMP stream en desarrollo");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) { setFiles([]); setNotes(""); } }}>
      <DialogTrigger asChild>
        <Button variant={isPrimary ? "default" : "outline"}>
          <Upload className="h-4 w-4 mr-2" /> Cargar evidencia
        </Button>
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
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleFileChange}
                accept={type === 'image' ? 'image/*,.webp,.tiff' : type === 'video' ? 'video/*' : 'application/pdf'}
              />
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm">
                {files.length > 0 ? <span className="font-semibold text-primary">{files.length} archivo(s) seleccionado(s)</span> : "Arrastra archivos aquí o haz clic para seleccionar"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {files.length > 0 ? `${(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB en total` : "Puedes subir varios archivos"}
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
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isUploading}>Cancelar</Button>
          <Button onClick={handleUpload} disabled={isUploading || (type !== "rtmp" && files.length === 0)}>
            {isUploading ? "Cargando..." : "Cargar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ValidateDialog({ findingId, category, sessionId }: { findingId: string; category: string; sessionId: string }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const updateFinding = useUpdateFinding(sessionId);

  const handleConfirm = () => {
    toast.promise(updateFinding.mutateAsync({ id: findingId, data: { status: "validated" } as any }), {
      loading: "Validando...",
      success: () => {
        setOpen(false);
        return "Hallazgo validado";
      },
      error: "Error al validar"
    });
  };

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
          <Button onClick={handleConfirm} disabled={updateFinding.isPending}>
            {updateFinding.isPending ? "Validando..." : "Confirmar validación"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}