import type { CSSProperties } from "react";
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

function Tag({
  children,
  color = "var(--primary)",
  icon: Icon,
}: {
  children: React.ReactNode;
  color?: string;
  icon?: IconType;
}) {
  return (
    <span className="neo-tag" style={{ background: color }}>
      {Icon ? (
        <span aria-hidden="true" className="inline-flex">
          <Icon size={12} />
        </span>
      ) : null}
      {children}
    </span>
  );
}

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
        {Icon ? (
          <span
            aria-hidden="true"
            className="grid h-11 w-11 shrink-0 place-items-center border-2 border-ink bg-primary shadow-[3px_3px_0_0_var(--ink)]"
          >
            <Icon size={22} />
          </span>
        ) : null}
        <span className="font-mono text-3xl font-extrabold text-secondary md:text-4xl">
          {index}
        </span>
        <h2 className="text-2xl font-extrabold leading-tight md:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Card({
  children,
  color = "#fff",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`neo p-5 ${className}`} style={{ background: color }}>
      {children}
    </div>
  );
}

function Suggest({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="neo-note mt-6 p-5">
      <div className="mb-2 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="grid h-7 w-7 place-items-center border-2 border-ink bg-secondary text-white shadow-[2px_2px_0_0_var(--ink)]"
        >
          <LuLightbulb size={16} />
        </span>
        <span className="neo-tag" style={{ background: "var(--secondary)", color: "#fff" }}>
          Suggestion
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-wide text-secondary">
          non-binding · does not change the MVP plan
        </span>
      </div>
      <p className="mb-2 font-extrabold">{title}</p>
      <div className="space-y-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function Td({
  children,
  head = false,
  col = false,
  className = "",
}: {
  children: React.ReactNode;
  head?: boolean;
  col?: boolean;
  className?: string;
}) {
  return (
    <td
      className={`border-2 border-ink p-3 align-top text-sm ${
        head ? "bg-primary font-bold" : ""
      } ${col ? "bg-tertiary/15 font-bold" : ""} ${className}`}
    >
      {children}
    </td>
  );
}

function Tr({ children }: { children: React.ReactNode }) {
  return <tr className="border-2 border-ink">{children}</tr>;
}

/* ---------- data ---------- */

const modules: {
  n: string;
  name: string;
  color: string;
  desc: string;
  Icon: IconType;
}[] = [
  { n: "01", name: "AI Bill Auditor", color: "var(--primary)", Icon: LuFileSearch, desc: "Catch missed, duplicate, package-mismatch and suspicious billing lines before the bill is finalized." },
  { n: "02", name: "Insurance & TPA Copilot", color: "var(--tertiary)", Icon: LuShieldCheck, desc: "Turn policy/TPA documents into a claim-readiness view with evidence-backed answers." },
  { n: "03", name: "AI Discharge Manager", color: "var(--secondary)", Icon: LuClipboardCheck, desc: "Stop discharge from becoming a department-chasing exercise with a generated checklist + blockers." },
  { n: "04", name: "Claim Risk Predictor", color: "var(--green)", Icon: LuActivity, desc: "Estimate, before submission, whether a claim will be queried, rejected or delayed — with reasons." },
  { n: "05", name: "Denial / Query Intelligence", color: "var(--purple)", Icon: LuTriangleAlert, desc: "Turn every claim query/rejection into reusable, classified operational knowledge." },
  { n: "06", name: "Revenue Reconciliation", color: "var(--primary)", Icon: LuCalculator, desc: "Show where money is across billed, approved, patient-paid, settled and outstanding states." },
  { n: "07", name: "Revenue Leakage Radar", color: "var(--tertiary)", Icon: LuRadar, desc: "Management dashboard that tells leadership where revenue is lost, delayed or at risk." },
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
  ["Synthetic demo / mock mode", "A first-run mode seeded with synthetic patients, encounters and claims so prospects can click through the full loop without importing real data. Reinforces the “synthetic data until security approval” rule."],
  ["Observability & status surface", "Explicit error/empty/loading states, a health dashboard for the Cloud Run AI services, and structured error codes — the spec lists SAST/DAST and monitoring but not a user-facing status/alerting surface."],
  ["AI cost & quota guardrails", "Per-tenant token/spend caps and a usage dashboard, since AI is metered and the commercial model is usage-based."],
  ["Accessibility baseline (WCAG AA)", "Keyboard navigation, focus states and contrast — important for hospital staff on varied devices, and easy to bake in with the neobrutalist focus rings."],
  ["Compliance export kit", "One-click export of audit events and AI findings for the hospital's compliance/audit needs (links to the existing export/delete runbook)."],
  ["Localization readiness", "String extraction / i18n hooks so Indian-language hospital interfaces can be added later without a rewrite."],
];

/* ---------- page ---------- */

export default function Home() {
  return (
    <div className="font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-[100] border-b-4 border-ink bg-primary">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center gap-2 font-extrabold">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center border-2 border-ink bg-secondary text-white shadow-[3px_3px_0_0_var(--ink)]"
            >
              <LuActivity size={18} />
            </span>
            <span className="hidden text-lg sm:block">ZENERA HEALTHOS</span>
          </a>
          <nav className="hidden items-center gap-3 font-mono text-xs font-bold md:flex" aria-label="Section navigation">
            <a href="#modules" className="hover:underline">Modules</a>
            <a href="#arch" className="hover:underline">Arch</a>
            <a href="#ai" className="hover:underline">AI Layer</a>
            <a href="#security" className="hover:underline">Security</a>
            <a href="#timeline" className="hover:underline">Timeline</a>
            <a href="#add" className="hover:underline">Additions</a>
          </nav>
          <a href="#top" className="neo-btn !py-2 !text-sm">
            v2.0 Spec
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="border-b-4 border-ink bg-bg">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="rise">
            <div className="mb-4 flex flex-wrap gap-2">
              <Tag color="var(--secondary)" icon={LuZap}>AI SaaS</Tag>
              <Tag color="var(--tertiary)" icon={LuActivity}>Hospital Revenue</Tag>
              <Tag icon={LuCpu}>Firebase</Tag>
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.05] md:text-6xl">
              ZENERA
              <br />
              HEALTH<span className="text-secondary">OS</span>
            </h1>
            <p className="mt-4 max-w-md text-lg font-semibold">
              AI-Powered Hospital Revenue &amp; Operations SaaS.
            </p>
            <p className="mt-3 max-w-md font-mono text-sm text-ink/70">
              Internal Product + Engineering Handoff · Version 2.0 · August 2026
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#arch" className="neo-btn">
                Read the build spec <LuArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="#modules" className="neo-btn" style={{ background: "var(--tertiary)", color: "#000" }}>
                The 7 modules
              </a>
            </div>
          </div>

          <div className="rise" style={{ animationDelay: "80ms" }}>
            <div className="neo bg-white p-6">
              <p className="text-center font-extrabold uppercase tracking-wide text-secondary">
                One product · Seven modules
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 font-mono text-sm">
                {modules.map((m) => (
                  <div
                    key={m.n}
                    className="flex items-center gap-3 border-2 border-ink p-2"
                    style={{ background: m.color }}
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-7 w-7 shrink-0 place-items-center border-2 border-ink bg-white"
                    >
                      <m.Icon size={16} />
                    </span>
                    <span className="font-bold">{m.name}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center font-extrabold">
                One SaaS. One revenue-cycle workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main id="main" className="mx-auto max-w-6xl px-4">
        {/* EXEC SUMMARY */}
        <Section id="summary" index="01" title="Executive Summary & Positioning" icon={LuTarget}>
          <div className="grid gap-5 md:grid-cols-2">
            <Card color="var(--primary)">
              <p className="font-bold">What it is</p>
              <p className="mt-2 text-sm leading-relaxed">
                Not a generic hospital ERP. A hospital revenue-cycle &amp;
                operational intelligence platform that starts as an overlay on
                existing systems and expands toward broader management. Seven
                tightly connected modules reinforce one
                patient→encounter→billing→claim→revenue loop.
              </p>
            </Card>
            <Card>
              <p className="font-bold">The core promise</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>Find money hospitals are losing or delaying.</li>
                <li>Prevent claim problems before submission.</li>
                <li>Cut manual chasing between departments.</li>
                <li>Give management a live picture of revenue at risk.</li>
              </ul>
            </Card>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Card color="var(--tertiary)" className="!text-black">
              <p className="flex items-center gap-2 font-extrabold">
                <LuShoppingBag size={18} aria-hidden="true" /> What the customer buys
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>One web app, one tenant, one login, one subscription.</li>
                <li>Shared patient/encounter/claim/revenue data.</li>
                <li>Evidence-backed, explainable, human-reviewable AI.</li>
                <li>Real-time operational queues.</li>
                <li>Integration so hospitals keep existing HIS/HMIS/EMR.</li>
              </ul>
            </Card>
            <Card color="var(--secondary)" className="!text-black">
              <p className="flex items-center gap-2 font-extrabold">
                <LuZap size={18} aria-hidden="true" /> What makes it different
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>Revenue-cycle focus, not feature-count.</li>
                <li>Seven modules reinforce each other.</li>
                <li>AI embedded in workflows, not a chatbot gimmick.</li>
                <li>Deterministic math stays the source of truth.</li>
                <li>Every AI finding has evidence + reviewer trail.</li>
              </ul>
            </Card>
          </div>

          <div className="neo mt-5 bg-ink p-5 text-white">
            <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wide text-primary">
              <LuHammer size={14} aria-hidden="true" /> Build decision
            </p>
            <p className="mt-1 text-sm">
              Use the existing Firebase project as the platform backbone for
              MVP: Firebase Authentication, Cloud Firestore, Cloud Storage, Cloud
              Functions, App Check and Hosting where useful. Use Cloud Run for
              heavier Python AI/ML workloads. Do not put all AI/ML inference
              inside Functions.
            </p>
          </div>
        </Section>

        {/* MODULES */}
        <Section id="modules" index="02" title="The Seven Intelligence Modules" icon={LuBoxes}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <div
                key={m.n}
                className="neo rise p-5"
                style={{ background: i % 2 ? "#fff" : "#fffdf5", animationDelay: `${i * 60}ms` }}
              >
                <div
                  aria-hidden="true"
                  className="mb-3 grid h-12 w-12 place-items-center border-2 border-ink text-xl font-extrabold shadow-[3px_3px_0_0_var(--ink)]"
                  style={{ background: m.color }}
                >
                  <m.Icon size={24} />
                </div>
                <h3 className="text-lg font-extrabold">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ARCHITECTURE */}
        <Section id="arch" index="03" title="Product Architecture: One Platform, Seven Modules" icon={LuCpu}>
          <div className="neo bg-white p-6">
            <div className="grid gap-3 font-mono text-sm md:grid-cols-[auto_1fr]">
              <span className="font-extrabold">Hospital user</span>
              <span className="text-ink/50">↓</span>
              <span className="font-extrabold">ZENERA HEALTHOS WEB APP</span>
              <span className="grid gap-1 text-ink/80">
                <span>→ Identity / RBAC</span>
                <span>→ Patient + Encounter</span>
                <span>→ Billing Ledger</span>
                <span>→ Documents</span>
                <span>→ Claims</span>
                <span>→ Workflows / Tasks</span>
                <span>→ Revenue Analytics</span>
              </span>
              <span className="font-extrabold text-tertiary">→ SHARED AI LAYER</span>
              <span className="grid gap-1 text-ink/80">
                {modules.map((m) => (
                  <span key={m.n}>→ {m.name}</span>
                ))}
              </span>
              <span className="font-extrabold">↓</span>
              <span className="font-bold">Firebase + Google Cloud</span>
            </div>
          </div>

          <h3 className="mb-3 mt-8 text-xl font-extrabold">
            Firebase Architecture &amp; Why It Fits
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-ink text-left">
              <tbody>
                <Tr>
                  <Td head>Layer</Td>
                  <Td head>Firebase / GCP choice</Td>
                  <Td head>Use in HealthOS</Td>
                </Tr>
                {archLayers.map(([a, b, c]) => (
                  <Tr key={a}>
                    <Td col>{a}</Td>
                    <Td>{b}</Td>
                    <Td>{c}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="neo mt-5 bg-ink p-5 text-white">
            <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wide text-secondary">
              <LuShieldAlert size={14} aria-hidden="true" /> Healthcare security caveat
            </p>
            <p className="mt-1 text-sm">
              Firebase/Google Cloud services do not automatically make an
              application compliant. Google states customers remain responsible
              for their own compliance controls. For U.S. HIPAA, the appropriate
              BAA is required and only covered services should handle PHI. For
              India, complete the applicable privacy, healthcare-data and
              contractual requirements with legal/security review before a real
              pilot.
            </p>
          </div>

          {/* REQUIRED SUGGESTION CALLOUT */}
          <Suggest title="Alternative backend stack worth considering (suggestion only)">
            <p>
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
            <p className="text-ink/70">
              This does not change the MVP scope, the seven modules, or the
              revenue-cycle workflow — only where the bytes live. Cloud Run,
              App Check-style abuse protection, Secret Manager and IAM concepts
              still apply.
            </p>
          </Suggest>

          <h3 className="mb-3 mt-8 text-lg font-extrabold">
            Firebase implementation rules
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
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
              <li key={r} className="neo-sm bg-white p-3 text-sm">
                {r}
              </li>
            ))}
          </ul>
        </Section>

        {/* DOMAIN MODEL */}
        <Section id="domain" index="04" title="Shared Domain Model & Firestore Structure" icon={LuDatabase}>
          <p className="mb-4 text-sm">
            Tenant-first. No flat database where records can be queried without
            tenant scoping.
          </p>
          <div className="overflow-x-auto">
            <div className="neo bg-white p-4 font-mono text-xs leading-relaxed">
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
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse border-2 border-ink text-left">
              <tbody>
                <Tr>
                  <Td head>Entity</Td>
                  <Td head>Must contain</Td>
                  <Td head>Why it matters</Td>
                </Tr>
                {[
                  ["Patient", "patientId, tenantId, MRN, demographics, contact, status", "Stable patient identity."],
                  ["Encounter", "encounterId, patientId, branchId, dates, payerId, status", "Link between clinical + revenue activity."],
                  ["Charge", "chargeId, encounterId, serviceCode, qty, unitPrice, sourceEvent", "Atomic billable event; sourceEvent = auditability."],
                  ["Invoice", "invoiceId, encounterId, lineItems, totals, finalizedAt", "Financial doc; totals are deterministic."],
                  ["Claim", "claimId, encounterId, payer, TPA, amountSubmitted, SLA", "Unit of insurance revenue tracking."],
                  ["AI Finding", "module, category, confidence, reasonCodes, evidenceRefs, reviewerId", "Explainable AI + human-review trail."],
                  ["Audit Event", "actorId, role, action, entityId, before/afterHash", "Traceability for sensitive actions."],
                ].map(([a, b, c]) => (
                  <Tr key={a}>
                    <Td col>{a}</Td>
                    <Td className="font-mono text-xs">{b}</Td>
                    <Td>{c}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* MODULE DETAILS */}
        <Section id="module-detail" index="05" title="Module Deep-Dives" icon={LuLayers}>
          <div className="space-y-4">
            <Card>
              <div className="flex items-center gap-2">
                <Tag color="var(--primary)">M1</Tag>
                <h3 className="text-lg font-extrabold">AI Bill Auditor</h3>
              </div>
              <p className="mt-2 text-sm">
                Workflow: open encounter → Run Bill Audit (or event-triggered) →
                deterministic rules first (dup IDs, invalid qty, impossible
                totals, package constraints) → ML/AI on normalized set → findings
                stored with confidence + evidence + financial impact → staff
                review (accept / dismiss / investigate / false-positive). System
                never silently edits the invoice in MVP.
              </p>
              <p className="mt-2 text-sm font-bold">Detection categories</p>
              <p className="text-sm">
                Missed charge · Duplicate charge · Package inconsistency ·
                Quantity anomaly · Rate anomaly · Temporal anomaly ·
                Documentation gap · Manual adjustment anomaly.
              </p>
              <p className="mt-2 font-mono text-xs text-ink/70">
                Owners: Chandana (rules), Priyanka (impact), Sanjay (ledger APIs),
                Naman (AI contract), Dhyuthi (evidence), Swastik (UI), Pragna (security).
              </p>
            </Card>

            <Card color="#eef6ff">
              <div className="flex items-center gap-2">
                <Tag color="var(--tertiary)">M2</Tag>
                <h3 className="text-lg font-extrabold">Insurance &amp; TPA Copilot</h3>
              </div>
              <p className="mt-2 text-sm">
                Upload policy/TPA docs → extract structured fields → RAG retrieves
                relevant clauses for the encounter → generate claim-readiness view
                (covered / unknown / not covered, required documents, constraints,
                questions) → every answer cites source document/page/chunk → user
                approves facts into configurable payer rules.
              </p>
              <div className="neo-note mt-3 p-3">
                <p className="flex items-center gap-2 text-xs font-bold text-secondary">
                  <LuShieldAlert size={14} aria-hidden="true" /> Hard AI rule
                </p>
                <p className="mt-1 text-sm">
                  Never state an uncertain interpretation as fact. Use labels:
                  “Found in source,” “Not found,” “Potentially applicable,”
                  “Requires human confirmation.”
                </p>
              </div>
            </Card>

            <Card color="#ffeaea">
              <div className="flex items-center gap-2">
                <Tag color="var(--secondary)">M3</Tag>
                <h3 className="text-lg font-extrabold">AI Discharge Manager</h3>
              </div>
              <p className="mt-2 text-sm">
                Checklist generated from encounter, payer, procedure and hospital
                rules across Clinical / Nursing / Pharmacy / Diagnostics / Billing
                / Insurance / Payment. AI predicts the next blocker, summarizes the
                delay reason, creates targeted tasks, escalates on SLA. Completion
                is a structured state change — never generative text.
              </p>
            </Card>

            <Card color="#e9fbf0">
              <div className="flex items-center gap-2">
                <Tag color="var(--green)">M4</Tag>
                <h3 className="text-lg font-extrabold">Claim Risk Predictor</h3>
              </div>
              <p className="mt-2 text-sm">
                Hybrid: deterministic rules + interpretable baseline ML (no
                black-box deep model first). Features: documentation, financial,
                claim history, encounter, policy, workflow.
              </p>
              <pre className="neo-sm mt-2 overflow-x-auto bg-white p-3 font-mono text-xs">{`{
  "riskScore": 0-100,
  "riskBand": "LOW | MEDIUM | HIGH",
  "topFactors": [{ "code": "MISSING_DOCUMENT",
                   "severity": "HIGH", "evidenceRefs": [...] }],
  "recommendedActions": [...],
  "modelVersion": "...", "generatedAt": "..."
}`}</pre>
            </Card>

            <Card color="#f3ecff">
              <div className="flex items-center gap-2">
                <Tag color="var(--purple)">M5</Tag>
                <h3 className="text-lg font-extrabold">Denial / Query Intelligence</h3>
              </div>
              <p className="mt-2 text-sm">
                Record/import query or denial → classify via taxonomy → link
                evidence → AI root-cause summary + prevention step → user confirms
                → feeds prevention rules + model dataset. Distinct outcomes must
                not collapse: rejected / queried / partially approved / delayed.
              </p>
              <p className="mt-2 text-sm font-bold">Taxonomy</p>
              <p className="text-sm">
                Missing documentation · Insufficient clinical evidence ·
                Eligibility/coverage · Preauth · Coding/package mismatch ·
                Billing arithmetic · Policy limit/exclusion · Duplicate data ·
                Payer/TPA delay · Other.
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-2">
                <Tag color="var(--primary)">M6</Tag>
                <h3 className="text-lg font-extrabold">Revenue Reconciliation</h3>
              </div>
              <p className="mt-2 text-sm font-bold">Deterministic equations (typed backend, tested):</p>
              <pre className="neo-sm mt-2 overflow-x-auto bg-white p-3 font-mono text-xs">{`Invoice Total
  - Deductions - Patient Responsibility - Write-offs
  = Expected Payer Settlement
Expected - Actual = Payer Outstanding / Variance

Invoice Total - Patient Payment - Payer Settlement - Write-offs
  = Remaining Financial Balance`}</pre>
              <p className="mt-2 text-sm">
                Statuses: Matched · Partially matched · Underpaid · Overpaid ·
                Pending settlement · Unapplied payment · Unknown/manual review.
                Never ask an LLM to calculate totals.
              </p>
            </Card>

            <Card color="#eef6ff">
              <div className="flex items-center gap-2">
                <Tag color="var(--tertiary)">M7</Tag>
                <h3 className="text-lg font-extrabold">Revenue Leakage Radar</h3>
              </div>
              <p className="mt-2 text-sm">
                Management dashboard cards: Billed Today · Expected Realization ·
                Revenue at Risk (no double-counting) · Stuck Claims · Potential
                Missed Charges · Pending Discharge Revenue · Query Rate ·
                Settlement Variance. One canonical financial impact + dedup logic
                (Priyanka).
              </p>
            </Card>
          </div>
        </Section>

        {/* SHARED AI LAYER */}
        <Section id="ai" index="06" title="Shared AI Layer" icon={LuBrain}>
          <p className="mb-4 text-sm">
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
              <div key={a} className="neo-sm bg-white p-3">
                <p className="font-bold">{a}</p>
                <p className="text-sm">{b}</p>
              </div>
            ))}
          </div>

          <div className="neo mt-4 bg-ink p-4 text-white">
            <p className="font-mono text-xs font-bold uppercase text-primary">Standard pipeline</p>
            <p className="mt-1 font-mono text-xs leading-relaxed">
              INPUT → normalize → deterministic validation → retrieve evidence →
              inference → schema validation → evidence/consistency check →
              confidence threshold → HUMAN REVIEW if required → persist → emit
              audit event
            </p>
          </div>

          <Suggest title="RAG storage suggestion (non-binding)">
            <p>
              The RAG Service above can be backed by <b>pgvector</b> (Postgres)
              instead of a separate vector database: policy/claim/denial chunks
              and their tenant-scoped metadata live beside operational data,
              giving you filtered, citation-aware retrieval with one system. This
              pairs with the Postgres / better-auth suggestion in the
              architecture section and does not alter the AI pipeline contract.
            </p>
          </Suggest>
        </Section>

        {/* DOCUMENT INTELLIGENCE */}
        <Section id="docs" index="07" title="Document Intelligence Pipeline" icon={LuFileText}>
          <p className="mb-3 text-sm">Dhyuthi owns this; Naman + Subhraneel support AI reasoning.</p>
          <div className="neo bg-white p-4 font-mono text-xs leading-relaxed">
            <p>Upload</p>
            <p className="pl-4">→ Validate type + size + tenant</p>
            <p className="pl-4">→ Store original in Cloud Storage</p>
            <p className="pl-4">→ Create metadata in Firestore</p>
            <p className="pl-4">→ Cloud Run extraction (OCR / layout / fields)</p>
            <p className="pl-4">→ Validation + confidence (retry / human review)</p>
            <p className="pl-4">→ Index chunks + metadata (tenant-scoped)</p>
            <p className="pl-4">→ Link to encounter / claim / policy / invoice</p>
          </div>
          <p className="mt-3 text-sm">
            MVP doc types: Insurance/policy · Preauth letters · Discharge summary
            · Bills/invoices · Lab reports · Radiology/procedure reports · Claim
            query/denial letters · Implant/consumable invoices. Treat every
            upload as untrusted: validate extension + MIME, size-limit, scan,
            isolate, never expose raw storage URLs as permanent auth.
          </p>
        </Section>

        {/* API + EVENTS */}
        <Section id="api" index="08" title="Backend API & Event Contracts" icon={LuCode}>
          <p className="mb-3 text-sm">
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
              <div key={e} className="neo-sm bg-white p-2 font-mono text-xs">
                {e}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-bold">Events (idempotent — no duplicate charges/payments/claims/findings)</p>
          <p className="font-mono text-xs">
            patient.created · encounter.created/updated · charge.created/reversed ·
            invoice.draft/finalized · payment.received · claim.created/submitted/
            queried/rejected/approved/settled · document.uploaded/processed/failed ·
            ai.finding.created/reviewed · workflow.task.created/completed/escalated
          </p>
        </Section>

        {/* RBAC */}
        <Section id="rbac" index="09" title="RBAC & User Roles" icon={LuUsers}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-ink text-left">
              <tbody>
                <Tr>
                  <Td head>Role</Td>
                  <Td head>Primary permissions</Td>
                </Tr>
                {roles.map(([a, b]) => (
                  <Tr key={a}>
                    <Td col>{a}</Td>
                    <Td>{b}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="neo mt-4 bg-ink p-4 text-white">
            <p className="text-sm">
              The UI is not the security boundary. The same authorization
              decision must be enforced server-side and in Firestore/Storage
              rules.
            </p>
          </div>
        </Section>

        {/* SECURITY */}
        <Section id="security" index="10" title="Security, Privacy & Production Controls" icon={LuLock}>
          <ul className="grid gap-2 sm:grid-cols-2">
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
              <li key={r} className="neo-sm bg-white p-3 text-sm">
                {r}
              </li>
            ))}
          </ul>
          <div className="neo-note mt-4 p-4">
            <p className="flex items-center gap-2 font-extrabold text-secondary">
              <LuShieldAlert size={16} aria-hidden="true" /> Production gate
            </p>
            <p className="mt-1 text-sm">
              Do not onboard a real hospital with live patient data until
              security, legal/privacy review, data-processing terms, incident
              response, backup/recovery and required healthcare/privacy controls
              are signed off.
            </p>
          </div>
        </Section>

        {/* INTEGRATION */}
        <Section id="integration" index="11" title="Integration Strategy" icon={LuPlug}>
          <p className="mb-3 text-sm">
            Hospitals rarely replace HIS/HMIS on day one. Build adapters so
            HealthOS sits alongside existing systems; never hard-code one
            hospital's export format into the core domain model.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-ink text-left">
              <tbody>
                <Tr>
                  <Td head>Level</Td>
                  <Td head>Method</Td>
                  <Td head>Purpose</Td>
                </Tr>
                {[
                  ["L1", "CSV/Excel import", "Fast pilot onboarding."],
                  ["L2", "REST API", "Two-way sync with hospital APIs."],
                  ["L3", "Webhook/event", "Near-real-time updates."],
                  ["L4", "FHIR", "Structured interoperability."],
                  ["L5", "NHCX/ABDM", "Future enterprise claim workflows."],
                ].map(([a, b, c]) => (
                  <Tr key={a}>
                    <Td col>{a}</Td>
                    <Td>{b}</Td>
                    <Td>{c}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
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
              <div key={s} className="neo-sm bg-white p-3 text-sm">
                {s}
              </div>
            ))}
          </div>
          <div className="neo mt-4 bg-primary p-4">
            <p className="font-extrabold">UX principle</p>
            <p className="mt-1 text-sm">
              Every AI alert answers four questions immediately: <b>What happened?
              Why do you think this? How much could it matter? What should I do
              next?</b>
            </p>
          </div>
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
                <p className="font-extrabold">{a}</p>
                <p className="mt-1 text-sm">{b}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* TIMELINE */}
        <Section id="timeline" index="14" title="MVP Timeline — 16 Weeks" icon={LuCalendarClock}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-ink text-left">
              <tbody>
                <Tr>
                  <Td head>Time</Td>
                  <Td head>Milestone</Td>
                  <Td head>Leads</Td>
                </Tr>
                {timeline.map(([a, b, c]) => (
                  <Tr key={a}>
                    <Td col className="font-mono">{a}</Td>
                    <Td className="font-bold">{b}</Td>
                    <Td className="text-sm">{c}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="neo mt-4 bg-ink p-4 text-white">
            <p className="text-sm">
              First 10 working days: kickoff + GitHub board; Sanjay → Firebase
              environments; Pragna → threat model + RBAC; Swastik → app shell +
              protected routes; Priyanka → KPI dictionary; Chandana → rule
              catalogue + 20 synthetic cases; Dhyuthi → doc schemas; Subhraneel →
              RAG architecture; Chandini → risk features; Naman → AI gateway;
              Ayushi → 3–5 hospital interviews; all engineering → first end-to-end
              happy path.
            </p>
          </div>
        </Section>

        {/* DEFINITION OF DONE + METRICS */}
        <Section id="done" index="15" title="Definition of Done & Pilot Metrics" icon={LuCircleCheckBig}>
          <div className="grid gap-4 md:grid-cols-2">
            <Card color="var(--primary)">
              <p className="font-extrabold">Definition of Done</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>Documented owner + reviewer.</li>
                <li>Clear role + business outcome.</li>
                <li>Validation for normal + edge cases.</li>
                <li>Server-side + Rules authorization.</li>
                <li>Audit events for sensitive actions.</li>
                <li>Schema-validated, evidence-linked AI.</li>
                <li>Deterministic financial math.</li>
                <li>Fail-safe errors; tests pass; staged demo.</li>
              </ul>
            </Card>
            <Card>
              <p className="font-extrabold">Pilot metrics (engineering targets)</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>Bill-audit precision &gt; 80%.</li>
                <li>False-positive rate &lt; 20%.</li>
                <li>Doc extraction field accuracy &gt; 90%.</li>
                <li>Claim-risk ranking &gt; random baseline.</li>
                <li>Readiness checklist accuracy &gt; 90%.</li>
                <li>Reconciliation 100% deterministic.</li>
                <li>Cross-tenant access: 0 unauthorized.</li>
                <li>AI unsupported-assertion rate near-zero.</li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* ROADMAP + COMMERCIAL + PILOT */}
        <Section id="roadmap" index="16" title="Roadmap, Packaging & Pilot" icon={LuRocket}>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <p className="font-extrabold">Roadmap</p>
              <p className="mt-2 text-sm">
                v1.1 payer configs · v1.5 multi-branch + forecasting · v2.0
                ABDM/NHCX · v2.5 broader ops (pharmacy, OPD, beds) · v3.0 full
                hospital OS. Protect revenue-cycle scope in MVP.
              </p>
            </Card>
            <Card color="var(--tertiary)" className="!text-black">
              <p className="font-extrabold">Commercial tiers</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>Core — workspace + billing + base analytics.</li>
                <li>Professional — + Bill Auditor, Insurance, Discharge, Risk.</li>
                <li>Enterprise — all 7 + integrations + security.</li>
                <li>Add-ons — integrations, migration, custom payer rules.</li>
              </ul>
            </Card>
            <Card color="var(--secondary)" className="!text-black">
              <p className="font-extrabold">Pilot</p>
              <p className="mt-2 text-sm">
                Private hospital w/ insurance/TPA activity, exportable HMIS,
                willing reviewers, one branch. Mirror data; run all workflows;
                measure time saved + leakage confirmed. Exit: weekly use + one
                confirmed benefit + clean security review.
              </p>
            </Card>
          </div>
        </Section>

        {/* REPO + RUNBOOKS + RISKS */}
        <Section id="ops" index="17" title="Repository, Runbooks & Risks" icon={LuWrench}>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <p className="font-extrabold">Repo structure</p>
              <p className="mt-2 font-mono text-xs">
                apps/web · services/api, ai-gateway, document-intelligence,
                claim-risk, billing-audit · packages/domain, schemas, firebase, ui,
                config · functions/*-events, notifications · infra/firebase,
                cloudrun · datasets/synthetic, ai-evals · docs/* · tests/*.
              </p>
            </Card>
            <Card color="var(--primary)">
              <p className="font-extrabold">Runbooks (before pilot)</p>
              <p className="mt-2 text-sm">
                Onboard tenant · add branch/user · configure roles · configure
                tariffs/payer rules · replay failed doc processing · inspect
                failed risk job · disable AI module · handle cross-tenant
                suspicion · revoke support · export/delete data · recover
                deploy · rotate secrets.
              </p>
            </Card>
            <Card color="var(--secondary)" className="!text-black">
              <p className="font-extrabold">Top risks</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
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
            </Card>
          </div>
        </Section>

        {/* TEAM */}
        <Section id="team" index="18" title="Team Assignment & Ownership" icon={LuUserCog}>
          <p className="mb-3 text-sm">
            Every feature has one primary owner + at least one reviewer
            (coordinated via weekly HealthOS engineering review). Founders and
            Vighnesh M / Hamsini SY / Anya R are excluded per project instructions.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-ink text-left">
              <tbody>
                <Tr>
                  <Td head>Person</Td>
                  <Td head>HealthOS ownership</Td>
                  <Td head>Primary responsibilities</Td>
                </Tr>
                {team.map(([a, b, c]) => (
                  <Tr key={a}>
                    <Td col className="font-bold">{a}</Td>
                    <Td>{b}</Td>
                    <Td className="text-sm">{c}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* NEW: ADDITIONS */}
        <Section id="add" index="19" title="Recommended Additions to the MVP" icon={LuLightbulb}>
          <div className="neo-note p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                aria-hidden="true"
                className="grid h-7 w-7 place-items-center border-2 border-ink bg-secondary text-white shadow-[2px_2px_0_0_var(--ink)]"
              >
                <LuPlus size={16} />
              </span>
              <span className="neo-tag" style={{ background: "var(--secondary)", color: "#fff" }}>
                Addition
              </span>
              <span className="font-mono text-xs font-bold uppercase text-secondary">
                does not change the MVP idea, modules or tech scope
              </span>
            </div>
            <p className="text-sm">
              The spec is strong. The items below are important for a real
              hospital pilot and are <b>suggested as additions</b>, not
              replacements of anything already planned:
            </p>
            <ul className="mt-3 space-y-3">
              {additions.map(([a, b]) => (
                <li key={a} className="flex gap-3 text-sm">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center border-2 border-ink bg-primary shadow-[2px_2px_0_0_var(--ink)]"
                  >
                    <LuLightbulb size={14} />
                  </span>
                  <span>
                    <b>{a}.</b> {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* REFERENCES */}
        <Section id="refs" index="20" title="References & Final Instruction" icon={LuBookOpen}>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <p className="font-extrabold">References used</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
                <li>Zenera Labs — Home / Team / Portfolio</li>
                <li>Firebase Terms of Service (May 2026)</li>
                <li>Firebase — Secure data in Cloud Firestore (Aug 2026)</li>
                <li>Firebase — Security Rules basics</li>
                <li>Firebase — Cloud Firestore locations</li>
                <li>Google Cloud — HIPAA compliance + BAA</li>
              </ul>
            </Card>
            <Card color="var(--primary)">
              <p className="font-extrabold">Final instruction to the team</p>
              <p className="mt-2 text-sm">
                <b>Build the workflow, not the features.</b> A hospital should
                open one encounter and move patient → charges → bill audit →
                insurance readiness → discharge → claim risk → query/denial →
                settlement → reconciliation → management insight without leaving
                HealthOS. Lock contracts early, build thin vertical slices, test
                with synthetic data, integrate continuously.
              </p>
            </Card>
          </div>
        </Section>
      </main>

      <footer className="mt-8 border-t-4 border-ink bg-ink py-8 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center">
          <p className="text-xl font-extrabold">
            ZENERA HEALTH<span className="text-secondary">OS</span>
          </p>
          <p className="font-mono text-xs text-white/70">
            One SaaS. Seven intelligence modules. One revenue-cycle workflow.
          </p>
          <p className="font-mono text-[10px] text-white/50">
            Internal Product + Engineering Handoff · v2.0 · August 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
