import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateSession, useCreateInfrastructure, useInfrastructure, useMe } from "@/lib/queries";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons not showing in Vite
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export const Route = createFileRoute("/sessions/new")({
  head: () => ({ meta: [{ title: "Nueva sesión — InfraInspect AI" }] }),
  component: NewSession,
});

const schema = z.object({
  title: z.string().min(4, "Mínimo 4 caracteres").max(120),
  infraMode: z.enum(["existing", "new"]),
  infraId: z.string().optional(),
  infraName: z.string().max(80).optional(),
  infraType: z.string().optional(),
  assetCode: z.string().max(40).optional(), // mapped to "Identificador Urbano"
  location: z.string().max(120).optional(),
  operator: z.string().max(80).optional(),
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
  scheduledFor: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function LocationPicker({ lat, lng, setPosition }: { lat: number, lng: number, setPosition: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng.lat, e.latlng.lng);
    },
  });
  return <Marker position={[lat, lng]} />;
}

function NewSession() {
  const navigate = useNavigate();
  const { data: me } = useMe();
  const { data: infraList = [] } = useInfrastructure();
  const createSession = useCreateSession();
  const createInfra = useCreateInfrastructure();

  const [step, setStep] = useState(1);

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { infraMode: "existing", lat: -12.0464, lng: -77.0428 }, // Default to Lima, Peru
    });

  const infraMode = watch("infraMode");
  const lat = watch("lat") || -12.0464;
  const lng = watch("lng") || -77.0428;

  const handleNextStep = async () => {
    // Validate Step 1
    const valid = await trigger(["title", "scheduledFor"]);
    if (valid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: FormValues) => {
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
          location: data.location || "Ubicación seleccionada en mapa",
          asset_code: data.assetCode,
          operator: data.operator,
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
      });

      toast.success(`Sesión "${data.title}" creada con éxito`);
      navigate({ to: "/sessions" });
    } catch (err: any) {
      toast.error(err?.message ?? "Error al crear la sesión");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/sessions"><ArrowLeft className="h-3.5 w-3.5" /> Volver a sesiones</Link>
      </Button>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Paso {step} de 2 · {step === 1 ? "Información de Sesión" : "Ubicación e Infraestructura"}
        </p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">
          {step === 1 ? "Nueva sesión de análisis" : "Seleccionar infraestructura"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {step === 1 
            ? "Define los detalles básicos para agendar tu nueva sesión." 
            : "Selecciona una estructura urbana existente o matricula una nueva desde el mapa dinámico."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        
        {step === 1 && (
          <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Detalles Generales</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <Label>Título de la sesión</Label>
                <Input {...register("title")} placeholder="Ej. Inspección de Puente Peatonal Av. Arequipa" />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <Label>Programada para (Opcional)</Label>
                <Input type="datetime-local" {...register("scheduledFor")} />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
            <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Ubicación y Matrícula</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-6 p-4 rounded-lg bg-muted/50 border">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="radio" value="existing" {...register("infraMode")} className="accent-primary" /> 
                  Seleccionar existente
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input type="radio" value="new" {...register("infraMode")} className="accent-primary" /> 
                  Matricular nueva
                </label>
              </div>

              {infraMode === "existing" && (
                <div className="space-y-1.5">
                  <Label>Identificador Urbano / Estructura</Label>
                  <Select onValueChange={(v) => setValue("infraId", v, { shouldValidate: true })} value={watch("infraId")}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Seleccionar infraestructura existente" /></SelectTrigger>
                    <SelectContent>
                      {infraList.map((i) => (
                        <SelectItem key={i.id} value={i.id}>
                          {i.name} — {i.type} ({i.location})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {infraMode === "new" && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label>Nombre de la estructura</Label>
                      <Input {...register("infraName")} placeholder="Ej. Puente Villena" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Tipo de infraestructura urbana</Label>
                      <Select onValueChange={(v) => setValue("infraType", v, { shouldValidate: true })} value={watch("infraType")}>
                        <SelectTrigger><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bridge">Puente / Viaducto</SelectItem>
                          <SelectItem value="Building">Edificio / Fachada</SelectItem>
                          <SelectItem value="Road">Vía pública / Autopista</SelectItem>
                          <SelectItem value="Tunnel">Túnel</SelectItem>
                          <SelectItem value="Monument">Monumento</SelectItem>
                          <SelectItem value="Other">Otro (Urbano)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Identificador Urbano (Código)</Label>
                      <Input {...register("assetCode")} placeholder="PU-VIL-001" className="font-mono uppercase" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Distrito / Ubicación (Texto)</Label>
                      <Input {...register("location")} placeholder="Miraflores, Lima" />
                    </div>
                  </div>

                  {/* Mapa Dinámico */}
                  <div className="space-y-1.5 flex flex-col h-full">
                    <Label className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Seleccionar en el mapa</Label>
                    <p className="text-xs text-muted-foreground mb-2">Haz clic en el mapa para registrar las coordenadas exactas de la estructura.</p>
                    <div className="border rounded-md overflow-hidden flex-1 min-h-[300px] z-0 relative">
                       <MapContainer center={[lat, lng]} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                          />
                          <LocationPicker 
                            lat={lat} 
                            lng={lng} 
                            setPosition={(newLat, newLng) => {
                              setValue("lat", newLat);
                              setValue("lng", newLng);
                            }} 
                          />
                        </MapContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Latitud</Label>
                        <Input type="number" step="0.000001" {...register("lat")} className="font-mono text-xs h-8" readOnly />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Longitud</Label>
                        <Input type="number" step="0.000001" {...register("lng")} className="font-mono text-xs h-8" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between items-center pt-4">
          <Button type="button" variant="ghost" asChild>
            <Link to="/sessions">Cancelar</Link>
          </Button>
          <div className="flex gap-2">
            {step === 2 && (
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Atrás
              </Button>
            )}
            
            {step === 1 ? (
              <Button type="button" onClick={handleNextStep}>
                Continuar a infraestructura
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting || createSession.isPending}>
                {(isSubmitting || createSession.isPending) ? "Registrando…" : "Crear sesión e iniciar"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
