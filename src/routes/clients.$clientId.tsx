import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Mail, Phone, MessageCircle, Sparkles, Building2, CalendarDays } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { AiInsight, ProgressBar, Section, StatusBadge, PriorityBadge, toneForStatus } from "@/components/kit";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clients, documents, tasks } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/clients/$clientId")({
  loader: ({ params }) => {
    const client = clients.find((c) => c.id === params.clientId);
    if (!client) throw notFound();
    return { client };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Client not found — LexaRox" }, { name: "robots", content: "noindex" }] };
    }
    const n = loaderData.client.name;
    return {
      meta: [
        { title: `${n} — Client · LexaRox Accounts` },
        { name: "description", content: `Onboarding, documents, tasks and AI insights for ${n}.` },
        { property: "og:title", content: `${n} — LexaRox Accounts` },
        { property: "og:description", content: `Client workspace and AI insights for ${n}.` },
      ],
    };
  },
  component: ClientDetail,
});

const checklist = [
  { label: "Business details completed", state: "done" },
  { label: "Director details completed", state: "done" },
  { label: "Identification uploaded", state: "done" },
  { label: "Bank statement missing", state: "warn" },
  { label: "Final verification", state: "todo" },
] as const;

function ClientDetail() {
  const { client } = Route.useLoaderData();
  const clientDocs = documents.filter((d) => d.client === client.name);
  const clientTasks = tasks.filter((t) => t.client === client.name);

  return (
    <AppShell>
      <PageHeader
        title={client.name}
        subtitle={`${client.type} · Year end ${client.yearEnd} · Last activity ${client.lastActivity}`}
        actions={
          <>
            <Button variant="outline" onClick={() => toast("Opening WhatsApp thread")}>
              <MessageCircle className="mr-1.5 h-4 w-4" /> WhatsApp
            </Button>
            <Button variant="outline" onClick={() => toast("Dialling via click-to-call")}>
              <Phone className="mr-1.5 h-4 w-4" /> Call
            </Button>
            <Button asChild>
              <Link to="/onboarding">Continue onboarding</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InfoTile label="Status" value={<StatusBadge tone={toneForStatus(client.status)}>{client.status}</StatusBadge>} />
        <InfoTile label="Account manager" value={client.manager} />
        <InfoTile label="Contact" value={client.email} sub={client.phone} />
        <InfoTile
          label="Onboarding progress"
          value={`${client.progress}%`}
          extra={<ProgressBar value={client.progress} />}
        />
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/60 p-1">
          {["Overview", "Onboarding", "Documents", "Tasks", "Communications", "Activity", "AI Insights"].map(
            (t) => (
              <TabsTrigger key={t} value={t.toLowerCase().replace(" ", "-")} className="text-xs sm:text-sm">
                {t}
              </TabsTrigger>
            ),
          )}
        </TabsList>

        <TabsContent value="overview" className="mt-5 grid gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <Section title="Client information">
              <dl className="grid gap-4 p-4 sm:grid-cols-2 sm:px-5">
                <Field icon={<Building2 className="h-3.5 w-3.5" />} label="Entity type" value={client.type} />
                <Field icon={<CalendarDays className="h-3.5 w-3.5" />} label="Year end" value={client.yearEnd} />
                <Field label="UTR" value={client.utr} />
                <Field label="Preferred language" value={client.language} />
                <Field icon={<Mail className="h-3.5 w-3.5" />} label="Email" value={client.email} />
                <Field icon={<Phone className="h-3.5 w-3.5" />} label="Phone" value={client.phone} />
              </dl>
            </Section>

            <Section title="Pending items" description="Blocking onboarding completion">
              <ul className="divide-y">
                {checklist.map((c) => (
                  <li key={c.label} className="flex items-center gap-3 px-4 py-3 text-sm sm:px-5">
                    <span
                      className={
                        c.state === "done"
                          ? "text-[var(--success)]"
                          : c.state === "warn"
                            ? "text-[var(--warning)]"
                            : "text-muted-foreground"
                      }
                    >
                      {c.state === "done" ? "✓" : c.state === "warn" ? "⚠" : "○"}
                    </span>
                    <span className={c.state === "done" ? "text-muted-foreground line-through" : ""}>
                      {c.label}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Upcoming tasks" description={`${clientTasks.length} open items`}>
              <ul className="divide-y">
                {clientTasks.length === 0 && (
                  <li className="px-4 py-6 text-sm text-muted-foreground sm:px-5">No open tasks.</li>
                )}
                {clientTasks.map((t) => (
                  <li key={t.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.assignee} · due {t.due} · source {t.source}
                      </p>
                    </div>
                    <PriorityBadge priority={t.priority} />
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <div className="space-y-5">
            <AiInsight
              actions={
                <>
                  <Button size="sm" asChild>
                    <Link to="/ai-review">Review</Link>
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast("AI assistant opened for this client")}>
                    Ask AI
                  </Button>
                </>
              }
            >
              3 documents appear to be missing from this client's onboarding, and the last bank statement
              covers only part of the period.
            </AiInsight>

            <Section title="Recent activity">
              <ul className="divide-y text-sm">
                {[
                  ["AI categorised 6 uploaded files", "12 min ago"],
                  ["Onboarding step 3 completed by client", "2 hrs ago"],
                  ["Email sent: document request", "Yesterday"],
                  ["Client record created", "6 days ago"],
                ].map(([a, t]) => (
                  <li key={a} className="px-4 py-3 sm:px-5">
                    <p>{a}</p>
                    <p className="text-xs text-muted-foreground">{t}</p>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </TabsContent>

        <TabsContent value="onboarding" className="mt-5">
          <Section title="Onboarding" description={`${client.progress}% complete`}>
            <div className="space-y-4 p-4 sm:px-5">
              <ProgressBar value={client.progress} />
              <Button asChild size="sm">
                <Link to="/onboarding">Open full onboarding workflow</Link>
              </Button>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="documents" className="mt-5">
          <Section title="Documents" description={`${clientDocs.length} files`}>
            <ul className="divide-y">
              {clientDocs.length === 0 && (
                <li className="px-4 py-6 text-sm text-muted-foreground sm:px-5">No documents uploaded yet.</li>
              )}
              {clientDocs.map((d) => (
                <li key={d.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-5">
                  <div className="min-w-0">
                    <Link
                      to="/documents/$docId"
                      params={{ docId: d.id }}
                      className="truncate text-sm font-medium hover:text-primary"
                    >
                      {d.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {d.category} · uploaded {d.uploaded}
                    </p>
                  </div>
                  <StatusBadge tone={toneForStatus(d.ai)}>{d.ai}</StatusBadge>
                </li>
              ))}
            </ul>
          </Section>
        </TabsContent>

        <TabsContent value="tasks" className="mt-5">
          <Section title="Tasks">
            <ul className="divide-y">
              {clientTasks.map((t) => (
                <li key={t.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.assignee} · {t.status} · due {t.due}
                    </p>
                  </div>
                  <PriorityBadge priority={t.priority} />
                </li>
              ))}
            </ul>
          </Section>
        </TabsContent>

        <TabsContent value="communications" className="mt-5">
          <Section title="Communications">
            <div className="space-y-3 p-4 sm:px-5">
              <div className="rounded-lg border p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone="ai" dot>
                    Email prepared by AI
                  </StatusBadge>
                  <span className="text-xs text-muted-foreground">26 min ago</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  "Your annual accounts are ready for review. We've attached the draft financial statements
                  and a short summary of the key figures…"
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" onClick={() => toast.success("Email approved and sent")}>
                    Approve &amp; Send
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast("Draft opened for editing")}>
                    Edit
                  </Button>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/communications">Open communication centre</Link>
              </Button>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="activity" className="mt-5">
          <Section title="Full activity log">
            <ul className="divide-y text-sm">
              {[
                ["AI categorised 6 uploaded files", "Document Agent", "12 min ago"],
                ["Onboarding step 3 completed", "Client portal", "2 hrs ago"],
                ["Document request email sent", "Communication Agent", "Yesterday"],
                ["Identity document verified", "Document Agent", "3 days ago"],
                ["Client record created", "Andrea Whitfield", "6 days ago"],
              ].map(([a, s, t]) => (
                <li key={a} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-3 sm:px-5">
                  <div className="min-w-0">
                    <p className="truncate">{a}</p>
                    <p className="text-xs text-muted-foreground">{s}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </Section>
        </TabsContent>

        <TabsContent value="ai-insights" className="mt-5 grid gap-4 md:grid-cols-2">
          <AiInsight title="Missing documentation">
            The October 2025 bank statement is missing from an otherwise complete 12-month series.
          </AiInsight>
          <AiInsight title="Threshold monitoring">
            Rolling 12-month turnover is at 91% of the VAT registration threshold.
          </AiInsight>
          <AiInsight title="Onboarding friction">
            The client re-opened the identity step three times — instructions may need simplifying.
          </AiInsight>
          <AiInsight title="Communication tone">
            Response times improve when emails are sent before 10:00 in the client's timezone.
          </AiInsight>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function InfoTile({
  label,
  value,
  sub,
  extra,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="card-soft p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-1.5 truncate text-sm font-medium">{value}</div>
      {sub && <p className="truncate text-xs text-muted-foreground">{sub}</p>}
      {extra && <div className="mt-3">{extra}</div>}
    </div>
  );
}

function Field({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm">{value}</dd>
    </div>
  );
}
