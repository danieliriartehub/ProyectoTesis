import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { reports, sessions } from "@/lib/mocks";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reportes — InfraInspect AI" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const sessionMap = Object.fromEntries(sessions.map((s) => [s.id, s]));
  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Documentación técnica</p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Reportes</h1>
      </div>
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
                  <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> PDF</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}