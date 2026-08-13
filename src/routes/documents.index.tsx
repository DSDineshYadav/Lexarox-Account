import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Upload, FileText, Sparkles, CheckCircle2, ShieldCheck, FileCheck } from "lucide-react";
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
import { documents, type DocCategory } from "@/lib/data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/documents/")({
  head: () => ({
    meta: [
      { title: "Documents — LexaRox Accounts" },
      {
        name: "description",
        content: "Client document library with AI processing, categorisation and verification status.",
      },
      { property: "og:title", content: "Documents — LexaRox Accounts" },
      { property: "og:description", content: "AI-processed document management for accountancy teams." },
    ],
  }),
  component: DocumentsPage,
});

const categories: (DocCategory | "All")[] = [
  "All",
  "Identity",
  "Bank Statements",
  "Tax Documents",
  "Company Documents",
  "Contracts",
  "Other",
];

function DocumentsPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [ai, setAi] = useState("all");
  const [query, setQuery] = useState("");

  const totalDocs = documents.length;
  const processedDocs = documents.filter((d) => d.ai === "Processed" || d.ai === "Verified").length;
  const verifiedDocs = documents.filter((d) => d.verified === "Verified").length;
  const reviewDocs = documents.filter((d) => d.ai === "Needs Review" || d.verified === "Needs Review").length;

  const rows = useMemo(
    () =>
      documents.filter(
        (d) =>
          (category === "All" || d.category === category) &&
          (ai === "all" || d.ai === ai) &&
          (d.name.toLowerCase().includes(query.toLowerCase()) ||
            d.client.toLowerCase().includes(query.toLowerCase())),
      ),
    [category, ai, query],
  );

  return (
    <AppShell>
      <PageHeader
        title="Document Intelligence Hub"
        subtitle="AI automatically extracts, categorises and verifies client financial documents upon upload."
        actions={
          <Button
            className="bg-[#3cadf1] hover:bg-[#3cadf1]/90 text-white font-semibold"
            onClick={() => toast.success("Upload queued — Document Agent OCR engine initiated")}
          >
            <Upload className="mr-1.5 h-4 w-4" /> Upload Document
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Total Vault Documents"
          value={String(totalDocs)}
          trend="Secure storage"
          up={true}
          support="Indexed in client vault"
          icon={<FileText className="h-5 w-5" />}
          variant="cyan"
        />
        <KpiCard
          label="AI OCR Processed"
          value={String(processedDocs)}
          trend="98.2% accuracy"
          up={true}
          support="Data extraction complete"
          icon={<Sparkles className="h-5 w-5" />}
          variant="purple"
        />
        <KpiCard
          label="Fully Verified"
          value={String(verifiedDocs)}
          trend="Compliance pass"
          up={true}
          support="Verified against company register"
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="green"
        />
        <KpiCard
          label="Needs Review"
          value={String(reviewDocs)}
          trend="Action required"
          up={false}
          support="Flagged for manual sign-off"
          icon={<ShieldCheck className="h-5 w-5" />}
          variant="amber"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-bold transition-all",
              category === c
                ? "bg-[#3cadf1] text-white shadow-xs"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="card-soft overflow-hidden">
        <div className="grid gap-2 border-b p-3 sm:flex sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documents or clients…"
              className="h-9 border-transparent bg-muted pl-9 text-xs"
            />
          </div>
          <Select value={ai} onValueChange={setAi}>
            <SelectTrigger className="h-9 w-full sm:w-52 text-xs">
              <SelectValue placeholder="AI status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All AI statuses</SelectItem>
              {["Processing", "Processed", "Needs Review", "Verified"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {rows.length === 0 ? (
          <EmptyState
            title="No documents found"
            description="Adjust the category, AI status or search term to see more results."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Document File</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Upload Date</th>
                  <th className="px-4 py-3 font-medium">AI Processing</th>
                  <th className="px-4 py-3 font-medium">Verification</th>
                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((d) => (
                  <tr key={d.id} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#3cadf1]/15 text-[#3cadf1]">
                          <FileText className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <Link
                            to="/documents/$docId"
                            params={{ docId: d.id }}
                            className="block truncate font-bold text-foreground hover:text-[#3cadf1]"
                          >
                            {d.name}
                          </Link>
                          <span className="text-xs text-muted-foreground font-mono">{d.size}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-medium text-foreground">{d.client}</td>
                    <td className="px-4 py-3.5 text-muted-foreground">{d.category}</td>
                    <td className="px-4 py-3.5 text-muted-foreground">{d.uploaded}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge tone={toneForStatus(d.ai)} dot>
                        {d.ai}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge tone={toneForStatus(d.verified)}>{d.verified}</StatusBadge>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <Button size="sm" variant="outline" className="text-xs font-semibold" asChild>
                        <Link to="/documents/$docId" params={{ docId: d.id }}>
                          Inspect
                        </Link>
                      </Button>
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
