import { createFileRoute } from "@tanstack/react-router";
import { Users, UserPlus, CheckCircle2, ShieldCheck, Sparkles, Mail, MoreHorizontal } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { KpiCard, ProgressBar, Section, StatusBadge } from "@/components/kit";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/data";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — LexaRox Accounts" },
      { name: "description", content: "Team members, roles, client load and capacity across the firm." },
      { property: "og:title", content: "Team — LexaRox Accounts" },
      { property: "og:description", content: "Roles, workload and capacity for the accountancy team." },
    ],
  }),
  component: Team,
});

function Team() {
  const totalMembers = teamMembers.length;
  const totalClientsManaged = teamMembers.reduce((acc, m) => acc + m.clients, 0);
  const avgWorkload = Math.round(teamMembers.reduce((acc, m) => acc + m.workload, 0) / totalMembers);

  return (
    <AppShell>
      <PageHeader
        title="Team Directory & Capacity"
        subtitle={`${teamMembers.length} active practice members · Automated workload balancing by Task Agent`}
        actions={
          <Button
            className="bg-[#3cadf1] hover:bg-[#3cadf1]/90 text-white font-semibold"
            onClick={() => toast.success("Invitation link generated & sent to email")}
          >
            <UserPlus className="mr-1.5 h-4 w-4" /> Invite Member
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Total Team Members"
          value={String(totalMembers)}
          trend="Full Staffing"
          up={true}
          support="Account managers & seniors"
          icon={<Users className="h-5 w-5" />}
          variant="cyan"
        />
        <KpiCard
          label="Portfolio Coverage"
          value={String(totalClientsManaged)}
          trend="Assigned"
          up={true}
          support="Active client accounts allocated"
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="green"
        />
        <KpiCard
          label="Average Utilization"
          value={`${avgWorkload}%`}
          trend="Optimal"
          up={true}
          support="Workload within safety margin"
          icon={<Sparkles className="h-5 w-5" />}
          variant="purple"
        />
      </div>

      <Section title="Team Roster & Workload Allocation" description="Roles, assigned accounts and capacity loading">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Team Member</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Clients Assigned</th>
                <th className="px-4 py-3 font-medium">Current Capacity Load</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {teamMembers.map((m) => (
                <tr key={m.email} className="transition-colors hover:bg-muted/40">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#3cadf1] text-xs font-bold text-white shadow-sm">
                        {m.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-foreground">{m.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge tone="primary">{m.role}</StatusBadge>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-foreground">
                    {m.clients} accounts
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="w-44 space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-muted-foreground">Utilisation</span>
                        <span className={m.workload > 85 ? "text-amber-500 font-bold" : "text-foreground"}>
                          {m.workload}%
                        </span>
                      </div>
                      <ProgressBar value={m.workload} tone={m.workload > 85 ? "ai" : "primary"} />
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.info(`Viewing clients assigned to ${m.name}`)}>
                          View assigned clients
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success(`Workload rebalanced for ${m.name}`)}>
                          Rebalance workload
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info(`Email sent to ${m.email}`)}>
                          <Mail className="mr-2 h-3.5 w-3.5" /> Send email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </AppShell>
  );
}
