import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Radio,
  FileText,
  Settings,
  Activity,
  Box,
  ChevronDown,
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
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useMe } from "@/lib/queries";

const nav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Sesiones", url: "/sessions", icon: Radio },
  { title: "Procesamiento IA", url: "/jobs", icon: Activity },
];

const secondary = [
  { title: "Configuración", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: me } = useMe();

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <Sidebar collapsible="offcanvas" className="border-r-0 bg-[#0d1321]">
      <SidebarHeader className={`border-b-0 py-6 ${collapsed ? 'px-2' : 'px-4'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-transparent border border-primary/30 glow-primary">
            <Box className="h-5 w-5 text-primary" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-sans text-lg font-bold tracking-tight text-white leading-tight">
                InfraInspect
              </span>
              <span className="font-sans text-xs text-muted-foreground leading-tight">
                v2.0
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 gap-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {nav.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={active}
                      className={`h-11 rounded-lg transition-all duration-200 ${
                        active 
                          ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" 
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground border-l-2 border-transparent"
                      }`}
                    >
                      <Link to={item.url} className={`flex items-center h-full w-full ${collapsed ? 'justify-center' : 'gap-3 px-3'}`}>
                        <item.icon className={`h-5 w-5 shrink-0 ${active ? "text-primary" : ""}`} />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-sans text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-2 px-3">
            Administración
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {secondary.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={active}
                      className={`h-11 rounded-lg transition-all duration-200 ${
                        active 
                          ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" 
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground border-l-2 border-transparent"
                      }`}
                    >
                      <Link to={item.url} className={`flex items-center h-full w-full ${collapsed ? 'justify-center' : 'gap-3 px-3'}`}>
                        <item.icon className={`h-5 w-5 shrink-0 ${active ? "text-primary" : ""}`} />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t-0 p-4 space-y-4">
        {!collapsed && (
          <div className="relative overflow-hidden rounded-xl bg-gradient-subtle border border-glass p-4">
            {/* Abstract wireframe cube effect (CSS) */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-20 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 100 100" className="text-primary stroke-current" fill="none">
                 <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" strokeWidth="2"/>
                 <path d="M50 10 L50 50 L90 30" strokeWidth="2"/>
                 <path d="M10 30 L50 50 L50 90" strokeWidth="2"/>
              </svg>
            </div>
            
            <h4 className="font-bold text-white text-sm relative z-10">Plan Profesional</h4>
            <p className="text-xs text-muted-foreground mt-1 mb-3 relative z-10">Activo hasta 12/12/2026</p>
            <button className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 rounded-lg py-2 text-xs font-semibold transition-colors relative z-10 glow-primary">
              Mejorar plan
            </button>
          </div>
        )}


      </SidebarFooter>
    </Sidebar>
  );
}