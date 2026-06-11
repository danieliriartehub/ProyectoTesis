import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useSessions, B as Button, C as Card, I as Input, S as SessionStatusBadge, P as Progress } from "./router-Bcoizwyc.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CP9S62wf.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-D6ZtDE4N.mjs";
import "../_libs/sonner.mjs";
import { P as Plus, a as Search, k as Funnel, M as MapPin } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const statuses = ["all", "Draft", "Capturing", "Processing", "Review", "Completed"];
function SessionsList() {
  const [q, setQ] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("all");
  const [type, setType] = reactExports.useState("all");
  const {
    data,
    isLoading
  } = useSessions({
    limit: 200
  });
  const sessions = data?.items ?? [];
  const filtered = sessions.filter((s) => {
    const matchesQ = !q || s.title.toLowerCase().includes(q.toLowerCase()) || s.code.toLowerCase().includes(q.toLowerCase()) || s.infrastructure.location.toLowerCase().includes(q.toLowerCase());
    const matchesStatus = status === "all" || s.status === status;
    const matchesType = type === "all" || s.infrastructure.type === type;
    return matchesQ && matchesStatus && matchesType;
  });
  const getDynamicStatus = (s) => {
    if (s.status === "Completed") return "Completed";
    if (s.findingsCount > 0) return "Review";
    if (s.evidenceCount > 0) return "Processing";
    return s.status;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Histórico y operación" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight mt-1", children: "Sesiones de Inspección" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/sessions/new", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Nueva sesión"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[240px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por código, título o ubicación…", className: "pl-8 h-9 font-mono text-xs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: (v) => setStatus(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40 h-9 font-mono text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Estado" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: statuses.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s === "all" ? "Todos los estados" : s }, s)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: type, onValueChange: setType, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-48 h-9 font-mono text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Tipo de activo" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todos los activos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Bridge", children: "Puente / Viaducto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Building", children: "Edificio / Fachada" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Road", children: "Vía pública / Autopista" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "House", children: "Casa / Residencial" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Other", children: "Otros" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "ml-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5" }),
        " Más filtros"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-mono uppercase text-[10px] tracking-widest", children: "Código" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-mono uppercase text-[10px] tracking-widest", children: "Sesión" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-mono uppercase text-[10px] tracking-widest", children: "Estado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-mono uppercase text-[10px] tracking-widest", children: "Progreso" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-mono uppercase text-[10px] tracking-widest text-right", children: "Evidencias" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-mono uppercase text-[10px] tracking-widest text-right", children: "Hallazgos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-mono uppercase text-[10px] tracking-widest", children: "Actualizado" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 7, className: "text-center py-12 text-muted-foreground", children: "Cargando sesiones…" }) }),
        !isLoading && filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "cursor-pointer hover:bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sessions/$sessionId", params: {
            sessionId: s.id
          }, className: "block", children: s.code }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/sessions/$sessionId", params: {
            sessionId: s.id
          }, className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              " ",
              s.infrastructure.location,
              " · ",
              s.infrastructure.type
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SessionStatusBadge, { status: getDynamicStatus(s) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-[120px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: s.progress, className: "h-1.5 flex-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs w-9 text-right", children: [
              s.progress,
              "%"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-mono", children: s.evidenceCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right font-mono", children: [
            s.findingsCount,
            s.criticalFindings > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-severity-critical text-xs", children: [
              "(",
              s.criticalFindings,
              " crit)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-muted-foreground", children: new Date(s.updatedAt).toLocaleDateString("es-PE") })
        ] }, s.id)),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 7, className: "text-center py-12 text-muted-foreground", children: "Sin resultados con los filtros actuales" }) })
      ] })
    ] }) })
  ] });
}
export {
  SessionsList as component
};
