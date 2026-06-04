import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { analysisJobs, sessions } from "@/lib/mocks";
import { JobStatusBadge } from "@/components/badges";

export const Route = createFileRoute("/jobs")({
  head: () => ({ meta: [{ title: "Procesamiento IA — InfraInspect AI" }] }),
  component: JobsPage,
});

function JobsPage() {
  const sessionMap = Object.fromEntries(sessions.map((s) => [s.id, s]));
  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Pipeline de inferencia</p>
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
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Modelo</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Sesión</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Estado</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Progreso</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest text-right">Hallazgos</TableHead>
              <TableHead className="font-mono uppercase text-[10px] tracking-widest">Tiempo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analysisJobs.map((j) => {
              const s = sessionMap[j.sessionId];
              return (
                <TableRow key={j.id}>
                  <TableCell className="font-mono text-xs">{j.id}</TableCell>
                  <TableCell className="font-mono text-xs">{j.model}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{s?.code}</TableCell>
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
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}