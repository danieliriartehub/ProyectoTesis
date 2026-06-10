import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MapPin, Sparkles, Building2, ScanFace, FileSignature, Users, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateSession, useCreateInfrastructure, useInfrastructure, useMe } from "@/lib/queries";
import React, { useState, useEffect, Suspense } from "react";

const MapPicker = React.lazy(() => import("@/components/MapPicker"));

export const Route = createFileRoute("/sessions/new")({
  head: () => ({ meta: [{ title: "Nueva sesión — InfraInspect AI" }] }),
  component: NewSession,
});

const schema = z.object({
  title: z.string().min(4, "Mínimo 4 caracteres").max(120),
  location: z.string().max(120).optional(),
  description: z.string().max(500).optional(),
  scheduledFor: z.string().optional(),
  
  infraMode: z.enum(["existing", "new"]),
  infraId: z.string().optional(),
  infraName: z.string().max(80).optional(),
  infraType: z.string().optional(),
  assetCode: z.string().max(40).optional(),
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
});

type FormValues = z.infer<typeof schema>;

function NewSession() {
  const navigate = useNavigate();
  const { data: me } = useMe();
  const { data: infraList = [] } = useInfrastructure();
  const createSession = useCreateSession();
  const createInfra = useCreateInfrastructure();

  const [step, setStep] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { infraMode: "existing", lat: -12.0464, lng: -77.0428 },
    });

  const infraMode = watch("infraMode");
  const infraType = watch("infraType");
  const infraName = watch("infraName");
  const lat = watch("lat") || -12.0464;
  const lng = watch("lng") || -77.0428;

  useEffect(() => {
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

  const onSubmit = async (data: FormValues) => {
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
          type: data.infraType as any,
          location: data.location || "Ubicación seleccionada",
          asset_code: data.assetCode,
          operator: "InfraInspect User",
          coordinates: { lat: data.lat ?? 0, lng: data.lng ?? 0 },
        });
        infrastructure_id = infra.id;
      }

      if (!infrastructure_id) {
        toast.error("Debe seleccionar o crear una infraestructura");
        return;
      }

      await createSession.mutateAsync({
        title: data.title,
        infrastructure_id: infrastructure_id,
        lead_inspector_id: me?.id ?? "",
        scheduled_for: data.scheduledFor || undefined,
        notes: data.description || undefined,
      });

      toast.success(`Sesión "${data.title}" creada con éxito`);
      navigate({ to: "/sessions" });
    } catch (err: any) {
      toast.error(err?.message ?? "Error al crear la sesión");
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Premium Background Header */}
      <div 
        className="absolute top-0 right-0 w-full md:w-[60%] h-[400px] opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1545042746-88d40d998ec7?auto=format&fit=crop&q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="absolute top-0 right-0 w-full h-[400px] bg-gradient-to-b from-transparent to-background pointer-events-none z-0" />

      <div className="relative z-10 p-6 md:p-10 max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-6 text-primary hover:text-primary hover:bg-primary/10 transition-colors">
            <Link to="/sessions"><ArrowLeft className="h-4 w-4 mr-2" /> VOLVER A SESIONES</Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Nueva sesión de análisis
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Define los detalles clave para iniciar una revisión estructural inteligente.
          </p>
        </div>

        {/* Horizontal Stepper */}
        <div className="flex items-center gap-4 text-sm font-medium py-4 overflow-x-auto">
          <div className={`flex items-center gap-3 shrink-0 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${step >= 1 ? 'border-primary bg-primary/20 glow-primary' : 'border-muted-foreground'}`}>1</span>
            <span>Detalles generales</span>
          </div>
          <div className="h-[1px] w-12 bg-border shrink-0" />
          <div className={`flex items-center gap-3 shrink-0 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${step >= 2 ? 'border-primary bg-primary/20 glow-primary' : 'border-muted-foreground'}`}>2</span>
            <span>Infraestructura y Mapa</span>
          </div>
          <div className="h-[1px] w-12 bg-border shrink-0" />
          <div className={`flex items-center gap-3 shrink-0 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${step >= 3 ? 'border-primary bg-primary/20 glow-primary' : 'border-muted-foreground'}`}>3</span>
            <span>Confirmar</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Main Form Card */}
          <div className="bg-glass border border-glass rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Subtle glow behind the card content */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 relative z-10">
                <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                  <div className="p-2 bg-primary/10 rounded-lg"><FileSignature className="h-5 w-5 text-primary" /></div>
                  <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Información Básica</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <Label className="text-white">Título de la sesión <span className="text-destructive">*</span></Label>
                    <Input 
                      {...register("title")} 
                      placeholder="Ej. Inspección de Puente Peatonal Av. Arequipa" 
                      className="bg-input/50 border-border focus:border-primary focus:ring-1 focus:ring-primary h-12 rounded-xl transition-all"
                    />
                    {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Ubicación del proyecto</Label>
                    <Input 
                      {...register("location")} 
                      disabled
                      placeholder="Se definirá en el mapa (Paso 2)" 
                      className="bg-input/30 border-border/50 text-muted-foreground h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Descripción (opcional)</Label>
                    <Textarea 
                      {...register("description")} 
                      placeholder="Agrega información relevante sobre el proyecto, alcance o comentarios importantes..." 
                      className="bg-input/50 border-border focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] rounded-xl resize-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Fecha programada (opcional)</Label>
                    <Input 
                      type="datetime-local" 
                      {...register("scheduledFor")} 
                      className="bg-input/50 border-border focus:border-primary focus:ring-1 focus:ring-primary h-12 rounded-xl transition-all [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* AI Tip Box */}
                <div className="mt-8 p-4 rounded-xl border glow-border bg-[#00d5ff]/5 flex items-start gap-4">
                  <Sparkles className="h-6 w-6 text-[#00d5ff] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#00d5ff]">Consejo IA: </span>
                    <span className="text-muted-foreground text-sm">Una buena descripción ayuda al equipo a entender el contexto del proyecto y mejora la precisión del análisis posterior cuando el motor genere los reportes PDF.</span>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6 relative z-10">
                <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                  <div className="p-2 bg-primary/10 rounded-lg"><Building2 className="h-5 w-5 text-primary" /></div>
                  <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Infraestructura y Mapa</h2>
                </div>

                <div className="flex gap-6 p-4 rounded-xl bg-[#0B1120] border border-white/5">
                  <label className="flex items-center gap-3 cursor-pointer text-white">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${infraMode === "existing" ? "border-primary bg-transparent" : "border-muted-foreground"}`}>
                       {infraMode === "existing" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                    </div>
                    <input type="radio" value="existing" {...register("infraMode")} className="sr-only" /> 
                    <span className="text-sm font-medium">Seleccionar estructura existente</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-white">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${infraMode === "new" ? "border-primary bg-transparent" : "border-muted-foreground"}`}>
                       {infraMode === "new" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                    </div>
                    <input type="radio" value="new" {...register("infraMode")} className="sr-only" /> 
                    <span className="text-sm font-medium">Matricular nueva estructura</span>
                  </label>
                </div>

                {infraMode === "existing" && (
                  <div className="space-y-2 max-w-xl">
                    <Label className="text-white">Estructura matriculada</Label>
                    <Select onValueChange={(v) => setValue("infraId", v, { shouldValidate: true })} value={watch("infraId")}>
                      <SelectTrigger className="bg-input/50 border-border focus:border-primary focus:ring-1 h-12 rounded-xl"><SelectValue placeholder="Seleccionar de la base de datos" /></SelectTrigger>
                      <SelectContent>
                        {infraList.map((i) => (
                          <SelectItem key={i.id} value={i.id}>
                            {i.name} — {i.asset_code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {infraMode === "new" && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label className="text-white">Nombre de la estructura</Label>
                        <Input {...register("infraName")} placeholder="Ej. Puente Villena" className="bg-input/50 h-11 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Identificador Urbano (Código)</Label>
                        <Input {...register("assetCode")} placeholder="PU-VIL-001" className="bg-input/50 h-11 rounded-xl font-mono uppercase" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Tipo de infraestructura</Label>
                        <Select onValueChange={(v) => setValue("infraType", v, { shouldValidate: true })} value={watch("infraType")}>
                          <SelectTrigger className="bg-input/50 h-11 rounded-xl"><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bridge">Puente / Viaducto</SelectItem>
                            <SelectItem value="Building">Edificio / Fachada</SelectItem>
                            <SelectItem value="Road">Vía pública / Autopista</SelectItem>
                            <SelectItem value="House">Casa / Residencial</SelectItem>
                            <SelectItem value="Other">Otros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label className="text-white flex items-center gap-2"><MapPin className="h-4 w-4" /> Fijar coordenadas</Label>
                      <div className="border border-white/10 rounded-xl overflow-hidden flex-1 min-h-[200px] relative z-0">
                        {isClient ? (
                          <Suspense fallback={<div className="flex items-center justify-center h-full bg-black/50 text-white">Cargando mapa...</div>}>
                            <MapPicker 
                              lat={lat} 
                              lng={lng} 
                              setPosition={(newLat, newLng) => {
                                setValue("lat", newLat);
                                setValue("lng", newLng);
                                setValue("location", `${newLat.toFixed(4)}, ${newLng.toFixed(4)}`);
                              }} 
                            />
                          </Suspense>
                        ) : (
                          <div className="flex items-center justify-center h-full bg-black/50 text-white">Inicializando...</div>
                        )}
                      </div>
                      <div className="flex gap-4 mt-2">
                         <span className="text-xs text-muted-foreground font-mono">Lat: {lat.toFixed(6)}</span>
                         <span className="text-xs text-muted-foreground font-mono">Lng: {lng.toFixed(6)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8 relative z-10 text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-4 glow-primary">
                  <ScanFace className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Todo listo para iniciar</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    La sesión "{watch('title')}" y la infraestructura están configuradas. Al continuar, se creará el entorno de análisis para que subas tus evidencias.
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/50">
              <Button type="button" variant="ghost" onClick={() => step > 1 ? setStep(step - 1) : navigate({ to: "/sessions" })} className="text-white hover:bg-white/5 rounded-xl px-6">
                {step > 1 ? "Anterior" : "Cancelar"}
              </Button>
              
              {step < 3 ? (
                <Button type="button" onClick={handleNextStep} className="bg-gradient-premium hover:opacity-90 text-white border-0 shadow-lg rounded-xl px-8 py-6 text-base font-semibold transition-all hover:scale-[1.02]">
                  Continuar <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting || createSession.isPending} className="bg-gradient-premium hover:opacity-90 text-white border-0 shadow-lg glow-primary rounded-xl px-8 py-6 text-base font-semibold transition-all hover:scale-[1.02]">
                  {(isSubmitting || createSession.isPending) ? "Creando entorno..." : "Confirmar e Iniciar"}
                </Button>
              )}
            </div>
          </div>

          {/* Bottom Features Cards */}
          <div className="mt-12 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              ¿Qué incluye esta sesión? <ArrowRight className="h-3 w-3" />
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/30 border border-white/5 rounded-2xl p-5 hover:bg-black/50 transition-colors">
                <Building2 className="h-8 w-8 text-[#00d5ff] mb-4" />
                <h4 className="text-white font-semibold mb-1">Análisis estructural</h4>
                <p className="text-xs text-muted-foreground">Revisión de elementos y comportamientos</p>
              </div>
              <div className="bg-black/30 border border-white/5 rounded-2xl p-5 hover:bg-black/50 transition-colors">
                <ScanFace className="h-8 w-8 text-[#a855f7] mb-4" />
                <h4 className="text-white font-semibold mb-1">Detección con IA</h4>
                <p className="text-xs text-muted-foreground">Identificación automática de hallazgos</p>
              </div>
              <div className="bg-black/30 border border-white/5 rounded-2xl p-5 hover:bg-black/50 transition-colors">
                <FileSignature className="h-8 w-8 text-[#3b82f6] mb-4" />
                <h4 className="text-white font-semibold mb-1">Reportes inteligentes</h4>
                <p className="text-xs text-muted-foreground">Informes técnicos autogenerados</p>
              </div>
              <div className="bg-black/30 border border-white/5 rounded-2xl p-5 hover:bg-black/50 transition-colors">
                <Users className="h-8 w-8 text-[#f97316] mb-4" />
                <h4 className="text-white font-semibold mb-1">Colaboración</h4>
                <p className="text-xs text-muted-foreground">Comentarios y seguimiento en tiempo real</p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
