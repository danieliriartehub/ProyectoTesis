import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  assetCode: z.string().max(40).optional(),
  location: z.string().max(120).optional(),
  operator: z.string().max(80).optional(),
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
  scheduledFor: z.string().optional(),
  notes: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

function NewSession() {
  const navigate = useNavigate();
  const { data: me } = useMe();
  const { data: infraList = [] } = useInfrastructure();
  const createSession = useCreateSession();
  const createInfra = useCreateInfrastructure();

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { infraMode: "existing", lat: 0, lng: 0 },
    });

  const infraMode = watch("infraMode");

  const onSubmit = async (data: FormValues) => {
    try {
      let infrastructure_id = data.infraId;

      if (data.infraMode === "new") {
        const infra = await createInfra.mutateAsync({
          name: data.infraName!,
          type: data.infraType as any,
          location: data.location!,
          asset_code: data.assetCode!,
          operator: data.operator,
          coordinates: { lat: data.lat ?? 0, lng: data.lng ?? 0 },
        });
        infrastructure_id = infra.id;
      }

      await createSession.mutateAsync({
        title: data.title,
        infrastructure_id: infrastructure_id!,
        lead_inspector_id: me?.id ?? "",
        scheduled_for: data.scheduledFor || undefined,
        notes: data.notes || undefined,
      });

      toast.success(`Sesión "${data.title}" creada`);
      navigate({ to: "/sessions" });
    } catch (err: any) {
      toast.error(err?.message ?? "Error al crear la sesión");
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/sessions"><ArrowLeft className="h-3.5 w-3.5" /> Volver a sesiones</Link>
      </Button>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Paso 1 · información general
        </p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Nueva sesión de inspección</h1>
        <p className="text-muted-foreground mt-2">
          Registra la infraestructura objetivo y el equipo responsable. Podrás cargar evidencias después.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Card>
          <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Sesión</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <Label>Título de la sesión</Label>
              <Input {...register("title")} placeholder="Ej. Línea de Alta Tensión — Tramo Norte" />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Programada para</Label>
              <Input type="datetime-local" {...register("scheduledFor")} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Infraestructura</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="existing" {...register("infraMode")} /> Seleccionar existente
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="new" {...register("infraMode")} /> Registrar nueva
              </label>
            </div>

            {infraMode === "existing" && (
              <div className="space-y-1.5">
                <Label>Activo</Label>
                <Select onValueChange={(v) => setValue("infraId", v, { shouldValidate: true })} value={watch("infraId")}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar infraestructura" /></SelectTrigger>
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
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Nombre del activo</Label>
                  <Input {...register("infraName")} placeholder="LAT-500kV Andes Norte" />
                </div>
                <div className="space-y-1.5">
                  <Label>Tipo de infraestructura</Label>
                  <Select onValueChange={(v) => setValue("infraType", v, { shouldValidate: true })} value={watch("infraType")}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Power Line">Línea de transmisión</SelectItem>
                      <SelectItem value="Wind Turbine">Aerogenerador</SelectItem>
                      <SelectItem value="Solar Farm">Granja solar</SelectItem>
                      <SelectItem value="Bridge">Puente</SelectItem>
                      <SelectItem value="Pipeline">Ducto</SelectItem>
                      <SelectItem value="Telecom Tower">Torre telecom</SelectItem>
                      <SelectItem value="Dam">Represa</SelectItem>
                      <SelectItem value="Building">Edificio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Código de activo</Label>
                  <Input {...register("assetCode")} placeholder="LAT-N-500" className="font-mono" />
                </div>
                <div className="space-y-1.5">
                  <Label>Operador</Label>
                  <Input {...register("operator")} placeholder="Red Eléctrica Andina" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label>Ubicación</Label>
                  <Input {...register("location")} placeholder="Cajamarca, Perú" />
                </div>
                <div className="space-y-1.5">
                  <Label>Latitud</Label>
                  <Input type="number" step="0.0001" {...register("lat")} className="font-mono" />
                </div>
                <div className="space-y-1.5">
                  <Label>Longitud</Label>
                  <Input type="number" step="0.0001" {...register("lng")} className="font-mono" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Notas iniciales</CardTitle></CardHeader>
          <CardContent>
            <Textarea rows={4} {...register("notes")} placeholder="Contexto, condiciones esperadas, objetivos de la inspección…" />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" asChild>
            <Link to="/sessions">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting || createSession.isPending}>
            {(isSubmitting || createSession.isPending) ? "Creando…" : "Crear sesión"}
          </Button>
        </div>
      </form>
    </div>
  );
}
