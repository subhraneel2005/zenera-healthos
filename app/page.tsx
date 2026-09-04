import Mermaid from "@/components/Mermaid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LuFileSearch,
  LuShieldCheck,
  LuClipboardCheck,
  LuActivity,
  LuTriangleAlert,
  LuCalculator,
  LuRadar,
  LuTarget,
  LuBoxes,
  LuCpu,
  LuDatabase,
  LuLayers,
  LuBrain,
  LuFileText,
  LuCode,
  LuUsers,
  LuLock,
  LuPlug,
  LuLayoutDashboard,
  LuTestTube,
  LuCalendarClock,
  LuCircleCheckBig,
  LuRocket,
  LuWrench,
  LuUserCog,
  LuLightbulb,
  LuShoppingBag,
  LuZap,
  LuHammer,
  LuShieldAlert,
  LuPlus,
  LuBookOpen,
  LuArrowRight,
} from "react-icons/lu";
import type { IconType } from "react-icons";

/* ---------- small helpers ---------- */

function Section({
  id,
  index,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  index: string;
  title: string;
  icon?: IconType;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-12 md:py-16">
      <div className="mb-8 flex items-center gap-4">
        {Icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Icon size={20} />
          </span>
        )}
        <span className="font-mono text-3xl font-bold text-muted-foreground md:text-4xl">
          {index}
        </span>
        <h2 className="text-2xl font-bold leading-tight md:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/* ---------- data ---------- */

const modules: {
  n: string;
  name: string;
  color: string;
  desc: string;
  Icon: IconType;
}[] = [
  { n: "01", name: "AI Bill Auditor", color: "bg-primary", Icon: LuFileSearch, desc: "Catch missed, duplicate, package-mismatch and suspicious billing lines before the bill is finalized." },
  { n: "02", name: "Insurance & TPA Copilot", color: "bg-blue-500/15 dark:bg-blue-400/20", Icon: LuShieldCheck, desc: "Turn policy/TPA documents into a claim-readiness view with evidence-backed answers." },
  { n: "03", name: "AI Discharge Manager", color: "bg-secondary", Icon: LuClipboardCheck, desc: "Stop discharge from becoming a department-chasing exercise with a generated checklist + blockers." },
  { n: "04", name: "Claim Risk Predictor", color: "bg-green-500/15 dark:bg-green-400/20", Icon: LuActivity, desc: "Estimate, before submission, whether a claim will be queried, rejected or delayed — with reasons." },
  { n: "05", name: "Denial / Query Intelligence", color: "bg-purple-500/15 dark:bg-purple-400/20", Icon: LuTriangleAlert, desc: "Turn every claim query/rejection into reusable, classified operational knowledge." },
  { n: "06", name: "Revenue Reconciliation", color: "bg-primary", Icon: LuCalculator, desc: "Show where money is across billed, approved, patient-paid, settled and outstanding states." },
  { n: "07", name: "Revenue Leakage Radar", color: "bg-blue-500/15 dark:bg-blue-400/20", Icon: LuRadar, desc: "Management dashboard that tells leadership where revenue is lost, delayed or at risk." },
];

const archLayers = [
  ["Identity", "Firebase Authentication", "Hospital staff login, reset, MFA where enabled, ID tokens"],
  ["Database", "Cloud Firestore", "Patients, encounters, billing, claims, workflows, findings, audit metadata"],
  ["Documents", "Cloud Storage for Firebase", "Insurance PDFs, invoices, reports, claim evidence, attachments"],
  ["Server Logic", "Cloud Functions for Firebase", "Triggers, scheduled jobs, notifications, validation, workflow events"],
  ["AI/ML Runtime", "Cloud Run", "Python FastAPI, OCR, RAG, ML inference, orchestration"],
  ["Security", "App Check + Security Rules + IAM", "Abuse protection, data access controls, server access controls"],
  ["Hosting", "Firebase App Hosting", "HealthOS web deployment with CI/CD"],
  ["Notifications", "FCM / email-SMS", "Task alerts and operational notifications (no PHI in text)"],
];

const team = [
  ["Swastik Dutta", "Product Engineering Lead", "App shell, navigation, role-aware UI, dashboard UX, release coordination"],
  ["Sanjay S", "Backend & Firebase Platform Lead", "Firestore schema, Cloud Functions, API contracts, tenant model, events"],
  ["Naman AU", "Shared AI Platform Lead", "AI gateway, structured outputs, prompt registry, guardrails, evaluation"],
  ["Pragna R", "Security & Compliance Lead", "Threat model, tenant isolation, App Check, IAM, security rules"],
  ["Subhraneel Goswami", "Claims Intelligence Lead", "RAG, claim requirements, denial interpretation, claim explainability"],
  ["Priyanka M", "Revenue Analytics Lead", "KPI model, reconciliation engine, leakage economics, metrics"],
  ["Dhyuthi Shree KS", "Document Intelligence Lead", "Ingestion, extraction schemas, OCR/vision, metadata mapping"],
  ["Chandini N", "Claim Risk ML Lead", "Risk scoring, feature engineering, calibration, drift monitoring"],
  ["Chandana Gowda", "Billing Audit ML Lead", "Missed/duplicate charge detection, anomaly scoring, FP review loops"],
  ["Ayushi Gautam", "Hospital Discovery & Pilot Lead", "Workflow discovery, buyer interviews, pilot recruitment"],
  ["Debanjali Biswas", "Product Marketing & Enablement", "Messaging, demo narrative, case studies, launch content"],
];

const roles = [
  ["Hospital Admin", "Tenant setup, users, branches, configuration, operational dashboards"],
  ["Billing Executive", "Billing, invoices, payments, bill audits, reconciliation queue"],
  ["Insurance/TPA Executive", "Policies, preauth, claims, risk review, queries/denials"],
  ["Doctor / Clinical Admin", "Encounter/discharge documentation and clinical evidence"],
  ["Nurse / Department User", "Assigned workflow tasks and operational completion statuses"],
  ["Finance Manager", "Reconciliation, settlement, financial dashboards, write-off review"],
  ["Hospital Management", "Executive dashboards, revenue-at-risk, trends, bottlenecks"],
  ["Zenera Support", "Time-limited, approved support access only — no default PHI access"],
  ["Zenera Super Admin", "Platform-level management, audited break-glass for support"],
];

const timeline = [
  ["Wk 1–2", "Discovery + Architecture", "Ayushi, Swastik, Sanjay, Naman, Pragna"],
  ["Wk 3–4", "Core Platform", "Sanjay, Swastik, Pragna"],
  ["Wk 5–6", "Patient + Encounter + Billing", "Sanjay, Swastik, Priyanka"],
  ["Wk 7–8", "AI Bill Auditor", "Chandana, Naman, Dhyuthi, Priyanka"],
  ["Wk 9–10", "Insurance + Claim Workspace", "Subhraneel, Dhyuthi, Sanjay, Swastik"],
  ["Wk 11–12", "Discharge + Claim Risk", "Dhyuthi, Chandini, Sanjay, Subhraneel"],
  ["Wk 13–14", "Denial + Reconciliation", "Subhraneel, Priyanka, Chandini, Sanjay"],
  ["Wk 15", "Leakage Radar + Integration", "Priyanka, Swastik, Sanjay, Ayushi"],
  ["Wk 16", "Hardening + Pilot Readiness", "Entire team + Ayushi"],
];

const additions = [
  ["Synthetic demo / mock mode", "A first-run mode seeded with synthetic patients, encounters and claims so prospects can click through the full loop without importing real data. Reinforces the 'synthetic data until security approval' rule."],
  ["Observability & status surface", "Explicit error/empty/loading states, a health dashboard for the Cloud Run AI services, and structured error codes — the spec lists SAST/DAST and monitoring but not a user-facing status/alerting surface."],
  ["AI cost & quota guardrails", "Per-tenant token/spend caps and a usage dashboard, since AI is metered and the commercial model is usage-based."],
  ["Accessibility baseline (WCAG AA)", "Keyboard navigation, focus states and contrast — important for hospital staff on varied devices, and easy to bake in with shadcn focus rings."],
  ["Compliance export kit", "One-click export of audit events and AI findings for the hospital's compliance/audit needs (links to the existing export/delete runbook)."],
  ["Localization readiness", "String extraction / i18n hooks so Indian-language hospital interfaces can be added later without a rewrite."],
];

/* ---------- mermaid diagrams ---------- */

const architectureChart = `flowchart TD
  U(("Hospital User")) --> A(("ZENERA HEALTHOS WEB APP"))
  subgraph CORE["Core Platform"]
    I["Identity / RBAC"]
    P["Patient + Encounter"]
    B["Billing Ledger"]
    D["Documents"]
    C["Claims"]
    W["Workflows / Tasks"]
    R["Revenue Analytics"]
  end
  A --> CORE
  subgraph AI["Shared AI Layer"]
    M1["1 · AI Bill Auditor"]
    M2["2 · Insurance & TPA Copilot"]
    M3["3 · AI Discharge Manager"]
    M4["4 · Claim Risk Predictor"]
    M5["5 · Denial / Query Intelligence"]
    M6["6 · Revenue Reconciliation"]
    M7["7 · Revenue Leakage Radar"]
  end
  A --> AI
  A --> G(("Firebase + Google Cloud<br/>Firestore · Storage · Auth · Functions · App Check · Cloud Run"))
  classDef layer fill:#fff,stroke:#000,stroke-width:2px;
  class U,A,G layer;`;

const docPipelineChart = `flowchart TD
  U["Upload"] --> V["Validate type + size + tenant"]
  V --> S["Store original in Cloud Storage"]
  S --> M["Create metadata in Firestore"]
  M --> E["Cloud Run extraction service"]
  E --> O["OCR / layout / structured fields"]
  O --> VC{"Validation + confidence"}
  VC -->|fail| RH["Retry / Human review"]
  RH --> O
  VC -->|pass| ID["Index chunks + metadata<br/>(tenant-scoped retrieval)"]
  ID --> LK["Link to encounter / claim / policy / invoice"]
  classDef step fill:#fff,stroke:#000,stroke-width:2px;
  class U,V,S,M,E,O,VC,RH,ID,LK step;`;

const aiPipelineChart = `flowchart LR
  IN(["INPUT"]) --> N["Normalize"]
  N --> DV["Deterministic validation"]
  DV --> RE["Retrieve tenant-scoped evidence"]
  RE --> MI["Model inference"]
  MI --> SV["Schema validation"]
  SV --> EC["Evidence / consistency check"]
  EC --> CT{"Confidence threshold"}
  CT -->|below| HR(["Human Review Queue"])
  CT -->|above| PF["Persist finding"]
  HR --> PF
  PF --> AE["Emit audit event"]
  classDef stage fill:#fff,stroke:#000,stroke-width:2px;
  class IN,N,DV,RE,MI,SV,EC,CT,HR,PF,AE stage;`;

/* ---------- page ---------- */

export default function Home() {
  return (
    <div className="font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-[100] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center gap-2 font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <LuActivity size={16} />
            </span>
            <span className="hidden text-lg sm:block">ZENERA HEALTHOS</span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-medium md:flex" aria-label="Section navigation">
            <a href="#modules" className="rounded-md px-3 py-1.5 hover:bg-muted">Modules</a>
            <a href="#arch" className="rounded-md px-3 py-1.5 hover:bg-muted">Arch</a>
            <a href="#ai" className="rounded-md px-3 py-1.5 hover:bg-muted">AI Layer</a>
            <a href="#security" className="rounded-md px-3 py-1.5 hover:bg-muted">Security</a>
            <a href="#timeline" className="rounded-md px-3 py-1.5 hover:bg-muted">Timeline</a>
            <a href="#add" className="rounded-md px-3 py-1.5 hover:bg-muted">Additions</a>
              <a href="/team" className={`${buttonVariants({ variant: "outline", size: "sm" })} ml-1`}>
                Team Map
              </a>
          </nav>
          <a href="#top" className={buttonVariants({ variant: "outline", size: "sm" })}>
            v2.0 Spec
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="border-b bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge>AI SaaS</Badge>
              <Badge variant="secondary">Hospital Revenue</Badge>
              <Badge variant="outline">Firebase</Badge>
            </div>
            <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">
              ZENERA
              <br />
              HEALTH<span className="text-muted-foreground">OS</span>
            </h1>
            <p className="mt-4 max-w-md text-lg font-medium">
              AI-Powered Hospital Revenue &amp; Operations SaaS.
            </p>
            <p className="mt-3 max-w-md font-mono text-sm text-muted-foreground">
              Internal Product + Engineering Handoff · Version 2.0 · August 2026
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#arch" className={buttonVariants()}>
                Read the build spec <LuArrowRight size={16} className="ml-1" aria-hidden="true" />
              </a>
              <a href="#modules" className={buttonVariants({ variant: "secondary" })}>
                The 7 modules
              </a>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
                One product · Seven modules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {modules.map((m) => (
                  <div
                    key={m.n}
                    className={`flex items-center gap-3 rounded-lg border p-2.5 ${m.color}`}
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-background">
                      <m.Icon size={16} />
                    </span>
                    <span className="text-sm font-semibold">{m.name}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-sm font-bold">
                One SaaS. One revenue-cycle workflow.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <main id="main" className="mx-auto max-w-6xl px-4">
        {/* EXEC SUMMARY */}
        <Section id="summary" index="01" title="Executive Summary & Positioning" icon={LuTarget}>
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <p className="font-bold">What it is</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Not a generic hospital ERP. A hospital revenue-cycle &amp;
                  operational intelligence platform that starts as an overlay on
                  existing systems and expands toward broader management. Seven
                  tightly connected modules reinforce one
                  patient→encounter→billing→claim→revenue loop.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="font-bold">The core promise</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>Find money hospitals are losing or delaying.</li>
                  <li>Prevent claim problems before submission.</li>
                  <li>Cut manual chasing between departments.</li>
                  <li>Give management a live picture of revenue at risk.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Card className="border-blue-500/30 bg-blue-500/10 dark:border-blue-400/30 dark:bg-blue-400/10">
              <CardContent className="pt-6">
                <p className="flex items-center gap-2 font-bold">
                  <LuShoppingBag size={18} aria-hidden="true" /> What the customer buys
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  <li>One web app, one tenant, one login, one subscription.</li>
                  <li>Shared patient/encounter/claim/revenue data.</li>
                  <li>Evidence-backed, explainable, human-reviewable AI.</li>
                  <li>Real-time operational queues.</li>
                  <li>Integration so hospitals keep existing HIS/HMIS/EMR.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-green-500/30 bg-green-500/10 dark:border-green-400/30 dark:bg-green-400/10">
              <CardContent className="pt-6">
                <p className="flex items-center gap-2 font-bold">
                  <LuZap size={18} aria-hidden="true" /> What makes it different
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  <li>Revenue-cycle focus, not feature-count.</li>
                  <li>Seven modules reinforce each other.</li>
                  <li>AI embedded in workflows, not a chatbot gimmick.</li>
                  <li>Deterministic math stays the source of truth.</li>
                  <li>Every AI finding has evidence + reviewer trail.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Alert className="mt-5">
            <LuHammer className="h-4 w-4" />
            <AlertTitle className="text-xs font-bold uppercase tracking-wide">Build decision</AlertTitle>
            <AlertDescription className="mt-1 text-sm">
              Use the existing Firebase project as the platform backbone for
              MVP: Firebase Authentication, Cloud Firestore, Cloud Storage, Cloud
              Functions, App Check and Hosting where useful. Use Cloud Run for
              heavier Python AI/ML workloads. Do not put all AI/ML inference
              inside Functions.
            </AlertDescription>
          </Alert>
        </Section>

        {/* MODULES */}
        <Section id="modules" index="02" title="The Seven Intelligence Modules" icon={LuBoxes}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <Card key={m.n}>
                <CardContent className="pt-6">
                  <div
                    className={`mb-3 grid h-11 w-11 place-items-center rounded-lg ${m.color}`}
                  >
                    <m.Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold">{m.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* ARCHITECTURE */}
        <Section id="arch" index="03" title="Product Architecture: One Platform, Seven Modules" icon={LuCpu}>
          <Card>
            <CardContent className="pt-6">
              <Mermaid
                chart={architectureChart}
                caption="Zenera HealthOS platform architecture: hospital user into the web app, core platform, shared AI layer with seven modules, and Firebase + Google Cloud."
              />
            </CardContent>
          </Card>

          <h3 className="mb-3 mt-8 text-xl font-bold">
            Firebase Architecture &amp; Why It Fits
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Layer</TableHead>
                  <TableHead>Firebase / GCP choice</TableHead>
                  <TableHead>Use in HealthOS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archLayers.map(([a, b, c]) => (
                  <TableRow key={a}>
                    <TableCell className="font-medium">{a}</TableCell>
                    <TableCell>{b}</TableCell>
                    <TableCell className="text-muted-foreground">{c}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Alert variant="destructive" className="mt-5">
            <LuShieldAlert className="h-4 w-4" />
            <AlertTitle className="text-xs font-bold uppercase tracking-wide">Healthcare security caveat</AlertTitle>
            <AlertDescription className="mt-1 text-sm">
              Firebase/Google Cloud services do not automatically make an
              application compliant. Google states customers remain responsible
              for their own compliance controls. For U.S. HIPAA, the appropriate
              BAA is required and only covered services should handle PHI. For
              India, complete the applicable privacy, healthcare-data and
              contractual requirements with legal/security review before a real
              pilot.
            </AlertDescription>
          </Alert>

          <Alert className="mt-5 border-dashed">
            <LuLightbulb className="h-4 w-4" />
            <AlertTitle className="text-xs font-bold uppercase tracking-wide">
              Alternative backend stack worth considering (suggestion only)
            </AlertTitle>
            <AlertDescription className="mt-2 text-sm">
              <p className="mb-2">
                The spec is intentionally Firebase-first. As a non-binding
                suggestion, the same architecture can be built on a relational
                stack that many teams find easier to reason about for financial
                data and RAG:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <b>Postgres instead of Cloud Firestore</b> — strong transactional
                  guarantees for financial writes, mature multi-tenant patterns
                  (row-level security / schema-per-tenant), and easier deterministic
                  reconciliation SQL.
                </li>
                <li>
                  <b>pgvector instead of a separate vector store for RAG</b> —
                  policy/claim/denial chunks and tenant-scoped retrieval live next
                  to the operational data, with source-metadata filtering.
                </li>
                <li>
                  <b>better-auth instead of Firebase Authentication</b> — self-hosted,
                  framework-friendly auth with roles/custom claims you fully own,
                  no lock-in, and easy integration with the Postgres tenant model.
                </li>
              </ul>
              <p className="mt-2 text-muted-foreground">
                This does not change the MVP scope, the seven modules, or the
                revenue-cycle workflow — only where the bytes live. Cloud Run,
                App Check-style abuse protection, Secret Manager and IAM concepts
                still apply.
              </p>
            </AlertDescription>
          </Alert>

          <h3 className="mb-3 mt-8 text-lg font-bold">
            Firebase implementation rules
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "No wildcard Firestore rules (allow read, write: if true).",
              "Tenant ID is part of every top-level data decision.",
              "Custom claims + server-side auth; mirror in Security Rules.",
              "All prod Storage paths include tenant + branch scoping.",
              "Enable App Check for client-facing resources.",
              "Service accounts/IAM for server access, never admin creds in browser.",
              "Cloud Run for Python/ML; keys in Secret Manager.",
              "Immutable audit events for financial actions.",
              "No PHI in logs, analytics or push notifications.",
            ].map((r) => (
              <div key={r} className="rounded-lg border p-3 text-sm">
                {r}
              </div>
            ))}
          </div>
        </Section>

        {/* DOMAIN MODEL */}
        <Section id="domain" index="04" title="Shared Domain Model & Firestore Structure" icon={LuDatabase}>
          <p className="mb-4 text-sm text-muted-foreground">
            Tenant-first. No flat database where records can be queried without
            tenant scoping.
          </p>
          <div className="overflow-x-auto">
            <Card>
              <CardContent className="pt-6 font-mono text-xs leading-relaxed">
                <p>/tenants/{"{tenantId}"}</p>
                <p className="pl-4">/branches /departments /users /roles</p>
                <p className="pl-4">/patients/{"{patientId}"}/encounters/{"{encounterId}"}</p>
                <p className="pl-4">/encounters/{"{encounterId}"}/charges</p>
                <p className="pl-4">/invoices /payments</p>
                <p className="pl-4">/insurancePolicies /preauths</p>
                <p className="pl-4">/claims/{"{claimId}"}/documents|events|queries|settlements</p>
                <p className="pl-4">/documents /workflows /tasks</p>
                <p className="pl-4">/aiFindings /auditEvents</p>
                <p className="pl-4">/config/billingRules|claimRules|roles|aiPolicies</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entity</TableHead>
                  <TableHead>Must contain</TableHead>
                  <TableHead>Why it matters</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["Patient", "patientId, tenantId, MRN, demographics, contact, status", "Stable patient identity."],
                  ["Encounter", "encounterId, patientId, branchId, dates, payerId, status", "Link between clinical + revenue activity."],
                  ["Charge", "chargeId, encounterId, serviceCode, qty, unitPrice, sourceEvent", "Atomic billable event; sourceEvent = auditability."],
                  ["Invoice", "invoiceId, encounterId, lineItems, totals, finalizedAt", "Financial doc; totals are deterministic."],
                  ["Claim", "claimId, encounterId, payer, TPA, amountSubmitted, SLA", "Unit of insurance revenue tracking."],
                  ["AI Finding", "module, category, confidence, reasonCodes, evidenceRefs, reviewerId", "Explainable AI + human-review trail."],
                  ["Audit Event", "actorId, role, action, entityId, before/afterHash", "Traceability for sensitive actions."],
                ].map(([a, b, c]) => (
                  <TableRow key={a}>
                    <TableCell className="font-medium">{a}</TableCell>
                    <TableCell className="font-mono text-xs">{b}</TableCell>
                    <TableCell className="text-muted-foreground">{c}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Section>

        {/* MODULE DETAILS */}
        <Section id="module-detail" index="05" title="Module Deep-Dives" icon={LuLayers}>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Badge>M1</Badge>
                  <h3 className="text-lg font-bold">AI Bill Auditor</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Workflow: open encounter → Run Bill Audit (or event-triggered) →
                  deterministic rules first (dup IDs, invalid qty, impossible
                  totals, package constraints) → ML/AI on normalized set → findings
                  stored with confidence + evidence + financial impact → staff
                  review (accept / dismiss / investigate / false-positive). System
                  never silently edits the invoice in MVP.
                </p>
                <p className="mt-2 text-sm font-medium">Detection categories</p>
                <p className="text-sm text-muted-foreground">
                  Missed charge · Duplicate charge · Package inconsistency ·
                  Quantity anomaly · Rate anomaly · Temporal anomaly ·
                  Documentation gap · Manual adjustment anomaly.
                </p>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  Owners: Chandana (rules), Priyanka (impact), Sanjay (ledger APIs),
                  Naman (AI contract), Dhyuthi (evidence), Swastik (UI), Pragna (security).
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-500/10 dark:border-blue-400/30 dark:bg-blue-400/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">M2</Badge>
                  <h3 className="text-lg font-bold">Insurance &amp; TPA Copilot</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Upload policy/TPA docs → extract structured fields → RAG retrieves
                  relevant clauses for the encounter → generate claim-readiness view
                  (covered / unknown / not covered, required documents, constraints,
                  questions) → every answer cites source document/page/chunk → user
                  approves facts into configurable payer rules.
                </p>
                <Alert variant="destructive" className="mt-3">
                  <LuShieldAlert className="h-4 w-4" />
                  <AlertTitle className="text-xs font-bold">Hard AI rule</AlertTitle>
                  <AlertDescription className="text-sm">
                    Never state an uncertain interpretation as fact. Use labels:
                    &quot;Found in source,&quot; &quot;Not found,&quot; &quot;Potentially applicable,&quot;
                    &quot;Requires human confirmation.&quot;
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card className="border-red-500/30 bg-red-500/10 dark:border-red-400/30 dark:bg-red-400/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">M3</Badge>
                  <h3 className="text-lg font-bold">AI Discharge Manager</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Checklist generated from encounter, payer, procedure and hospital
                  rules across Clinical / Nursing / Pharmacy / Diagnostics / Billing
                  / Insurance / Payment. AI predicts the next blocker, summarizes the
                  delay reason, creates targeted tasks, escalates on SLA. Completion
                  is a structured state change — never generative text.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-500/10 dark:border-green-400/30 dark:bg-green-400/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">M4</Badge>
                  <h3 className="text-lg font-bold">Claim Risk Predictor</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Hybrid: deterministic rules + interpretable baseline ML (no
                  black-box deep model first). Features: documentation, financial,
                  claim history, encounter, policy, workflow.
                </p>
                <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-3 font-mono text-xs">{`{
  "riskScore": 0-100,
  "riskBand": "LOW | MEDIUM | HIGH",
  "topFactors": [{ "code": "MISSING_DOCUMENT",
                   "severity": "HIGH", "evidenceRefs": [...] }],
  "recommendedActions": [...],
  "modelVersion": "...", "generatedAt": "..."
}`}</pre>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-500/10 dark:border-purple-400/30 dark:bg-purple-400/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">M5</Badge>
                  <h3 className="text-lg font-bold">Denial / Query Intelligence</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Record/import query or denial → classify via taxonomy → link
                  evidence → AI root-cause summary + prevention step → user confirms
                  → feeds prevention rules + model dataset. Distinct outcomes must
                  not collapse: rejected / queried / partially approved / delayed.
                </p>
                <p className="mt-2 text-sm font-medium">Taxonomy</p>
                <p className="text-sm text-muted-foreground">
                  Missing documentation · Insufficient clinical evidence ·
                  Eligibility/coverage · Preauth · Coding/package mismatch ·
                  Billing arithmetic · Policy limit/exclusion · Duplicate data ·
                  Payer/TPA delay · Other.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Badge>M6</Badge>
                  <h3 className="text-lg font-bold">Revenue Reconciliation</h3>
                </div>
                <p className="mt-2 text-sm font-medium">Deterministic equations (typed backend, tested):</p>
                <pre className="mt-2 overflow-x-auto rounded-lg border bg-background p-3 font-mono text-xs">{`Invoice Total
  - Deductions - Patient Responsibility - Write-offs
  = Expected Payer Settlement
Expected - Actual = Payer Outstanding / Variance

Invoice Total - Patient Payment - Payer Settlement - Write-offs
  = Remaining Financial Balance`}</pre>
                <p className="mt-2 text-sm text-muted-foreground">
                  Statuses: Matched · Partially matched · Underpaid · Overpaid ·
                  Pending settlement · Unapplied payment · Unknown/manual review.
                  Never ask an LLM to calculate totals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-500/10 dark:border-blue-400/30 dark:bg-blue-400/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">M7</Badge>
                  <h3 className="text-lg font-bold">Revenue Leakage Radar</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Management dashboard cards: Billed Today · Expected Realization ·
                  Revenue at Risk (no double-counting) · Stuck Claims · Potential
                  Missed Charges · Pending Discharge Revenue · Query Rate ·
                  Settlement Variance. One canonical financial impact + dedup logic
                  (Priyanka).
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* SHARED AI LAYER */}
        <Section id="ai" index="06" title="Shared AI Layer" icon={LuBrain}>
          <p className="mb-4 text-sm text-muted-foreground">
            Every module consumes AI through stable internal interfaces, not by
            calling models directly from feature code (Naman owns this).
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Model Gateway", "One interface for LLM providers; timeouts + retries."],
              ["Prompt Registry", "Version prompts; record version in every output."],
              ["Structured Output Validator", "Reject malformed responses before storage."],
              ["Evidence Service", "Map AI claims to document/entity evidence."],
              ["RAG Service", "Tenant-aware retrieval with source metadata."],
              ["AI Policy Engine", "Module restrictions, confidence thresholds."],
              ["Evaluation Harness", "Gold datasets, precision/recall, regression."],
              ["AI Audit Log", "Model/version, inputs, output, reviewer, time."],
              ["Human Review Queue", "Route uncertain/high-impact findings."],
            ].map(([a, b]) => (
              <div key={a} className="rounded-lg border p-3">
                <p className="font-medium">{a}</p>
                <p className="text-sm text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>

          <Card className="mt-4">
            <CardContent className="pt-6">
              <Mermaid
                chart={aiPipelineChart}
                caption="Shared AI layer standard pipeline: normalize, validate, retrieve evidence, infer, validate, check, threshold, human review, persist, emit audit event."
              />
            </CardContent>
          </Card>

          <Alert className="mt-4 border-dashed">
            <LuLightbulb className="h-4 w-4" />
            <AlertTitle className="text-xs font-bold uppercase tracking-wide">RAG storage suggestion (non-binding)</AlertTitle>
            <AlertDescription className="mt-2 text-sm">
              The RAG Service above can be backed by <b>pgvector</b> (Postgres)
              instead of a separate vector database: policy/claim/denial chunks
              and their tenant-scoped metadata live beside operational data,
              giving you filtered, citation-aware retrieval with one system. This
              pairs with the Postgres / better-auth suggestion in the
              architecture section and does not alter the AI pipeline contract.
            </AlertDescription>
          </Alert>
        </Section>

        {/* DOCUMENT INTELLIGENCE */}
        <Section id="docs" index="07" title="Document Intelligence Pipeline" icon={LuFileText}>
          <p className="mb-3 text-sm text-muted-foreground">Dhyuthi owns this; Naman + Subhraneel support AI reasoning.</p>
          <Card>
            <CardContent className="pt-6">
              <Mermaid
                chart={docPipelineChart}
                caption="Document intelligence pipeline: upload, validate, store, extract, validate confidence, index, and link to records."
              />
            </CardContent>
          </Card>
          <p className="mt-3 text-sm text-muted-foreground">
            MVP doc types: Insurance/policy · Preauth letters · Discharge summary
            · Bills/invoices · Lab reports · Radiology/procedure reports · Claim
            query/denial letters · Implant/consumable invoices. Treat every
            upload as untrusted: validate extension + MIME, size-limit, scan,
            isolate, never expose raw storage URLs as permanent auth.
          </p>
        </Section>

        {/* API + EVENTS */}
        <Section id="api" index="08" title="Backend API & Event Contracts" icon={LuCode}>
          <p className="mb-3 text-sm text-muted-foreground">
            The web client must not implement financial or AI logic directly —
            use callable HTTPS / Cloud Functions / Cloud Run APIs.
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Auth: createUser, assignRole, disableUser",
              "Patients: create/update/get/search",
              "Encounters: create/close/dischargeStatus",
              "Billing: addCharge, finalizeInvoice, recordPayment",
              "Bill Audit: runBillAudit, reviewFinding",
              "Claims: createClaim, recordQuery, recordSettlement",
              "Policy: ingest/extract/approvePolicyRules",
              "Claim Risk: scoreClaim, reviewRisk",
              "Denials: classify, confirmRootCause",
              "Reconciliation: reconcileClaim, resolveException",
              "Analytics: getDashboardMetrics, getAging",
              "Integrations: importEncounter, exportClaim, healthCheck",
            ].map((e) => (
              <div key={e} className="rounded-lg border p-2 font-mono text-xs">
                {e}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-medium">Events (idempotent — no duplicate charges/payments/claims/findings)</p>
          <p className="font-mono text-xs text-muted-foreground">
            patient.created · encounter.created/updated · charge.created/reversed ·
            invoice.draft/finalized · payment.received · claim.created/submitted/
            queried/rejected/approved/settled · document.uploaded/processed/failed ·
            ai.finding.created/reviewed · workflow.task.created/completed/escalated
          </p>
        </Section>

        {/* RBAC */}
        <Section id="rbac" index="09" title="RBAC & User Roles" icon={LuUsers}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Primary permissions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map(([a, b]) => (
                  <TableRow key={a}>
                    <TableCell className="font-medium">{a}</TableCell>
                    <TableCell className="text-muted-foreground">{b}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Alert className="mt-4">
            <AlertDescription className="text-sm">
              The UI is not the security boundary. The same authorization
              decision must be enforced server-side and in Firestore/Storage
              rules.
            </AlertDescription>
          </Alert>
        </Section>

        {/* SECURITY */}
        <Section id="security" index="10" title="Security, Privacy & Production Controls" icon={LuLock}>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Tenant isolation on every query path and server op.",
              "Least privilege; default role has no access until granted.",
              "Immutable audit trail for financial/edits/role/claim/AI.",
              "Encryption in transit + at rest.",
              "Secrets in Secret Manager, never in source or browser.",
              "No PHI in logs, traces, analytics or push.",
              "Separate dev/staging/prod projects; no prod PHI in dev.",
              "Synthetic data for model dev until security approval.",
              "Configurable retention + deletion policies.",
              "Backups/export + disaster-recovery runbook.",
              "Rate limiting, abuse monitoring, App Check.",
              "SAST/DAST, dependency + vuln scanning.",
              "Access-review process for Zenera staff.",
              "Break-glass support access: explicit, timed, audited.",
            ].map((r) => (
              <div key={r} className="rounded-lg border p-3 text-sm">
                {r}
              </div>
            ))}
          </div>
          <Alert variant="destructive" className="mt-4">
            <LuShieldAlert className="h-4 w-4" />
            <AlertTitle className="font-bold">Production gate</AlertTitle>
            <AlertDescription className="text-sm">
              Do not onboard a real hospital with live patient data until
              security, legal/privacy review, data-processing terms, incident
              response, backup/recovery and required healthcare/privacy controls
              are signed off.
            </AlertDescription>
          </Alert>
        </Section>

        {/* INTEGRATION */}
        <Section id="integration" index="11" title="Integration Strategy" icon={LuPlug}>
          <p className="mb-3 text-sm text-muted-foreground">
            Hospitals rarely replace HIS/HMIS on day one. Build adapters so
            HealthOS sits alongside existing systems; never hard-code one
            hospital&apos;s export format into the core domain model.
          </p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Level</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Purpose</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["L1", "CSV/Excel import", "Fast pilot onboarding."],
                  ["L2", "REST API", "Two-way sync with hospital APIs."],
                  ["L3", "Webhook/event", "Near-real-time updates."],
                  ["L4", "FHIR", "Structured interoperability."],
                  ["L5", "NHCX/ABDM", "Future enterprise claim workflows."],
                ].map(([a, b, c]) => (
                  <TableRow key={a}>
                    <TableCell className="font-medium">{a}</TableCell>
                    <TableCell>{b}</TableCell>
                    <TableCell className="text-muted-foreground">{c}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Section>

        {/* FRONTEND MAP */}
        <Section id="frontend" index="12" title="Frontend Application Map" icon={LuLayoutDashboard}>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Auth: login, reset, MFA prompts",
              "Home: role-based dashboard + action queue",
              "Patient: search, profile, encounter timeline",
              "Encounter: charges, docs, tasks, claim, findings",
              "Billing: ledger, invoice editor, payments",
              "Claims: board, checklist, risk, query timeline",
              "Discharge: checklist, blockers, SLA, owners",
              "Revenue: reconciliation queue, ageing, variance",
              "Management: Leakage Radar, KPIs, drill-down",
              "AI Findings: central review queue",
              "Admin: tenant, users, roles, payer rules, AI policies",
            ].map((s) => (
              <div key={s} className="rounded-lg border p-3 text-sm">
                {s}
              </div>
            ))}
          </div>
          <Card className="mt-4">
            <CardContent className="pt-6">
              <p className="font-bold">UX principle</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Every AI alert answers four questions immediately: <b>What happened?
                Why do you think this? How much could it matter? What should I do
                next?</b>
              </p>
            </CardContent>
          </Card>
        </Section>

        {/* TESTING */}
        <Section id="testing" index="13" title="Testing Strategy" icon={LuTestTube}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Unit", "Financial arithmetic, validators, RBAC, claim transitions, rules, reconciliation."],
              ["Integration", "Auth→role→tenant→Firestore; upload→extract; encounter→charge→invoice→audit; claim flow; workflow escalation."],
              ["AI evals", "Extraction accuracy, retrieval precision, unsupported-claim rate, FP rate, risk ranking, denial accuracy, regression."],
              ["Security", "Cross-tenant attempts, privilege escalation, forged tokens, path traversal, abuse/rate-limit, data leakage."],
            ].map(([a, b]) => (
              <Card key={a}>
                <CardContent className="pt-6">
                  <p className="font-bold">{a}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{b}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* TIMELINE */}
        <Section id="timeline" index="14" title="MVP Timeline — 16 Weeks" icon={LuCalendarClock}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Milestone</TableHead>
                  <TableHead>Leads</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeline.map(([a, b, c]) => (
                  <TableRow key={a}>
                    <TableCell className="font-mono font-medium">{a}</TableCell>
                    <TableCell className="font-semibold">{b}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Alert className="mt-4">
            <AlertDescription className="text-sm">
              First 10 working days: kickoff + GitHub board; Sanjay → Firebase
              environments; Pragna → threat model + RBAC; Swastik → app shell +
              protected routes; Priyanka → KPI dictionary; Chandana → rule
              catalogue + 20 synthetic cases; Dhyuthi → doc schemas; Subhraneel →
              RAG architecture; Chandini → risk features; Naman → AI gateway;
              Ayushi → 3–5 hospital interviews; all engineering → first end-to-end
              happy path.
            </AlertDescription>
          </Alert>
        </Section>

        {/* DEFINITION OF DONE + METRICS */}
        <Section id="done" index="15" title="Definition of Done & Pilot Metrics" icon={LuCircleCheckBig}>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <p className="font-bold">Definition of Done</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>Documented owner + reviewer.</li>
                  <li>Clear role + business outcome.</li>
                  <li>Validation for normal + edge cases.</li>
                  <li>Server-side + Rules authorization.</li>
                  <li>Audit events for sensitive actions.</li>
                  <li>Schema-validated, evidence-linked AI.</li>
                  <li>Deterministic financial math.</li>
                  <li>Fail-safe errors; tests pass; staged demo.</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="font-bold">Pilot metrics (engineering targets)</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>Bill-audit precision &gt; 80%.</li>
                  <li>False-positive rate &lt; 20%.</li>
                  <li>Doc extraction field accuracy &gt; 90%.</li>
                  <li>Claim-risk ranking &gt; random baseline.</li>
                  <li>Readiness checklist accuracy &gt; 90%.</li>
                  <li>Reconciliation 100% deterministic.</li>
                  <li>Cross-tenant access: 0 unauthorized.</li>
                  <li>AI unsupported-assertion rate near-zero.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ROADMAP + COMMERCIAL + PILOT */}
        <Section id="roadmap" index="16" title="Roadmap, Packaging & Pilot" icon={LuRocket}>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <p className="font-bold">Roadmap</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  v1.1 payer configs · v1.5 multi-branch + forecasting · v2.0
                  ABDM/NHCX · v2.5 broader ops (pharmacy, OPD, beds) · v3.0 full
                  hospital OS. Protect revenue-cycle scope in MVP.
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-500/30 bg-blue-500/10 dark:border-blue-400/30 dark:bg-blue-400/10">
              <CardContent className="pt-6">
                <p className="font-bold">Commercial tiers</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  <li>Core — workspace + billing + base analytics.</li>
                  <li>Professional — + Bill Auditor, Insurance, Discharge, Risk.</li>
                  <li>Enterprise — all 7 + integrations + security.</li>
                  <li>Add-ons — integrations, migration, custom payer rules.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-green-500/30 bg-green-500/10 dark:border-green-400/30 dark:bg-green-400/10">
              <CardContent className="pt-6">
                <p className="font-bold">Pilot</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Private hospital w/ insurance/TPA activity, exportable HMIS,
                  willing reviewers, one branch. Mirror data; run all workflows;
                  measure time saved + leakage confirmed. Exit: weekly use + one
                  confirmed benefit + clean security review.
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* REPO + RUNBOOKS + RISKS */}
        <Section id="ops" index="17" title="Repository, Runbooks & Risks" icon={LuWrench}>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <p className="font-bold">Repo structure</p>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  apps/web · services/api, ai-gateway, document-intelligence,
                  claim-risk, billing-audit · packages/domain, schemas, firebase, ui,
                  config · functions/*-events, notifications · infra/firebase,
                  cloudrun · datasets/synthetic, ai-evals · docs/* · tests/*.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="font-bold">Runbooks (before pilot)</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Onboard tenant · add branch/user · configure roles · configure
                  tariffs/payer rules · replay failed doc processing · inspect
                  failed risk job · disable AI module · handle cross-tenant
                  suspicion · revoke support · export/delete data · recover
                  deploy · rotate secrets.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="font-bold">Top risks</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>Full ERP scope explosion.</li>
                  <li>Weak data model → AI amplifies.</li>
                  <li>Black-box AI → no hospital trust.</li>
                  <li>Poor tenant isolation → incident.</li>
                  <li>Overusing Firestore for analytics.</li>
                  <li>No hospital discovery.</li>
                  <li>Overfitting to one payer.</li>
                  <li>No integration strategy.</li>
                  <li>No measured ROI.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* TEAM */}
        <Section id="team" index="18" title="Team Assignment & Ownership" icon={LuUserCog}>
          <p className="mb-3 text-sm text-muted-foreground">
            Every feature has one primary owner + at least one reviewer
            (coordinated via weekly HealthOS engineering review). Founders and
            Vighnesh M / Hamsini SY / Anya R are excluded per project instructions.
          </p>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Person</TableHead>
                  <TableHead>HealthOS ownership</TableHead>
                  <TableHead>Primary responsibilities</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {team.map(([a, b, c]) => (
                  <TableRow key={a}>
                    <TableCell className="font-medium">{a}</TableCell>
                    <TableCell>{b}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Section>

        {/* ADDITIONS */}
        <Section id="add" index="19" title="Recommended Additions to the MVP" icon={LuLightbulb}>
          <Alert className="border-dashed">
            <LuPlus className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
              <Badge variant="secondary">Addition</Badge>
              does not change the MVP idea, modules or tech scope
            </AlertTitle>
            <AlertDescription className="mt-2 text-sm">
              <p>
                The spec is strong. The items below are important for a real
                hospital pilot and are <b>suggested as additions</b>, not
                replacements of anything already planned:
              </p>
              <ul className="mt-3 space-y-3">
                {additions.map(([a, b]) => (
                  <li key={a} className="flex gap-3 text-sm">
                    <LuLightbulb className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      <b>{a}.</b> {b}
                    </span>
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </Section>

        {/* REFERENCES */}
        <Section id="refs" index="20" title="References & Final Instruction" icon={LuBookOpen}>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <p className="font-bold">References used</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                  <li>Zenera Labs — Home / Team / Portfolio</li>
                  <li>Firebase Terms of Service (May 2026)</li>
                  <li>Firebase — Secure data in Cloud Firestore (Aug 2026)</li>
                  <li>Firebase — Security Rules basics</li>
                  <li>Firebase — Cloud Firestore locations</li>
                  <li>Google Cloud — HIPAA compliance + BAA</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="font-bold">Final instruction to the team</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <b>Build the workflow, not the features.</b> A hospital should
                  open one encounter and move patient → charges → bill audit →
                  insurance readiness → discharge → claim risk → query/denial →
                  settlement → reconciliation → management insight without leaving
                  HealthOS. Lock contracts early, build thin vertical slices, test
                  with synthetic data, integrate continuously.
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>

      <footer className="mt-8 border-t bg-secondary py-8 text-secondary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center">
          <p className="text-xl font-bold">
            ZENERA HEALTH<span className="text-muted-foreground">OS</span>
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            One SaaS. Seven intelligence modules. One revenue-cycle workflow.
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/70">
            Internal Product + Engineering Handoff · v2.0 · August 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
