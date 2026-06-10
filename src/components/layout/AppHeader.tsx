import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMe } from "@/lib/queries";

export function AppHeader() {
  const { data: me } = useMe();
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger className="text-muted-foreground" />
      <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-severity-low animate-pulse" />
        Sistema operativo
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Buscar sesión, hallazgo, activo…"
            className="h-9 w-72 pl-8 font-mono text-xs"
          />
        </div>
        <Button asChild size="sm" className="font-mono uppercase tracking-wider text-xs">
          <Link to="/sessions/new">
            <Plus className="h-3.5 w-3.5" /> Nueva sesión
          </Link>
        </Button>
        <Button size="icon" variant="ghost" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-severity-critical" />
        </Button>
        <Avatar className="h-8 w-8 border border-primary/20">
          <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
            {me?.full_name?.[0]?.toUpperCase() || me?.email?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}