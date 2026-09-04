"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Tldraw, toRichText, type Editor } from "tldraw";
import "tldraw/tldraw.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  LuShield,
  LuUsers,
  LuCircleCheckBig,
  LuFileText,
} from "react-icons/lu";

/* ─── PRAGNA DATA ─── */

type Task = {
  id: string;
  title: string;
  detail: string;
  when: string;
  priority: "critical" | "high" | "medium";
  deliverable: string;
  dependsOn?: string[];
  blocks?: string[];
};

type TeamMember = {
  name: string;
  role: string;
  ownership: string;
  icon: React.ReactNode;
  color: string;
  tasks: Task[];
};

const pragana: TeamMember = {
  name: "Pragna R",
  role: "Security & Compliance Lead",
  ownership: "Threat model, tenant isolation, App Check, IAM, security rules, secure storage, audit logs, secrets, incident controls, penetration/security acceptance.",
  icon: <LuShield size={20} />,
  color: "#FF6B6B",
  tasks: [
    /* ── DAY 1-2: ARCHITECTURE DECISIONS ── */
    {
      id: "threat-model",
      title: "Threat Model",
      detail:
        "Map every attack surface of HealthOS. Who are the attackers? (malicious insider, external hacker, compromised token, abusive client). What are they after? (patient data, financial data, cross-tenant access, AI model manipulation). What are the entry points? (client app, Cloud Functions, Cloud Run, Firestore rules, Storage paths, API keys). Write down the threat list and mitigations — this is the document everyone else builds against.",
      when: "Day 1–2",
      priority: "critical",
      deliverable: "Threat model document (attack surface, threats, mitigations)",
      blocks: ["tenant-isolation", "rbac-matrix", "secrets-strategy"],
    },
    {
      id: "tenant-isolation",
      title: "Tenant Isolation Rules",
      detail:
        "Define how tenants are completely isolated. Every Firestore path starts with /tenants/{tenantId}/. Every Storage path starts with /tenants/{tenantId}/. Every Cloud Run request must carry tenant context. Every Cloud Function trigger must validate tenant scoping. Document the answer: 'What happens if a user from Hospital A queries Hospital B's data?' Answer must be 'nothing.'",
      when: "Day 1–2",
      priority: "critical",
      deliverable: "Tenant isolation rules document (rules + Firestore path structure)",
      dependsOn: ["threat-model"],
      blocks: ["rbac-matrix", "firestore-rules"],
    },
    {
      id: "rbac-matrix",
      title: "RBAC Matrix",
      detail:
        "Build the permissions matrix for all 9 roles: Hospital Admin, Billing Executive, Insurance/TPA Executive, Doctor/Clinical Admin, Nurse/Department User, Finance Manager, Hospital Management, Zenera Support, Zenera Super Admin. For each role: what collections can they read? What can they write? What API endpoints can they call? Map this to Firebase custom claims AND Firestore Security Rules AND server-side IAM.",
      when: "Day 1–2",
      priority: "critical",
      deliverable: "RBAC matrix table (role × collection × read/write × condition)",
      dependsOn: ["threat-model", "tenant-isolation"],
      blocks: ["firestore-rules", "app-check", "iam-setup"],
    },
    {
      id: "secrets-strategy",
      title: "Secrets Strategy",
      detail:
        "Define where every secret lives: Firebase service account keys → Google Secret Manager (never in source, never in browser). AI model API keys (OpenAI/Anthropic/etc.) → Secret Manager, accessed only by Cloud Run. Encryption keys → Secret Manager. Third-party integration credentials → Secret Manager. Document: 'Where is each secret stored, who can access it, and how is it rotated?'",
      when: "Day 1–2",
      priority: "critical",
      deliverable: "Secrets strategy document (secret → location → access → rotation)",
      dependsOn: ["threat-model"],
      blocks: ["secrets-production"],
    },
    {
      id: "security-criteria",
      title: "Security Acceptance Criteria",
      detail:
        "Define what 'secure enough for pilot' means: No wildcard Firestore rules. No cross-tenant reads/writes in any path. No PHI in logs. No admin credentials in client bundles. App Check enabled on client-facing resources. All financial writes use server-side transactions. Audit events for all sensitive actions.",
      when: "Day 1–2",
      priority: "critical",
      deliverable: "Security acceptance checklist",
      dependsOn: ["threat-model"],
      blocks: ["security-tests"],
    },

    /* ── WEEKS 1-2: ARCHITECTURE ── */
    {
      id: "hospital-interviews",
      title: "Hospital Workflow Interviews",
      detail:
        "Participate in hospital workflow interviews with Ayushi. Understand what data hospitals handle, what's sensitive, what compliance requirements exist (HIPAA for US, Indian healthcare data laws for India). Feed security requirements into the architecture.",
      when: "Weeks 1–2",
      priority: "high",
      deliverable: "Security requirements from interview insights",
    },
    {
      id: "review-domain-model",
      title: "Review Domain Model (Sanjay's Firestore Schema)",
      detail:
        "Review the domain model and validate: Does every path enforce tenant scoping? Are there any flat collections that skip tenant ID? Are financial collections (charges, invoices, payments) properly scoped? If not, block it.",
      when: "Weeks 1–2",
      priority: "critical",
      deliverable: "Approved or blocked Firestore schema",
      dependsOn: ["tenant-isolation", "rbac-matrix"],
      blocks: ["firestore-rules"],
    },
    {
      id: "review-ai-gateway",
      title: "Review Naman's AI Gateway Design",
      detail:
        "Review the AI gateway and validate: Are AI model keys stored server-side only? Is there rate limiting on model calls? Is there input validation before model inference? Are AI outputs logged for audit but without PHI?",
      when: "Weeks 1–2",
      priority: "high",
      deliverable: "Approved or blocked AI gateway design",
      dependsOn: ["secrets-strategy"],
      blocks: ["audit-logging"],
    },
    {
      id: "architecture-approval",
      title: "Architecture Approval (Veto Power)",
      detail:
        "Pragna has veto power here. If the threat model or isolation design is wrong, nothing else should proceed. Review all architecture decisions and either approve or block.",
      when: "Weeks 1–2",
      priority: "critical",
      deliverable: "Signed architecture approval document",
      dependsOn: ["review-domain-model", "review-ai-gateway", "security-criteria"],
    },

    /* ── WEEKS 3-4: CORE PLATFORM ── */
    {
      id: "firestore-rules",
      title: "Write Firestore Security Rules",
      detail:
        "Write Security Rules for every collection: /tenants/{tenantId}/patients/{patientId} → only read if request.auth.token.tenantId == tenantId AND role is one of [Hospital Admin, Billing Exec, Insurance Exec, Doctor]. /tenants/{tenantId}/encounters/{encounterId}/charges → only write if role is Billing Exec or Hospital Admin. /tenants/{tenantId}/claims/{claimId} → only write if role is Insurance Exec. /tenants/{tenantId}/auditEvents → read-only for Hospital Admin and Hospital Management; write-only from server. No collection allows allow read, write: if true in ANY environment. Test every rule with positive and negative cases.",
      when: "Weeks 3–4",
      priority: "critical",
      deliverable: "firestore.rules file + test suite",
      dependsOn: ["rbac-matrix", "tenant-isolation"],
      blocks: ["security-tests"],
    },
    {
      id: "app-check",
      title: "Configure Firebase App Check",
      detail:
        "Enable App Check on all client-facing Firestore/Storage resources. Verify App Check tokens are enforced in Cloud Functions. Test: what happens when a request has no App Check token? Should be rejected.",
      when: "Weeks 3–4",
      priority: "critical",
      deliverable: "App Check enabled + verification tests",
      dependsOn: ["rbac-matrix"],
      blocks: ["security-tests"],
    },
    {
      id: "iam-setup",
      title: "Set Up IAM for Server-Side Access",
      detail:
        "Cloud Run service account: minimal permissions (Firestore read/write, Secret Manager read, Storage read/write). Cloud Functions service account: minimal permissions (Firestore read/write, trigger invocation). No service account key in source code or browser.",
      when: "Weeks 3–4",
      priority: "critical",
      deliverable: "IAM policy configs for Cloud Run + Cloud Functions",
      dependsOn: ["rbac-matrix", "secrets-strategy"],
    },
    {
      id: "storage-paths",
      title: "Secure Storage Paths",
      detail:
        "All production paths include /tenants/{tenantId}/branches/{branchId}/. Path-based access rules enforced. No permanent public URLs for uploaded documents. Signed URLs for temporary access, with expiry.",
      when: "Weeks 3–4",
      priority: "critical",
      deliverable: "Storage path rules + signed URL config",
      dependsOn: ["firestore-rules"],
    },
    {
      id: "audit-logging",
      title: "Set Up Audit Logging",
      detail:
        "Define what triggers an audit event: financial writes (charge, invoice, payment), role changes, claim status changes, AI finding reviews, document uploads. Audit event structure: eventId, actorId, role, action, entityType, entityId, beforeHash/afterHash, timestamp, source. Immutable: no update or delete on audit events.",
      when: "Weeks 3–4",
      priority: "critical",
      deliverable: "Audit event schema + Firestore structure + triggers",
      dependsOn: ["review-ai-gateway"],
      blocks: ["security-tests"],
    },
    {
      id: "secrets-production",
      title: "Secrets in Production",
      detail:
        "Move all secrets to Google Secret Manager. Verify no secrets in next.config, .env, source code, or browser bundles. Set up rotation schedule for API keys.",
      when: "Weeks 3–4",
      priority: "critical",
      deliverable: "All secrets in Secret Manager + rotation schedule",
      dependsOn: ["secrets-strategy"],
    },
    {
      id: "separate-environments",
      title: "Separate Dev/Staging/Prod Environments",
      detail:
        "Create separate Firebase projects for dev/staging/prod. Verify production PHI is never used in development. Document the separation.",
      when: "Weeks 3–4",
      priority: "high",
      deliverable: "3 Firebase projects + environment separation doc",
    },

    /* ── WEEKS 5-6: BILLING ── */
    {
      id: "billing-security",
      title: "Security Review of Billing Writes",
      detail:
        "Verify charge creation uses server-side transactions (not client-side writes). Verify invoice finalization is atomic. Verify payment recording is idempotent. Verify no client can bypass server-side validation.",
      when: "Weeks 5–6",
      priority: "critical",
      deliverable: "Billing security review report",
      dependsOn: ["firestore-rules"],
    },

    /* ── WEEKS 7-8: BILL AUDITOR ── */
    {
      id: "audit-security",
      title: "Approve Bill Auditor Security Design",
      detail:
        "How are AI findings stored? (with evidence, confidence, reviewer trail). Who can review findings? (Billing Exec, Hospital Admin). Who can dismiss findings? (same roles). Are dismissed findings logged in audit trail? Can AI findings be deleted? (no, only marked dismissed).",
      when: "Weeks 7–8",
      priority: "high",
      deliverable: "Bill Auditor security approval",
      dependsOn: ["firestore-rules", "audit-logging"],
    },

    /* ── WEEKS 9-10: INSURANCE + CLAIMS ── */
    {
      id: "document-upload-security",
      title: "Review Document Upload Security",
      detail:
        "File type validation (extension + MIME). Size limits. Scan for malware where appropriate. No raw storage URLs exposed permanently. Signed URLs with expiry for access.",
      when: "Weeks 9–10",
      priority: "high",
      deliverable: "Document upload security checklist",
      dependsOn: ["storage-paths"],
    },
    {
      id: "claim-submission-security",
      title: "Review Claim Submission Security",
      detail:
        "Who can submit claims? (Insurance Exec only). Who can modify claim status? (server-side only). Are claim status changes audited?",
      when: "Weeks 9–10",
      priority: "high",
      deliverable: "Claim security review",
      dependsOn: ["firestore-rules"],
    },

    /* ── WEEKS 11-12: RISK ── */
    {
      id: "risk-score-security",
      title: "Review AI Risk Score Security",
      detail:
        "Are risk scores generated server-side? (not client-computed). Are risk scores stored with model version + timestamp? Can risk scores be modified manually? (only by authorized roles, with audit).",
      when: "Weeks 11–12",
      priority: "medium",
      deliverable: "Risk score security review",
    },

    /* ── WEEKS 13-14: RECONCILIATION ── */
    {
      id: "reconciliation-security",
      title: "Review Reconciliation Security",
      detail:
        "Financial calculations must be deterministic (no LLM). Reconciliation results are immutable once confirmed. Who can resolve exceptions? (Finance Manager, Hospital Admin).",
      when: "Weeks 13–14",
      priority: "medium",
      deliverable: "Reconciliation security review",
    },

    /* ── WEEK 15: INTEGRATION ── */
    {
      id: "csv-import-security",
      title: "Review CSV Import Security",
      detail:
        "File validation (type, size, encoding). Row-level tenant scoping on imported data. Audit trail for bulk imports. Rate limiting on import endpoints.",
      when: "Week 15",
      priority: "medium",
      deliverable: "CSV import security review",
    },

    /* ── WEEK 16: HARDENING ── */
    {
      id: "security-tests",
      title: "Full Security Test Suite",
      detail:
        "Run all security tests: Cross-tenant read/write attempts (should all fail). Privilege escalation attempts (Billing Exec trying to access Admin functions). Forged/expired token tests. Storage path traversal attempts. Rate limit/abuse tests. Sensitive data leakage through logs or UI errors. Dependency scanning (SAST). Vulnerability scanning (DAST).",
      when: "Week 16",
      priority: "critical",
      deliverable: "Security test suite (automated)",
      dependsOn: ["firestore-rules", "app-check", "audit-logging", "security-criteria"],
      blocks: ["pen-test"],
    },
    {
      id: "pen-test",
      title: "Penetration Testing",
      detail:
        "At minimum test: injection, broken auth, sensitive data exposure, XXE, broken access control, security misconfiguration, XSS, insecure deserialization, using components with known vulnerabilities, insufficient logging.",
      when: "Week 16",
      priority: "critical",
      deliverable: "Penetration test report (findings + fixes)",
      dependsOn: ["security-tests"],
      blocks: ["sign-off"],
    },
    {
      id: "sign-off",
      title: "Security Sign-Off",
      detail:
        "Document all findings. Classify as critical/high/medium/low. Critical must be fixed before pilot. Sign the security acceptance document. Do not sign off on real hospital onboarding until ALL are complete: security review, legal/privacy review, data processing terms, incident response plan, backup/recovery, all healthcare/privacy controls.",
      when: "Week 16",
      priority: "critical",
      deliverable: "Signed security acceptance document",
      dependsOn: ["pen-test"],
    },

    /* ── ONGOING ── */
    {
      id: "weekly-security",
      title: "Weekly Security Review",
      detail:
        "Meet with backend/AI owners every week. Review security findings, access changes, dependency issues. Review any AI-related security concerns. Update threat model if new attack surfaces emerge.",
      when: "Ongoing (every week)",
      priority: "high",
      deliverable: "Weekly security review notes",
    },
    {
      id: "cross-tenant-test",
      title: "Cross-Tenant Access Test (Metric)",
      detail:
        "Must achieve 0 unauthorized reads/writes. This is a measured metric — Pragna owns it. Automated isolation tests must pass.",
      when: "Week 16 (metric)",
      priority: "critical",
      deliverable: "Cross-tenant test results: 0 unauthorized",
      dependsOn: ["security-tests"],
    },
  ],
};

/* ─── DELIVERABLES TABLE ─── */

const deliverables = [
  { when: "Day 1–2", what: "Threat model", format: "Document" },
  { when: "Day 1–2", what: "Tenant isolation rules", format: "Document + Firestore path structure" },
  { when: "Day 1–2", what: "RBAC matrix", format: "Table (role × collection × read/write)" },
  { when: "Day 1–2", what: "Secrets strategy", format: "Document (secret → location → access → rotation)" },
  { when: "Day 1–2", what: "Security acceptance criteria", format: "Checklist" },
  { when: "Wk 3–4", what: "Firestore Security Rules", format: "firestore.rules code file" },
  { when: "Wk 3–4", what: "App Check config", format: "Firebase console config" },
  { when: "Wk 3–4", what: "IAM policies", format: "Google Cloud IAM config" },
  { when: "Wk 3–4", what: "Audit event schema", format: "Document + Firestore structure" },
  { when: "Wk 16", what: "Security test suite", format: "Automated tests" },
  { when: "Wk 16", what: "Pen test report", format: "Document (findings + fixes)" },
  { when: "Wk 16", what: "Security sign-off", format: "Signed document" },
];

/* ─── BLOCKS / DEPENDS LOOKUP ─── */

const taskById = Object.fromEntries(pragana.tasks.map((t) => [t.id, t]));

function findConnected(taskId: string, teamMemberTasks: Task[]): Task[] {
  const task = taskById[taskId];
  if (!task) return [];
  const deps = (task.dependsOn ?? []).map((id) => taskById[id]).filter(Boolean);
  const blocks = (task.blocks ?? []).map((id) => taskById[id]).filter(Boolean);
  return [...deps, ...blocks];
}

/* ─── CANVAS SHAPES ─── */

function box(
  editor: Editor,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  color: string,
  fill: string = "solid"
) {
  editor.createShape({
    type: "geo",
    x,
    y,
    props: {
      w,
      h,
      geo: "rectangle",
      fill: fill as any,
      color: color as any,
      richText: toRichText(label),
      font: "sans",
      size: "m" as any,
    },
  });
}

function createPragnaCanvas(editor: Editor) {
  const W = 160;
  const S = 180; // spacing x
  const T = 110; // task height
  const HEADER = 40;

  // ── TITLE ──
  box(editor, 40, 20, 680, 50, "PRAGNA R — Security & Compliance Lead", "red");

  // ── PHASE 1: DAY 1–2 ──
  const P1 = 100;
  box(editor, 40, P1, 140, HEADER, "DAY 1–2", "red");

  const d12 = [
    { id: "threat-model", x: 40 },
    { id: "tenant-isolation", x: 40 + S },
    { id: "rbac-matrix", x: 40 + S * 2 },
    { id: "secrets-strategy", x: 40 + S * 3 },
    { id: "security-criteria", x: 40 },
  ];
  d12.forEach((t, i) => {
    const task = taskById[t.id];
    if (!task) return;
    const row = i < 3 ? 0 : 1;
    const col = i < 3 ? i : 0;
    box(editor, t.x, P1 + HEADER + 20 + row * (T + 20), W, T, task.title, "light-red");
  });

  // ── PHASE 2: WEEKS 1–2 ──
  const P2 = P1 + HEADER + 20 + 2 * (T + 20) + 20;
  box(editor, 40, P2, 200, HEADER, "WEEKS 1–2", "violet");

  const w12 = ["hospital-interviews", "review-domain-model", "review-ai-gateway", "architecture-approval"];
  w12.forEach((id, i) => {
    const task = taskById[id];
    if (!task) return;
    box(editor, 40 + i * S, P2 + HEADER + 20, W, T, task.title, "light-violet");
  });

  // ── PHASE 3: WEEKS 3–4 ──
  const P3 = P2 + HEADER + 20 + T + 40;
  box(editor, 40, P3, 220, HEADER, "WEEKS 3–4 (CORE)", "blue");

  const w34 = ["firestore-rules", "app-check", "iam-setup", "storage-paths", "audit-logging", "secrets-production", "separate-environments"];
  w34.forEach((id, i) => {
    const task = taskById[id];
    if (!task) return;
    const col = i % 4;
    const row = Math.floor(i / 4);
    box(editor, 40 + col * S, P3 + HEADER + 20 + row * (T + 20), W, T, task.title, "light-blue");
  });

  // ── PHASE 4: WEEKS 5–14 ──
  const P4 = P3 + HEADER + 20 + 2 * (T + 20) + 20;
  box(editor, 40, P4, 260, HEADER, "WEEKS 5–14 (MODULE REVIEWS)", "yellow");

  const w514 = ["billing-security", "audit-security", "document-upload-security", "claim-submission-security", "risk-score-security", "reconciliation-security"];
  w514.forEach((id, i) => {
    const task = taskById[id];
    if (!task) return;
    const col = i % 3;
    const row = Math.floor(i / 3);
    box(editor, 40 + col * S, P4 + HEADER + 20 + row * (T + 20), W, T, task.title, "light-yellow");
  });

  // ── PHASE 5: WEEK 15–16 ──
  const P5 = P4 + HEADER + 20 + 2 * (T + 20) + 20;
  box(editor, 40, P5, 300, HEADER, "WEEK 15–16 (HARDENING)", "green");

  const w1516 = ["csv-import-security", "security-tests", "pen-test", "sign-off", "cross-tenant-test"];
  w1516.forEach((id, i) => {
    const task = taskById[id];
    if (!task) return;
    box(editor, 40 + i * S, P5 + HEADER + 20, W, T, task.title, "light-green");
  });

  // ── DEPENDENCY CHAIN PANEL ──
  const CX = 780;
  box(editor, CX, P1, 360, HEADER, "DEPENDENCY CHAIN", "orange");

  const chains = [
    "Threat Model → Tenant Isolation → RBAC → Firestore Rules",
    "RBAC → App Check → Security Tests",
    "RBAC → IAM Setup",
    "Secrets Strategy → Secrets in Production",
    "Tenant Isolation → Review Domain → Architecture Approval",
    "Review AI Gateway → Audit Logging → Bill Auditor Security",
    "Firestore Rules → Billing Security → Bill Auditor Security",
    "Storage Paths → Document Upload Security",
    "Firestore Rules → Claim Submission Security",
    "Security Criteria → Security Tests → Pen Test → Sign-Off",
    "Cross-Tenant Test: 0 unauthorized (metric)",
    "Weekly Security Review with backend/AI owners",
  ];
  chains.forEach((t, i) => {
    box(editor, CX, P1 + HEADER + 20 + i * 38, 360, 30, t, "light-orange");
  });

  // ── TEAM CONNECTIONS PANEL ──
  const EX = CX;
  const EY = P1 + HEADER + 20 + chains.length * 38 + 20;
  box(editor, EX, EY, 360, HEADER, "CONNECTS TO OTHER TEAM", "black");

  const exts = [
    "→ SANJAY: RBAC matrix feeds Firestore schema",
    "→ SANJAY: Storage paths feed Storage config",
    "→ SWASTIK: App Check feeds protected routes",
    "→ NAMAN: AI gateway review gates model calls",
    "→ NAMAN: Audit logging gates AI findings",
    "→ CHANDANA: Bill auditor security gates Module 1",
    "→ SUBHRANEEL: Claim security gates Modules 2/4/5",
    "→ PRAGNA: Security gate blocks pilot sign-off",
  ];
  exts.forEach((t, i) => {
    box(editor, EX, EY + HEADER + 20 + i * 38, 360, 30, t, "light-grey");
  });

  // Fit the whole diagram
  editor.zoomToFit({ animation: { duration: 0 } });
}

/* ─── DETAIL PANEL ─── */

function TaskDetail({ task }: { task: Task }) {
  const priorityColor =
    task.priority === "critical"
      ? "bg-red-500 text-white"
      : task.priority === "high"
        ? "bg-orange-400 text-black"
        : "bg-yellow-300 text-black";

  return (
    <AccordionItem value={task.id}>
      <AccordionTrigger className="text-left text-sm font-bold hover:no-underline">
        <div className="flex items-center gap-2">
          <Badge className={priorityColor}>{task.priority}</Badge>
          {task.title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2 text-sm">
        <p className="text-ink/70">{task.detail}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{task.when}</Badge>
          <Badge variant="outline">Deliverable: {task.deliverable}</Badge>
        </div>
        {task.dependsOn && task.dependsOn.length > 0 && (
          <div>
            <p className="text-xs font-bold text-ink/50">Depends on:</p>
            <div className="flex flex-wrap gap-1">
              {task.dependsOn.map((id) => (
                <Badge key={id} variant="secondary" className="text-xs">
                  {taskById[id]?.title ?? id}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {task.blocks && task.blocks.length > 0 && (
          <div>
            <p className="text-xs font-bold text-ink/50">Blocks:</p>
            <div className="flex flex-wrap gap-1">
              {task.blocks.map((id) => (
                <Badge key={id} variant="secondary" className="text-xs">
                  {taskById[id]?.title ?? id}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

/* ─── MAIN PAGE ─── */

export default function TeamPage() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const handleMount = useCallback((editor: Editor) => {
    createPragnaCanvas(editor);
    editor.zoomToFit({ animation: { duration: 0 } });
  }, []);

  return (
    <div className="flex h-screen flex-col border-b-4 border-ink">
      {/* HEADER */}
      <header className="border-b-4 border-ink bg-primary px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border-2 border-ink bg-secondary text-white shadow-[3px_3px_0_0_var(--ink)]">
            <LuUsers size={16} />
          </span>
          <h1 className="text-lg font-extrabold">HEALTHOS — Team Architecture</h1>
          <Badge className="ml-2">v2.0</Badge>
          <div className="ml-auto font-mono text-xs text-ink/60">
            Interactive dependency diagram · drag to pan · scroll to zoom
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL: TASK DETAIL */}
        <aside className="flex w-[420px] shrink-0 flex-col border-r-4 border-ink bg-white">
          {/* MEMBER CARD */}
          <div className="border-b-2 border-ink p-4">
            <div className="flex items-center gap-3">
              <div
                className="grid h-10 w-10 place-items-center border-2 border-ink shadow-[3px_3px_0_0_var(--ink)]"
                style={{ background: pragana.color }}
              >
                {pragana.icon}
              </div>
              <div>
                <h2 className="text-lg font-extrabold">{pragana.name}</h2>
                <p className="text-xs text-ink/60">{pragana.role}</p>
              </div>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink/70">{pragana.ownership}</p>
          </div>

          {/* TASKS LIST */}
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <LuFileText size={14} />
                <h3 className="font-extrabold">All Tasks ({pragana.tasks.length})</h3>
              </div>
              <Accordion multiple className="space-y-2">
                {pragana.tasks.map((task) => (
                  <TaskDetail key={task.id} task={task} />
                ))}
              </Accordion>
            </div>
          </ScrollArea>

          {/* DELIVERABLES TABLE */}
          <div className="border-t-2 border-ink">
            <div className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <LuCircleCheckBig size={14} />
                <h3 className="font-extrabold">Deliverables</h3>
              </div>
              <div className="space-y-1">
                {deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="shrink-0">
                      {d.when}
                    </Badge>
                    <span className="font-bold">{d.what}</span>
                    <span className="text-ink/50">({d.format})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT: TLDRAW CANVAS */}
        <main className="flex-1 bg-bg">
          <Tldraw onMount={handleMount} />
        </main>
      </div>
    </div>
  );
}
