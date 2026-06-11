import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route, l as useSession, m as useSessionEvidences, n as useSessionFindings, o as useSessionJobs, p as useSessionReport, q as useCreateJob, r as useGenerateReport, t as useUpdateFinding, B as Button, S as SessionStatusBadge, P as Progress, C as Card, a as CardHeader, b as CardTitle, d as CardContent, F as FindingStatusBadge, J as JobStatusBadge, v as useUploadEvidence, I as Input, c as cn } from "./router-Bcoizwyc.mjs";
import { R as Root2, L as List, T as Trigger$1, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { T as Textarea } from "./textarea-BlgYneoy.mjs";
import { R as Root, b as Trigger, P as Portal, C as Content$1, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { L as Label } from "./label-D4HAPuQ5.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CP9S62wf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as ArrowLeft, M as MapPin, q as Calendar, r as FingerprintPattern, s as LoaderCircle, m as Sparkles, F as FileText, t as FileType, R as Radio, V as Video, I as Image, u as Play, v as CircleX, w as CircleCheck, x as MessageSquare, D as Download, y as Upload, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/recharts.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger$1,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger$1.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content$1.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const observations = [
  {
    id: "o1",
    findingId: "f1",
    authorId: "u3",
    authorName: "Marta Quiroz",
    createdAt: "2026-06-04T10:50:00Z",
    comment: "Confirmado en zoom 4x — pérdida de sección visible.",
    action: "comment"
  },
  {
    id: "o2",
    findingId: "f2",
    authorId: "u3",
    authorName: "Marta Quiroz",
    createdAt: "2026-06-04T11:02:00Z",
    comment: "Validado. Coordinado con cuadrilla.",
    action: "validated"
  },
  {
    id: "o3",
    findingId: "f5",
    authorId: "u2",
    authorName: "Diego Salas",
    createdAt: "2026-05-31T09:00:00Z",
    comment: "Estructura comprometida, prioridad máxima.",
    action: "flagged"
  }
];
const categoryTranslation = {
  Crack: "Grieta",
  Leakage: "Filtración",
  Abscission: "Desprendimiento",
  Corrosion: "Corrosión",
  Bulge: "Abultamiento"
};
const MapView = reactExports.lazy(() => import("./MapView-Dq57__4n.mjs"));
const typeIcon = {
  image: Image,
  video: Video,
  rtmp: Radio,
  pdf: FileType
};
function formatBytes(b) {
  if (b === 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = b;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(1)} ${units[i]}`;
}
function SessionDetail() {
  const {
    sessionId
  } = Route.useParams();
  const {
    data: session,
    isLoading,
    error
  } = useSession(sessionId);
  const {
    data: evidence = []
  } = useSessionEvidences(sessionId);
  const {
    data: findings = []
  } = useSessionFindings(sessionId);
  const {
    data: jobs = []
  } = useSessionJobs(sessionId);
  const {
    data: report
  } = useSessionReport(sessionId);
  const createJob = useCreateJob(sessionId);
  const generateReport = useGenerateReport(sessionId);
  const updateFinding = useUpdateFinding(sessionId);
  const processedFindings = reactExports.useRef(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    if (!findings || findings.length === 0) return;
    const settingsStr = localStorage.getItem("infrainspect_settings");
    const threshold = settingsStr ? JSON.parse(settingsStr).yoloConfidence || 0.45 : 0.45;
    let changed = 0;
    findings.forEach((f) => {
      if ((f.status === "pending" || f.status === "needs_review") && !processedFindings.current.has(f.id)) {
        processedFindings.current.add(f.id);
        changed++;
        const newStatus = f.confidence >= threshold ? "validated" : "rejected";
        updateFinding.mutate({
          id: f.id,
          data: {
            status: newStatus
          }
        });
      }
    });
    if (changed > 0) {
      toast.success(`Se evaluaron ${changed} hallazgos automáticamente usando el umbral (${threshold * 100}%)`);
    }
  }, [findings, updateFinding]);
  const handleReject = (findingId) => {
    toast.promise(updateFinding.mutateAsync({
      id: findingId,
      data: {
        status: "rejected"
      }
    }), {
      loading: "Rechazando...",
      success: "Hallazgo rechazado",
      error: "Error al rechazar"
    });
  };
  const handleRevert = (findingId, currentStatus) => {
    const newStatus = currentStatus === "validated" ? "rejected" : "validated";
    toast.promise(updateFinding.mutateAsync({
      id: findingId,
      data: {
        status: newStatus
      }
    }), {
      loading: "Revirtiendo...",
      success: `Cambiado a ${newStatus === "validated" ? "Validado" : "Rechazado"}`,
      error: "Error al revertir"
    });
  };
  const handleGenerateReport = () => {
    toast.info("Generando reporte técnico...");
    generateReport.mutate(void 0, {
      onSuccess: () => toast.success("Reporte generado exitosamente"),
      onError: () => toast.error("Hubo un error al generar el reporte")
    });
  };
  const handleLaunchAnalysis = () => {
    const toAnalyze = evidence.filter((e) => e.type !== "rtmp" && !jobs.some((j) => j.evidenceId === e.id));
    if (toAnalyze.length === 0) {
      toast.info("No hay nuevas evidencias estáticas para analizar.");
      return;
    }
    const saved = localStorage.getItem("infrainspect_settings");
    let targetModel = "yolo26n";
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.model) targetModel = parsed.model;
      } catch (e) {
      }
    }
    toast.info(`Iniciando análisis para ${toAnalyze.length} evidencias con ${targetModel.toUpperCase()}...`);
    for (const ev of toAnalyze) {
      createJob.mutate({
        session_id: sessionId,
        evidence_id: ev.id,
        model: targetModel
      });
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: "Cargando sesión..." });
  if (error || !session) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Sesión no encontrada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 mb-4", children: "La sesión solicitada no existe o fue eliminada." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sessions", children: "Volver a sesiones" }) })
    ] });
  }
  const reports = report ? [report] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "mb-3 -ml-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/sessions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
        " Sesiones"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: session.code }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SessionStatusBadge, { status: session.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight mt-1", children: session.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
              " ",
              session.infrastructure.coordinates.lat.toFixed(4),
              ", ",
              session.infrastructure.coordinates.lng.toFixed(4)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { suppressHydrationWarning: true, className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
              " ",
              new Date(session.createdAt).toLocaleDateString("es-PE")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FingerprintPattern, { className: "h-3.5 w-3.5" }),
              " ",
              session.infrastructure.assetCode
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UploadEvidenceDialog, { isPrimary: evidence.length === 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: evidence.length > 0 && session.status !== "Review" && session.status !== "Completed" ? "default" : "outline", onClick: handleLaunchAnalysis, disabled: createJob.isPending || evidence.length === 0, children: [
            createJob.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
            createJob.isPending ? "Procesando..." : "Procesar con IA"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: session.status === "Review" || session.status === "Completed" ? "default" : "outline", onClick: handleGenerateReport, disabled: generateReport.isPending || session.status !== "Review" && session.status !== "Completed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 mr-2" }),
            " ",
            generateReport.isPending ? "Generando..." : "Generar reporte"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-5 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatBox, { label: "Progreso", value: `${session.progress}%`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: session.progress, className: "h-1.5 mt-3" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatBox, { label: "Evidencias", value: evidence.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatBox, { label: "Hallazgos", value: findings.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatBox, { label: "Críticos", value: findings.filter((f) => f.severity === "critical").length, accent: "critical" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatBox, { label: "Jobs IA", value: jobs.length })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "font-mono uppercase tracking-widest text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "overview", children: "Resumen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "evidence", children: [
          "Evidencias (",
          evidence.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "findings", children: [
          "Hallazgos (",
          findings.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "jobs", children: "Procesamiento IA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "reports", children: "Reportes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "overview", className: "space-y-4 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-mono uppercase tracking-widest text-muted-foreground", children: "Infraestructura" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid grid-cols-2 gap-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Activo", value: session.infrastructure.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Tipo", value: session.infrastructure.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Código", value: session.infrastructure.assetCode, mono: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Coordenadas", value: `${session.infrastructure.coordinates.lat}, ${session.infrastructure.coordinates.lng}`, mono: true }),
              session.weather && /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Clima", value: session.weather })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-mono uppercase tracking-widest text-muted-foreground", children: "Mapa" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0 overflow-hidden rounded-b-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square relative z-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full bg-muted text-muted-foreground", children: "Cargando mapa satelital..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapView, { lat: session.infrastructure.coordinates.lat, lng: session.infrastructure.coordinates.lng }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 left-2 z-[400] font-mono text-[10px] text-white bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-white/10 shadow-lg", children: [
                session.infrastructure.coordinates.lat.toFixed(5),
                ", ",
                session.infrastructure.coordinates.lng.toFixed(5)
              ] })
            ] }) })
          ] })
        ] }),
        session.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-mono uppercase tracking-widest text-muted-foreground", children: "Notas" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-sm text-muted-foreground", children: session.notes })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "evidence", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-3 p-4", children: [
        evidence.map((e) => {
          const Icon = typeIcon[e.type];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded border border-border p-3 hover:border-primary/40 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video rounded bg-muted flex items-center justify-center mb-3 relative overflow-hidden group cursor-pointer", children: [
                e.thumbnailUrl || e.type === "image" && e.storageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: e.thumbnailUrl || e.storageUrl, alt: e.filename, className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-muted-foreground" }),
                e.type === "rtmp" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-2 left-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-severity-critical", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-severity-critical animate-pulse" }),
                  "Live"
                ] }),
                e.type === "video" && !e.thumbnailUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "absolute h-10 w-10 text-primary/70" }),
                e.type === "video" && e.thumbnailUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-10 w-10 text-white drop-shadow-md" }) })
              ] }) }),
              (e.thumbnailUrl || e.storageUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none shadow-2xl flex justify-center items-center overflow-hidden [&>button]:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: e.storageUrl || e.thumbnailUrl, alt: e.filename, className: "max-w-full max-h-[95vh] object-contain" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs truncate", title: e.filename, children: e.filename }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(EvidenceStatusBadge, { status: e.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: e.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatBytes(e.sizeBytes) })
            ] })
          ] }, e.id);
        }),
        evidence.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2 lg:col-span-3 text-center py-12 text-muted-foreground", children: 'Sin evidencias cargadas. Usa "Cargar evidencia" para empezar.' })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "findings", className: "mt-4 space-y-3", children: [
        findings.map((f) => {
          const ev = evidence.find((e) => e.id === f.evidenceId);
          const obs = observations.filter((o) => o.findingId === f.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
              ev && (ev.storageUrl || ev.thumbnailUrl) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-24 shrink-0 bg-black/10 rounded overflow-hidden cursor-pointer group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ev.storageUrl || ev.thumbnailUrl, className: "absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity", alt: "preview" }),
                  f.bbox && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute border-2 border-severity-critical bg-severity-critical/20", style: {
                    left: `${(f.bbox.x - f.bbox.w / 2) * 100}%`,
                    top: `${(f.bbox.y - f.bbox.h / 2) * 100}%`,
                    width: `${f.bbox.w * 100}%`,
                    height: `${f.bbox.h * 100}%`
                  } })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none shadow-2xl flex justify-center items-center overflow-hidden [&>button]:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ev.storageUrl || ev.thumbnailUrl, alt: "full", className: "max-w-full max-h-[95vh] object-contain" }),
                  f.bbox && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute border-2 border-severity-critical bg-severity-critical/20", style: {
                    left: `${(f.bbox.x - f.bbox.w / 2) * 100}%`,
                    top: `${(f.bbox.y - f.bbox.h / 2) * 100}%`,
                    width: `${f.bbox.w * 100}%`,
                    height: `${f.bbox.h * 100}%`
                  } })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FindingStatusBadge, { status: f.status }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: [
                    "conf ",
                    Math.round(f.confidence * 100),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mt-2", children: categoryTranslation[f.category] || f.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: f.description }),
                f.recommendation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 rounded border border-border bg-muted/40 p-2 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono uppercase tracking-wider text-[10px] text-muted-foreground", children: "Recomendación · " }),
                  f.recommendation
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5 shrink-0 justify-center", children: f.status === "pending" || f.status === "needs_review" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ValidateDialog, { findingId: f.id, category: categoryTranslation[f.category] || f.category, sessionId }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: () => handleReject(f.id), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
                  " Rechazar"
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex items-center justify-center py-2 px-3 rounded-md text-xs font-semibold ${f.status === "validated" ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"}`, children: f.status === "validated" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 mr-2" }),
                  " Validado"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 mr-2" }),
                  " Rechazado"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "text-[10px] h-7", onClick: () => handleRevert(f.id, f.status), children: [
                  "Marcar como ",
                  f.status === "validated" ? "Rechazado" : "Validado"
                ] })
              ] }) })
            ] }),
            obs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 border-t border-border pt-3 space-y-2", children: obs.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5 text-muted-foreground mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: o.authorName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { suppressHydrationWarning: true, className: "text-muted-foreground", children: [
                  " · ",
                  new Date(o.createdAt).toLocaleString("es-PE")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: o.comment })
              ] })
            ] }, o.id)) })
          ] }) }, f.id);
        }),
        findings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-center py-12 text-muted-foreground", children: "Aún no hay hallazgos. Procesa evidencias para generarlos." }) }),
        findings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 p-4 border border-border rounded bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-semibold text-sm mb-3", children: "Leyenda de Defectos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Grieta:" }),
              " Fisuras o rupturas lineales en la superficie."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Filtración:" }),
              " Fugas, humedad o manchas de agua."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Desprendimiento:" }),
              " Caída de recubrimiento o partes rotas."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Corrosión:" }),
              " Óxido o degradación en elementos metálicos."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Abultamiento:" }),
              " Deformaciones, hinchazón o protuberancias."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "jobs", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0 divide-y divide-border", children: [
        jobs.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: j.model }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(JobStatusBadge, { status: j.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground font-mono", children: [
              "Evidencia ",
              j.evidenceId,
              " · ",
              j.findingsProduced,
              " hallazgos",
              j.inferenceTimeMs && ` · ${(j.inferenceTimeMs / 1e3).toFixed(1)}s`,
              j.error && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-destructive", children: [
                " · ",
                j.error
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: j.progress, className: "h-1.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right font-mono text-[10px] text-muted-foreground mt-1", children: [
              j.progress,
              "%"
            ] })
          ] })
        ] }, j.id)),
        jobs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: "Sin jobs IA" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "reports", className: "mt-4 space-y-3", children: [
        reports.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded bg-primary/15 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: r.code }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-wider bg-muted px-1.5 py-0.5 rounded", children: r.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mt-0.5", children: r.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { suppressHydrationWarning: true, className: "text-xs text-muted-foreground", children: [
                r.pages,
                " págs · ",
                r.format.toUpperCase(),
                " · ",
                new Date(r.generatedAt).toLocaleDateString("es-PE")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
            if (r.fileUrl) window.open(r.fileUrl, "_blank");
            else toast.info("El PDF aún no ha sido subido. (Generador PDF en desarrollo Fase 5)");
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
            " Descargar"
          ] })
        ] }) }, r.id)),
        reports.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-center py-12 text-muted-foreground", children: "Sin reportes generados aún." }) })
      ] })
    ] })
  ] });
}
function Info({
  label,
  value,
  mono
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: mono ? "font-mono text-sm mt-0.5" : "text-sm mt-0.5", children: value })
  ] });
}
function StatBox({
  label,
  value,
  accent,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-none bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-3xl font-light tracking-tight mt-2 ${accent === "critical" ? "text-severity-critical font-medium" : "text-foreground"}`, children: value }),
    children
  ] }) });
}
function UploadEvidenceDialog({
  isPrimary
}) {
  const {
    sessionId
  } = Route.useParams();
  const [open, setOpen] = reactExports.useState(false);
  const [type, setType] = reactExports.useState("image");
  const [file, setFile] = reactExports.useState(null);
  const [notes, setNotes] = reactExports.useState("");
  const uploadMutation = useUploadEvidence(sessionId);
  const handleFileChange = (e) => {
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
      uploadMutation.mutate({
        file,
        meta: {
          session_id: sessionId,
          type,
          tags: notes
        }
      }, {
        onSuccess: () => {
          setOpen(false);
          setFile(null);
          setNotes("");
          toast.success("Evidencia cargada exitosamente");
        },
        onError: (err) => {
          toast.error(err.message || "Error al cargar la evidencia");
        }
      });
    } else if (type === "rtmp") {
      toast.error("RTMP stream en desarrollo");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (val) => {
    setOpen(val);
    if (!val) {
      setFile(null);
      setNotes("");
    }
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: isPrimary ? "default" : "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2" }),
      " Cargar evidencia"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Cargar evidencia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Sube imágenes (JPG, PNG, WEBP, TIFF), videos (MP4, MOV, AVI, MKV), PDF o conecta un stream RTMP." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tipo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: type, onValueChange: (val) => setType(val), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "image", children: "Imagen" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "video", children: "Video" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pdf", children: "PDF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rtmp", children: "RTMP Live" })
            ] })
          ] })
        ] }),
        type === "rtmp" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "URL RTMP" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "rtmp://stream.infrainspect.ai/live/clave", className: "font-mono" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded border-2 border-dashed border-border p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer", onChange: handleFileChange, accept: type === "image" ? "image/*,.webp,.tiff" : type === "video" ? "video/*" : "application/pdf" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 mx-auto text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: file ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: file.name }) : "Arrastra archivos aquí o haz clic para seleccionar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Un archivo a la vez" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, placeholder: "Contexto, condiciones de captura…", value: notes, onChange: (e) => setNotes(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), disabled: uploadMutation.isPending, children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleUpload, disabled: uploadMutation.isPending || type !== "rtmp" && !file, children: uploadMutation.isPending ? "Cargando..." : "Cargar" })
      ] })
    ] })
  ] });
}
function ValidateDialog({
  findingId,
  category,
  sessionId
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [comment, setComment] = reactExports.useState("");
  const updateFinding = useUpdateFinding(sessionId);
  const handleConfirm = () => {
    toast.promise(updateFinding.mutateAsync({
      id: findingId,
      data: {
        status: "validated"
      }
    }), {
      loading: "Validando...",
      success: () => {
        setOpen(false);
        return "Hallazgo validado";
      },
      error: "Error al validar"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
      " Validar"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Validar hallazgo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          category,
          " · #",
          findingId
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Observación de validación…", rows: 4 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleConfirm, disabled: updateFinding.isPending, children: updateFinding.isPending ? "Validando..." : "Confirmar validación" })
      ] })
    ] })
  ] });
}
export {
  SessionDetail as component
};
