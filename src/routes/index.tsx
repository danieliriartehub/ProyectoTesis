import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Radio,
  FileCheck,
  TrendingUp,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SessionStatusBadge, SeverityBadge } from "@/components/badges";
import { useSessions, useFindings, useAllJobs } from "@/lib/queries";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Dashboard — InfraInspect AI" },
      { name: "description", content: "Estado operativo de inspecciones, hallazgos y reportes." },
    ],
  }),
  component: Dashboard,
}) as ReturnType<typeof createFileRoute>);

const trendData = [
  { day: "Vie", findings: 12, critical: 1 },
  { day: "Sáb", findings: 18, critical: 2 },
  { day: "Dom", findings: 9, critical: 0 },
  { day: "Lun", findings: 24, critical: 3 },
  { day: "Mar", findings: 31, critical: 4 },
  { day: "Mié", findings: 28, critical: 2 },
  { day: "Jue", findings: 41, critical: 5 },
];

function Dashboard() {
  const { data: sessionsData } = useSessions({ limit: 100 });
  const { data: findingsData } = useFindings();

  const sessions = sessionsData?.items ?? [];
  const findings = findingsData ?? [];

  const sessionIds = sessions.map((s) => s.id);
  const { data: allJobs = [] } = useAllJobs(sessionIds);

  const activeSessions = sessions.filter((s) =>
    ["Capturing", "Processing", "Review"].includes(s.status),
  );
  const critical = findings.filter((f) => f.severity === "critical").length;
  const high = findings.filter((f) => f.severity === "high").length;
  const medium = findings.filter((f) => f.severity === "medium").length;
  const low = findings.filter((f) => f.severity === "low").length;
  const info = findings.filter((f) => f.severity === "info").length;
  const runningJobs = allJobs.filter((j) => j.status === "running").length;
  const queuedJobs = allJobs.filter((j) => j.status === "queued").length;

  const severityData = [
    { name: "Crítico", value: critical, color: "var(--severity-critical)" },
    { name: "Alto", value: high, color: "var(--severity-high)" },
    { name: "Medio", value: medium, color: "var(--severity-medium)" },
    { name: "Bajo", value: low, color: "var(--severity-low)" },
    { name: "Info", value: info, color: "var(--severity-info)" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Centro de operaciones · {new Date().toLocaleDateString("es-PE", { dateStyle: "full" })}
          </p>
          <h1 className="text-3xl font-bold tracking-tight mt-1">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/sessions">Ver sesiones</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/sessions/new">Nueva inspección</Link>
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={Radio}
          label="Inspecciones activas"
          value={activeSessions.length}
          hint={`${sessions.length} totales`}
        />
        <KpiCard
          icon={AlertTriangle}
          label="Hallazgos detectados"
          value={findings.length}
          hint={`${critical} críticos`}
          accent="critical"
        />
        <KpiCard
          icon={Cpu}
          label="Jobs IA en ejecución"
          value={runningJobs}
          hint={`${queuedJobs} en cola`}
          accent="info"
        />
        <KpiCard
          icon={FileCheck}
          label="Sesiones completadas"
          value={sessions.filter((s) => s.status === "Completed").length}
          hint={`${sessions.length} totales`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Findings trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
                Hallazgos · últimos 7 días
              </CardTitle>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-3xl font-bold font-mono">{findings.length}</span>
                <span className="text-xs text-severity-low flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> en tiempo real
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="findings" stroke="var(--primary)" fill="url(#g1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="critical" stroke="var(--severity-critical)" fill="transparent" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Severity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              Riesgo por severidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityData} layout="vertical" margin={{ left: 8 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} />
                  <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={11} width={60} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {severityData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active sessions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
            Inspecciones activas
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/sessions" className="font-mono text-xs uppercase tracking-wider">
              Ver todas <ArrowUpRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeSessions.slice(0, 5).map((s) => (
            <Link
              key={s.id}
              to="/sessions/$sessionId"
              params={{ sessionId: s.id }}
              className="block rounded border border-border p-3 hover:border-primary/40 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">{s.code}</span>
                    <SessionStatusBadge status={s.status} />
                  </div>
                  <h3 className="font-semibold mt-1 truncate">{s.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {s.infrastructure.type} · {s.infrastructure.location}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-2xl font-bold">{s.progress}%</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {s.evidenceCount} evidencias · {s.findingsCount} hallazgos
                  </div>
                </div>
              </div>
              <Progress value={s.progress} className="mt-3 h-1" />
            </Link>
          ))}
          {activeSessions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No hay inspecciones activas
            </p>
          )}
        </CardContent>
      </Card>

      {/* AI Jobs status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Activity className="h-3.5 w-3.5" /> Estado IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {allJobs.slice(0, 5).map((j) => (
            <div key={j.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono">{j.model}</span>
                <span className="text-muted-foreground">{j.progress}%</span>
              </div>
              <Progress value={j.progress} className="h-1" />
              <div className="font-mono text-[10px] uppercase text-muted-foreground">
                {j.status} · {j.findingsProduced} hallazgos
              </div>
            </div>
          ))}
          {allJobs.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">Sin jobs activos</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
  trend,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  hint?: string;
  trend?: string;
  accent?: "critical" | "info";
}) {
  const accentCls =
    accent === "critical"
      ? "text-severity-critical"
      : accent === "info"
        ? "text-accent"
        : "text-primary";
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
          <Icon className={`h-4 w-4 ${accentCls}`} />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold font-mono">{value}</span>
          {trend && <span className="text-xs text-severity-low">{trend}</span>}
        </div>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}
