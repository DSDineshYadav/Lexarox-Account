export type OnboardingStatus =
  | "Onboarding"
  | "Active"
  | "Review Required"
  | "Awaiting Documents"
  | "Completed";

export type Client = {
  id: string;
  name: string;
  type: "Limited Company" | "Sole Trader" | "Partnership" | "LLP";
  status: OnboardingStatus;
  documents: number;
  tasks: number;
  lastActivity: string;
  aiStatus: "Idle" | "Processing" | "Flagged" | "Up to date";
  manager: string;
  email: string;
  phone: string;
  utr: string;
  yearEnd: string;
  progress: number;
  language: string;
};

export const clients: Client[] = [
  {
    id: "brightside-consulting",
    name: "Brightside Consulting Ltd",
    type: "Limited Company",
    status: "Onboarding",
    documents: 12,
    tasks: 4,
    lastActivity: "12 minutes ago",
    aiStatus: "Processing",
    manager: "Andrea Whitfield",
    email: "finance@brightsideconsulting.co.uk",
    phone: "+44 20 7946 0812",
    utr: "48291 30017",
    yearEnd: "31 March",
    progress: 72,
    language: "English",
  },
  {
    id: "abc-ltd",
    name: "ABC Ltd",
    type: "Limited Company",
    status: "Awaiting Documents",
    documents: 8,
    tasks: 3,
    lastActivity: "1 hour ago",
    aiStatus: "Flagged",
    manager: "Daniel Okoye",
    email: "accounts@abc-ltd.co.uk",
    phone: "+44 161 496 0233",
    utr: "10394 88210",
    yearEnd: "31 December",
    progress: 54,
    language: "English",
  },
  {
    id: "xyz-ltd",
    name: "XYZ Trading Ltd",
    type: "Limited Company",
    status: "Review Required",
    documents: 26,
    tasks: 6,
    lastActivity: "3 hours ago",
    aiStatus: "Flagged",
    manager: "Priya Raman",
    email: "hello@xyztrading.com",
    phone: "+44 121 405 8890",
    utr: "77341 20984",
    yearEnd: "30 June",
    progress: 100,
    language: "English",
  },
  {
    id: "marisol-catering",
    name: "Marisol Catering",
    type: "Sole Trader",
    status: "Onboarding",
    documents: 5,
    tasks: 2,
    lastActivity: "Yesterday",
    aiStatus: "Processing",
    manager: "Priya Raman",
    email: "marisol@marisolcatering.es",
    phone: "+34 911 23 45 67",
    utr: "Pending",
    yearEnd: "5 April",
    progress: 38,
    language: "Spanish",
  },
  {
    id: "northgate-partners",
    name: "Northgate Partners LLP",
    type: "LLP",
    status: "Active",
    documents: 41,
    tasks: 1,
    lastActivity: "2 days ago",
    aiStatus: "Up to date",
    manager: "Andrea Whitfield",
    email: "partners@northgate.co.uk",
    phone: "+44 20 3355 1188",
    utr: "22910 43781",
    yearEnd: "31 October",
    progress: 100,
    language: "English",
  },
  {
    id: "kaya-logistics",
    name: "Kaya Logistics Ltd",
    type: "Limited Company",
    status: "Active",
    documents: 33,
    tasks: 2,
    lastActivity: "2 days ago",
    aiStatus: "Up to date",
    manager: "Daniel Okoye",
    email: "ops@kayalogistics.co.uk",
    phone: "+44 113 887 2201",
    utr: "58120 99341",
    yearEnd: "31 January",
    progress: 100,
    language: "Hindi",
  },
  {
    id: "aurora-dental",
    name: "Aurora Dental Practice",
    type: "Partnership",
    status: "Completed",
    documents: 29,
    tasks: 0,
    lastActivity: "4 days ago",
    aiStatus: "Idle",
    manager: "Priya Raman",
    email: "admin@auroradental.co.uk",
    phone: "+44 29 2018 4477",
    utr: "31882 55012",
    yearEnd: "31 May",
    progress: 100,
    language: "English",
  },
  {
    id: "sahar-textiles",
    name: "Sahar Textiles Ltd",
    type: "Limited Company",
    status: "Awaiting Documents",
    documents: 14,
    tasks: 5,
    lastActivity: "5 days ago",
    aiStatus: "Flagged",
    manager: "Daniel Okoye",
    email: "finance@sahartextiles.ae",
    phone: "+971 4 355 1120",
    utr: "90112 34558",
    yearEnd: "31 December",
    progress: 61,
    language: "Arabic",
  },
];

export const kpis = [
  {
    label: "Active Clients",
    value: "1,284",
    trend: "+3.2%",
    up: true,
    support: "42 added this quarter",
    icon: "clients",
  },
  {
    label: "Pending Onboarding",
    value: "24",
    trend: "-6",
    up: true,
    support: "9 waiting on the client",
    icon: "onboarding",
  },
  {
    label: "Documents Awaiting Review",
    value: "38",
    trend: "+12",
    up: false,
    support: "AI pre-processed 31 of them",
    icon: "documents",
  },
  {
    label: "Tasks Requiring Attention",
    value: "17",
    trend: "-4",
    up: true,
    support: "5 overdue across 3 clients",
    icon: "tasks",
  },
  {
    label: "AI Completed",
    value: "126",
    trend: "+18%",
    up: true,
    support: "Background actions today",
    icon: "ai",
  },
] as const;

export const aiActivity = [
  {
    agent: "Document Agent",
    action: "Processed 18 client documents and extracted 612 transactions",
    time: "8 min ago",
    status: "Completed" as const,
    review: false,
  },
  {
    agent: "Communication Agent",
    action: "Prepared 7 email drafts for year-end account approvals",
    time: "26 min ago",
    status: "Awaiting approval" as const,
    review: true,
  },
  {
    agent: "Document Agent",
    action: "Detected 4 missing documents across 3 onboarding clients",
    time: "48 min ago",
    status: "Needs review" as const,
    review: true,
  },
  {
    agent: "Document Agent",
    action: "Categorised 32 uploaded files into tax, bank and identity",
    time: "1 hr ago",
    status: "Completed" as const,
    review: false,
  },
  {
    agent: "Client Onboarding Agent",
    action: "Prepared multilingual onboarding instructions for 5 clients",
    time: "2 hrs ago",
    status: "Completed" as const,
    review: false,
  },
  {
    agent: "Accountancy Agent",
    action: "Flagged 3 ledger items for human review",
    time: "3 hrs ago",
    status: "Needs review" as const,
    review: true,
  },
];

export type Priority = "High" | "Medium" | "Low";

export const attention = [
  {
    id: "a1",
    kind: "Client document missing",
    title: "ABC Ltd is missing its bank statement",
    detail: "October 2025 statement was not included in the last upload batch.",
    priority: "High" as Priority,
    actions: ["Review"],
    client: "ABC Ltd",
  },
  {
    id: "a2",
    kind: "AI recommendation",
    title: "Unusual transaction detected for XYZ Trading Ltd",
    detail: "£18,400 payment to a new supplier falls outside normal patterns.",
    priority: "High" as Priority,
    actions: ["Review"],
    client: "XYZ Trading Ltd",
  },
  {
    id: "a3",
    kind: "Approval required",
    title: "Email prepared by AI for John Smith",
    detail: "Draft covering the 2025 annual accounts and filing deadline.",
    priority: "Medium" as Priority,
    actions: ["Approve", "Edit"],
    client: "Northgate Partners LLP",
  },
  {
    id: "a4",
    kind: "Onboarding exception",
    title: "Marisol Catering onboarding is incomplete",
    detail: "Client stalled at identity verification for 4 days.",
    priority: "Medium" as Priority,
    actions: ["View Client"],
    client: "Marisol Catering",
  },
  {
    id: "a5",
    kind: "AI recommendation",
    title: "VAT registration threshold approaching",
    detail: "Kaya Logistics Ltd is at 91% of the rolling 12-month threshold.",
    priority: "Low" as Priority,
    actions: ["Review"],
    client: "Kaya Logistics Ltd",
  },
  {
    id: "a6",
    kind: "Payroll discrepancy",
    title: "Aurora Dental Practice payroll variance detected",
    detail: "Monthly pension contribution offset differs by £480.",
    priority: "High" as Priority,
    actions: ["Review"],
    client: "Aurora Dental Practice",
  },
  {
    id: "a7",
    kind: "Tax filing deadline",
    title: "Brightside Consulting year-end audit due",
    detail: "Final statutory accounts require sign-off before Friday.",
    priority: "High" as Priority,
    actions: ["Approve"],
    client: "Brightside Consulting Ltd",
  },
  {
    id: "a8",
    kind: "Document verification",
    title: "Sahar Textiles multi-currency receipts uploaded",
    detail: "AI pre-processed 14 Arabic/English invoice receipts.",
    priority: "Medium" as Priority,
    actions: ["Verify"],
    client: "Sahar Textiles Ltd",
  },
  {
    id: "a9",
    kind: "Bank reconciliation",
    title: "Zenith Software unallocated £4,200 entry",
    detail: "Unmatched inbound transfer requires client category confirmation.",
    priority: "Medium" as Priority,
    actions: ["Review"],
    client: "Zenith Software Ltd",
  },
  {
    id: "a10",
    kind: "Compliance alert",
    title: "Apex Holdings confirmation statement due",
    detail: "Companies House annual confirmation statement due in 3 days.",
    priority: "Low" as Priority,
    actions: ["Review"],
    client: "Apex Holdings Ltd",
  },
];

export type DocCategory =
  | "Identity"
  | "Bank Statements"
  | "Tax Documents"
  | "Company Documents"
  | "Contracts"
  | "Other";

export type DocItem = {
  id: string;
  name: string;
  client: string;
  category: DocCategory;
  uploaded: string;
  ai: "Processing" | "Processed" | "Needs Review" | "Verified";
  verified: "Verified" | "Unverified" | "Rejected";
  size: string;
};

export const documents: DocItem[] = [
  {
    id: "doc-1",
    name: "Barclays_Business_Statement_Oct25.pdf",
    client: "ABC Ltd",
    category: "Bank Statements",
    uploaded: "12 Aug 2026",
    ai: "Needs Review",
    verified: "Unverified",
    size: "1.8 MB",
  },
  {
    id: "doc-2",
    name: "Director_Passport_JSmith.jpg",
    client: "Brightside Consulting Ltd",
    category: "Identity",
    uploaded: "12 Aug 2026",
    ai: "Verified",
    verified: "Verified",
    size: "740 KB",
  },
  {
    id: "doc-3",
    name: "VAT_Return_Q2_2026.pdf",
    client: "XYZ Trading Ltd",
    category: "Tax Documents",
    uploaded: "11 Aug 2026",
    ai: "Processed",
    verified: "Unverified",
    size: "320 KB",
  },
  {
    id: "doc-4",
    name: "Certificate_of_Incorporation.pdf",
    client: "Marisol Catering",
    category: "Company Documents",
    uploaded: "11 Aug 2026",
    ai: "Processing",
    verified: "Unverified",
    size: "512 KB",
  },
  {
    id: "doc-5",
    name: "Supplier_Agreement_Northvale.pdf",
    client: "Northgate Partners LLP",
    category: "Contracts",
    uploaded: "10 Aug 2026",
    ai: "Processed",
    verified: "Verified",
    size: "980 KB",
  },
  {
    id: "doc-6",
    name: "Payroll_Summary_July.xlsx",
    client: "Kaya Logistics Ltd",
    category: "Other",
    uploaded: "9 Aug 2026",
    ai: "Verified",
    verified: "Verified",
    size: "116 KB",
  },
  {
    id: "doc-7",
    name: "HSBC_Statement_Sept25.pdf",
    client: "Sahar Textiles Ltd",
    category: "Bank Statements",
    uploaded: "8 Aug 2026",
    ai: "Needs Review",
    verified: "Unverified",
    size: "2.1 MB",
  },
  {
    id: "doc-8",
    name: "Confirmation_Statement_CS01.pdf",
    client: "Aurora Dental Practice",
    category: "Company Documents",
    uploaded: "7 Aug 2026",
    ai: "Verified",
    verified: "Verified",
    size: "204 KB",
  },
];

export type Task = {
  id: string;
  name: string;
  client: string;
  assignee: string;
  priority: Priority;
  due: string;
  source: "AI" | "Manual" | "Workflow";
  status: "Open" | "In Progress" | "Blocked" | "Completed" | "Overdue";
  view: "My Tasks" | "Team Tasks" | "AI Tasks";
};

export const tasks: Task[] = [
  {
    id: "t1",
    name: "AI detected missing VAT documentation",
    client: "Brightside Consulting Ltd",
    assignee: "Andrea Whitfield",
    priority: "High",
    due: "Today",
    source: "AI",
    status: "Open",
    view: "AI Tasks",
  },
  {
    id: "t2",
    name: "Review unusual supplier payment",
    client: "XYZ Trading Ltd",
    assignee: "Andrea Whitfield",
    priority: "High",
    due: "Today",
    source: "AI",
    status: "In Progress",
    view: "My Tasks",
  },
  {
    id: "t3",
    name: "Chase October bank statement",
    client: "ABC Ltd",
    assignee: "Daniel Okoye",
    priority: "Medium",
    due: "14 Aug",
    source: "Workflow",
    status: "Open",
    view: "Team Tasks",
  },
  {
    id: "t4",
    name: "Complete identity verification",
    client: "Marisol Catering",
    assignee: "Priya Raman",
    priority: "Medium",
    due: "10 Aug",
    source: "AI",
    status: "Overdue",
    view: "Team Tasks",
  },
  {
    id: "t5",
    name: "Approve AI-prepared year-end email",
    client: "Northgate Partners LLP",
    assignee: "Andrea Whitfield",
    priority: "Low",
    due: "16 Aug",
    source: "AI",
    status: "Open",
    view: "My Tasks",
  },
  {
    id: "t6",
    name: "File confirmation statement",
    client: "Aurora Dental Practice",
    assignee: "Priya Raman",
    priority: "Low",
    due: "2 Aug",
    source: "Manual",
    status: "Completed",
    view: "Team Tasks",
  },
  {
    id: "t7",
    name: "Reconcile Q2 payroll journals",
    client: "Kaya Logistics Ltd",
    assignee: "Daniel Okoye",
    priority: "Medium",
    due: "18 Aug",
    source: "Manual",
    status: "In Progress",
    view: "Team Tasks",
  },
  {
    id: "t8",
    name: "Request Arabic onboarding walkthrough",
    client: "Sahar Textiles Ltd",
    assignee: "Priya Raman",
    priority: "High",
    due: "9 Aug",
    source: "AI",
    status: "Overdue",
    view: "AI Tasks",
  },
];

export const agents = [
  {
    id: "document",
    name: "Document Agent",
    description: "Processes, categorises and analyses client documents.",
    status: "Active" as const,
    completed: "126 documents processed today",
    current: "Extracting transactions from HSBC statement",
    lastRun: "2 min ago",
  },
  {
    id: "onboarding",
    name: "Client Onboarding Agent",
    description: "Guides clients through onboarding in their own language.",
    status: "Active" as const,
    completed: "14 onboarding journeys assisted",
    current: "Explaining ID requirements to Marisol Catering",
    lastRun: "9 min ago",
  },
  {
    id: "communication",
    name: "Communication Agent",
    description: "Prepares emails and client communications for approval.",
    status: "Awaiting approval" as const,
    completed: "7 drafts prepared today",
    current: "Holding 7 drafts for human approval",
    lastRun: "26 min ago",
  },
  {
    id: "accountancy",
    name: "Accountancy Agent",
    description: "Supports ledger, VAT and year-end workflows.",
    status: "Active" as const,
    completed: "3 ledgers reconciled",
    current: "Checking VAT thresholds across 42 clients",
    lastRun: "34 min ago",
  },
  {
    id: "task",
    name: "Task Agent",
    description: "Creates, routes and prioritises work across the team.",
    status: "Active" as const,
    completed: "21 tasks created and routed",
    current: "Re-prioritising the overdue queue",
    lastRun: "1 hr ago",
  },
  {
    id: "marketing",
    name: "Marketing Agent",
    description: "Supports campaigns, newsletters and client nurture.",
    status: "Paused" as const,
    completed: "0 actions today",
    current: "Paused pending content approval",
    lastRun: "Yesterday",
  },
];

export const reviewQueue = [
  {
    id: "r1",
    did: "Prepared a year-end accounts email for John Smith",
    why: "Outbound client communication always requires human approval.",
    recommendation: "Send as drafted — figures match the filed accounts.",
    confidence: 94,
    client: "Northgate Partners LLP",
    agent: "Communication Agent",
    action: "Approve & send",
  },
  {
    id: "r2",
    did: "Flagged an £18,400 payment to Northvale Supplies",
    why: "First payment to this supplier and 6x the typical value.",
    recommendation: "Confirm with the client before categorising as cost of sales.",
    confidence: 71,
    client: "XYZ Trading Ltd",
    agent: "Accountancy Agent",
    action: "Confirm with client",
  },
  {
    id: "r3",
    did: "Identified a missing month in the bank statement series",
    why: "October 2025 is absent between September and November.",
    recommendation: "Request the October statement from the client.",
    confidence: 98,
    client: "ABC Ltd",
    agent: "Document Agent",
    action: "Request document",
  },
  {
    id: "r4",
    did: "Categorised 32 uploaded files",
    why: "4 files scored below the auto-approval confidence threshold.",
    recommendation: "Accept 28 categorisations, review the remaining 4.",
    confidence: 82,
    client: "Multiple clients",
    agent: "Document Agent",
    action: "Review 4 files",
  },
  {
    id: "r5",
    did: "Drafted Spanish onboarding instructions",
    why: "Client-facing multilingual content is reviewed before sending.",
    recommendation: "Approve — terminology checked against the UK glossary.",
    confidence: 89,
    client: "Marisol Catering",
    agent: "Client Onboarding Agent",
    action: "Approve",
  },
];

export const surveyInsights = {
  firms: 148,
  responses: 1032,
  painPoints: [
    { label: "Chasing client documents", value: 82 },
    { label: "Manual data entry", value: 74 },
    { label: "Onboarding admin", value: 63 },
    { label: "Client communication volume", value: 57 },
    { label: "Compliance deadlines", value: 41 },
  ],
  adoption: [
    { label: "Using AI daily", value: 18 },
    { label: "Piloting AI", value: 31 },
    { label: "Evaluating", value: 27 },
    { label: "No plans", value: 24 },
  ],
  requested: [
    "Automatic document chasing",
    "AI bank statement processing",
    "Multilingual client onboarding",
    "Draft email preparation",
    "Exception-only review queues",
  ],
};

export const teamMembers = [
  { name: "Andrea Whitfield", role: "Admin", clients: 42, workload: 78, email: "andrea@lexarox.com" },
  { name: "Daniel Okoye", role: "Manager", clients: 51, workload: 64, email: "daniel@lexarox.com" },
  { name: "Priya Raman", role: "Accountancy Staff", clients: 37, workload: 91, email: "priya@lexarox.com" },
  { name: "Tomas Alvarez", role: "Accountancy Staff", clients: 29, workload: 45, email: "tomas@lexarox.com" },
  { name: "Grace Mbeki", role: "Onboarding Specialist", clients: 18, workload: 52, email: "grace@lexarox.com" },
];

export const languages = ["English", "Spanish", "French", "Hindi", "Arabic", "German"];

// Dashboard Chart Metrics (Lexarox Accounts CRM & Operations)
export const revenueLeadGrowth = [
  { month: "Jan", revenue: 42500, leads: 34, onboarding: 12, completed: 18 },
  { month: "Feb", revenue: 48900, leads: 42, onboarding: 16, completed: 22 },
  { month: "Mar", revenue: 54200, leads: 50, onboarding: 19, completed: 27 },
  { month: "Apr", revenue: 51800, leads: 48, onboarding: 15, completed: 24 },
  { month: "May", revenue: 63100, leads: 62, onboarding: 24, completed: 35 },
  { month: "Jun", revenue: 68400, leads: 70, onboarding: 28, completed: 39 },
  { month: "Jul", revenue: 74900, leads: 84, onboarding: 32, completed: 46 },
  { month: "Aug", revenue: 81500, leads: 92, onboarding: 38, completed: 52 },
];

export const portfolioStatusDistribution = [
  { name: "Active Accounts", value: 62, color: "#3cadf1" },
  { name: "Onboarding", value: 22, color: "#50b546" },
  { name: "Awaiting Docs", value: 16, color: "#e2008e" },
  { name: "Review Required", value: 10, color: "#a855f7" },
  { name: "Completed", value: 38, color: "#10b981" },
];

export const leadConversionVelocity = [
  { stage: "Leads Inflow", count: 120, conversion: "100%" },
  { stage: "Doc Chased", count: 94, conversion: "78%" },
  { stage: "AI Verified", count: 82, conversion: "68%" },
  { stage: "Review Approved", count: 72, conversion: "60%" },
  { stage: "Fully Active", count: 62, conversion: "51%" },
];

export const aiAutomationMetrics = [
  { name: "Automated (98.4%)", value: 126, color: "#3cadf1" },
  { name: "Requires Human Review", value: 18, color: "#50b546" },
  { name: "Flagged Anomalies", value: 4, color: "#e2008e" },
];


