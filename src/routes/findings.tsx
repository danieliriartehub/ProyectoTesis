import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { SeverityBadge, FindingStatusBadge } from "@/components/badges";
import type { Severity, FindingStatus } from "@/types";
import { useFindings, useSessions } from "@/lib/queries";

export const Route = createFileRoute("/findings")({
  head: () => ({ meta: [{ title: "Hallazgos — InfraInspect AI" }] }),
  component: FindingsPage,
});

function FindingsPage() {
  const [q, setQ] = useState("");
  const [sev, setSev] = useState<Severity | "all">("all");
  const [status, setStatus] = useState<FindingStatus | "all">("all");

  const { data: findings = [], isLoading: loadingFindings } = useFindings();
  const { data: sessionsData } = useSessions({ limit: 200 });
  const sessions = sessionsData?.items ?? [];

  const filtered = findings.filter((f) => {
    const matchQ = !q || f.category.toLowerCase().includes(q.toLowerCase()) || f.description.toLowerCase().includes(q.toLowerCase());
    const matchSev = sev === "all" || f.severity === sev;
    const matchSt = status === "all" || f.status === status;
    return matchQ && matchSev && matchSt;
  });

  const sessionMap = Object.fromEntries(sessions.map((s) => [s.id, s]));

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Registro consolidado
        </p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Hallazgos</h1>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar categoría o descripción…" className="pl-8 h-9 font-mono text-xs" />
          </div>
          <Select value={sev} onValueChange={(v) => setSev(v as Severity | "all")}>
            <SelectTrigger className="w-40 h-9 font-mono text-xs"><SelectValue placeholder="Severidad" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="critical">Crítico</SelectItem>
              <SelectItem value="high">Alto</SelectItem>
              <SelectItem value="medium">Medio</SelectItem>
              <SelectItem value="low">Bajo</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(v) => setStatus(v as FindingStatus | "all")}>
            <SelectTrigger className="w-40 h-9 font-mono text-xs"><SelectValue placeholder="Estado" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="validated">Validado</SelectItem>
              <SelectItem value="rejected">Rechazado</SelectItem>
              <SelectItem value="needs_review">Revisar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Severidad</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Categoría</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Sesión</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Estado</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest text-right">Confianza</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Detectado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingFindings && (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Cargando hallazgos…</TableCell></TableRow>
            )}
            {!loadingFindings && filtered.map((f) => {
              const s = sessionMap[f.sessionId];
              return (
                <TableRow key={f.id}>
                  <TableCell><SeverityBadge severity={f.severity} /></TableCell>
                  <TableCell>
                    <div className="font-semibold">{f.category}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{f.description}</div>
                  </TableCell>
                  <TableCell>
                    {s && (
                      <Link to="/sessions/$sessionId" params={{ sessionId: s.id }} className="text-primary hover:underline">
                        <div className="font-mono text-xs">{s.code}</div>
                        <div className="text-xs text-muted-foreground">{s.title}</div>
                      </Link>
                    )}
                  </TableCell>
                  <TableCell><FindingStatusBadge status={f.status} /></TableCell>
                  <TableCell className="text-right font-mono">{Math.round(f.confidence * 100)}%</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{new Date(f.detectedAt).toLocaleDateString("es-PE")}</TableCell>
                </TableRow>
              );
            })}
            {!loadingFindings && filtered.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Sin hallazgos</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
