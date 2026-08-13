import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search, SlidersHorizontal, MoreHorizontal, Sparkles, Users, CheckCircle2, UserPlus, ShieldCheck } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { EmptyState, KpiCard, StatusBadge, toneForStatus } from "@/components/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { clients, languages } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/clients/")({
  head: () => ({
    meta: [
      { title: "Clients — LexaRox Accounts" },
      {
        name: "description",
        content: "Manage accountancy clients, onboarding status, documents and AI activity in one place.",
      },
      { property: "og:title", content: "Clients — LexaRox Accounts" },
      { property: "og:description", content: "A modern client register with AI status on every account." },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);

  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === "Active" || c.status === "Completed").length;
  const onboardingClients = clients.filter((c) => c.status === "Onboarding" || c.status === "Awaiting Documents").length;
  const reviewClients = clients.filter((c) => c.status === "Review Required").length;

  const rows = useMemo(
    () =>
      clients.filter(
        (c) =>
          (status === "all" || c.status === status) &&
          (c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.manager.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, status],
  );

  return (
    <AppShell>
      <PageHeader
        title="Clients Register"
        subtitle={`${clients.length} active client accounts · Real-time AI monitoring enabled`}
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#3cadf1] hover:bg-[#3cadf1]/90 text-white font-semibold">
                <Plus className="mr-1.5 h-4 w-4" /> Add Client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new client</DialogTitle>
                <DialogDescription>
                  The Client Onboarding Agent will prepare a tailored onboarding pack automatically.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="space-y-1.5">
                  <Label>Client name</Label>
                  <Input placeholder="e.g. Harbour Lane Studio Ltd" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Entity type</Label>
                    <Select defaultValue="Limited Company">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Limited Company", "Sole Trader", "Partnership", "LLP"].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Preferred language</Label>
                    <Select defaultValue="English">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((l) => (
                          <SelectItem key={l} value={l}>
                            {l}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Primary contact email</Label>
                  <Input type="email" placeholder="name@company.co.uk" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                    toast.success("Client created — onboarding pack queued with the AI agent");
                  }}
                >
                  Create client
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Total Portfolio"
          value={String(totalClients)}
          trend="+14%"
          up={true}
          support="Active managed accounts"
          icon={<Users className="h-5 w-5" />}
          variant="cyan"
        />
        <KpiCard
          label="Active Accounts"
          value={String(activeClients)}
          trend="+8%"
          up={true}
          support="Full compliance up to date"
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="green"
        />
        <KpiCard
          label="In Onboarding"
          value={String(onboardingClients)}
          trend="3 pending"
          up={true}
          support="Document collection active"
          icon={<UserPlus className="h-5 w-5" />}
          variant="amber"
        />
        <KpiCard
          label="Needs Review"
          value={String(reviewClients)}
          trend="Urgent"
          up={false}
          support="AI exception flag raised"
          icon={<ShieldCheck className="h-5 w-5" />}
          variant="purple"
        />
      </div>

      <div className="card-soft overflow-hidden">
        <div className="grid gap-2 border-b p-3 sm:flex sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search clients or account managers…"
              className="h-9 border-transparent bg-muted pl-9"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-9 w-full sm:w-56">
              <SlidersHorizontal className="mr-1.5 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {["Onboarding", "Active", "Review Required", "Awaiting Documents", "Completed"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {rows.length === 0 ? (
          <EmptyState title="No clients match your filters" description="Try a different search term or clear the status filter." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">Client</th>
                  <th className="px-4 py-2.5 font-medium">Type</th>
                  <th className="px-4 py-2.5 font-medium">Onboarding</th>
                  <th className="px-4 py-2.5 font-medium">Docs</th>
                  <th className="px-4 py-2.5 font-medium">Tasks</th>
                  <th className="px-4 py-2.5 font-medium">Last activity</th>
                  <th className="px-4 py-2.5 font-medium">AI status</th>
                  <th className="px-4 py-2.5 font-medium">Account manager</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <Link
                        to="/clients/$clientId"
                        params={{ clientId: c.id }}
                        className="font-medium hover:text-primary"
                      >
                        {c.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.type}</td>
                    <td className="px-4 py-3">
                      <StatusBadge tone={toneForStatus(c.status)}>{c.status}</StatusBadge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.documents}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.tasks}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.lastActivity}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--ai)]">
                        <Sparkles className="h-3.5 w-3.5" />
                        {c.aiStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.manager}</td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to="/clients/$clientId" params={{ clientId: c.id }}>
                              Open client
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/onboarding">View onboarding</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`AI review requested for ${c.name}`)}>
                            Request AI review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}
