import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, TrendingUp, Sparkles, CheckCircle2, Calendar, Download, RefreshCw, Layers } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { AppShell, PageHeader } from "@/components/app-shell";
import { KpiCard, Section, AiInsight } from "@/components/kit";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Analytics — LexaRox Accounts" },
      {
        name: "description",
        content: "Client growth, onboarding completion, AI automation rate and team workload analytics.",
      },
      { property: "og:title", content: "Reports & Analytics — LexaRox Accounts" },
      { property: "og:description", content: "Operational analytics for an AI-first accountancy firm." },
    ],
  }),
  component: Reports,
});

const clientGrowthData = [
  { month: "Jan", clients: 42, target: 40 },
  { month: "Feb", clients: 48, target: 45 },
  { month: "Mar", clients: 51, target: 50 },
  { month: "Apr", clients: 60, target: 55 },
  { month: "May", clients: 58, target: 60 },
  { month: "Jun", clients: 67, target: 65 },
  { month: "Jul", clients: 74, target: 70 },
  { month: "Aug", clients: 81, target: 78 },
  { month: "Sep", clients: 79, target: 82 },
  { month: "Oct", clients: 88, target: 88 },
  { month: "Nov", clients: 96, target: 92 },
  { month: "Dec", clients: 104, target: 100 },
];

const workloadDistribution = [
  { name: "Auto-approved", value: 68, color: "#50b546" },
  { name: "Human Review", value: 24, color: "#3cadf1" },
  { name: "Edited Before Approval", value: 6, color: "#f59e0b" },
  { name: "Rejected", value: 2, color: "#e2008e" },
];

const weeklyTasksData = [
  { week: "W1", completed: 128, aiGenerated: 85 },
  { week: "W2", completed: 141, aiGenerated: 98 },
  { week: "W3", completed: 119, aiGenerated: 76 },
  { week: "W4", completed: 163, aiGenerated: 115 },
  { week: "W5", completed: 158, aiGenerated: 110 },
  { week: "W6", completed: 174, aiGenerated: 130 },
];

const teamCapacityData = [
  { name: "Andrea W.", capacity: 78, tasks: 42 },
  { name: "Daniel O.", capacity: 64, tasks: 31 },
  { name: "Priya R.", capacity: 91, tasks: 56 },
  { name: "Tomas A.", capacity: 45, tasks: 22 },
];

function Reports() {
  const [timeRange, setTimeRange] = useState("This Year");

  return (
    <AppShell>
      <PageHeader
        title="Reports & Operational Analytics"
        subtitle="Real-time firm performance, client growth, AI efficiency and team capacity."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success("Analytics refreshed with live database metrics")}
            >
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Refresh
            </Button>
            <Button
              size="sm"
              className="bg-[#3cadf1] hover:bg-[#3cadf1]/90 text-white font-semibold"
              onClick={() => toast.success("Executive PDF report generated & downloading")}
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> Export PDF
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Client Portfolio Growth"
          value="+104"
          trend="+22.4%"
          up={true}
          support="New clients added YTD"
          icon={<TrendingUp className="h-5 w-5" />}
          variant="cyan"
        />
        <KpiCard
          label="Onboarding SLA Rate"
          value="86%"
          trend="+5.2%"
          up={true}
          support="Completed within 14 days"
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="green"
        />
        <KpiCard
          label="AI Processed Documents"
          value="4,912"
          trend="+34%"
          up={true}
          support="Auto-categorised this Q"
          icon={<Sparkles className="h-5 w-5" />}
          variant="purple"
        />
        <KpiCard
          label="Automation Rate"
          value="68%"
          trend="+8.1%"
          up={true}
          support="Eligible actions fully automated"
          icon={<BarChart3 className="h-5 w-5" />}
          variant="amber"
        />
      </div>

      {/* AI Performance Insight */}
      <AiInsight
        title="AI Operational Intelligence Summary"
        className="mb-6"
        actions={
          <Button size="sm" variant="outline" onClick={() => toast.info("Navigating to AI Workspace")}>
            View AI Audit Logs
          </Button>
        }
      >
        Automated workflows saved an estimated <strong>142 hours</strong> of manual labor this month across bookkeeping, onboarding reminders, and OCR extraction. Operational accuracy holds high at <strong>98.4%</strong>.
      </AiInsight>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Client Growth Chart */}
        <Section
          title="Client Growth Dynamics"
          description="Cumulative active clients vs monthly target"
          actions={
            <div className="flex gap-1">
              {["This Year", "Last 6 Mo"].map((range) => (
                <Button
                  key={range}
                  size="sm"
                  variant={timeRange === range ? "default" : "ghost"}
                  onClick={() => setTimeRange(range)}
                  className="h-7 text-xs"
                >
                  {range}
                </Button>
              ))}
            </div>
          }
        >
          <div className="h-72 w-full p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={clientGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="clientGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3cadf1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3cadf1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "12px",
                    color: "#0f172a",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                />
                <Area type="monotone" dataKey="clients" stroke="#3cadf1" strokeWidth={3} fillOpacity={1} fill="url(#clientGrad)" name="Active Clients" />
                <Area type="monotone" dataKey="target" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4 4" fill="none" name="Growth Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Workload Distribution Pie Chart */}
        <Section title="AI Review & Workload Distribution" description="Item approvals and exceptions breakdown">
          <div className="grid grid-cols-1 items-center gap-4 p-4 sm:grid-cols-2">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workloadDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {workloadDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e2e8f0",
                      borderRadius: "12px",
                      color: "#0f172a",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {workloadDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-2 border-b border-border/40 pb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                  <span className="font-bold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Tasks Completed Bar Chart */}
        <Section title="Weekly Task Velocity" description="Total completed vs AI-assisted tasks">
          <div className="h-72 w-full p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTasksData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "12px",
                    color: "#0f172a",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar dataKey="completed" fill="#3cadf1" radius={[4, 4, 0, 0]} name="Total Tasks Completed" />
                <Bar dataKey="aiGenerated" fill="#50b546" radius={[4, 4, 0, 0]} name="AI Generated Tasks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Team Utilization Bar Chart */}
        <Section title="Team Capacity Utilization" description="Current workload percentage per team member">
          <div className="h-72 w-full p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamCapacityData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "12px",
                    color: "#0f172a",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="capacity" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Capacity Load (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
