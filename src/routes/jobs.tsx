import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { JobStatusBadge } from "@/components/badges";
import { useSessions, useAllJobs } from "@/lib/queries";

export const Route = createFileRoute("/jobs")({
  head: () => ({ meta: [{ title: "Procesamiento IA — InfraInspect AI" }] }),
  component: JobsPage,
});

function JobsPage() {
  const { data: sessionsData } = useSessions({ limit: 200 });
  const sessions = sessionsData?.items ?? [];
  const sessionIds = sessions.map((s) => s.id);
  const { data: analysisJobs = [], isLoading } = useAllJobs(sessionIds);

  const sessionMap = Object.fromEntries(sessions.map((s) => [s.id, s]));

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Pipeline de inferencia · auto-refresh cada 5s
        </p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Procesamiento IA</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(["queued", "running", "succeeded", "failed"] as const).map((s) => {
          const n = analysisJobs.filter((j) => j.status === s).length;
          return (
            <Card key={s} className="p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s}</div>
              <div className="text-3xl font-bold font-mono mt-1">{n}</div>
            </Card>
          );
        })}
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Job</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Modelo IA</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Sesión</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Estado</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Progreso</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest text-right">Hallazgos</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Tiempo inferencia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">Cargando jobs…</TableCell></TableRow>
            )}
            {!isLoading && analysisJobs.map((j) => {
              const s = sessionMap[j.sessionId];
              return (
                <TableRow key={j.id}>
                  <TableCell className="font-mono text-xs">{j.id.slice(0, 8)}…</TableCell>
                  <TableCell className="font-mono text-xs">{j.model}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{s?.code ?? j.sessionId.slice(0, 8)}</TableCell>
                  <TableCell><JobStatusBadge status={j.status} /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Progress value={j.progress} className="h-1.5 flex-1" />
                      <span className="font-mono text-xs w-9 text-right">{j.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">{j.findingsProduced}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {j.inferenceTimeMs ? `${(j.inferenceTimeMs / 1000).toFixed(1)}s` : "—"}
                  </TableCell>
                </TableRow>
              );
            })}
            {!isLoading && analysisJobs.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">Sin jobs registrados</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
