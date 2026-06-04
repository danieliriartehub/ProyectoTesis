import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Configuración — InfraInspect AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="p-6 max-w-3xl space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Plataforma</p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Configuración</h1>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Modelos IA</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Endpoint FastAPI</Label>
            <Input defaultValue="https://api.infrainspect.ai/v1" className="font-mono text-xs" />
          </div>
          <div className="space-y-1.5">
            <Label>Modelo por defecto</Label>
            <Input defaultValue="YOLOv8-Infra-v3" className="font-mono text-xs" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Confianza mínima</Label>
              <p className="text-xs text-muted-foreground">Filtra hallazgos por debajo del umbral.</p>
            </div>
            <Input type="number" defaultValue="0.7" step="0.05" className="w-24 font-mono text-xs" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Notificaciones</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { id: "n1", label: "Hallazgo crítico detectado", desc: "Email + push" },
            { id: "n2", label: "Job IA fallido", desc: "Push" },
            { id: "n3", label: "Reporte firmado", desc: "Email" },
          ].map((n) => (
            <div key={n.id} className="flex items-center justify-between border-b border-border last:border-0 pb-3 last:pb-0">
              <div>
                <Label>{n.label}</Label>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Guardar cambios</Button>
      </div>
    </div>
  );
}