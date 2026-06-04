import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { users } from "@/lib/mocks";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Equipo — InfraInspect AI" }] }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Usuarios y roles</p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Equipo</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <Card key={u.id}>
            <CardContent className="p-4 flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground font-mono">
                  {u.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{u.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                <span className="mt-1 inline-block font-mono text-[10px] uppercase tracking-wider bg-muted px-1.5 py-0.5 rounded">{u.role}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}