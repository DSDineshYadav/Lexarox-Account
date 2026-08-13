import { createFileRoute } from "@tanstack/react-router";
import { Settings, Users, Shield, Sparkles, Sliders, Lock, Cpu, CheckCircle2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { KpiCard, Section, StatusBadge } from "@/components/kit";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { agents, languages, teamMembers } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — LexaRox Accounts" },
      {
        name: "description",
        content: "Users, roles, AI agents, languages, data protection and integrations for LexaRox.",
      },
      { property: "og:title", content: "Settings — LexaRox Accounts" },
      { property: "og:description", content: "Administration, privacy controls and integrations." },
    ],
  }),
  component: SettingsPage,
});

const tabs = [
  ["users", "Users"],
  ["roles", "Roles & Permissions"],
  ["agents", "AI Agents"],
  ["notifications", "Notifications"],
  ["languages", "Languages"],
  ["privacy", "Data & Privacy"],
  ["integrations", "Integrations"],
] as const;

function SettingsPage() {
  return (
    <AppShell>
      <PageHeader
        title="System Administration & Configuration"
        subtitle="User access management, AI agent policies, privacy controls and active integrations."
      />

      {/* KPI Summary Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <KpiCard
          label="Active Users"
          value={String(teamMembers.length)}
          trend="Role Protected"
          up={true}
          support="Staff & admin accounts"
          icon={<Users className="h-5 w-5" />}
          variant="cyan"
        />
        <KpiCard
          label="AI Agents Running"
          value={String(agents.filter((a) => a.status !== "Paused").length)}
          trend="Active"
          up={true}
          support="Out of 6 configured agents"
          icon={<Cpu className="h-5 w-5" />}
          variant="green"
        />
        <KpiCard
          label="Connected Apps"
          value="4"
          trend="Healthy"
          up={true}
          support="Email, WhatsApp, Phone, AI"
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="purple"
        />
        <KpiCard
          label="Security & Compliance"
          value="100%"
          trend="GDPR Compliant"
          up={true}
          support="Audit logs enabled"
          icon={<Lock className="h-5 w-5" />}
          variant="amber"
        />
      </div>

      <Tabs defaultValue="users">
        <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-muted/60 p-1">
          {tabs.map(([v, l]) => (
            <TabsTrigger key={v} value={v} className="text-xs sm:text-sm font-semibold">
              {l}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="users" className="mt-5">
          <Section title="Users & Access Rights" description="People with active system access">
            <ul className="divide-y">
              {teamMembers.map((m) => (
                <li key={m.email} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 sm:px-5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-foreground">{m.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{m.email}</p>
                  </div>
                  <StatusBadge tone="primary">{m.role}</StatusBadge>
                </li>
              ))}
            </ul>
          </Section>
        </TabsContent>

        <TabsContent value="roles" className="mt-5">
          <Section title="Roles & Permission Levels" description="Access boundaries and capability matrix">
            <ul className="divide-y text-sm">
              {[
                ["Admin", "Full access including user management, system settings, billing and complete audit logs"],
                ["Manager", "Team queues, task approvals, exception handling and executive reporting"],
                ["Accountancy Staff", "Assigned client accounts, document processing, task execution and messaging"],
                ["Onboarding Specialist", "Onboarding journeys, document checklists and client verification"],
                ["Client Portal", "Restricted access to own onboarding checklist, document uploads and secure messaging"],
              ].map(([r, d]) => (
                <li key={r} className="px-4 py-3.5 sm:px-5">
                  <p className="font-bold text-foreground">{r}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d}</p>
                </li>
              ))}
            </ul>
          </Section>
        </TabsContent>

        <TabsContent value="agents" className="mt-5">
          <Section title="AI Agent Policy & Master Controls" description="Enable, pause, or adjust confidence thresholds for autonomous agents">
            <ul className="divide-y">
              {agents.map((a) => (
                <li key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 sm:px-5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#3cadf1]" />
                      <p className="truncate text-sm font-bold text-foreground">{a.name}</p>
                    </div>
                    <p className="truncate text-xs text-muted-foreground mt-0.5">{a.description}</p>
                  </div>
                  <Switch
                    defaultChecked={a.status !== "Paused"}
                    onCheckedChange={(checked) => toast.success(`${a.name} ${checked ? "enabled" : "paused"}`)}
                  />
                </li>
              ))}
            </ul>
          </Section>
        </TabsContent>

        <TabsContent value="notifications" className="mt-5">
          <Section title="Alert & Notification Preferences" description="Configure triggers for real-time notifications">
            <ul className="divide-y">
              {[
                "New item added to AI Review Queue",
                "Onboarding document verification exception",
                "Overdue compliance or filing task",
                "Weekly practice AI automation performance summary",
                "WhatsApp client incoming document alert",
              ].map((n) => (
                <li key={n} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 sm:px-5">
                  <span className="truncate text-sm font-medium text-foreground">{n}</span>
                  <Switch defaultChecked />
                </li>
              ))}
            </ul>
          </Section>
        </TabsContent>

        <TabsContent value="languages" className="mt-5">
          <Section title="Multilingual Capabilities" description="Languages enabled for AI-guided client onboarding">
            <ul className="divide-y">
              {languages.map((l) => (
                <li key={l} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 sm:px-5">
                  <span className="truncate text-sm font-semibold text-foreground">{l}</span>
                  <Switch defaultChecked={l === "English" || l === "Spanish"} onCheckedChange={(c) => toast(`${l} translation ${c ? "enabled" : "disabled"}`)} />
                </li>
              ))}
            </ul>
          </Section>
        </TabsContent>

        <TabsContent value="privacy" className="mt-5 grid gap-5 lg:grid-cols-2">
          <Section title="Data Governance & Privacy" description="Retention rules, GDPR compliance and access logs">
            <ul className="divide-y text-sm">
              {[
                ["Document Retention Policy", "Client documents retained securely for 7 years, then queued for automated deletion."],
                ["Client Consent Registry", "Consent digitally captured during onboarding with immutable timestamp."],
                ["Restricted Document Access", "Document access enforced by account manager role scoping."],
                ["Audit Review Schedule", "Quarterly automated access permission audit for compliance."],
              ].map(([t, d]) => (
                <li key={t} className="px-4 py-3.5 sm:px-5">
                  <p className="font-bold text-foreground">{t}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="AI Action Audit & Traceability" description="Complete record of every autonomous decision">
            <div className="space-y-3 p-4 text-sm sm:px-5">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every AI action records the specific agent ID, input parameters, confidence score, and the staff member who reviewed or approved it. Audit logs are fully exportable for compliance.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" variant="outline" className="text-xs font-semibold" onClick={() => toast.success("Full system audit log export started")}>
                  Export Audit Log (CSV)
                </Button>
                <Button size="sm" variant="outline" className="text-xs font-semibold" onClick={() => toast.info("Data processing agreement loaded")}>
                  View Data Agreement
                </Button>
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="integrations" className="mt-5">
          <Section title="Connected System Integrations" description="Active channels and external API integrations">
            <ul className="divide-y">
              {[
                ["Email Dispatch Engine", "Connected & Operational", "success"],
                ["WhatsApp Business API", "Connected & Operational", "success"],
                ["AI / LLM Operations Engine", "Connected & Operational", "success"],
                ["Phone (Click-to-Call Dialer)", "Connected & Operational", "success"],
                ["VoIP Telephony Engine", "Planned Integration", "neutral"],
                ["BrightManager CRM Sync", "Planned · Reference Data System", "warning"],
              ].map(([n, s, tone]) => (
                <li key={n} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 sm:px-5">
                  <div>
                    <p className="truncate text-sm font-bold text-foreground">{n}</p>
                    <p className="truncate text-xs text-muted-foreground">{s}</p>
                  </div>
                  <StatusBadge tone={tone as "success" | "neutral" | "warning"}>
                    {tone === "success" ? "Connected" : tone === "warning" ? "Planned" : "Queued"}
                  </StatusBadge>
                </li>
              ))}
            </ul>
          </Section>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
