import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Languages, MessageSquareText, UserPlus, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { AiInsight, KpiCard, ProgressBar, Section, StatusBadge, toneForStatus } from "@/components/kit";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { clients, languages } from "@/lib/data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Client Onboarding — LexaRox Accounts" },
      {
        name: "description",
        content:
          "AI-guided, multilingual client onboarding with document checklists, verification and exception handling.",
      },
      { property: "og:title", content: "Client Onboarding — LexaRox Accounts" },
      { property: "og:description", content: "Guided onboarding where AI explains, chases and verifies." },
    ],
  }),
  component: OnboardingPage,
});

const steps = [
  "Business Information",
  "Personal Information",
  "Required Documents",
  "Verification",
  "Review",
];

const checklist = [
  { label: "Business details completed", state: "done" },
  { label: "Director details completed", state: "done" },
  { label: "Identification uploaded", state: "done" },
  { label: "Bank statement missing", state: "warn" },
  { label: "Final verification", state: "todo" },
] as const;

function OnboardingPage() {
  const [current, setCurrent] = useState(2);
  const [language, setLanguage] = useState("English");
  const [conversation, setConversation] = useState(false);
  const onboardingClients = clients.filter((c) => c.progress < 100);
  const client = clients[0]!;

  return (
    <AppShell>
      <PageHeader
        title="Multilingual Client Onboarding"
        subtitle={`${onboardingClients.length} active client onboarding workflows · AI agent explaining & chasing documents`}
        actions={
          <Button variant="outline" className="font-semibold" asChild>
            <Link to="/clients">View All Clients</Link>
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Onboarding Pipeline"
          value={String(onboardingClients.length)}
          trend="3 active"
          up={true}
          support="Guided by AI assistant"
          icon={<UserPlus className="h-5 w-5" />}
          variant="cyan"
        />
        <KpiCard
          label="Avg Onboarding SLA"
          value="4.2 days"
          trend="-2.1 days"
          up={true}
          support="Industry avg: 14 days"
          icon={<Clock className="h-5 w-5" />}
          variant="green"
        />
        <KpiCard
          label="Verification Pass Rate"
          value="92%"
          trend="Automated"
          up={true}
          support="Companies House verified"
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="purple"
        />
        <KpiCard
          label="Missing Documents"
          value="2 items"
          trend="Chasing"
          up={false}
          support="Automated WhatsApp chases"
          icon={<AlertTriangle className="h-5 w-5" />}
          variant="amber"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Section
            title={client.name}
            description={`${client.type} · Account manager: ${client.manager}`}
            actions={<StatusBadge tone={toneForStatus(client.status)}>{client.status}</StatusBadge>}
          >
            <div className="space-y-6 p-4 sm:px-5">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrent(i)}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition-all",
                        i < current && "border-transparent bg-emerald-500/15 text-emerald-500",
                        i === current && "border-[#3cadf1] bg-[#3cadf1] text-white shadow-xs",
                        i > current && "text-muted-foreground border-border/50",
                      )}
                    >
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-current/15 text-[0.6rem]">
                        {i < current ? <Check className="h-3 w-3" /> : i + 1}
                      </span>
                      <span className="hidden sm:inline">{s}</span>
                      <span className="sm:hidden">{s.split(" ")[0]}</span>
                    </button>
                    {i < steps.length - 1 && <span className="hidden h-px w-4 bg-border sm:block" />}
                  </li>
                ))}
              </ol>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm font-bold">
                  <span className="text-foreground">Overall Completion</span>
                  <span className="text-[#3cadf1]">{client.progress}%</span>
                </div>
                <ProgressBar value={client.progress} tone="ai" />
              </div>

              <ul className="space-y-2">
                {checklist.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-3 text-sm transition-all"
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold",
                        c.state === "done" && "bg-emerald-500/15 text-emerald-500",
                        c.state === "warn" && "bg-amber-500/15 text-amber-500",
                        c.state === "todo" && "bg-muted text-muted-foreground",
                      )}
                    >
                      {c.state === "done" ? "✓" : c.state === "warn" ? "!" : "○"}
                    </span>
                    <span className={cn("min-w-0 flex-1 truncate font-medium", c.state === "done" && "text-muted-foreground line-through")}>
                      {c.label}
                    </span>
                    {c.state === "warn" && (
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-[#3cadf1] hover:bg-[#3cadf1]/90 text-white font-semibold"
                        onClick={() => toast.success("AI chase message sent via WhatsApp & Email")}
                      >
                        Chase with AI
                      </Button>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  disabled={current === 0}
                  className="text-xs font-semibold"
                >
                  Previous Step
                </Button>
                <Button
                  className="bg-[#3cadf1] hover:bg-[#3cadf1]/90 text-white font-semibold text-xs"
                  onClick={() => {
                    if (current === steps.length - 1) toast.success("Onboarding submitted for verification");
                    setCurrent((c) => Math.min(steps.length - 1, c + 1));
                  }}
                >
                  {current === steps.length - 1 ? "Complete Onboarding" : `Continue to ${steps[current + 1]}`}
                </Button>
              </div>
            </div>
          </Section>

          <Section title="Active Onboarding Pipeline" description="Other clients currently uploading documents">
            <ul className="divide-y">
              {onboardingClients.map((c) => (
                <li key={c.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 sm:px-5">
                  <div className="min-w-0">
                    <Link
                      to="/clients/$clientId"
                      params={{ clientId: c.id }}
                      className="truncate text-sm font-bold text-foreground hover:text-[#3cadf1]"
                    >
                      {c.name}
                    </Link>
                    <div className="mt-1.5 flex items-center gap-3">
                      <div className="w-36">
                        <ProgressBar value={c.progress} />
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-muted-foreground">{c.progress}%</span>
                    </div>
                  </div>
                  <StatusBadge tone={toneForStatus(c.status)}>{c.status}</StatusBadge>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="space-y-5">
          <section className="card-soft ai-surface rounded-2xl p-5 border">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#3cadf1]/15 text-[#3cadf1] font-bold">
                <Sparkles className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-bold text-foreground">AI Onboarding Assistant</h2>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Your AI assistant is actively guiding this client — answering questions, clarifying document formats, and sending automatic reminders.
            </p>

            <div className="mt-4 space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Languages className="h-3.5 w-3.5 text-[#3cadf1]" /> Preferred Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-background text-xs font-semibold">
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
              <p className="text-[11px] text-muted-foreground">
                Delivering explanations in {language} with UK accounting terms preserved.
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs">
              <p className="font-bold text-amber-500">Detected Blocker</p>
              <p className="mt-1 text-foreground/80">
                "The client has opened the document upload screen twice but hasn't uploaded the October PDF statement yet."
              </p>
            </div>

            <Button className="mt-4 w-full bg-[#3cadf1] hover:bg-[#3cadf1]/90 text-white font-semibold text-xs" onClick={() => setConversation(true)}>
              <MessageSquareText className="mr-1.5 h-4 w-4" /> View AI Chat Transcript
            </Button>
          </section>

          <AiInsight title="Assistant Summary">
            4 of 5 steps complete. The single remaining item is the October bank statement — the AI has explained the requirement twice and offered a secure upload link.
          </AiInsight>
        </div>
      </div>

      <Sheet open={conversation} onOpenChange={setConversation}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="text-base font-bold">AI Onboarding Conversation · {client.name}</SheetTitle>
            <SheetDescription className="text-xs">Live assistant transcript in {language}.</SheetDescription>
          </SheetHeader>
          <div className="space-y-3 p-4">
            {[
              ["client", "Which bank statement do you need exactly?"],
              [
                "ai",
                "We need a PDF statement for October 2025 showing the full month for your business current account — the same account used in September.",
              ],
              ["client", "Can I send a screenshot from the app?"],
              [
                "ai",
                "A screenshot isn't sufficient for verification. You can download the official PDF from your banking app under Statements, or I can send a secure upload link.",
              ],
              ["ai", "I've flagged this item for your accountant so nothing is missed."],
            ].map(([who, text], i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs font-medium leading-relaxed",
                  who === "ai"
                    ? "bg-[#3cadf1]/15 border border-[#3cadf1]/30 text-foreground"
                    : "ml-auto bg-muted text-foreground",
                )}
              >
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {who === "ai" ? "Onboarding Agent" : "Client"}
                </p>
                {text}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </AppShell>
  );
}
