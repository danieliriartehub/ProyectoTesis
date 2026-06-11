import { r as reactExports, j as jsxRuntimeExports, R as React } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { h as useMe, i as useInfrastructure, j as useCreateSession, k as useCreateInfrastructure, B as Button, I as Input } from "./router-Bcoizwyc.mjs";
import { L as Label } from "./label-D4HAPuQ5.mjs";
import { T as Textarea } from "./textarea-BlgYneoy.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CP9S62wf.mjs";
import { l as ArrowLeft, i as FilePenLine, m as Sparkles, n as Building2, M as MapPin, o as ScanFace, p as ArrowRight, U as Users } from "../_libs/lucide-react.mjs";
import { o as objectType, c as coerce, s as stringType, e as enumType } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const MapPicker = React.lazy(() => import("./MapPicker-pxLiqIAl.mjs"));
const schema = objectType({
  title: stringType().min(4, "Mínimo 4 caracteres").max(120),
  location: stringType().max(120).optional(),
  description: stringType().max(500).optional(),
  scheduledFor: stringType().optional(),
  infraMode: enumType(["existing", "new"]),
  infraId: stringType().optional(),
  infraName: stringType().max(80).optional(),
  infraType: stringType().optional(),
  assetCode: stringType().max(40).optional(),
  lat: coerce.number().min(-90).max(90).optional(),
  lng: coerce.number().min(-180).max(180).optional()
});
function NewSession() {
  const navigate = useNavigate();
  const {
    data: me
  } = useMe();
  const {
    data: infraList = []
  } = useInfrastructure();
  const createSession = useCreateSession();
  const createInfra = useCreateInfrastructure();
  const [step, setStep] = reactExports.useState(1);
  const [isClient, setIsClient] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsClient(true);
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver: u(schema),
    defaultValues: {
      infraMode: "existing",
      lat: -12.0464,
      lng: -77.0428
    }
  });
  const infraMode = watch("infraMode");
  const infraType = watch("infraType");
  const infraName = watch("infraName");
  const lat = watch("lat") || -12.0464;
  const lng = watch("lng") || -77.0428;
  reactExports.useEffect(() => {
    if (infraMode === "new" && infraType && infraName && !watch("assetCode")) {
      const prefix = infraType.substring(0, 3).toUpperCase();
      const code = `${prefix}-${Math.floor(100 + Math.random() * 900)}`;
      setValue("assetCode", code);
    }
  }, [infraMode, infraType, infraName, setValue, watch]);
  const handleNextStep = async () => {
    if (step === 1) {
      const valid = await trigger(["title", "location", "scheduledFor"]);
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await trigger(["infraMode", "infraId", "infraName", "infraType", "assetCode"]);
      if (valid) setStep(3);
    }
  };
  const onSubmit = async (data) => {
    if (step < 3) {
      const valid = await trigger(["infraMode", "infraId", "infraName", "infraType", "assetCode"]);
      if (valid) setStep(3);
      return;
    }
    try {
      let infrastructure_id = data.infraId;
      if (data.infraMode === "new") {
        if (!data.infraName || !data.infraType || !data.assetCode) {
          toast.error("Faltan datos de la infraestructura");
          return;
        }
        const infra = await createInfra.mutateAsync({
          name: data.infraName,
          type: data.infraType,
          location: data.location || "Ubicación seleccionada",
          asset_code: data.assetCode,
          operator: "InfraInspect User",
          latitude: data.lat ?? 0,
          longitude: data.lng ?? 0
        });
        infrastructure_id = infra.id;
      }
      if (!infrastructure_id) {
        toast.error("Debe seleccionar o crear una infraestructura");
        return;
      }
      await createSession.mutateAsync({
        title: data.title,
        infrastructure_id,
        lead_inspector_id: me?.id ?? "",
        scheduled_for: data.scheduledFor || void 0,
        notes: data.description || void 0
      });
      toast.success(`Sesión "${data.title}" creada con éxito`);
      navigate({
        to: "/sessions"
      });
    } catch (err) {
      toast.error(err?.message ?? "Error al crear la sesión");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-full md:w-[60%] h-[400px] opacity-40 pointer-events-none z-0", style: {
      backgroundImage: "url('https://images.unsplash.com/photo-1545042746-88d40d998ec7?auto=format&fit=crop&q=80&w=2000')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
      WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-full h-[400px] bg-gradient-to-b from-transparent to-background pointer-events-none z-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-6 md:p-10 max-w-5xl mx-auto space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "mb-6 text-primary hover:text-primary hover:bg-primary/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/sessions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
          " VOLVER A SESIONES"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold tracking-tight text-white mb-3", children: "Nueva sesión de análisis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl", children: "Define los detalles clave para iniciar una revisión estructural inteligente." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm font-medium py-4 overflow-x-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 shrink-0 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-8 w-8 items-center justify-center rounded-full border-2 ${step >= 1 ? "border-primary bg-primary/20 glow-primary" : "border-muted-foreground"}`, children: "1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Detalles generales" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[1px] w-12 bg-border shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 shrink-0 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-8 w-8 items-center justify-center rounded-full border-2 ${step >= 2 ? "border-primary bg-primary/20 glow-primary" : "border-muted-foreground"}`, children: "2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Infraestructura y Mapa" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[1px] w-12 bg-border shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 shrink-0 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-8 w-8 items-center justify-center rounded-full border-2 ${step >= 3 ? "border-primary bg-primary/20 glow-primary" : "border-muted-foreground"}`, children: "3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Confirmar" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-glass border border-glass rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" }),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-border/50 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilePenLine, { className: "h-5 w-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold tracking-widest uppercase text-muted-foreground", children: "Información Básica" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-x-8 gap-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-white", children: [
                  "Título de la sesión ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("title"), placeholder: "Ej. Inspección de Puente Peatonal Av. Arequipa", className: "bg-input/50 border-border focus:border-primary focus:ring-1 focus:ring-primary h-12 rounded-xl transition-all" }),
                errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.title.message })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white", children: "Ubicación del proyecto" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("location"), disabled: true, placeholder: "Se definirá en el mapa (Paso 2)", className: "bg-input/30 border-border/50 text-muted-foreground h-12 rounded-xl" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white", children: "Descripción (opcional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { ...register("description"), placeholder: "Agrega información relevante sobre el proyecto, alcance o comentarios importantes...", className: "bg-input/50 border-border focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] rounded-xl resize-none transition-all" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white", children: "Fecha programada (opcional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "datetime-local", ...register("scheduledFor"), className: "bg-input/50 border-border focus:border-primary focus:ring-1 focus:ring-primary h-12 rounded-xl transition-all [color-scheme:dark]" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 p-4 rounded-xl border glow-border bg-[#00d5ff]/5 flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-[#00d5ff] shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#00d5ff]", children: "Consejo IA: " }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Una buena descripción ayuda al equipo a entender el contexto del proyecto y mejora la precisión del análisis posterior cuando el motor genere los reportes PDF." })
              ] })
            ] })
          ] }),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-right-8 duration-500 space-y-6 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-border/50 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold tracking-widest uppercase text-muted-foreground", children: "Infraestructura y Mapa" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 p-4 rounded-xl bg-[#0B1120] border border-white/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${infraMode === "existing" ? "border-primary bg-transparent" : "border-muted-foreground"}`, children: infraMode === "existing" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 bg-primary rounded-full" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", value: "existing", ...register("infraMode"), className: "sr-only" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Seleccionar estructura existente" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${infraMode === "new" ? "border-primary bg-transparent" : "border-muted-foreground"}`, children: infraMode === "new" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 bg-primary rounded-full" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", value: "new", ...register("infraMode"), className: "sr-only" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Matricular nueva estructura" })
              ] })
            ] }),
            infraMode === "existing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 max-w-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white", children: "Estructura matriculada" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: (v) => setValue("infraId", v, {
                shouldValidate: true
              }), value: watch("infraId"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-input/50 border-border focus:border-primary focus:ring-1 h-12 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Seleccionar de la base de datos" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: infraList.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: i.id, children: [
                  i.name,
                  " — ",
                  i.asset_code
                ] }, i.id)) })
              ] })
            ] }),
            infraMode === "new" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white", children: "Nombre de la estructura" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("infraName"), placeholder: "Ej. Puente Villena", className: "bg-input/50 h-11 rounded-xl" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white", children: "Identificador Urbano (Código)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...register("assetCode"), placeholder: "Generado automáticamente", disabled: true, className: "bg-input/30 text-muted-foreground h-11 rounded-xl font-mono uppercase border-border/50" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white", children: "Tipo de infraestructura" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: (v) => setValue("infraType", v, {
                    shouldValidate: true
                  }), value: watch("infraType"), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-input/50 h-11 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Seleccionar tipo" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Bridge", children: "Puente / Viaducto" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Building", children: "Edificio / Fachada" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Road", children: "Vía pública / Autopista" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "House", children: "Casa / Residencial" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Other", children: "Otros" })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-white flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
                  " Fijar coordenadas"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-white/10 rounded-xl overflow-hidden flex-1 min-h-[200px] relative z-0", children: isClient ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full bg-black/50 text-white", children: "Cargando mapa..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPicker, { lat, lng, setPosition: (newLat, newLng) => {
                  setValue("lat", newLat);
                  setValue("lng", newLng);
                  setValue("location", `${newLat.toFixed(4)}, ${newLng.toFixed(4)}`);
                } }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full bg-black/50 text-white", children: "Inicializando..." }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
                    "Lat: ",
                    lat.toFixed(6)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
                    "Lng: ",
                    lng.toFixed(6)
                  ] })
                ] })
              ] })
            ] })
          ] }),
          step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in zoom-in-95 duration-500 space-y-8 relative z-10 text-center py-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-4 glow-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanFace, { className: "w-10 h-10" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Todo listo para iniciar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground max-w-md mx-auto", children: [
                'La sesión "',
                watch("title"),
                '" y la infraestructura están configuradas. Al continuar, se creará el entorno de análisis para que subas tus evidencias.'
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-10 pt-6 border-t border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: () => step > 1 ? setStep(step - 1) : navigate({
              to: "/sessions"
            }), className: "text-white hover:bg-white/5 rounded-xl px-6", children: step > 1 ? "Anterior" : "Cancelar" }),
            step < 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: handleNextStep, className: "bg-gradient-premium hover:opacity-90 text-white border-0 shadow-lg rounded-xl px-8 py-6 text-base font-semibold transition-all hover:scale-[1.02]", children: [
              "Continuar ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isSubmitting || createSession.isPending, className: "bg-gradient-premium hover:opacity-90 text-white border-0 shadow-lg glow-primary rounded-xl px-8 py-6 text-base font-semibold transition-all hover:scale-[1.02]", children: isSubmitting || createSession.isPending ? "Creando entorno..." : "Confirmar e Iniciar" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2", children: [
            "¿Qué incluye esta sesión? ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/30 border border-white/5 rounded-2xl p-5 hover:bg-black/50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-8 w-8 text-[#00d5ff] mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-semibold mb-1", children: "Análisis estructural" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Revisión de elementos y comportamientos" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/30 border border-white/5 rounded-2xl p-5 hover:bg-black/50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScanFace, { className: "h-8 w-8 text-[#a855f7] mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-semibold mb-1", children: "Detección con IA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Identificación automática de hallazgos" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/30 border border-white/5 rounded-2xl p-5 hover:bg-black/50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FilePenLine, { className: "h-8 w-8 text-[#3b82f6] mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-semibold mb-1", children: "Reportes inteligentes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Informes técnicos autogenerados" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/30 border border-white/5 rounded-2xl p-5 hover:bg-black/50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 text-[#f97316] mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-semibold mb-1", children: "Colaboración" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Comentarios y seguimiento en tiempo real" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  NewSession as component
};
