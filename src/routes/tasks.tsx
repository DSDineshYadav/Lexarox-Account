import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search, Sparkles, ListChecks, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { EmptyState, KpiCard, PriorityBadge, StatusBadge, toneForStatus } from "@/components/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tasks } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — LexaRox Accounts" },
      {
        name: "description",
        content: "Intelligent task management with AI-generated work, priorities and team queues.",
      },
      { property: "og:title", content: "Tasks — LexaRox Accounts" },
      { property: "og:description", content: "AI creates and prioritises the work; your team completes it." },
    ],
  }),
  component: TasksPage,
});

const views = ["My Tasks", "Team Tasks", "AI Tasks", "Completed", "Overdue"] as const;

function TasksPage() {
  const [view, setView] = useState<(typeof views)[number]>("My Tasks");
  const [query, setQuery] = useState("");

  const totalTasks = tasks.length;
  const myTasks = tasks.filter((t) => t.view === "My Tasks").length;
  const aiTasks = tasks.filter((t) => t.source === "AI").length;
  const overdueTasks = tasks.filter((t) => t.status === "Overdue").length;

  const rows = useMemo(
    () =>
      tasks.filter((t) => {
        const matchesView =
          view === "Completed"
            ? t.status === "Completed"
            : view === "Overdue"
              ? t.status === "Overdue"
              : t.view === view;
        return (
          matchesView &&
          (t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.client.toLowerCase().includes(query.toLowerCase()))
        );
      }),
    [view, query],
  );

  return (
    <AppShell>
      <PageHeader
        title="Task Management"
        subtitle="AI creates and prioritises work automatically. Your team executes efficiently."
        actions={
          <Button onClick={() => toast.success("Task created and assigned")} className="bg-[#3cadf1] hover:bg-[#3cadf1]/90 text-white font-semibold">
            <Plus className="mr-1.5 h-4 w-4" /> New task
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Total Backlog"
          value={String(totalTasks)}
          trend="Balanced"
          up={true}
          support="Across all active projects"
          icon={<ListChecks className="h-5 w-5" />}
          variant="cyan"
        />
        <KpiCard
          label="Assigned to Me"
          value={String(myTasks)}
          trend="Prioritised"
          up={true}
          support="Next deliverables ready"
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="green"
        />
        <KpiCard
          label="AI Generated"
          value={String(aiTasks)}
          trend="Automated"
          up={true}
          support="Queued by Smart Agent"
          icon={<Sparkles className="h-5 w-5" />}
          variant="purple"
        />
        <KpiCard
          label="Overdue / Flagged"
          value={String(overdueTasks)}
          trend="Needs Attention"
          up={false}
          support="High priority escalation"
          icon={<AlertTriangle className="h-5 w-5" />}
          variant="amber"
        />
      </div>

      <div className="mb-4 grid gap-2 sm:flex sm:items-center sm:justify-between">
        <Tabs value={view} onValueChange={(v) => setView(v as (typeof views)[number])}>
          <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-muted/60 p-1">
            {views.map((v) => (
              <TabsTrigger key={v} value={v} className="text-xs sm:text-sm">
                {v}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks…"
            className="h-9 border-transparent bg-muted pl-9"
          />
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="card-soft">
          <EmptyState title="Nothing here" description="No tasks match this view and search combination." />
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((t) => (
            <li key={t.id} className="card-soft flex flex-col gap-3 p-4">
              <div className="flex flex-wrap items-center gap-2">
                {t.source === "AI" && (
                  <StatusBadge tone="ai" dot>
                    <Sparkles className="h-3 w-3" /> AI generated
                  </StatusBadge>
                )}
                <StatusBadge tone={toneForStatus(t.status)}>{t.status}</StatusBadge>
                <PriorityBadge priority={t.priority} />
              </div>
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t.client} · {t.assignee} · due {t.due}
                </p>
              </div>
              <div className="mt-auto flex gap-2">
                <Button size="sm" variant={t.source === "AI" ? "default" : "outline"} asChild>
                  <Link to={t.source === "AI" ? "/ai-review" : "/clients"}>
                    {t.source === "AI" ? "Review task" : "Open"}
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast.success(`"${t.name}" marked complete`)}
                >
                  Complete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
