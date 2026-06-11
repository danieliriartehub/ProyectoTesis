import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSessions } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { sessionsApi } from "@/lib/api/sessions";
import type { Report } from "@/types";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reportes — InfraInspect AI" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const { data: sessionsData } = useSessions({ limit: 200 });
  const completedSessions = (sessionsData?.items ?? []).filter(
    (s) => s.status === "Completed" || s.status === "Review",
  );

  // Fetch reports for completed sessions in parallel
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["all-reports", completedSessions.map((s) => s.id)],
    queryFn: async () => {
      const results = await Promise.allSettled(
        completedSessions.map((s) => sessionsApi.report(s.id)),
      );
      return results
        .filter((r): r is PromiseFulfilledResult<Report> => r.status === "fulfilled")
        .map((r) => r.value);
    },
    enabled: completedSessions.length > 0,
  });

  const sessionMap = Object.fromEntries((sessionsData?.items ?? []).map((s) => [s.id, s]));

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Documentación técnica</p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Reportes</h1>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground">Cargando reportes…</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => {
          const s = sessionMap[r.sessionId];
          return (
            <Card key={r.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{r.code}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider bg-muted px-1.5 py-0.5 rounded">{r.status}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold leading-tight">{r.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{r.pages} págs · {r.format.toUpperCase()}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{r.summary}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  {s && (
                    <Link to="/sessions/$sessionId" params={{ sessionId: s.id }} className="text-xs text-primary hover:underline font-mono">
                      {s.code}
                    </Link>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (s) {
                        window.open(`/reports/print/${s.id}`, "_blank");
                      }
                    }}
                  >
                    <Download className="h-3.5 w-3.5" /> PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {!isLoading && reports.length === 0 && (
          <p className="text-sm text-muted-foreground col-span-3 text-center py-12">
            No hay reportes generados aún
          </p>
        )}
      </div>
    </div>
  );
}
