import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit, FileSignature, Save } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Configuración — InfraInspect AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [model, setModel] = useState("yolo26n");
  const [threshold, setThreshold] = useState(0.65);
  const [autoReport, setAutoReport] = useState(true);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("infrainspect_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.model) setModel(parsed.model);
        if (parsed.threshold) setThreshold(parsed.threshold);
        if (parsed.autoReport !== undefined) setAutoReport(parsed.autoReport);
      } catch (e) {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("infrainspect_settings", JSON.stringify({
      model, threshold, autoReport
    }));
    toast.success("Configuración de IA actualizada");
  };

  return (
    <div className="p-6 max-w-3xl space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Plataforma</p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Configuración del Sistema</h1>
        <p className="text-muted-foreground mt-2">Ajusta los parámetros del motor de inferencia YOLO y automatización de reportes.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Motor YOLO (Ultralytics)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Modelo de IA por defecto</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Seleccionar modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yolo26n">YOLO26N (Ligero / Óptimo por defecto)</SelectItem>
                <SelectItem value="yolo26x">YOLO26X (Pesado / Máxima Precisión)</SelectItem>
              </SelectContent>
            </Select>
            <CardDescription>
              Puedes intercalar entre YOLO26N para un procesamiento rápido (ideal para hardware de nube estándar) y YOLO26X para inspecciones donde necesites máxima precisión en los detalles, asumiendo un hardware más potente.
            </CardDescription>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <Label>Umbral de Confianza (Threshold)</Label>
                <CardDescription>Filtra falsos positivos por debajo del umbral.</CardDescription>
              </div>
              <span className="font-mono font-bold">{Math.round(threshold * 100)}%</span>
            </div>
            <Slider 
              value={[threshold]} 
              min={0.1} 
              max={0.95} 
              step={0.05} 
              onValueChange={(v) => setThreshold(v[0])} 
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileSignature className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Automatización</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
           <div className="flex items-center justify-between border-b border-border pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
              <div>
                <Label className="text-base">Generación automática de PDF</Label>
                <CardDescription>Generar el reporte oficial en PDF automáticamente cuando todas las evidencias de la sesión terminen su análisis.</CardDescription>
              </div>
              <Switch checked={autoReport} onCheckedChange={setAutoReport} />
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" /> Guardar parámetros
        </Button>
      </div>
    </div>
  );
}