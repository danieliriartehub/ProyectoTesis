import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Radio,
  AlertTriangle,
  FileText,
  Users,
  Settings,
  Activity,
  Radar,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const nav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Sesiones", url: "/sessions", icon: Radio },
  { title: "Hallazgos", url: "/findings", icon: AlertTriangle },
  { title: "Reportes", url: "/reports", icon: FileText },
  { title: "Procesamiento IA", url: "/jobs", icon: Activity },
];

const secondary = [
  { title: "Equipo", url: "/team", icon: Users },
  { title: "Configuración", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            <Radar className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-sm font-bold tracking-tight">
                InfraInspect
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                AI · v1.0
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono uppercase tracking-widest text-[10px]">
            Operaciones
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-mono uppercase tracking-widest text-[10px]">
            Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondary.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed && (
          <div className="px-2 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Cluster</span>
              <span className="flex items-center gap-1 text-severity-low">
                <span className="h-1.5 w-1.5 rounded-full bg-severity-low animate-pulse" />
                Online
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span>GPU</span>
              <span>4 × A100</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}