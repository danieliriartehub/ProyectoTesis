import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMe } from "@/lib/queries";

export function AppHeader() {
  const { data: me } = useMe();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
      <div className="relative">
        <SidebarTrigger className="text-muted-foreground" />
        {collapsed && (
          <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-red-500 pointer-events-none" />
        )}
      </div>
      <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-severity-low animate-pulse" />
        Sistema operativo
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button asChild size="sm" className="font-mono uppercase tracking-wider text-xs">
          <Link to="/sessions/new">
            <Plus className="h-3.5 w-3.5" /> Nueva sesión
          </Link>
        </Button>
      </div>
    </header>
  );
}