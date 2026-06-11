import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Filter, MapPin, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SessionStatusBadge } from "@/components/badges";
import type { SessionStatus } from "@/types";
import { useSessions } from "@/lib/queries";

export const Route = createFileRoute("/sessions/")({
  head: () => ({ meta: [{ title: "Sesiones de Inspección — InfraInspect AI" }] }),
  component: SessionsList,
});

const statuses: (SessionStatus | "all")[] = ["all", "Draft", "Capturing", "Processing", "Review", "Completed"];

function SessionsList() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<SessionStatus | "all">("all");
  const [type, setType] = useState<string>("all");

  const { data, isLoading } = useSessions({ limit: 200 });
  const sessions = data?.items ?? [];

  const filtered = sessions.filter((s) => {
    const matchesQ =
      !q ||
      s.title.toLowerCase().includes(q.toLowerCase()) ||
      s.code.toLowerCase().includes(q.toLowerCase()) ||
      s.infrastructure.location.toLowerCase().includes(q.toLowerCase());
    const matchesStatus = status === "all" || s.status === status;
    const matchesType = type === "all" || s.infrastructure.type === type;
    return matchesQ && matchesStatus && matchesType;
  });


  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Histórico y operación
          </p>
          <h1 className="text-3xl font-bold tracking-tight mt-1">Sesiones de Inspección</h1>
        </div>
        <Button asChild>
          <Link to="/sessions/new">
            <Plus className="h-4 w-4" /> Nueva sesión
          </Link>
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por código, título o ubicación…"
              className="pl-8 h-9 font-mono text-xs"
            />
          </div>
          <Select value={status} onValueChange={(v) => setStatus(v as SessionStatus | "all")}>
            <SelectTrigger className="w-40 h-9 font-mono text-xs">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>{s === "all" ? "Todos los estados" : s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-48 h-9 font-mono text-xs">
              <SelectValue placeholder="Tipo de activo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los activos</SelectItem>
              <SelectItem value="Bridge">Puente / Viaducto</SelectItem>
              <SelectItem value="Building">Edificio / Fachada</SelectItem>
              <SelectItem value="Road">Vía pública / Autopista</SelectItem>
              <SelectItem value="House">Casa / Residencial</SelectItem>
              <SelectItem value="Other">Otros</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="ml-auto">
            <Filter className="h-3.5 w-3.5" /> Más filtros
          </Button>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Código</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Sesión</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Estado</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Progreso</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest text-right">Evidencias</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest text-right">Hallazgos</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Actualizado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  Cargando sesiones…
                </TableCell>
              </TableRow>
            )}
            {!isLoading && filtered.map((s) => (
              <TableRow key={s.id} className="cursor-pointer hover:bg-muted/30">
                <TableCell className="font-mono text-xs text-muted-foreground">
                  <Link to="/sessions/$sessionId" params={{ sessionId: s.id }} className="block">
                    {s.code}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to="/sessions/$sessionId" params={{ sessionId: s.id }} className="block">
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" /> {s.infrastructure.location} · {s.infrastructure.type}
                    </div>
                  </Link>
                </TableCell>
                <TableCell><SessionStatusBadge status={s.status} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <Progress value={s.progress} className="h-1.5 flex-1" />
                    <span className="font-mono text-xs w-9 text-right">{s.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">{s.evidenceCount}</TableCell>
                <TableCell className="text-right font-mono">
                  {s.findingsCount}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {new Date(s.updatedAt).toLocaleDateString("es-PE")}
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  Sin resultados con los filtros actuales
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6 bg-slate-900 text-slate-300 border-slate-800">
        <div className="flex items-center gap-2 mb-4 text-white">
          <Info className="h-5 w-5 text-blue-400" />
          <h3 className="font-semibold text-lg">Ciclo de vida de las sesiones</h3>
        </div>
        <div className="grid md:grid-cols-5 gap-6 text-sm">
          <div>
            <div className="mb-2"><SessionStatusBadge status="Draft" /></div>
            <p className="text-slate-400">Estado inicial. Así nacen todas las sesiones recién creadas.</p>
          </div>
          <div>
            <div className="mb-2"><SessionStatusBadge status="Capturing" /></div>
            <p className="text-slate-400">Se activa automáticamente al subir la primera evidencia (foto/video).</p>
          </div>
          <div>
            <div className="mb-2"><SessionStatusBadge status="Processing" /></div>
            <p className="text-slate-400">Se activa cuando envías las evidencias a analizar con los modelos de IA.</p>
          </div>
          <div>
            <div className="mb-2"><SessionStatusBadge status="Review" /></div>
            <p className="text-slate-400">Se activa al generar el reporte, indicando que los resultados de la IA están listos para revisión.</p>
          </div>
          <div>
            <div className="mb-2"><SessionStatusBadge status="Completed" /></div>
            <p className="text-slate-400">La inspección ha finalizado oficialmente al presionar el botón "Terminar Sesión".</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
