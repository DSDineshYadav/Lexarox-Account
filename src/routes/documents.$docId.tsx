import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, FileText, Sparkles } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Section, StatusBadge, toneForStatus } from "@/components/kit";
import { Button } from "@/components/ui/button";
import { documents } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/documents/$docId")({
  loader: ({ params }) => {
    const doc = documents.find((d) => d.id === params.docId);
    if (!doc) throw notFound();
    return { doc };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Document not found — LexaRox" }, { name: "robots", content: "noindex" }] };
    }
    const n = loaderData.doc.name;
    return {
      meta: [
        { title: `${n} — AI Document Review · LexaRox` },
        { name: "description", content: `AI analysis, findings and verification for ${n}.` },
        { property: "og:title", content: `${n} — AI Document Review` },
        { property: "og:description", content: "AI-prepared document analysis awaiting human approval." },
      ],
    };
  },
  component: DocumentDetail,
});

function DocumentDetail() {
  const { doc } = Route.useLoaderData();

  return (
    <AppShell>
      <PageHeader
        title={doc.name}
        subtitle={`${doc.client} · ${doc.category} · uploaded ${doc.uploaded}`}
        actions={
          <>
            <StatusBadge tone={toneForStatus(doc.ai)} dot>
              {doc.ai}
            </StatusBadge>
            <Button variant="outline" asChild>
              <Link to="/documents">Back to documents</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-5">
        <Section className="lg:col-span-3" title="Document preview" description={`${doc.size} · page 1 of 4`}>
          <div className="p-4 sm:p-5">
            <div className="rounded-lg border bg-muted/30 p-6">
              <div className="mx-auto max-w-md space-y-3 rounded-md bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 border-b pb-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{doc.client}</p>
                    <p className="text-xs text-muted-foreground">Statement period 01–31 Oct 2025</p>
                  </div>
                </div>
                {[
                  ["02 Oct", "Card payment · Northvale Supplies", "-£18,400.00"],
                  ["04 Oct", "Bank transfer in · Client invoice 2291", "+£6,250.00"],
                  ["09 Oct", "Direct debit · Business insurance", "-£184.32"],
                  ["15 Oct", "Bank transfer in · Client invoice 2294", "+£12,900.00"],
                  ["21 Oct", "Card payment · Fuel", "-£96.40"],
                  ["28 Oct", "Salary run · Payroll", "-£9,412.00"],
                ].map(([d, desc, amt]) => (
                  <div key={d} className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 text-xs">
                    <span className="text-muted-foreground">{d}</span>
                    <span className="truncate">{desc}</span>
                    <span className={amt!.startsWith("+") ? "text-[var(--success)]" : ""}>{amt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <div className="space-y-5 lg:col-span-2">
          <div className="ai-surface rounded-xl p-5">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--ai)]/12 text-[var(--ai)]">
                <Sparkles className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-semibold">AI Summary</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Bank statement successfully processed. 42 transactions identified and matched to the ledger
              with 96% confidence.
            </p>
          </div>

          <Section title="AI Findings" description="Items the agent wants a human to confirm">
            <ul className="divide-y">
              {[
                {
                  icon: <AlertTriangle className="h-4 w-4 text-[var(--warning)]" />,
                  title: "2 unusual transactions detected",
                  detail: "£18,400 to a first-time supplier and a duplicate £96.40 fuel entry.",
                },
                {
                  icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
                  title: "1 missing month",
                  detail: "No statement provided for October 2025 in the wider series.",
                },
                {
                  icon: <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />,
                  title: "Account holder verified",
                  detail: "Name and account number match the company record.",
                },
              ].map((f) => (
                <li key={f.title} className="flex gap-3 px-4 py-3 sm:px-5">
                  <span className="mt-0.5 shrink-0">{f.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{f.title}</p>
                    <p className="text-xs text-muted-foreground">{f.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 border-t p-4 sm:px-5">
              <Button size="sm" onClick={() => toast.success("Document approved and marked verified")}>
                Approve
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast("Sent to the AI review queue")}>
                Request Review
              </Button>
              <Button size="sm" variant="ghost" onClick={() => toast("Ask AI panel opened")}>
                Ask AI
              </Button>
            </div>
          </Section>
        </div>
      </div>
    </AppShell>
  );
}
