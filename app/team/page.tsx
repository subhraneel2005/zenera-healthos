"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import * as LuIcons from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
  color: string;
  iconName: string;
  tasks: Task[];
};

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  LuShield: LuIcons.LuShield,
  LuLayoutDashboard: LuIcons.LuLayoutDashboard,
  LuServer: LuIcons.LuServer,
  LuBrain: LuIcons.LuBrain,
  LuSearchCode: LuIcons.LuSearchCode,
  LuTrendingUp: LuIcons.LuTrendingUp,
  LuFileSearch: LuIcons.LuFileSearch,
  LuShieldAlert: LuIcons.LuShieldAlert,
  LuScanSearch: LuIcons.LuScanSearch,
  LuHospital: LuIcons.LuHospital,
  LuMegaphone: LuIcons.LuMegaphone,
  LuUsers: LuIcons.LuUsers,
  LuCircleCheckBig: LuIcons.LuCircleCheckBig,
  LuFileText: LuIcons.LuFileText,
};

function getPhase(when: string): number {
  const w = when.toLowerCase();
  if (w.includes("day 1") || w.includes("day 2")) return 1;
  if (w.includes("week 1") || w.includes("week 2")) return 2;
  if (w.includes("week 3") || w.includes("week 4")) return 3;
  if (["week 5","week 6","week 7","week 8"].some(d => w.includes(d))) return 4;
  if (["week 9","week 10","week 11","week 12"].some(d => w.includes(d))) return 5;
  if (["week 13","week 14","week 15","week 16"].some(d => w.includes(d))) return 6;
  return 0;
}

const phaseLabels = ["Ongoing","Phase 1 · Day 1-2","Phase 2 · Weeks 1-2","Phase 3 · Weeks 3-4","Phase 4 · Weeks 5-8","Phase 5 · Weeks 9-12","Phase 6 · Weeks 13-16"];
const phaseColors = ["bg-gray-500","bg-red-500","bg-violet-500","bg-blue-500","bg-orange-500","bg-green-500","bg-gray-500"];

function groupByPhase(tasks: Task[]): Record<number, Task[]> {
  const g: Record<number, Task[]> = {};
  for (const t of tasks) { const p = getPhase(t.when); if (!g[p]) g[p] = []; g[p].push(t); }
  return g;
}

function getConnections(name: string): { member: string; note: string }[] {
  const m: Record<string, { member: string; note: string }[]> = {
    "Swastik Dutta": [{ member: "Sanjay S", note: "Firestore schema drives layout data needs" },{ member: "Naman AU", note: "AI gateway feeds dashboard insights panel" },{ member: "Pragna R", note: "App Check integration gates protected routes" }],
    "Sanjay S": [{ member: "Swastik Dutta", note: "API contracts consumed by frontend" },{ member: "Naman AU", note: "AI gateway Cloud Functions share platform" },{ member: "Pragna R", note: "Firestore rules enforce security policy" }],
    "Naman AU": [{ member: "Subhraneel Goswami", note: "RAG pipeline uses AI gateway" },{ member: "Sanjay S", note: "Cloud Functions host gateway endpoints" },{ member: "Pragna R", note: "Guardrails enforce PHI/PII compliance" }],
    "Subhraneel Goswami": [{ member: "Naman AU", note: "AI gateway powers denial interpretation" },{ member: "Dhyuthi Shree KS", note: "Document extraction feeds RAG ingestion" },{ member: "Sanjay S", note: "Firestore vectors stored in tenant paths" }],
    "Priyanka M": [{ member: "Sanjay S", note: "Claims/payment data from Firestore" },{ member: "Dhyuthi Shree KS", note: "ERA documents feed reconciliation" },{ member: "Swastik Dutta", note: "Dashboard visualizations served to UI" }],
    "Dhyuthi Shree KS": [{ member: "Naman AU", note: "AI gateway powers extraction engine" },{ member: "Subhraneel Goswami", note: "Extracted docs feed RAG pipeline" },{ member: "Sanjay S", note: "Document storage in tenant paths" }],
    "Chandini N": [{ member: "Subhraneel Goswami", note: "Risk scores shown in claims explainability" },{ member: "Chandana Gowda", note: "Shared ML infrastructure and drift tools" },{ member: "Sanjay S", note: "Claims data from Firestore for features" }],
    "Chandana Gowda": [{ member: "Chandini N", note: "Shared ML infrastructure and models" },{ member: "Priyanka M", note: "Leakage detection feeds revenue analytics" },{ member: "Dhyuthi Shree KS", note: "Document extraction data for charge comparison" }],
    "Ayushi Gautam": [{ member: "Swastik Dutta", note: "Hospital feedback drives UI changes" },{ member: "Debanjali Biswas", note: "Case studies from pilot results" },{ member: "Pragna R", note: "Compliance requirements from interviews" }],
    "Debanjali Biswas": [{ member: "Ayushi Gautam", note: "Pilot stories power case studies" },{ member: "Swastik Dutta", note: "Product demos from built features" },{ member: "Naman AU", note: "AI capabilities for marketing messaging" }],
    "Pragna R": [{ member: "Sanjay S", note: "Firestore rules and IAM enforcement" },{ member: "Naman AU", note: "AI gateway security review gates" },{ member: "Swastik Dutta", note: "App Check feeds protected routes" }],
  };
  return m[name] ?? [];
}

/* ─── TEAM DATA ─── */

const teamMembers: TeamMember[] = [
  {
    name: "Swastik Dutta", role: "Product Engineering Lead",
    ownership: "App shell, navigation, role-aware UI, dashboard UX, release coordination",
    color: "#74B9FF", iconName: "LuLayoutDashboard",
    tasks: [
      { id: "sd-app-architecture", title: "Define App Shell Architecture", detail: "Document the monorepo structure, Next.js App Router layout hierarchy, and role-based route groups.", when: "Day 1", priority: "critical", deliverable: "ADR with folder structure diagram and route map" },
      { id: "sd-nav-model", title: "Define Navigation Model & Route Permissions", detail: "Map every route to a role matrix. Specify sidebar items, hidden routes, and fallback redirects.", when: "Day 1-2", priority: "critical", deliverable: "Route permission matrix and navigation config schema" },
      { id: "sd-design-system-plan", title: "Plan Design System & Component Library", detail: "Choose shadcn/ui. Define token system. Plan shared layout primitives.", when: "Day 2", priority: "high", deliverable: "Design system setup guide and Tailwind preset" },
      { id: "sd-release-plan", title: "Define Release Coordination & CI/CD Plan", detail: "Plan trunk-based branching, preview deployment, and GitHub Actions pipeline.", when: "Day 2", priority: "medium", deliverable: "CI/CD pipeline diagram and branching convention" },
      { id: "sd-layout-comps", title: "Build Layout Primitives", detail: "Create AppShell with collapsible sidebar, TopBar with user menu, responsive breakpoints.", when: "Week 1", priority: "critical", deliverable: "AppShell, Sidebar, TopBar components", dependsOn: ["sd-app-architecture"] },
      { id: "sd-auth-integration", title: "Integrate Clerk Auth into Layout Layer", detail: "Wire SignedIn/SignedOut providers. Add protected route middleware. Organization switching.", when: "Week 1", priority: "critical", deliverable: "Auth-gated layout with organization context" },
      { id: "sd-dashboard-wireframe", title: "Dashboard Wireframe & UX Spec", detail: "Design role-specific dashboard layouts. Define widget card grid system.", when: "Week 1-2", priority: "high", deliverable: "Figma wireframes for each role's dashboard" },
      { id: "sd-data-table-shell", title: "Build Reusable DataTable Shell", detail: "Generic DataTable wrapper using TanStack Table v8 with pagination, search, bulk actions.", when: "Week 2", priority: "high", deliverable: "DataTable, DataTableToolbar, DataTablePagination" },
      { id: "sd-role-ui", title: "Implement Role-Aware UI Rendering", detail: "Build useRole() hook. Create RoleGate and RoleGateFallback components.", when: "Week 3", priority: "critical", deliverable: "useRole hook and RoleGate component", dependsOn: ["sd-auth-integration"] },
      { id: "sd-dashboard-mvp", title: "Build MVP Dashboard with KPI Widgets", detail: "Dashboard page with KPI cards fetching from API. Real-time Firestore subscription.", when: "Week 3-4", priority: "critical", deliverable: "Dashboard with 4-6 KPI cards and date filter", dependsOn: ["sd-layout-comps", "sd-dashboard-wireframe"] },
      { id: "sd-command-palette", title: "Build Command Palette (Cmd+K)", detail: "Spotlight-style command palette using cmdk with navigation and entity search.", when: "Week 4", priority: "medium", deliverable: "CommandPalette component", dependsOn: ["sd-layout-comps"] },
      { id: "sd-notification-center", title: "Build Notification Center", detail: "Bell icon dropdown with real-time notifications from Firestore.", when: "Week 4", priority: "medium", deliverable: "NotificationCenter with real-time updates" },
      { id: "sd-claims-pages", title: "Build Claims Module Pages", detail: "Claims list with DataTable, detail page with tabs, new claim form.", when: "Week 5-6", priority: "critical", deliverable: "Claims list, detail, and create pages", dependsOn: ["sd-data-table-shell", "sd-role-ui"] },
      { id: "sd-revenue-pages", title: "Build Revenue Analytics Pages", detail: "Revenue dashboard with Recharts visualizations and filter controls.", when: "Week 6-7", priority: "high", deliverable: "Revenue dashboard with charts and filters", dependsOn: ["sd-data-table-shell"] },
      { id: "sd-doc-intel-pages", title: "Build Document Intelligence Pages", detail: "Document upload, list, and detail pages with PDF viewer.", when: "Week 7-8", priority: "high", deliverable: "Document upload, list, and detail pages" },
      { id: "sd-settings-pages", title: "Build Settings & Admin Pages", detail: "Org settings, user profile, super admin panel, API key management.", when: "Week 8", priority: "medium", deliverable: "Settings pages with member invite flow" },
      { id: "sd-ai-insights-panel", title: "Build AI Insights Side Panel", detail: "Slide-over panel for AI-generated insights with confidence indicators.", when: "Week 9-10", priority: "high", deliverable: "AIInsightsPanel with streaming display", dependsOn: ["sd-claims-pages"] },
      { id: "sd-offline-indicator", title: "Add Offline Indicator & Error Boundaries", detail: "Global error boundaries, network status indicator, toast notifications.", when: "Week 10", priority: "medium", deliverable: "ErrorBoundary, OfflineIndicator, Toast system" },
      { id: "sd-perf-audit", title: "Performance Audit & Optimization", detail: "Lighthouse audits, code splitting, image optimization. Target LCP <2.5s.", when: "Week 11-12", priority: "high", deliverable: "Performance audit report with optimizations" },
      { id: "sd-e2e-tests", title: "Write E2E Test Suite", detail: "Playwright tests for critical user journeys and RBAC verification.", when: "Week 11-12", priority: "high", deliverable: "Playwright test suite with 20+ scenarios" },
      { id: "sd-release-v1", title: "Release v1.0.0 MVP Cut", detail: "Tag release, generate changelog, create GitHub release.", when: "Week 15-16", priority: "critical", deliverable: "v1.0.0 release with changelog", dependsOn: ["sd-perf-audit", "sd-e2e-tests"] },
      { id: "sd-launch-runbook", title: "Create Launch Runbook", detail: "Document deployment process, env checklist, rollback procedures.", when: "Week 16", priority: "critical", deliverable: "Launch runbook with deployment procedures" },
      { id: "sd-weekly-standup", title: "Weekly Engineering Standup", detail: "Host 30-min weekly standup to review progress and unblock dependencies.", when: "Every Monday", priority: "medium", deliverable: "Standup notes and updated sprint board" },
      { id: "sd-pr-reviews", title: "Code Review & PR Approvals", detail: "Review 3-5 PRs daily across frontend codebase.", when: "Daily", priority: "high", deliverable: "Approved PRs with review comments" },
    ],
  },
  {
    name: "Sanjay S", role: "Backend & Firebase Platform Lead",
    ownership: "Firestore schema, Cloud Functions, API contracts, tenant model, events",
    color: "#88D498", iconName: "LuServer",
    tasks: [
      { id: "sj-firestore-schema", title: "Design Firestore Data Model", detail: "Define complete Firestore collection hierarchy and index requirements.", when: "Day 1-2", priority: "critical", deliverable: "Firestore data model document" },
      { id: "sj-tenant-model", title: "Design Multi-Tenant Data Isolation", detail: "Tenant isolation strategy using Security Rules with token-based scoping.", when: "Day 1", priority: "critical", deliverable: "Tenant isolation architecture doc" },
      { id: "sj-api-contracts", title: "Define API Contract Schema", detail: "REST/Callable Functions API contracts using Zod schemas.", when: "Day 2", priority: "high", deliverable: "API contract format guide and Zod validators" },
      { id: "sj-functions-scaffold", title: "Scaffold Cloud Functions Project", detail: "Set up Firebase Functions with TypeScript, ESLint, emulator support.", when: "Week 1", priority: "critical", deliverable: "Functions project scaffold" },
      { id: "sj-auth-middleware", title: "Build Auth & Tenant Middleware", detail: "Reusable middleware for token verification and tenant context resolution.", when: "Week 1-2", priority: "critical", deliverable: "Auth middleware and rate limiter", dependsOn: ["sj-tenant-model"] },
      { id: "sj-firestore-rules", title: "Write Firestore Security Rules", detail: "Comprehensive rules for all collection paths with role-based access.", when: "Week 2", priority: "critical", deliverable: "Complete firestore.rules file", dependsOn: ["sj-firestore-schema", "sj-tenant-model"] },
      { id: "sj-event-bus", title: "Design Event Bus Architecture", detail: "Internal event system using Firestore documents or Pub/Sub.", when: "Week 2", priority: "high", deliverable: "Event type definitions and handler registry" },
      { id: "sj-claims-api", title: "Build Claims CRUD API", detail: "Cloud Callable functions for claims CRUD with Zod validation.", when: "Week 3", priority: "critical", deliverable: "Claims API with 5 endpoints", dependsOn: ["sj-functions-scaffold", "sj-auth-middleware"] },
      { id: "sj-doc-upload-api", title: "Build Document Upload & Processing API", detail: "Signed URL generation, processing trigger, status tracking.", when: "Week 3-4", priority: "critical", deliverable: "Document upload flow with signed URLs", dependsOn: ["sj-functions-scaffold"] },
      { id: "sj-revenue-api", title: "Build Revenue Analytics API", detail: "Revenue ingestion, aggregation, and detail endpoints.", when: "Week 4", priority: "high", deliverable: "Revenue API with aggregation", dependsOn: ["sj-functions-scaffold"] },
      { id: "sj-dashboard-stats", title: "Build Dashboard Statistics Aggregation", detail: "On-demand and cached aggregation for dashboard KPIs.", when: "Week 5-6", priority: "high", deliverable: "Dashboard stats API", dependsOn: ["sj-claims-api", "sj-revenue-api"] },
      { id: "sj-webhook-handlers", title: "Build External Webhook Handlers", detail: "Inbound webhooks for payer notifications and ERA uploads.", when: "Week 6-7", priority: "medium", deliverable: "Webhook handler endpoints", dependsOn: ["sj-event-bus"] },
      { id: "sj-firestore-backup", title: "Set Up Firestore Backup & Recovery", detail: "Automated daily exports to GCS with 30-day retention.", when: "Week 7-8", priority: "medium", deliverable: "Automated backup pipeline" },
      { id: "sj-tenant-admin-api", title: "Build Tenant Admin API", detail: "Super admin endpoints for tenant provisioning and management.", when: "Week 8", priority: "high", deliverable: "Tenant admin API", dependsOn: ["sj-tenant-model", "sj-auth-middleware"] },
      { id: "sj-realtime-sync", title: "Implement Real-Time Data Sync", detail: "Firestore real-time listeners for claims, docs, notifications.", when: "Week 9-10", priority: "high", deliverable: "Real-time sync hooks", dependsOn: ["sj-claims-api", "sj-doc-upload-api"] },
      { id: "sj-data-migration", title: "Build Data Migration Tooling", detail: "CLI tool for legacy hospital data migration.", when: "Week 10-11", priority: "medium", deliverable: "Migration CLI tool" },
      { id: "sj-api-versioning", title: "Implement API Versioning Strategy", detail: "Add /v1/ prefixing with deprecation headers.", when: "Week 11-12", priority: "medium", deliverable: "Versioned API routes" },
      { id: "sj-load-testing", title: "Load Testing & Performance Profiling", detail: "k6 load tests targeting 100 concurrent users.", when: "Week 13-14", priority: "high", deliverable: "Load test scripts and performance report" },
      { id: "sj-security-audit", title: "Backend Security Audit", detail: "Review all Firestore Rules and Cloud Functions for vulnerabilities.", when: "Week 14-15", priority: "critical", deliverable: "Security audit report", dependsOn: ["sj-firestore-rules"] },
      { id: "sj-prod-checklist", title: "Production Readiness Checklist", detail: "Verify all env vars, indexes, memory allocation, and alerting.", when: "Week 15-16", priority: "critical", deliverable: "Completed readiness checklist" },
      { id: "sj-weekly-standup", title: "Weekly Backend Standup", detail: "Report on API stability and Firestore costs.", when: "Every Monday", priority: "medium", deliverable: "Backend status report" },
      { id: "sj-pr-reviews", title: "Backend Code Reviews", detail: "Review all backend PRs for security and performance.", when: "Daily", priority: "high", deliverable: "Approved backend PRs" },
    ],
  },
  {
    name: "Naman AU", role: "Shared AI Platform Lead",
    ownership: "AI gateway, structured outputs, prompt registry, guardrails, evaluation",
    color: "#B8A9FA", iconName: "LuBrain",
    tasks: [
      { id: "na-ai-architecture", title: "Design AI Gateway Architecture", detail: "Cloud Functions middleware layer routing LLM requests with rate limiting.", when: "Day 1-2", priority: "critical", deliverable: "AI gateway architecture diagram" },
      { id: "na-prompt-registry-plan", title: "Design Prompt Registry Schema", detail: "Firestore schema for versioned prompt templates.", when: "Day 1", priority: "critical", deliverable: "Prompt registry data model" },
      { id: "na-output-schema-plan", title: "Design Structured Output Schema System", detail: "JSON Schema registry for all AI outputs.", when: "Day 2", priority: "high", deliverable: "Output schema registry design" },
      { id: "na-ai-gateway-impl", title: "Implement AI Gateway Core", detail: "Single entry point for all AI requests with provider routing.", when: "Week 1-2", priority: "critical", deliverable: "AI gateway Cloud Function", dependsOn: ["na-ai-architecture"] },
      { id: "na-prompt-registry-impl", title: "Implement Prompt Registry Service", detail: "CRUD API for prompt templates with versioning.", when: "Week 2", priority: "critical", deliverable: "Prompt registry API", dependsOn: ["na-prompt-registry-plan"] },
      { id: "na-guardrails-engine", title: "Build Guardrails Engine", detail: "Pre/post call validation for PII, schema compliance, hallucination detection.", when: "Week 2-3", priority: "critical", deliverable: "Guardrails engine", dependsOn: ["na-ai-gateway-impl"] },
      { id: "na-structured-output", title: "Implement Structured Output Pipeline", detail: "Compiler converting Zod schemas to OpenAI/Anthropic formats.", when: "Week 3-4", priority: "critical", deliverable: "Structured output compiler", dependsOn: ["na-output-schema-plan", "na-ai-gateway-impl"] },
      { id: "na-token-budget", title: "Implement Token Budget & Cost Controls", detail: "Per-tenant token tracking with automatic throttling.", when: "Week 4", priority: "high", deliverable: "Token budget manager", dependsOn: ["na-ai-gateway-impl"] },
      { id: "na-eval-framework", title: "Build AI Evaluation Framework", detail: "Test harness with accuracy, precision/recall, BLEU/ROUGE metrics.", when: "Week 5-7", priority: "high", deliverable: "Evaluation framework", dependsOn: ["na-prompt-registry-impl", "na-structured-output"] },
      { id: "na-ab-testing", title: "Implement A/B Testing for Prompts", detail: "Traffic splitting between prompt versions with significance testing.", when: "Week 6-7", priority: "medium", deliverable: "A/B test engine", dependsOn: ["na-prompt-registry-impl"] },
      { id: "na-observability", title: "Build AI Observability Dashboard", detail: "Token consumption, latency percentiles, error tracking.", when: "Week 7-8", priority: "medium", deliverable: "AI observability pipeline", dependsOn: ["na-ai-gateway-impl"] },
      { id: "na-prompt-caching", title: "Implement Prompt Caching Strategy", detail: "Semantic caching using Firestore with embedding similarity.", when: "Week 8", priority: "medium", deliverable: "Prompt cache layer" },
      { id: "na-streaming-support", title: "Add Streaming Response Support", detail: "SSE streaming through AI gateway with guardrail checks.", when: "Week 9-10", priority: "high", deliverable: "Streaming pipeline with client SDK", dependsOn: ["na-ai-gateway-impl", "na-guardrails-engine"] },
      { id: "na-fine-tuning-pipeline", title: "Build Fine-Tuning Data Pipeline", detail: "Extract training examples, format for OpenAI fine-tuning API.", when: "Week 10-12", priority: "medium", deliverable: "Fine-tuning data pipeline" },
      { id: "na-model-router", title: "Build Intelligent Model Router", detail: "Route requests to optimal model based on complexity and cost.", when: "Week 11-12", priority: "medium", deliverable: "Model router", dependsOn: ["na-ab-testing", "na-eval-framework"] },
      { id: "na-stress-testing", title: "AI Gateway Stress Testing", detail: "Load test with 500 concurrent requests.", when: "Week 13-14", priority: "high", deliverable: "Stress test results", dependsOn: ["na-ai-gateway-impl"] },
      { id: "na-security-review", title: "AI Security & Compliance Review", detail: "Audit guardrails for PHI/PII handling compliance.", when: "Week 14-15", priority: "critical", deliverable: "AI security audit report", dependsOn: ["na-guardrails-engine"] },
      { id: "na-launch-config", title: "AI Platform Launch Configuration", detail: "Freeze prompt versions, set rate limits, enable monitoring.", when: "Week 15-16", priority: "critical", deliverable: "Production config and runbook" },
      { id: "na-weekly-standup", title: "Weekly AI Platform Standup", detail: "Report on AI costs, latency, and evaluation scores.", when: "Every Monday", priority: "medium", deliverable: "AI platform status report" },
      { id: "na-pr-reviews", title: "AI Platform Code Reviews", detail: "Review AI PRs for safety, cost efficiency, and observability.", when: "Daily", priority: "high", deliverable: "Approved AI platform PRs" },
    ],
  },
  {
    name: "Subhraneel Goswami", role: "Claims Intelligence Lead",
    ownership: "RAG, claim requirements, denial interpretation, claim explainability",
    color: "#FFD23F", iconName: "LuSearchCode",
    tasks: [
      { id: "sg-rag-architecture", title: "Design Claims RAG Architecture", detail: "RAG pipeline: chunking, embedding model, vector store, hybrid retrieval.", when: "Day 1-2", priority: "critical", deliverable: "RAG architecture design doc" },
      { id: "sg-denial-taxonomy", title: "Define Denial Reason Taxonomy", detail: "Hierarchical taxonomy of denial reasons with resolution mappings.", when: "Day 1-2", priority: "critical", deliverable: "Denial taxonomy v1.0" },
      { id: "sg-claim-requirements", title: "Define Claim Requirements Knowledge Base", detail: "Structured requirements for each major claim type.", when: "Day 2", priority: "high", deliverable: "Requirements knowledge base" },
      { id: "sg-vector-pipeline", title: "Build Document Ingestion & Vectorization Pipeline", detail: "Ingest denial policies and payer guidelines into vector store.", when: "Week 1-2", priority: "critical", deliverable: "Ingestion pipeline", dependsOn: ["sg-rag-architecture"] },
      { id: "sg-retrieval-engine", title: "Build Hybrid Retrieval Engine", detail: "BM25 + semantic search with query expansion and MMR.", when: "Week 2", priority: "critical", deliverable: "Retrieval engine", dependsOn: ["sg-vector-pipeline"] },
      { id: "sg-denial-interpreter", title: "Build Denial Interpretation Engine", detail: "RAG-backed explanation generation for denial reasons.", when: "Week 3-4", priority: "critical", deliverable: "DenialInterpreter module", dependsOn: ["sg-retrieval-engine", "sg-denial-taxonomy"] },
      { id: "sg-claim-validator", title: "Build Pre-Submission Claim Validator", detail: "Rule engine validating claims against payer requirements.", when: "Week 4", priority: "high", deliverable: "Claim validator with 50+ rules", dependsOn: ["sg-claim-requirements"] },
      { id: "sg-explainability-ui", title: "Build Claim Explainability UI Components", detail: "React components for AI-generated claim insights.", when: "Week 5-7", priority: "high", deliverable: "4 explainability components", dependsOn: ["sg-denial-interpreter"] },
      { id: "sg-appeal-generator", title: "Build Appeal Letter Generator", detail: "Automated appeal letter generation with policy citations.", when: "Week 6-8", priority: "high", deliverable: "Appeal generator with 5 templates", dependsOn: ["sg-denial-interpreter", "sg-claim-validator"] },
      { id: "sg-knowledge-updater", title: "Build Knowledge Base Update Pipeline", detail: "Automated monitoring for CMS policy updates.", when: "Week 7-8", priority: "medium", deliverable: "KB update pipeline", dependsOn: ["sg-vector-pipeline"] },
      { id: "sg-batch-analysis", title: "Build Batch Claim Analysis Engine", detail: "Historical claims analysis for denial patterns.", when: "Week 9-10", priority: "high", deliverable: "Batch analysis engine", dependsOn: ["sg-denial-interpreter"] },
      { id: "sg-real-time-advisor", title: "Build Real-Time Claims Advisor", detail: "Chat-like advisor powered by RAG with conversation memory.", when: "Week 10-12", priority: "medium", deliverable: "ClaimsAdvisor chatbot", dependsOn: ["sg-retrieval-engine", "sg-denial-interpreter"] },
      { id: "sg-explainability-metrics", title: "Measure Explainability Quality", detail: "Citation accuracy, completeness score, feedback loop.", when: "Week 11-12", priority: "medium", deliverable: "Explainability metrics dashboard" },
      { id: "sg-claims-accuracy-test", title: "Claims Intelligence Accuracy Testing", detail: "500+ test cases covering all modules.", when: "Week 13-14", priority: "critical", deliverable: "Test suite with accuracy report" },
      { id: "sg-claims-launch-config", title: "Claims Intelligence Launch Configuration", detail: "Freeze RAG parameters, lock prompt versions.", when: "Week 15-16", priority: "critical", deliverable: "Production config freeze", dependsOn: ["sg-claims-accuracy-test"] },
      { id: "sg-weekly-standup", title: "Weekly Claims Intelligence Standup", detail: "Report on retrieval accuracy and denial interpretation quality.", when: "Every Monday", priority: "medium", deliverable: "Claims intelligence status report" },
      { id: "sg-pr-reviews", title: "Claims Intelligence Code Reviews", detail: "Review PRs for RAG pipeline and denial interpretation.", when: "Daily", priority: "high", deliverable: "Approved claims intelligence PRs" },
    ],
  },
  {
    name: "Priyanka M", role: "Revenue Analytics Lead",
    ownership: "KPI model, reconciliation engine, leakage economics, metrics",
    color: "#FF6B6B", iconName: "LuTrendingUp",
    tasks: [
      { id: "pm-kpi-model", title: "Design Revenue KPI Model", detail: "Complete KPI taxonomy: top-line, operational, and leakage metrics.", when: "Day 1-2", priority: "critical", deliverable: "KPI model with 30+ metrics" },
      { id: "pm-leakage-model", title: "Define Revenue Leakage Economics Model", detail: "Leakage categories, impact quantification, and ROI model.", when: "Day 1", priority: "critical", deliverable: "Leakage economics model" },
      { id: "pm-reconciliation-plan", title: "Design Reconciliation Engine Architecture", detail: "Matching algorithm, discrepancy detection, root cause classification.", when: "Day 2", priority: "high", deliverable: "Reconciliation engine architecture" },
      { id: "pm-kpi-schema", title: "Define KPI Data Schema & Aggregation Logic", detail: "Firestore collections for KPI snapshots and aggregation pipeline.", when: "Week 1-2", priority: "critical", deliverable: "KPI data schema and scheduler config", dependsOn: ["pm-kpi-model"] },
      { id: "pm-revenue-api-spec", title: "Define Revenue API Specifications", detail: "OpenAPI specs for all revenue analytics endpoints.", when: "Week 2", priority: "high", deliverable: "OpenAPI spec with 15+ endpoints", dependsOn: ["pm-reconciliation-plan"] },
      { id: "pm-kpi-engine", title: "Build KPI Computation Engine", detail: "Cloud Functions computing all KPIs with edge case handling.", when: "Week 3-4", priority: "critical", deliverable: "KPI engine with 30+ metrics", dependsOn: ["pm-kpi-schema"] },
      { id: "pm-reconciliation-engine", title: "Build Reconciliation Engine", detail: "ERA/835 parsing, payment matching, discrepancy detection.", when: "Week 3-4", priority: "critical", deliverable: "Reconciliation engine", dependsOn: ["pm-reconciliation-plan"] },
      { id: "pm-leakage-detector", title: "Build Revenue Leakage Detection System", detail: "Automated leakage scanning with dollar impact estimation.", when: "Week 5-7", priority: "high", deliverable: "Leakage detector with 10+ rules", dependsOn: ["pm-kpi-engine", "pm-leakage-model"] },
      { id: "pm-revenue-dashboard-api", title: "Build Revenue Dashboard Data API", detail: "Data endpoints for revenue analytics dashboard with caching.", when: "Week 6-8", priority: "high", deliverable: "Revenue dashboard API", dependsOn: ["pm-kpi-engine", "pm-revenue-api-spec"] },
      { id: "pm-payer-analytics", title: "Build Payer Performance Analytics", detail: "Payer profiling, comparison, and trend analysis.", when: "Week 7-8", priority: "medium", deliverable: "Payer analytics module", dependsOn: ["pm-kpi-engine"] },
      { id: "pm-forecasting", title: "Build Revenue Forecasting Model", detail: "Time-series forecasting with exponential smoothing and ARIMA.", when: "Week 9-11", priority: "medium", deliverable: "Revenue forecasting with scenario builder", dependsOn: ["pm-kpi-engine"] },
      { id: "pm-automated-reconciliation", title: "Build Automated Reconciliation Scheduling", detail: "Cloud Scheduler-driven daily reconciliation pipeline.", when: "Week 10-12", priority: "high", deliverable: "Automated reconciliation pipeline", dependsOn: ["pm-reconciliation-engine"] },
      { id: "pm-export-reports", title: "Build Revenue Report Export", detail: "PDF and Excel export with branded templates.", when: "Week 11-12", priority: "medium", deliverable: "Report export module", dependsOn: ["pm-revenue-dashboard-api"] },
      { id: "pm-accuracy-validation", title: "Revenue Analytics Accuracy Validation", detail: "Validate KPIs against manual calculations from 3 hospitals.", when: "Week 13-14", priority: "critical", deliverable: "Accuracy validation report" },
      { id: "pm-launch-config", title: "Revenue Analytics Launch Configuration", detail: "Configure production schedulers and alert thresholds.", when: "Week 15-16", priority: "critical", deliverable: "Production configuration", dependsOn: ["pm-accuracy-validation"] },
      { id: "pm-weekly-standup", title: "Weekly Revenue Analytics Standup", detail: "Report on KPI accuracy and reconciliation throughput.", when: "Every Monday", priority: "medium", deliverable: "Revenue analytics status report" },
      { id: "pm-pr-reviews", title: "Revenue Analytics Code Reviews", detail: "Review PRs for calculation correctness and edge cases.", when: "Daily", priority: "high", deliverable: "Approved revenue analytics PRs" },
    ],
  },
  {
    name: "Dhyuthi Shree KS", role: "Document Intelligence Lead",
    ownership: "Ingestion, extraction schemas, OCR/vision, metadata mapping",
    color: "#74B9FF", iconName: "LuFileSearch",
    tasks: [
      { id: "ds-ingestion-architecture", title: "Design Document Ingestion Architecture", detail: "End-to-end document processing pipeline with OCR engine comparison.", when: "Day 1-2", priority: "critical", deliverable: "Ingestion architecture diagram" },
      { id: "ds-extraction-schemas", title: "Design Extraction Schema Definitions", detail: "JSON Schema definitions for 10+ document types.", when: "Day 1-2", priority: "critical", deliverable: "JSON Schema definitions" },
      { id: "ds-metadata-model", title: "Design Document Metadata Model", detail: "Metadata schema and Firestore collection design.", when: "Day 2", priority: "high", deliverable: "Metadata schema definition" },
      { id: "ds-upload-pipeline", title: "Build Document Upload Pipeline", detail: "Signed URL generation, validation, format conversion, thumbnails.", when: "Week 1-2", priority: "critical", deliverable: "Upload pipeline", dependsOn: ["ds-ingestion-architecture"] },
      { id: "ds-ocr-pipeline", title: "Build OCR & Vision Processing Pipeline", detail: "Cloud Vision API pipeline with multi-page support.", when: "Week 2-3", priority: "critical", deliverable: "OCR pipeline", dependsOn: ["ds-upload-pipeline"] },
      { id: "ds-extraction-engine", title: "Build Document Extraction Engine", detail: "AI-powered extraction via Naman's gateway with schema validation.", when: "Week 3-4", priority: "critical", deliverable: "Extraction engine", dependsOn: ["ds-ocr-pipeline", "ds-extraction-schemas"] },
      { id: "ds-metadata-mapper", title: "Build Metadata Auto-Mapping Engine", detail: "Entity linking with fuzzy matching for OCR errors.", when: "Week 4", priority: "high", deliverable: "Metadata mapper", dependsOn: ["ds-extraction-engine", "ds-metadata-model"] },
      { id: "ds-batch-processing", title: "Build Batch Document Processing", detail: "ZIP archive upload with parallel processing.", when: "Week 5-7", priority: "high", deliverable: "Batch processing system", dependsOn: ["ds-upload-pipeline", "ds-extraction-engine"] },
      { id: "ds-quality-checks", title: "Build Extraction Quality Checks", detail: "Cross-field validation, dedup, completeness scoring.", when: "Week 6-8", priority: "high", deliverable: "Quality check pipeline", dependsOn: ["ds-extraction-engine"] },
      { id: "ds-human-review", title: "Build Human Review Queue", detail: "Split-view UI for document review with inline editing.", when: "Week 7-8", priority: "medium", deliverable: "Human review interface", dependsOn: ["ds-extraction-engine", "ds-quality-checks"] },
      { id: "ds-vision-enhancements", title: "Add Advanced Vision Processing", detail: "Handwriting, form fields, table extraction, barcode reading.", when: "Week 9-10", priority: "medium", deliverable: "Enhanced vision pipeline", dependsOn: ["ds-ocr-pipeline"] },
      { id: "ds-extraction-learning", title: "Build Extraction Feedback Loop", detail: "Human corrections logged as training data.", when: "Week 10-12", priority: "medium", deliverable: "Feedback capture pipeline", dependsOn: ["ds-human-review"] },
      { id: "ds-processing-metrics", title: "Build Document Processing Metrics", detail: "Metrics tracking for pipeline performance.", when: "Week 11-12", priority: "medium", deliverable: "Processing metrics pipeline", dependsOn: ["ds-extraction-engine"] },
      { id: "ds-accuracy-testing", title: "Document Extraction Accuracy Testing", detail: "500+ document test dataset with accuracy measurement.", when: "Week 13-14", priority: "critical", deliverable: "Accuracy test results" },
      { id: "ds-launch-config", title: "Document Intelligence Launch Config", detail: "Configure production settings and monitoring.", when: "Week 15-16", priority: "critical", deliverable: "Production config and runbook", dependsOn: ["ds-accuracy-testing"] },
      { id: "ds-weekly-standup", title: "Weekly Document Intelligence Standup", detail: "Report on extraction accuracy and processing throughput.", when: "Every Monday", priority: "medium", deliverable: "Document intelligence status report" },
      { id: "ds-pr-reviews", title: "Document Intelligence Code Reviews", detail: "Review PRs for OCR pipeline and extraction engine.", when: "Daily", priority: "high", deliverable: "Approved document intelligence PRs" },
    ],
  },
  {
    name: "Chandini N", role: "Claim Risk ML Lead",
    ownership: "Risk scoring, feature engineering, calibration, drift monitoring",
    color: "#B8A9FA", iconName: "LuShieldAlert",
    tasks: [
      { id: "cn-risk-model-design", title: "Design Claim Risk Scoring Model", detail: "Binary classification with XGBoost for tabular features.", when: "Day 1-2", priority: "critical", deliverable: "Model design document" },
      { id: "cn-feature-catalog", title: "Define Feature Engineering Catalog", detail: "50+ features across claim-level, historical, temporal, derived.", when: "Day 1-2", priority: "critical", deliverable: "Feature catalog" },
      { id: "cn-label-strategy", title: "Define Labeling Strategy", detail: "Training labels from historical claims data.", when: "Day 2", priority: "high", deliverable: "Labeling strategy document" },
      { id: "cn-feature-pipeline", title: "Build Feature Engineering Pipeline", detail: "Cloud Functions computing 50+ features with imputation.", when: "Week 1-3", priority: "critical", deliverable: "Feature pipeline", dependsOn: ["cn-feature-catalog"] },
      { id: "cn-training-pipeline", title: "Build Model Training Pipeline", detail: "Training pipeline with hyperparameter tuning and cross-validation.", when: "Week 2-3", priority: "critical", deliverable: "Training pipeline", dependsOn: ["cn-feature-pipeline", "cn-label-strategy"] },
      { id: "cn-risk-scoring-api", title: "Build Risk Scoring API", detail: "Real-time risk scoring with SHAP explanations.", when: "Week 3-4", priority: "critical", deliverable: "Risk scoring endpoint", dependsOn: ["cn-training-pipeline"] },
      { id: "cn-model-calibration", title: "Implement Model Calibration", detail: "Platt scaling for well-calibrated risk scores.", when: "Week 4", priority: "high", deliverable: "Calibrated model", dependsOn: ["cn-risk-scoring-api"] },
      { id: "cn-drift-monitor", title: "Build Model Drift Monitoring", detail: "Data drift, concept drift, and prediction drift monitoring.", when: "Week 5-7", priority: "high", deliverable: "Drift monitoring system", dependsOn: ["cn-risk-scoring-api"] },
      { id: "cn-risk-explainability", title: "Build Risk Score Explainability", detail: "SHAP-based explanations in natural language.", when: "Week 6-8", priority: "high", deliverable: "SHAP explanation generator", dependsOn: ["cn-risk-scoring-api"] },
      { id: "cn-model-registry", title: "Build Model Registry", detail: "Firestore-backed model version tracking.", when: "Week 7-8", priority: "medium", deliverable: "Model registry", dependsOn: ["cn-training-pipeline"] },
      { id: "cn-batch-scoring", title: "Build Batch Risk Scoring", detail: "Daily batch scoring of 10K+ claims.", when: "Week 9-10", priority: "high", deliverable: "Batch scoring pipeline", dependsOn: ["cn-risk-scoring-api", "cn-drift-monitor"] },
      { id: "cn-ab-testing", title: "A/B Test Risk Model Versions", detail: "Traffic splitting with statistical significance testing.", when: "Week 10-12", priority: "medium", deliverable: "A/B testing framework", dependsOn: ["cn-model-registry", "cn-drift-monitor"] },
      { id: "cn-active-learning", title: "Implement Active Learning for Labeling", detail: "Uncertainty sampling for efficient labeling.", when: "Week 11-12", priority: "medium", deliverable: "Active learning pipeline", dependsOn: ["cn-risk-scoring-api", "cn-model-registry"] },
      { id: "cn-model-validation", title: "Final Model Validation & Stress Testing", detail: "Comprehensive validation across subgroups.", when: "Week 13-14", priority: "critical", deliverable: "Model validation report" },
      { id: "cn-launch-config", title: "Risk Model Launch Configuration", detail: "Set production thresholds and enable monitoring.", when: "Week 15-16", priority: "critical", deliverable: "Production ML configuration", dependsOn: ["cn-model-validation"] },
      { id: "cn-weekly-standup", title: "Weekly ML Standup", detail: "Report on model performance and drift status.", when: "Every Monday", priority: "medium", deliverable: "ML status report" },
      { id: "cn-pr-reviews", title: "ML Code Reviews", detail: "Review PRs for feature pipelines and model training.", when: "Daily", priority: "high", deliverable: "Approved ML PRs" },
    ],
  },
  {
    name: "Chandana Gowda", role: "Billing Audit ML Lead",
    ownership: "Missed/duplicate charge detection, anomaly scoring, FP review loops",
    color: "#88D498", iconName: "LuScanSearch",
    tasks: [
      { id: "cg-anomaly-model-design", title: "Design Billing Anomaly Detection Model", detail: "Ensemble: isolation forest + supervised + rule-based detection.", when: "Day 1-2", priority: "critical", deliverable: "Anomaly detection model design" },
      { id: "cg-charge-patterns", title: "Define Charge Pattern Catalog", detail: "20+ billing anomaly patterns with prevalence data.", when: "Day 1-2", priority: "critical", deliverable: "Charge pattern catalog" },
      { id: "cg-review-workflow", title: "Design False Positive Review Workflow", detail: "FP review process with queue prioritization.", when: "Day 2", priority: "high", deliverable: "FP review workflow document" },
      { id: "cg-feature-engineering", title: "Build Billing Feature Engineering Pipeline", detail: "40+ billing anomaly features with storage.", when: "Week 1-3", priority: "critical", deliverable: "Feature pipeline" },
      { id: "cg-rule-engine", title: "Build Rule-Based Detection Engine", detail: "15+ configurable billing rules with audit trail.", when: "Week 2-3", priority: "critical", deliverable: "Rule engine" },
      { id: "cg-anomaly-detector", title: "Build Anomaly Detection Model", detail: "Trained isolation forest with serving endpoint.", when: "Week 3-4", priority: "critical", deliverable: "Anomaly detection model", dependsOn: ["cg-feature-engineering"] },
      { id: "cg-ensemble-scoring", title: "Build Ensemble Anomaly Scoring", detail: "Weighted combination with severity classification.", when: "Week 4", priority: "high", deliverable: "Ensemble scoring module", dependsOn: ["cg-anomaly-detector", "cg-rule-engine"] },
      { id: "cg-fp-management", title: "Build False Positive Management System", detail: "FP tracking with dismissal reasons and feedback.", when: "Week 5-7", priority: "high", deliverable: "FP management system", dependsOn: ["cg-ensemble-scoring", "cg-review-workflow"] },
      { id: "cg-missed-charge-detector", title: "Build Missed Charge Detection", detail: "Documentation-to-charge comparison with recovery estimation.", when: "Week 6-8", priority: "high", deliverable: "Missed charge detector", dependsOn: ["cg-feature-engineering"] },
      { id: "cg-duplicate-detector", title: "Build Duplicate Charge Detector", detail: "Exact and fuzzy matching with cascading detection.", when: "Week 7-8", priority: "high", deliverable: "Duplicate charge detector", dependsOn: ["cg-rule-engine"] },
      { id: "cg-supervised-model", title: "Train Supervised Classification Model", detail: "XGBoost classifier for known billing error patterns.", when: "Week 9-10", priority: "high", deliverable: "Supervised classifier", dependsOn: ["cg-ensemble-scoring", "cg-fp-management"] },
      { id: "cg-audit-reporting", title: "Build Audit Reporting Dashboard", detail: "6 report types with drill-down capability.", when: "Week 10-12", priority: "high", deliverable: "Audit reporting API", dependsOn: ["cg-ensemble-scoring", "cg-fp-management"] },
      { id: "cg-drift-monitoring", title: "Implement Billing Model Drift Monitoring", detail: "Monitor billing pattern shifts with KS test.", when: "Week 11-12", priority: "medium", deliverable: "Billing drift monitoring", dependsOn: ["cg-supervised-model"] },
      { id: "cg-accuracy-testing", title: "Billing Audit Accuracy Testing", detail: "2000+ charge test dataset with per-type metrics.", when: "Week 13-14", priority: "critical", deliverable: "Accuracy test results" },
      { id: "cg-launch-config", title: "Billing Audit Launch Configuration", detail: "Configure ensemble weights and alert thresholds.", when: "Week 15-16", priority: "critical", deliverable: "Production configuration", dependsOn: ["cg-accuracy-testing"] },
      { id: "cg-weekly-standup", title: "Weekly Billing Audit Standup", detail: "Report on anomaly detection and FP rates.", when: "Every Monday", priority: "medium", deliverable: "Billing audit status report" },
      { id: "cg-pr-reviews", title: "Billing Audit Code Reviews", detail: "Review PRs for billing features and anomaly detection.", when: "Daily", priority: "high", deliverable: "Approved billing audit PRs" },
    ],
  },
  {
    name: "Ayushi Gautam", role: "Hospital Discovery & Pilot Lead",
    ownership: "Workflow discovery, buyer interviews, pilot recruitment",
    color: "#FFD23F", iconName: "LuHospital",
    tasks: [
      { id: "ag-market-research", title: "Conduct Hospital Market Research", detail: "Research target hospital segment and build prospect database.", when: "Day 1-2", priority: "critical", deliverable: "Market research and 50+ hospital database" },
      { id: "ag-buyer-personas", title: "Define Buyer Personas", detail: "CFO, Billing Manager, IT Head personas with pain points.", when: "Day 1", priority: "high", deliverable: "3 buyer persona documents" },
      { id: "ag-discovery-framework", title: "Build Workflow Discovery Framework", detail: "Structured interview framework with workflow mapping templates.", when: "Day 2", priority: "critical", deliverable: "Discovery interview guide" },
      { id: "ag-interview-campaign", title: "Launch Discovery Interview Campaign", detail: "15+ discovery interviews with hospital stakeholders.", when: "Week 1-2", priority: "critical", deliverable: "15+ completed interviews", dependsOn: ["ag-discovery-framework", "ag-market-research"] },
      { id: "ag-workflow-maps", title: "Build Hospital Workflow Maps", detail: "5 detailed revenue cycle workflow maps with pain points.", when: "Week 1-2", priority: "high", deliverable: "5 workflow maps", dependsOn: ["ag-interview-campaign"] },
      { id: "ag-pipeline-builder", title: "Build Pilot Pipeline", detail: "Structured pipeline with qualification criteria.", when: "Week 3-4", priority: "critical", deliverable: "Pilot pipeline with 20+ prospects", dependsOn: ["ag-interview-campaign"] },
      { id: "ag-value-proposition", title: "Refine Value Proposition per Segment", detail: "Segment-specific value props for 3 hospital sizes.", when: "Week 3-4", priority: "high", deliverable: "3 value propositions", dependsOn: ["ag-workflow-maps"] },
      { id: "ag-pilot-recruitment", title: "Execute Pilot Recruitment", detail: "Negotiate and sign pilot agreements.", when: "Week 5-8", priority: "critical", deliverable: "5 signed pilot agreements", dependsOn: ["ag-pipeline-builder"] },
      { id: "ag-onboarding-plans", title: "Create Pilot Onboarding Plans", detail: "Detailed onboarding for each pilot hospital.", when: "Week 6-8", priority: "high", deliverable: "5 onboarding plans", dependsOn: ["ag-pilot-recruitment"] },
      { id: "ag-pilot-support", title: "Pilot Launch & Active Support", detail: "Primary contact for pilot hospitals during go-live.", when: "Week 9-12", priority: "critical", deliverable: "Weekly pilot health reports", dependsOn: ["ag-onboarding-plans"] },
      { id: "ag-success-metrics", title: "Define & Track Pilot Success Metrics", detail: "Specific success metrics per pilot hospital.", when: "Week 9-12", priority: "high", deliverable: "Success metrics dashboard", dependsOn: ["ag-pilot-support"] },
      { id: "ag-feedback-loop", title: "Structured Feedback Collection", detail: "Bi-weekly feedback sessions with standardized forms.", when: "Week 9-12", priority: "high", deliverable: "Bi-weekly feedback reports", dependsOn: ["ag-pilot-support"] },
      { id: "ag-case-studies", title: "Draft Pilot Case Studies", detail: "3 detailed case studies from pilot results.", when: "Week 13-14", priority: "high", deliverable: "3 draft case studies", dependsOn: ["ag-success-metrics"] },
      { id: "ag-scaling-plan", title: "Define Go-to-Market Scaling Plan", detail: "Scaling strategy based on pilot learnings.", when: "Week 15-16", priority: "critical", deliverable: "GTM scaling plan", dependsOn: ["ag-case-studies"] },
      { id: "ag-weekly-standup", title: "Weekly Pilot Standup", detail: "Report on pipeline and pilot health.", when: "Every Monday", priority: "medium", deliverable: "Pilot status report" },
      { id: "ag-stakeholder-updates", title: "Weekly Stakeholder Updates", detail: "Weekly email updates to leadership.", when: "Every Friday", priority: "medium", deliverable: "Weekly stakeholder update" },
    ],
  },
  {
    name: "Debanjali Biswas", role: "Product Marketing & Enablement",
    ownership: "Messaging, demo narrative, case studies, launch content",
    color: "#FF6B6B", iconName: "LuMegaphone",
    tasks: [
      { id: "db-messaging-framework", title: "Build Core Messaging Framework", detail: "Brand voice, messaging hierarchy, competitor positioning.", when: "Day 1-2", priority: "critical", deliverable: "Messaging framework document" },
      { id: "db-brand-guidelines", title: "Establish Product Brand Guidelines", detail: "Logo, color palette, typography, tone of voice.", when: "Day 1", priority: "high", deliverable: "Brand guidelines document" },
      { id: "db-content-calendar", title: "Create 16-Week Content Calendar", detail: "Content strategy aligned with MVP timeline.", when: "Day 2", priority: "high", deliverable: "16-week content calendar" },
      { id: "db-website-wireframes", title: "Wireframe Product Website Pages", detail: "Wireframes for 6 key website pages.", when: "Week 1-2", priority: "critical", deliverable: "Wireframes for 6 pages", dependsOn: [] },
      { id: "db-demo-narrative", title: "Craft Demo Narrative & Script", detail: "15-minute demo script with persona branches.", when: "Week 2", priority: "critical", deliverable: "Demo script and slide deck" },
      { id: "db-competitive-analysis", title: "Build Competitive Analysis Deck", detail: "5 competitor analysis with battle cards.", when: "Week 2", priority: "high", deliverable: "Competitive analysis deck" },
      { id: "db-website-build", title: "Build Product Marketing Website", detail: "Next.js website with SEO and analytics.", when: "Week 3-4", priority: "high", deliverable: "Marketing website", dependsOn: ["db-website-wireframes"] },
      { id: "db-sales-collateral", title: "Create Sales Collateral", detail: "One-pager, brochure, ROI calculator, email templates.", when: "Week 3-4", priority: "high", deliverable: "Sales collateral package", dependsOn: ["db-messaging-framework"] },
      { id: "db-product-tours", title: "Create Interactive Product Tours", detail: "3 interactive product tours using Supademo.", when: "Week 5-7", priority: "medium", deliverable: "3 interactive tours", dependsOn: ["db-demo-narrative"] },
      { id: "db-blog-series", title: "Launch Healthcare Revenue Blog Series", detail: "6 SEO-optimized blog posts.", when: "Week 5-8", priority: "medium", deliverable: "6 blog posts" },
      { id: "db-webinar-series", title: "Plan & Execute Webinar Series", detail: "2 webinars with hospital panelists.", when: "Week 6-8", priority: "medium", deliverable: "2 webinars" },
      { id: "db-case-study-production", title: "Produce Pilot Case Studies", detail: "3 polished case studies from pilot results.", when: "Week 9-11", priority: "high", deliverable: "3 designed case studies", dependsOn: ["db-messaging-framework"] },
      { id: "db-demo-video", title: "Produce Product Demo Video", detail: "5-minute polished demo video.", when: "Week 10-12", priority: "high", deliverable: "Demo video", dependsOn: ["db-demo-narrative"] },
      { id: "db-email-sequences", title: "Build Email Nurture Sequences", detail: "3 automated email sequences with A/B variants.", when: "Week 11-12", priority: "medium", deliverable: "Email nurture sequences" },
      { id: "db-launch-content", title: "Create Launch Content Package", detail: "Launch blog, social posts, press release.", when: "Week 13-15", priority: "critical", deliverable: "Launch content package" },
      { id: "db-launch-execution", title: "Execute Launch Day Activities", detail: "Coordinated launch across all channels.", when: "Week 16", priority: "critical", deliverable: "Launch execution", dependsOn: ["db-launch-content"] },
      { id: "db-launch-retrospective", title: "Launch Retrospective & Learnings", detail: "Analyze performance and create post-launch plan.", when: "Week 16", priority: "medium", deliverable: "Launch retrospective report", dependsOn: ["db-launch-execution"] },
      { id: "db-weekly-standup", title: "Weekly Marketing Standup", detail: "Report on content and pipeline metrics.", when: "Every Monday", priority: "medium", deliverable: "Marketing status report" },
      { id: "db-content-reviews", title: "Content & Brand Review", detail: "Review all external-facing content.", when: "Daily", priority: "high", deliverable: "Brand-consistent content" },
    ],
  },
  {
    name: "Pragna R", role: "Security & Compliance Lead",
    ownership: "Threat model, tenant isolation, App Check, IAM, security rules, secure storage, audit logs, secrets, incident controls, penetration/security acceptance.",
    color: "#FF6B6B", iconName: "LuShield",
    tasks: [
      { id: "threat-model", title: "Threat Model", detail: "Map every attack surface of HealthOS. Define attackers, targets, entry points, and mitigations.", when: "Day 1-2", priority: "critical", deliverable: "Threat model document", blocks: ["tenant-isolation", "rbac-matrix", "secrets-strategy"] },
      { id: "tenant-isolation", title: "Tenant Isolation Rules", detail: "Define how tenants are completely isolated across Firestore paths, Storage paths, and Cloud Run.", when: "Day 1-2", priority: "critical", deliverable: "Tenant isolation rules document", dependsOn: ["threat-model"], blocks: ["rbac-matrix", "firestore-rules"] },
      { id: "rbac-matrix", title: "RBAC Matrix", detail: "Build permissions matrix for all 9 roles across all collections.", when: "Day 1-2", priority: "critical", deliverable: "RBAC matrix table", dependsOn: ["threat-model", "tenant-isolation"], blocks: ["firestore-rules", "app-check", "iam-setup"] },
      { id: "secrets-strategy", title: "Secrets Strategy", detail: "Define where every secret lives: Secret Manager, access patterns, rotation.", when: "Day 1-2", priority: "critical", deliverable: "Secrets strategy document", dependsOn: ["threat-model"], blocks: ["secrets-production"] },
      { id: "security-criteria", title: "Security Acceptance Criteria", detail: "Define what 'secure enough for pilot' means.", when: "Day 1-2", priority: "critical", deliverable: "Security acceptance checklist", dependsOn: ["threat-model"], blocks: ["security-tests"] },
      { id: "hospital-interviews", title: "Hospital Workflow Interviews", detail: "Participate in interviews with Ayushi to understand compliance requirements.", when: "Weeks 1-2", priority: "high", deliverable: "Security requirements from interviews" },
      { id: "review-domain-model", title: "Review Domain Model (Sanjay's Firestore Schema)", detail: "Validate tenant scoping, financial collection isolation.", when: "Weeks 1-2", priority: "critical", deliverable: "Approved or blocked Firestore schema", dependsOn: ["tenant-isolation", "rbac-matrix"], blocks: ["firestore-rules"] },
      { id: "review-ai-gateway", title: "Review Naman's AI Gateway Design", detail: "Validate key storage, rate limiting, input validation, PHI handling.", when: "Weeks 1-2", priority: "high", deliverable: "Approved or blocked AI gateway design", dependsOn: ["secrets-strategy"], blocks: ["audit-logging"] },
      { id: "architecture-approval", title: "Architecture Approval (Veto Power)", detail: "Review all architecture decisions. Pragna has veto power.", when: "Weeks 1-2", priority: "critical", deliverable: "Signed architecture approval document", dependsOn: ["review-domain-model", "review-ai-gateway", "security-criteria"] },
      { id: "firestore-rules", title: "Write Firestore Security Rules", detail: "Write Security Rules for every collection with positive and negative test cases.", when: "Weeks 3-4", priority: "critical", deliverable: "firestore.rules file + test suite", dependsOn: ["rbac-matrix", "tenant-isolation"], blocks: ["security-tests"] },
      { id: "app-check", title: "Configure Firebase App Check", detail: "Enable App Check on all client-facing Firestore/Storage resources.", when: "Weeks 3-4", priority: "critical", deliverable: "App Check enabled + verification tests", dependsOn: ["rbac-matrix"], blocks: ["security-tests"] },
      { id: "iam-setup", title: "Set Up IAM for Server-Side Access", detail: "Minimal permissions for Cloud Run and Cloud Functions service accounts.", when: "Weeks 3-4", priority: "critical", deliverable: "IAM policy configs", dependsOn: ["rbac-matrix", "secrets-strategy"] },
      { id: "storage-paths", title: "Secure Storage Paths", detail: "Path-based access rules with signed URLs for temporary access.", when: "Weeks 3-4", priority: "critical", deliverable: "Storage path rules + signed URL config", dependsOn: ["firestore-rules"] },
      { id: "audit-logging", title: "Set Up Audit Logging", detail: "Define audit triggers, event structure, and immutable storage.", when: "Weeks 3-4", priority: "critical", deliverable: "Audit event schema + Firestore structure", dependsOn: ["review-ai-gateway"], blocks: ["security-tests"] },
      { id: "secrets-production", title: "Secrets in Production", detail: "Move all secrets to Google Secret Manager with rotation schedule.", when: "Weeks 3-4", priority: "critical", deliverable: "All secrets in Secret Manager", dependsOn: ["secrets-strategy"] },
      { id: "separate-environments", title: "Separate Dev/Staging/Prod Environments", detail: "Create separate Firebase projects per environment.", when: "Weeks 3-4", priority: "high", deliverable: "3 Firebase projects + separation doc" },
      { id: "billing-security", title: "Security Review of Billing Writes", detail: "Verify server-side transactions, atomicity, idempotency.", when: "Weeks 5-6", priority: "critical", deliverable: "Billing security review report", dependsOn: ["firestore-rules"] },
      { id: "audit-security", title: "Approve Bill Auditor Security Design", detail: "Validate AI finding storage, review access, deletion policy.", when: "Weeks 7-8", priority: "high", deliverable: "Bill Auditor security approval", dependsOn: ["firestore-rules", "audit-logging"] },
      { id: "document-upload-security", title: "Review Document Upload Security", detail: "File type validation, size limits, malware scan, signed URLs.", when: "Weeks 9-10", priority: "high", deliverable: "Document upload security checklist", dependsOn: ["storage-paths"] },
      { id: "claim-submission-security", title: "Review Claim Submission Security", detail: "Validate who can submit/modify claims and audit trail.", when: "Weeks 9-10", priority: "high", deliverable: "Claim security review", dependsOn: ["firestore-rules"] },
      { id: "risk-score-security", title: "Review AI Risk Score Security", detail: "Validate server-side generation, storage, immutability.", when: "Weeks 11-12", priority: "medium", deliverable: "Risk score security review" },
      { id: "reconciliation-security", title: "Review Reconciliation Security", detail: "Financial calculations deterministic, results immutable.", when: "Weeks 13-14", priority: "medium", deliverable: "Reconciliation security review" },
      { id: "csv-import-security", title: "Review CSV Import Security", detail: "File validation, row-level tenant scoping, rate limiting.", when: "Week 15", priority: "medium", deliverable: "CSV import security review" },
      { id: "security-tests", title: "Full Security Test Suite", detail: "Cross-tenant access, privilege escalation, token forgery, SAST, DAST.", when: "Week 16", priority: "critical", deliverable: "Automated security test suite", dependsOn: ["firestore-rules", "app-check", "audit-logging", "security-criteria"], blocks: ["pen-test"] },
      { id: "pen-test", title: "Penetration Testing", detail: "Full OWASP Top 10 penetration testing.", when: "Week 16", priority: "critical", deliverable: "Penetration test report", dependsOn: ["security-tests"], blocks: ["sign-off"] },
      { id: "sign-off", title: "Security Sign-Off", detail: "Document all findings, classify severity, sign acceptance.", when: "Week 16", priority: "critical", deliverable: "Signed security acceptance document", dependsOn: ["pen-test"] },
      { id: "weekly-security", title: "Weekly Security Review", detail: "Meet with backend/AI owners to review security findings.", when: "Ongoing", priority: "high", deliverable: "Weekly security review notes" },
      { id: "cross-tenant-test", title: "Cross-Tenant Access Test (Metric)", detail: "Must achieve 0 unauthorized reads/writes.", when: "Week 16", priority: "critical", deliverable: "Cross-tenant test results: 0 unauthorized", dependsOn: ["security-tests"] },
    ],
  },
];

/* ─── TASK LOOKUP ─── */

const allTasks: Record<string, Task> = {};
teamMembers.forEach((m) => m.tasks.forEach((t) => { allTasks[t.id] = t; }));

/* ─── COMPONENTS ─── */

function PriorityBadge({ priority }: { priority: string }) {
  const s = priority === "critical" ? "bg-red-500/90 text-white"
    : priority === "high" ? "bg-orange-500/90 text-white"
    : "bg-yellow-500/90 text-white";
  return <Badge className={`${s} text-xs`}>{priority}</Badge>;
}

function PhaseGroup({ member }: { member: TeamMember }) {
  const groups = groupByPhase(member.tasks);
  const keys = Object.keys(groups).map(Number).sort((a, b) => a - b);
  return (
    <div className="space-y-6">
      {keys.map((phase) => (
        <Card key={phase}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <span className={`h-3 w-3 rounded-full ${phaseColors[phase]}`} />
              {phaseLabels[phase]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {groups[phase].map((task) => (
                <div key={task.id} className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={task.priority} />
                    <span className="text-sm font-semibold">{task.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{task.when}</p>
                  {task.dependsOn && task.dependsOn.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="text-[10px] text-muted-foreground">depends:</span>
                      {task.dependsOn.map((depId) => (
                        <Badge key={depId} variant="outline" className="text-[10px]">
                          {allTasks[depId]?.title ?? depId}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* ─── MAIN PAGE ─── */

export default function TeamPage() {
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<"all" | Task["priority"]>("all");
  const searchRef = useRef<HTMLInputElement>(null);
  const member = teamMembers[selected];
  const connections = getConnections(member.name);

  const filteredMembers = useMemo(() => {
    if (!search) return teamMembers.map((m, i) => ({ ...m, idx: i }));
    const q = search.toLowerCase();
    return teamMembers
      .map((m, i) => ({ ...m, idx: i }))
      .filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q) ||
          m.ownership.toLowerCase().includes(q)
      );
  }, [search]);

  const filteredTasks = useMemo(() => {
    if (priorityFilter === "all") return member.tasks;
    return member.tasks.filter((t) => t.priority === priorityFilter);
  }, [member.tasks, priorityFilter]);

  const taskCounts = useMemo(() => {
    const c = { critical: 0, high: 0, medium: 0 };
    for (const t of member.tasks) c[t.priority]++;
    return c;
  }, [member.tasks]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((prev) => {
          const currentFilteredIdx = filteredMembers.findIndex((m) => m.idx === prev);
          const next = Math.min(currentFilteredIdx + 1, filteredMembers.length - 1);
          return filteredMembers[next].idx;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((prev) => {
          const currentFilteredIdx = filteredMembers.findIndex((m) => m.idx === prev);
          const prev2 = Math.max(currentFilteredIdx - 1, 0);
          return filteredMembers[prev2].idx;
        });
      } else if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    },
    [filteredMembers]
  );

  return (
    <div className="flex h-screen flex-col" onKeyDown={handleKeyDown}>
      <header className="border-b bg-muted/40 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <LuIcons.LuUsers size={16} />
          </span>
          <h1 className="text-lg font-bold tracking-tight">HealthOS — Team Architecture</h1>
          <Badge variant="secondary">v2.0</Badge>
          <Badge variant="outline" className="ml-auto font-mono text-xs">
            {teamMembers.length} members · {teamMembers.reduce((a, m) => a + m.tasks.length, 0)} tasks
          </Badge>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="flex h-full min-h-0 w-[340px] shrink-0 flex-col border-r bg-card">
          {/* Search + Member Selector */}
          <div className="flex min-h-0 flex-col border-b">
            <div className="border-b px-3 py-2">
              <div className="relative">
                <LuIcons.LuSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search members... ( / )"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelected(0);
                  }}
                  className="w-full rounded-md border bg-background py-1.5 pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <ScrollArea className="max-h-[200px]">
              <div className="p-1.5">
                {filteredMembers.length === 0 && (
                  <p className="px-3 py-4 text-center text-sm text-muted-foreground">No members match</p>
                )}
                {filteredMembers.map((m) => {
                  const Icon = iconMap[m.iconName] ?? LuIcons.LuUser;
                  const tc = { critical: 0, high: 0, medium: 0 };
                  for (const t of m.tasks) tc[t.priority]++;
                  return (
                    <button
                      key={m.name}
                      onClick={() => {
                        setSelected(m.idx);
                        setSearch("");
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        m.idx === selected
                          ? "bg-accent font-semibold ring-1 ring-ring/30"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-white"
                        style={{ background: m.color }}
                      >
                        <Icon size={13} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium leading-tight">{m.name}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{m.role}</p>
                      </div>
                      <div className="flex shrink-0 gap-0.5">
                        {tc.critical > 0 && (
                          <span className="grid h-4 min-w-4 place-items-center rounded-full bg-red-500/90 px-1 text-[9px] font-bold text-white">
                            {tc.critical}
                          </span>
                        )}
                        {tc.high > 0 && (
                          <span className="grid h-4 min-w-4 place-items-center rounded-full bg-orange-500/90 px-1 text-[9px] font-bold text-white">
                            {tc.high}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Selected Member Info — compact one-liner */}
          <div className="flex items-center gap-2 border-b px-4 py-2">
            <div
              className="grid h-6 w-6 shrink-0 place-items-center rounded text-white"
              style={{ background: member.color }}
            >
              {(() => { const Icon = iconMap[member.iconName] ?? LuIcons.LuUser; return <Icon size={12} />; })()}
            </div>
            <span className="truncate text-sm font-semibold">{member.name}</span>
            <span className="ml-auto flex gap-1.5 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />{taskCounts.critical}</span>
              <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded-full bg-orange-500" />{taskCounts.high}</span>
              <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />{taskCounts.medium}</span>
            </span>
          </div>

          {/* Tasks — fills remaining space */}
          <ScrollArea className="min-h-0 flex-1">
            <div className="p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Tasks ({filteredTasks.length})</span>
                <div className="flex gap-0.5">
                  {(["all", "critical", "high", "medium"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriorityFilter(p)}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                        priorityFilter === p
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {p === "all" ? "All" : p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <Accordion multiple className="space-y-1">
                {filteredTasks.map((task) => (
                  <AccordionItem key={task.id} value={task.id} className="rounded-md border px-2.5">
                    <AccordionTrigger className="py-1.5 text-left text-xs font-semibold hover:no-underline [&[data-state=open]>svg]:rotate-0">
                      <div className="flex items-center gap-1.5">
                        <PriorityBadge priority={task.priority} />
                        <span className="line-clamp-1">{task.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-1.5 pb-2 pt-0.5 text-xs">
                      <p className="text-muted-foreground">{task.detail}</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-[10px]">{task.when}</Badge>
                        <Badge variant="outline" className="text-[10px]">{task.deliverable}</Badge>
                      </div>
                      {task.dependsOn && task.dependsOn.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          <span className="text-[10px] text-muted-foreground">deps:</span>
                          {task.dependsOn.map((id) => (
                            <Badge key={id} variant="secondary" className="text-[10px]">
                              {allTasks[id]?.title ?? id}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
                {filteredTasks.length === 0 && (
                  <p className="py-6 text-center text-xs text-muted-foreground">No tasks match filter</p>
                )}
              </Accordion>
            </div>
          </ScrollArea>
        </aside>

        {/* RIGHT PANEL */}
        <main className="flex-1 overflow-auto bg-background p-6">
          <ScrollArea className="h-full">
            <Tabs defaultValue="phases">
              <TabsList>
                <TabsTrigger value="phases">Phase Breakdown</TabsTrigger>
                <TabsTrigger value="connections">Cross-Team Connections</TabsTrigger>
              </TabsList>

              <TabsContent value="phases" className="mt-4">
                <PhaseGroup member={member} />
              </TabsContent>

              <TabsContent value="connections" className="mt-4 space-y-6">
                {/* Dependency Chains */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Dependency Chains</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {member.tasks
                        .filter((t) => t.dependsOn && t.dependsOn.length > 0)
                        .map((t) => (
                          <div key={t.id} className="rounded-md border p-2 font-mono text-xs">
                            {t.dependsOn!.map((depId) => allTasks[depId]?.title ?? depId).join(" → ")} → {t.title}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Separator />

                {/* Cross-Team Connections */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Cross-Team Connections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {connections.map((conn, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-md border p-2 text-xs">
                          <Badge variant="secondary" className="shrink-0">{conn.member}</Badge>
                          <span className="text-muted-foreground">{conn.note}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
