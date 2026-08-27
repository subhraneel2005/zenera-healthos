**ZENERA HEALTHOS**

**Firebase-First Master Engineering Build Specification**

AI-Powered Hospital Revenue & Operations SaaS

*Internal Product \+ Engineering Handoff | Version 2.0 | August 2026*

| ONE PRODUCT. SEVEN INTELLIGENCE MODULES.HealthOS is one multi-tenant SaaS platform. The seven capabilities below are modules inside one patient/encounter/billing/claim/revenue workflow, backed by one Firebase-based platform and one shared AI layer. |
| :---- |

**Build Better. Ship Faster.**

*Prepared for the Zenera Labs engineering team*

# **1\. Executive Summary & Product Positioning**

Zenera HealthOS is not a generic hospital ERP. It is a hospital revenue-cycle and operational intelligence platform that can start as an overlay on top of existing hospital systems and gradually expand toward broader hospital management. The product combines seven tightly connected modules: AI Bill Auditor, Insurance & TPA Copilot, AI Discharge Manager, Claim Risk Predictor, Denial/Query Intelligence, Revenue Reconciliation, and Revenue Leakage Radar.

The core product promise is simple: help hospitals identify money they are losing or delaying, prevent claim problems before submission, reduce manual chasing between departments, and give management a live picture of revenue at risk.

| IMPORTANT BUILD DECISIONUse the existing Firebase project as the platform backbone for MVP: Firebase Authentication, Cloud Firestore, Cloud Storage, Cloud Functions, App Check and Hosting where useful. Use Cloud Run for heavier Python AI/ML workloads. Do not put all AI/ML inference inside Functions. |
| :---- |

## **What the customer buys**

* One web application, one tenant, one login and one subscription.  
* Shared patient/encounter/claim/revenue data instead of disconnected mini-tools.  
* AI recommendations that are evidence-backed, explainable and human-reviewable.  
* Real-time operational queues for billing, claims, discharge and management.  
* Integration capability so hospitals can keep existing HIS/HMIS/EMR systems during adoption.

## **What makes the product different**

* Revenue-cycle focus rather than feature-count focus.  
* Seven modules reinforce one another instead of operating independently.  
* AI is embedded into workflows rather than presented as a chatbot gimmick.  
* Deterministic calculations remain the source of truth; AI interprets and recommends.  
* Every high-impact AI finding has evidence, confidence, reason codes and a reviewer decision trail.

# **2\. Team Assignment & Ownership**

Assignments are based on the current Zenera Labs team page and portfolio. The founder, Vighnesh M, Hamsini SY and Anya R are intentionally excluded from this build allocation per the instructions for this project. Zenera's current site lists Naman on document intelligence/AI governance, Pragna on cybersecurity, Subhraneel on advanced AI/RAG, Sanjay on software/platform work, Priyanka on analytics, Dhyuthi on ML/document-oriented AI, Swastik on full-stack engineering, Chandini and Chandana on ML, Debanjali on marketing/content, and Ayushi on business development. citeturn140779view0turn633459search1

| Person | Current role | HealthOS ownership | Primary responsibilities |
| :---- | :---- | :---- | :---- |
| Swastik Dutta | Full Stack Engineer | Product Engineering Lead | Own app shell, navigation, role-aware UI, dashboard UX, end-to-end frontend integration, release coordination, PR quality. |
| Sanjay S | Software Developer Intern | Backend & Firebase Platform Lead | Own Firestore schema, Cloud Functions, API contracts, workflow services, tenant model, events, notifications, integration adapters, deployment structure. |
| Naman AU | AI Developer Intern | Shared AI Platform Lead | Own AI gateway, model abstraction, structured outputs, prompt/version registry, AI audit metadata, evaluation harness, guardrails, AI orchestration. |
| Pragna R | Cybersecurity Engineer Intern | Security & Compliance Lead | Threat model, tenant isolation, App Check, IAM, security rules, secure storage, audit logs, secrets, incident controls, penetration/security acceptance. |
| Subhraneel Goswami | AI Engineer | Claims Intelligence Lead | Insurance/TPA knowledge base, RAG, claim requirements, claim-readiness reasoning, denial interpretation, evidence retrieval, claim explainability. |
| Priyanka M | ML Engineer & Data Analyst Intern | Revenue Analytics Lead | Revenue KPI model, reconciliation engine, leakage economics, management analytics, metrics definitions, data-quality checks. |
| Dhyuthi Shree KS | Machine Learning Engineer Intern | Document Intelligence Lead | Document ingestion, extraction schemas, OCR/vision pipeline, document validation, metadata/evidence mapping, AI workflow triggers. |
| Chandini N | Machine Learning Engineer Intern | Claim Risk ML Lead | Claim-risk scoring, rejection/query feature engineering, baseline model, evaluation, calibration, drift and monitoring. |
| Chandana Gowda | Machine Learning Engineer | Billing Audit ML Lead | Missed-charge detection, duplicate/inconsistent charge detection, anomaly scoring, evidence linking, false-positive review loops. |
| Ayushi Gautam | Business Development Lead (Full Time) | Hospital Discovery & Pilot Lead | Hospital workflow discovery, buyer interviews, pilot recruitment, requirements capture, feedback loops, pricing/packaging signals. |
| Debanjali Biswas | Marketing & Content Creation Lead (Full Time) | Product Marketing & Enablement | Hospital-facing messaging, demo narrative, case-study structure, website/product collateral, pilot materials and launch content. |

## **Ownership rule**

Every feature has one primary owner and at least one reviewer. The owner is accountable for architecture, implementation, testing, documentation and demo readiness. Shared work is coordinated through the weekly HealthOS engineering review.

# **3\. Product Architecture: One Platform, Seven Modules**

The system flow is intentionally unified:

Hospital user  
   |  
   v  
ZENERA HEALTHOS WEB APP  
   |  
   \+--\> Identity / RBAC  
   \+--\> Patient \+ Encounter  
   \+--\> Billing Ledger  
   \+--\> Documents  
   \+--\> Claims  
   \+--\> Workflows / Tasks  
   \+--\> Revenue Analytics  
   |  
   \+--\> SHARED AI LAYER  
          |  
          \+--\> 1\. AI Bill Auditor  
          \+--\> 2\. Insurance & TPA Copilot  
          \+--\> 3\. AI Discharge Manager  
          \+--\> 4\. Claim Risk Predictor  
          \+--\> 5\. Denial / Query Intelligence  
          \+--\> 6\. Revenue Reconciliation  
          \+--\> 7\. Revenue Leakage Radar  
   |  
   v  
Firebase \+ Google Cloud services  
(Firestore / Storage / Auth / Functions / App Check / Cloud Run)

The existing Zenera portfolio already demonstrates evidence-grounded document analysis, RAG, analytics assistants, security analytics and workflow automation. HealthOS should reuse these engineering patterns rather than reinvent them. citeturn633459search1turn633459search8turn633459search9

# **4\. Firebase Architecture & Why It Fits**

Firebase is appropriate for the MVP and early production stage because HealthOS needs multi-user authentication, real-time operational views, document storage, server-side event processing and rapid full-stack development. Firebase officially supports Authentication, Firestore, Storage, Functions, App Check and other services; Firestore supports regional and multi-region deployments, including Mumbai and Delhi locations. citeturn140779search0turn633459search6

| Layer | Firebase / Google Cloud choice | Use in HealthOS | Notes |
| :---- | :---- | :---- | :---- |
| Identity | Firebase Authentication | Hospital staff login, password reset, MFA/strong auth where enabled, identity tokens | Never make the client responsible for authorization. |
| Database | Cloud Firestore | Patients, encounters, billing, claims, workflows, findings, configuration, audit metadata | Use server-side transactions for financial writes. |
| Documents | Cloud Storage for Firebase | Insurance PDFs, invoices, reports, claim evidence, attachments | Store metadata in Firestore; enforce path-based access rules. |
| Server Logic | Cloud Functions for Firebase | Triggers, scheduled jobs, notifications, lightweight validations, workflow events | Keep handlers small and idempotent. |
| AI/ML Runtime | Cloud Run | Python FastAPI services, OCR/document processing, RAG, ML inference, orchestration | Preferred for heavier/long-running workloads. |
| Security | Firebase App Check \+ Security Rules \+ Google Cloud IAM | Client abuse protection, data access controls, server access controls | Rules are mandatory, not optional. |
| Hosting | Firebase App Hosting or equivalent | HealthOS web deployment | Use CI/CD with protected production environment. |
| Notifications | Firebase Cloud Messaging / email/SMS provider | Task alerts and operational notifications | Avoid putting PHI into notification text. |
| Analytics | Firestore \+ later BigQuery | Operational KPIs and advanced analytics | Keep MVP analytics simple; add warehouse when volumes justify it. |

| HEALTHCARE SECURITY CAVEATFirebase/Google Cloud services do not automatically make an application compliant. Google states that customers remain responsible for implementing their own compliance controls. For U.S. HIPAA environments, Google requires the appropriate BAA and only covered services should handle PHI. For India, the team must complete the applicable privacy, healthcare-data and contractual requirements with legal/security review before a real hospital pilot. citeturn140779search1turn140779search2 |
| :---- |

## **Firebase implementation rules**

* No wildcard Firestore rules such as allow read, write: if true in any environment.  
* Tenant ID is part of every top-level data ownership decision.  
* Use custom claims and server-side authorization for role/tenant checks; duplicate minimum necessary access logic in Security Rules.  
* All production Storage paths include tenant and branch scoping.  
* Enable App Check for supported client-facing resources.  
* Use service accounts/IAM for server-side Cloud Run and Functions access rather than embedding admin credentials in the browser.  
* Use Cloud Run for Python/ML and keep model keys/secrets in Secret Manager.  
* Use server timestamps and immutable audit events for financially meaningful actions.  
* Do not put patient identifiers or clinical details into generic logs, analytics events or push notifications.

Firebase documentation states that Firestore client access is controlled using Authentication plus Security Rules, while server client libraries use IAM; App Check can add protection for client access. citeturn140779search3turn140779search6

# **5\. Shared Domain Model & Firestore Structure**

Use a tenant-first domain model. Do not create a flat database in which hospital records can be queried without tenant scoping.

/tenants/{tenantId}  
/tenants/{tenantId}/branches/{branchId}  
/tenants/{tenantId}/departments/{departmentId}  
/tenants/{tenantId}/users/{userId}  
/tenants/{tenantId}/roles/{roleId}

/tenants/{tenantId}/patients/{patientId}  
/tenants/{tenantId}/patients/{patientId}/encounters/{encounterId}  
/tenants/{tenantId}/encounters/{encounterId}

/tenants/{tenantId}/encounters/{encounterId}/charges/{chargeId}  
/tenants/{tenantId}/invoices/{invoiceId}  
/tenants/{tenantId}/payments/{paymentId}

/tenants/{tenantId}/insurancePolicies/{policyId}  
/tenants/{tenantId}/preauths/{preauthId}  
/tenants/{tenantId}/claims/{claimId}  
/tenants/{tenantId}/claims/{claimId}/documents/{documentId}  
/tenants/{tenantId}/claims/{claimId}/events/{eventId}  
/tenants/{tenantId}/claims/{claimId}/queries/{queryId}  
/tenants/{tenantId}/claims/{claimId}/settlements/{settlementId}

/tenants/{tenantId}/documents/{documentId}  
/tenants/{tenantId}/workflows/{workflowId}  
/tenants/{tenantId}/tasks/{taskId}  
/tenants/{tenantId}/aiFindings/{findingId}  
/tenants/{tenantId}/auditEvents/{eventId}

/tenants/{tenantId}/config/billingRules  
/tenants/{tenantId}/config/claimRules  
/tenants/{tenantId}/config/roles  
/tenants/{tenantId}/config/aiPolicies

## **Canonical object expectations**

| Entity | Must contain | Why it matters |
| :---- | :---- | :---- |
| Patient | patientId, tenantId, MRN/externalId, demographics, contact, identifiers, createdAt, status | Stable patient identity without mixing with encounter-specific data. |
| Encounter | encounterId, patientId, branchId, admissionType, dates, attendingUnit, payerId, status | Central link between clinical activity and revenue-cycle activity. |
| Charge | chargeId, encounterId, serviceCode, description, qty, unitPrice, tax, sourceEvent, timestamp, status | Atomic billable event; sourceEvent is essential for auditability. |
| Invoice | invoiceId, encounterId, lineItems snapshot, subtotal, discounts, taxes, total, status, finalizedAt | Financial document; totals are deterministic. |
| Claim | claimId, encounterId, payer, TPA, policyId, amountSubmitted, status, submittedAt, SLA state | Unit of insurance revenue-cycle tracking. |
| AI Finding | findingId, module, entityRef, category, severity, confidence, reasonCodes, evidenceRefs, recommendation, status, reviewerId | Explainable AI record and human-review trail. |
| Audit Event | eventId, actorId, role, action, entityType, entityId, beforeHash/afterHash as appropriate, timestamp, source | Traceability for sensitive and financial actions. |

# **6\. Module 1 — AI Bill Auditor**

Goal: identify likely missed charges, duplicate charges, package mismatches and suspicious billing inconsistencies before the bill is finalized.

## **User workflow**

1. Billing staff open an encounter and click “Run Bill Audit” or the system triggers an audit when key events occur.  
2. The service collects charge lines, procedure events, pharmacy/consumable events, department records, package rules and prior adjustments.  
3. Deterministic rules run first (duplicate IDs, invalid quantities, impossible totals, package constraints).  
4. ML/AI analysis runs on the normalized event set.  
5. Findings are stored with category, confidence, evidence references and estimated financial impact.  
6. Billing staff review each finding: accept, dismiss, investigate or mark false positive.  
7. Accepted findings can create a review task; the system does not silently edit the invoice in MVP.

## **Detection categories**

* Potential missed charge: source event exists but no corresponding billable line.  
* Duplicate charge: same service/consumable appears twice or near-duplicate patterns exist.  
* Package inconsistency: line item and configured package rule conflict.  
* Quantity anomaly: billed quantity looks inconsistent with source records.  
* Rate anomaly: rate differs from configured tariff or expected range.  
* Temporal anomaly: charge occurs outside the encounter/service window.  
* Documentation gap: a charge exists but required supporting evidence is missing.  
* Manual adjustment anomaly: unusual discount/write-off/adjustment requires review.

## **Technical build**

* Chandana defines rule catalogue and anomaly features.  
* Priyanka defines financial impact calculation.  
* Sanjay creates charge ledger APIs and event collection.  
* Naman defines AI structured-output contract and evaluation interface.  
* Dhyuthi maps supporting documents/evidence.  
* Swastik builds findings/review UI.  
* Pragna approves audit/security design.

| MVP ACCEPTANCEFor synthetic test encounters, the system should identify seeded omissions/duplicates with evidence, avoid changing invoices automatically, and retain a reviewer decision. |
| :---- |

# **7\. Module 2 — Insurance & TPA Copilot**

Goal: reduce the manual effort of understanding coverage requirements and preparing a claim packet.

## **Workflow**

8. Staff upload policy/TPA documents or import structured payer configuration.  
9. Document service extracts structured fields and stores source references.  
10. RAG retrieves relevant clauses/requirements for the current encounter.  
11. Copilot generates a claim-readiness view: covered/unknown/not covered, required documents, policy constraints and questions.  
12. Every answer includes evidence references back to the source document.  
13. Users can approve the extracted policy facts into the hospital's configurable payer rules.

## **Data to extract**

* Insurer/TPA identity, plan/product name and policy metadata.  
* Coverage categories and exclusions.  
* Room category/eligibility limits.  
* Co-pay/deductible information where available.  
* Procedure/package constraints.  
* Preauthorization requirements.  
* Claim documentation requirements.  
* Validity dates and network/eligibility indicators.

## **Important AI rule**

The copilot must never state an uncertain interpretation as a fact. Use labels such as “Found in source,” “Not found,” “Potentially applicable,” and “Requires human confirmation.” Store the exact document/page/chunk reference used for an answer.

## **Technical ownership**

* Subhraneel: RAG/retrieval, policy reasoning and claim-specific evidence.  
* Dhyuthi: extraction schemas and document processing.  
* Naman: structured-output contract and evaluation harness.  
* Sanjay: claim/policy storage and APIs.  
* Swastik: policy/claim workspace UI.

# **8\. Module 3 — AI Discharge Manager**

Goal: stop discharge from becoming a department-chasing exercise.

## **Core concept**

A discharge has a checklist generated from the encounter, payer type, procedure type and hospital workflow rules.

| Workstream | Example readiness item | Owner role | Status |
| :---- | :---- | :---- | :---- |
| Clinical | Discharge summary completed | Doctor/clinical admin | Pending/Done |
| Nursing | Nursing closure complete | Nursing | Pending/Done |
| Pharmacy | Medication/returns reconciled | Pharmacy | Pending/Done |
| Diagnostics | Outstanding reports resolved | Lab/Radiology | Pending/Done |
| Billing | Charges posted \+ bill audited | Billing | Pending/Done |
| Insurance | Preauth/claim documents ready | TPA/Insurance desk | Pending/Done |
| Payment | Patient responsibility settled/arranged | Cashier/Billing | Pending/Done |

## **AI behaviour**

* Predict the next likely blocker based on the encounter and workflow state.  
* Summarize the reason for a delay instead of merely showing “Pending.”  
* Create targeted tasks for the responsible department.  
* Escalate based on SLA/ageing rules.  
* Do not use generative text as the source of completion truth; completion remains a structured state change.

## **Technical implementation**

* Sanjay builds workflow/task engine and triggers.  
* Dhyuthi maps documents to checklist requirements.  
* Swastik builds discharge board.  
* Naman provides AI summarization/recommendation service.  
* Ayushi validates workflow against real hospital interviews.

# **9\. Module 4 — Claim Risk Predictor**

Goal: estimate whether a claim is likely to be queried, rejected, delayed or otherwise require rework before submission.

## **MVP modelling strategy**

Start with a hybrid model: deterministic rules \+ interpretable baseline ML. Do not begin with a black-box deep model. The first objective is reliable ranking and actionable explanations, not maximum model complexity.

| Feature family | Examples |
| :---- | :---- |
| Documentation | Required document present/missing, signature status, report availability, discharge summary completeness |
| Financial | Amount, package variance, unusual discounts, estimated patient responsibility |
| Claim history | Payer \+ procedure historical query/rejection patterns |
| Encounter | Length of stay, department mix, procedure count, admission type |
| Policy | Room eligibility, preauth state, coverage flags |
| Workflow | Time since discharge-ready, outstanding tasks, unresolved billing findings |

## **Output contract**

{  
  "riskScore": 0-100,  
  "riskBand": "LOW | MEDIUM | HIGH",  
  "topFactors": \[  
    {  
      "code": "MISSING\_DOCUMENT",  
      "severity": "HIGH",  
      "description": "...",  
      "evidenceRefs": \["document:123"\]  
    }  
  \],  
  "recommendedActions": \["..."\],  
  "modelVersion": "...",  
  "generatedAt": "..."  
}

## **Owners**

* Chandini: features, baseline model, calibration, evaluation and monitoring.  
* Subhraneel: payer/claim evidence and reason interpretation.  
* Priyanka: KPI/impact measurement.  
* Naman: AI orchestration and explainability contract.  
* Sanjay: claim data pipeline and model invocation service.

# **10\. Module 5 — Denial & Query Intelligence**

Goal: turn every claim query/rejection into reusable operational knowledge.

## **Workflow**

14. Billing/claims staff record or import a query/denial.  
15. System classifies the issue using a taxonomy.  
16. Evidence is linked to claim documents and encounter records.  
17. AI generates a root-cause summary and suggested prevention step.  
18. User confirms category/root cause.  
19. The confirmed event feeds the hospital's prevention rules and model dataset.

## **Initial taxonomy**

* Missing documentation  
* Incorrect/insufficient clinical evidence  
* Eligibility/coverage issue  
* Preauthorization issue  
* Coding/package mismatch  
* Billing arithmetic/line-item inconsistency  
* Policy limit/exclusion  
* Duplicate or inconsistent claim data  
* Payer/TPA operational delay  
* Other/unknown

The product should distinguish “claim rejected,” “claim queried,” “claim partially approved,” and “claim delayed.” These are different outcomes and must not be collapsed into one status.

# **11\. Module 6 — Revenue Reconciliation**

Goal: show where money is between billed, approved, patient-paid, payer-settled and outstanding states.

## **Deterministic equation model**

Invoice Total  
   \- Contract / Approved Deductions  
   \- Patient Responsibility  
   \- Write-offs / Adjustments  
   \= Expected Payer Settlement

Expected Payer Settlement  
   \- Actual Payer Settlement  
   \= Payer Outstanding / Variance

Invoice Total  
   \- Patient Payment  
   \- Payer Settlement  
   \- Approved Write-offs  
   \= Remaining Financial Balance

The arithmetic must be implemented in typed backend code and tested with edge cases. Do not ask an LLM to calculate financial totals.

## **Reconciliation statuses**

* Matched  
* Partially matched  
* Underpaid  
* Overpaid  
* Pending settlement  
* Unapplied payment  
* Unknown / manual review

## **Owners**

* Priyanka: formulas, KPI dictionary, exception logic and management reporting.  
* Sanjay: financial transaction schema, server-side calculations and import APIs.  
* Swastik: reconciliation UI and exception queue.  
* Chandana: anomaly layer for unusual financial patterns.

# **12\. Module 7 — Revenue Leakage Radar**

Goal: management dashboard that tells hospital leadership where revenue is being lost, delayed or put at risk.

| Dashboard card | Definition | Drill-down |
| :---- | :---- | :---- |
| Billed Today | Invoices finalized today | Invoice / encounter |
| Expected Realization | Expected collected/settled after configured adjustments | Claim and payment |
| Revenue at Risk | High-confidence potential leakage \+ high-risk claims, with no double counting | Finding / claim |
| Stuck Claims | Claims above configurable age/SLA threshold | Claim queue |
| Potential Missed Charges | Accepted/confirmed bill-audit findings not yet resolved | Encounter/bill audit |
| Pending Discharge Revenue | Encounters ready but blocked on operational/financial tasks | Discharge board |
| Query Rate | Queries / submitted claims for selected period | Payer/procedure |
| Settlement Variance | Expected settlement \- actual settlement | Payer/claim |

## **No-double-counting rule**

A single financial issue must not be counted as multiple revenue-at-risk amounts merely because it appears in multiple modules. Priyanka owns the canonical financial impact calculation and deduplication logic.

## **Management questions the dashboard should answer**

* How much did we bill?  
* How much should become cash?  
* How much is currently stuck?  
* What is the largest source of leakage?  
* Which payer/TPA is producing the most rework?  
* Which departments are creating avoidable discharge delays?  
* Which claims need human action today?

# **13\. Shared AI Layer**

Naman owns the shared AI platform. Every module consumes it through stable internal interfaces rather than calling models directly from feature code.

## **Components**

| Component | Responsibility |
| :---- | :---- |
| Model Gateway | One interface for LLM providers/models; handles model selection, timeouts and retries. |
| Prompt Registry | Version prompts and instructions; record prompt version in each AI output. |
| Structured Output Validator | Reject malformed model responses before storage. |
| Evidence Service | Maps AI claims to document/entity evidence. |
| RAG Service | Retrieval with tenant-aware filtering and source metadata. |
| AI Policy Engine | Module-level restrictions, confidence thresholds and forbidden actions. |
| Evaluation Harness | Gold datasets, expected outputs, precision/recall and regression tests. |
| AI Audit Log | Store model/version, input references, output status, reviewer decision and timestamp. |
| Human Review Queue | Routes uncertain or high-impact findings for approval. |

## **AI pipeline standard**

INPUT  
  \-\> normalize  
  \-\> deterministic validation  
  \-\> retrieve tenant-scoped evidence  
  \-\> model inference  
  \-\> schema validation  
  \-\> evidence/consistency check  
  \-\> confidence threshold  
  \-\> HUMAN REVIEW if required  
  \-\> persist finding  
  \-\> emit audit event

Zenera's existing internal portfolio demonstrates evidence-backed document analysis and citation-aware multi-agent research. HealthOS should carry the same traceability mindset into healthcare workflows. citeturn633459search8turn633459search9

# **14\. Document Intelligence Pipeline**

Dhyuthi owns the document layer, with Naman and Subhraneel supporting AI reasoning.

Upload  
  |  
  v  
Validate file type \+ size \+ tenant  
  |  
  v  
Store original in Cloud Storage  
  |  
  v  
Create document metadata in Firestore  
  |  
  v  
Cloud Run extraction service  
  |  
  \+--\> text / OCR / layout  
  \+--\> page \+ section metadata  
  \+--\> structured field extraction  
  |  
  v  
Validation \+ confidence  
  |  
  \+--\> retry / human review  
  |  
  v  
Index chunks \+ metadata for tenant-scoped retrieval  
  |  
  v  
Link document to encounter / claim / policy / invoice

Document types for MVP:

* Insurance/policy documents  
* Preauthorization letters  
* Discharge summary  
* Bills/invoices  
* Lab reports  
* Radiology/procedure reports  
* Claim query/denial letters  
* Implant/consumable invoices

Treat every uploaded file as untrusted input: validate extension and MIME type, size-limit it, scan where appropriate, isolate processing, and never expose raw storage URLs as permanent authorization.

# **15\. Backend API & Event Contracts**

The web client should not directly implement core financial or AI business logic. Use callable HTTPS endpoints / Cloud Functions / Cloud Run APIs for privileged operations.

| Area | Representative endpoints / operations |
| :---- | :---- |
| Auth | createUser, assignRole, disableUser, rotate/reset access |
| Patients | createPatient, updatePatient, getPatient, searchPatients |
| Encounters | createEncounter, updateEncounter, closeEncounter, dischargeStatus |
| Billing | addCharge, reverseCharge, createInvoice, finalizeInvoice, recordPayment |
| Bill Audit | runBillAudit, getFindings, reviewFinding |
| Claims | createClaim, updateClaimStatus, addDocument, recordQuery, recordSettlement |
| Policy | ingestPolicy, extractPolicy, approvePolicyRules |
| Claim Risk | scoreClaim, getRiskHistory, reviewRisk |
| Denials | classifyDenial, confirmRootCause, createPreventionRule |
| Reconciliation | reconcileClaim, reconcilePayment, resolveException |
| Analytics | getDashboardMetrics, getRevenueAtRisk, getAging |
| Integrations | importEncounter, importCharges, exportClaim, healthCheck |

## **Events to standardize**

* patient.created  
* encounter.created / encounter.updated  
* charge.created / charge.reversed  
* invoice.draft / invoice.finalized  
* payment.received  
* claim.created / claim.submitted / claim.queried / claim.rejected / claim.approved / claim.settled  
* document.uploaded / document.processed / document.failed  
* ai.finding.created / ai.finding.reviewed  
* workflow.task.created / task.completed / task.escalated

Functions processing events must be idempotent: receiving the same event twice must not create duplicate charges, payments, claims or findings.

# **16\. RBAC & User Roles**

| Role | Primary permissions |
| :---- | :---- |
| Hospital Admin | Tenant setup, users, branches, configuration, all operational dashboards except restricted clinical content. |
| Billing Executive | Billing, invoices, payments, bill audits, reconciliation work queue. |
| Insurance/TPA Executive | Policies, preauth, claims, claim documents, claim-risk review, queries/denials. |
| Doctor / Clinical Admin | Relevant encounter/discharge documentation and clinical evidence required for workflows. |
| Nurse / Department User | Assigned workflow tasks and operational completion statuses. |
| Finance Manager | Revenue reconciliation, settlement, financial dashboards, write-off/adjustment review. |
| Hospital Management | Executive dashboards, revenue-at-risk, trends, operational bottlenecks; minimum-necessary detail. |
| Zenera Support | Time-limited, approved support access only; no default access to hospital PHI. |
| Zenera Super Admin | Platform-level management without default business-data visibility; use audited break-glass access for support. |

The UI is not the security boundary. The same authorization decision must be enforced server-side and in Firestore/Storage rules. Firebase documentation explicitly describes Security Rules and App Check as core parts of protecting client-accessed data. citeturn140779search3turn140779search4

# **17\. Security, Privacy & Production Controls**

* Tenant isolation: every query path and server operation must carry tenant context.  
* Least privilege: permissions are additive; default role has no access until granted.  
* Immutable audit trail for financial edits, role changes, claim status changes and AI reviews.  
* Encryption in transit and at rest using platform capabilities.  
* Secrets in Google Secret Manager, never in source code or browser bundles.  
* No PHI in console logs, error traces, analytics labels or push notifications.  
* Separate dev/staging/prod Firebase projects. Never use production PHI in development.  
* Synthetic data for model development until the security approval for real data exists.  
* Data retention and deletion policies must be configurable and contractually approved.  
* Backups/export strategy and disaster-recovery runbook.  
* Rate limiting, abuse monitoring and App Check.  
* Dependency scanning, SAST, DAST and periodic vulnerability review.  
* Access-review process for internal Zenera staff.  
* Break-glass support access must be explicit, time-limited and audited.

| PRODUCTION GATEDo not onboard a real hospital with live patient data until security, legal/privacy review, data processing terms, incident response, backup/recovery and the required healthcare/privacy controls are signed off. |
| :---- |

# **18\. Integration Strategy**

Hospitals will rarely want to replace their existing HIS/HMIS on day one. Build adapters so HealthOS can sit alongside existing systems.

## **MVP integration levels**

| Level | Method | Initial purpose |
| :---- | :---- | :---- |
| L1 | CSV/Excel import | Fast pilot onboarding for patients, encounters, charges and claims. |
| L2 | REST API | Two-way sync with hospital systems that expose APIs. |
| L3 | Webhook/event integration | Near-real-time updates for admissions, charges and claim events. |
| L4 | FHIR/health interoperability | Structured integration where the hospital ecosystem supports it. |
| L5 | NHCX/ABDM-aligned claim workflows | Future enterprise integration after product validation and required partner/onboarding work. |

Do not hard-code one hospital's export format into the core domain model. Use an adapter layer that maps external data into the canonical HealthOS model.

# **19\. Frontend Application Map**

| Area | Key screens |
| :---- | :---- |
| Authentication | Login, reset access, MFA/security prompts where configured. |
| Home | Role-based dashboard and action queue. |
| Patient | Search, profile, encounter timeline. |
| Encounter | Overview, charges, documents, tasks, claim status, audit findings. |
| Billing | Charge ledger, invoice editor, audit findings, payment history. |
| Claims | Claim board, claim detail, document checklist, risk score, query/denial timeline. |
| Discharge | Readiness checklist, blockers, SLA, owners. |
| Revenue | Reconciliation work queue, ageing, settlement variance. |
| Management | Revenue Leakage Radar, KPIs, payer/department drill-down. |
| AI Findings | Central review queue with evidence and reviewer actions. |
| Admin | Tenant setup, users, roles, payer rules, tariffs/packages, AI policies, integrations. |

## **UX principle**

Every AI alert should answer four questions immediately: What happened? Why do you think this? How much could it matter? What should I do next?

# **20\. Testing Strategy**

## **Unit tests**

* Financial arithmetic and rounding.  
* Firestore model validators and serializers.  
* RBAC helper functions and authorization checks.  
* Claim state transitions.  
* Bill-audit deterministic rules.  
* Reconciliation matching logic.

## **Integration tests**

* Auth \-\> role \-\> tenant \-\> Firestore access.  
* Document upload \-\> extraction \-\> storage \-\> metadata.  
* Encounter \-\> charge \-\> invoice \-\> audit.  
* Claim \-\> documents \-\> risk \-\> query \-\> settlement \-\> reconciliation.  
* Workflow task creation and escalation.

## **AI evaluations**

* Extraction accuracy by document field.  
* Evidence retrieval precision.  
* Unsupported-claim rate.  
* False-positive rate for bill audit.  
* Claim-risk ranking quality.  
* Denial classification accuracy.  
* Regression tests on every prompt/model version.

## **Security tests**

* Cross-tenant read/write attempts.  
* Privilege escalation.  
* Forged/expired tokens.  
* Storage path traversal.  
* Abuse/rate-limit tests.  
* Sensitive data leakage through logs or UI errors.

# **21\. MVP Timeline — 16 Weeks**

| Time | Milestone | Leads | Exit output |
| :---- | :---- | :---- | :---- |
| Weeks 1–2 | Discovery \+ Architecture | Ayushi, Swastik, Sanjay, Naman, Pragna | Hospital workflow interviews; product requirements; Firebase project setup; domain model; RBAC; threat model; UI skeleton; backlog. |
| Weeks 3–4 | Core Platform | Sanjay, Swastik, Pragna | Auth, tenant/branch/user models, Firestore schema, security rules, Storage, App Check, audit events, base navigation. |
| Weeks 5–6 | Patient \+ Encounter \+ Billing | Sanjay, Swastik, Priyanka | Patient search/profile, encounters, charge ledger, invoice draft/finalization, payments, canonical KPI formulas. |
| Weeks 7–8 | AI Bill Auditor | Chandana, Naman, Dhyuthi, Priyanka | Rules, anomaly model baseline, evidence mapping, findings queue, review workflow, seeded test cases. |
| Weeks 9–10 | Insurance \+ Claim Workspace | Subhraneel, Dhyuthi, Sanjay, Swastik | Policy upload/extraction, claim model, document checklist, evidence-backed copilot, claim workflow. |
| Weeks 11–12 | Discharge \+ Claim Risk | Dhyuthi, Chandini, Sanjay, Subhraneel | Discharge workflow board, readiness tasks, baseline claim-risk model, risk explanation. |
| Weeks 13–14 | Denial \+ Reconciliation | Subhraneel, Priyanka, Chandini, Sanjay | Denial taxonomy, root-cause flow, settlement/reconciliation engine, exception queue. |
| Week 15 | Revenue Leakage Radar \+ Integration | Priyanka, Swastik, Sanjay, Ayushi | Management dashboard, CSV importer, pilot data mapping, end-to-end metrics. |
| Week 16 | Hardening \+ Pilot Readiness | Entire engineering team \+ Ayushi | Security tests, performance, AI regression, backups, documentation, pilot training, demo script. |

The timeline assumes a focused team working in parallel, with the full-time BD/marketing members supporting validation and pilot work rather than core engineering.

# **22\. First 10 Working Days — Exact Start Tasks**

| When | Owner | Exact task |
| :---- | :---- | :---- |
| Day 1 | All | Kickoff; read this document; create GitHub project board; agree branch strategy and Definition of Done. |
| Day 1–2 | Sanjay | Create Firebase environments, Firestore skeleton, Auth, Storage, Functions/Cloud Run integration plan. |
| Day 1–2 | Pragna | Threat model, tenant isolation rules, RBAC matrix, secrets strategy and security acceptance criteria. |
| Day 1–3 | Swastik | Next.js/React app shell, protected routes, dashboard layout, role-aware navigation. |
| Day 2–4 | Priyanka | Canonical revenue KPI dictionary \+ reconciliation formulas \+ sample datasets. |
| Day 2–4 | Chandana | Bill-audit rule catalogue \+ 20 synthetic anomaly cases. |
| Day 2–4 | Dhyuthi | Document-type catalogue \+ extraction JSON schemas \+ sample synthetic documents. |
| Day 2–4 | Subhraneel | Claims RAG architecture \+ evidence object contract \+ initial payer rule knowledge format. |
| Day 2–4 | Chandini | Claim-risk feature list \+ baseline scoring rules \+ evaluation dataset structure. |
| Day 3–5 | Naman | AI gateway \+ schema validator \+ model/version registry \+ evaluation harness skeleton. |
| Day 1–10 | Ayushi | Interview at least 3–5 hospital billing/TPA stakeholders; return workflow maps and pain points. |
| Day 5–10 | All engineering | Integrate first end-to-end happy path: login \-\> tenant \-\> patient \-\> encounter \-\> charge \-\> draft invoice \-\> audit finding. |

# **23\. Definition of Done**

* The feature has a documented owner and reviewer.  
* The feature has a clear user role and business outcome.  
* Validation exists for normal and edge cases.  
* Authorization is enforced server-side and in relevant Firebase Rules.  
* Sensitive actions create audit events.  
* AI outputs are schema-validated and linked to evidence when applicable.  
* Financial amounts are calculated deterministically.  
* Errors fail safely without exposing sensitive data.  
* Unit/integration tests pass.  
* The feature is demonstrated end-to-end in staging.  
* Documentation explains configuration and operational failure modes.  
* No hospital-specific assumptions are hard-coded into core code.

# **24\. Data & AI Evaluation Metrics**

| Metric | Target for pilot | Owner |
| :---- | :---- | :---- |
| Bill-audit precision | \>80% confirmed findings before expansion | Chandana |
| False-positive rate | \<20% on selected high-confidence categories | Chandana/Naman |
| Document extraction field accuracy | \>90% on agreed MVP fields | Dhyuthi/Naman |
| Claim-risk ranking usefulness | Top-risk claims materially outperform random baseline | Chandini |
| Claim readiness checklist accuracy | \>90% for configured/documented requirements | Subhraneel/Dhyuthi |
| Reconciliation accuracy | 100% deterministic arithmetic on test suite | Priyanka/Sanjay |
| Cross-tenant access test | 0 unauthorized reads/writes | Pragna |
| AI unsupported assertion rate | Near-zero on evaluated benchmark | Naman/Subhraneel |
| Dashboard data freshness | Operational views updated within defined SLA | Sanjay |
| Pilot user task time | Measurable reduction vs current manual workflow | Ayushi/Priyanka |

Targets are engineering/pilot targets, not claims of current market performance. They should be recalibrated using actual pilot data.

# **25\. Future Roadmap After MVP**

| Stage | Expansion |
| :---- | :---- |
| v1.1 | More payer configurations, better claim integrations, configurable tariffs/packages, richer audit rules. |
| v1.5 | Multi-branch management, advanced revenue forecasting, automated recurring reports, deeper accounting integrations. |
| v2.0 | ABDM/NHCX-aligned integrations where commercially and technically appropriate; expanded interoperability. |
| v2.5 | Broader hospital operations: inventory, pharmacy, appointment/OPD, bed management, staff workflows. |
| v3.0 | Full hospital operating platform with AI copilots embedded across departments. |

Do not build these future modules during the 16-week MVP unless a pilot requirement absolutely requires them. Protect the revenue-cycle scope.

# **26\. Commercial Packaging & SaaS Design**

The software should be technically modular and commercially packageable without becoming seven separate products.

| Plan | Included modules | Commercial logic |
| :---- | :---- | :---- |
| Core | Hospital workspace \+ billing \+ base analytics | Entry point / smaller hospitals. |
| Professional | Core \+ Bill Auditor \+ Insurance/TPA \+ Discharge \+ Claim Risk | Primary SaaS tier. |
| Enterprise | All 7 \+ advanced analytics \+ integrations \+ multi-branch \+ security controls | Larger hospitals/groups. |
| Add-ons | Special integrations, migration, custom payer rules, premium AI usage | One-time or recurring depending on workload. |

The team should instrument usage and outcome data from day one so future pricing can align with hospital size, claim volume, branches and demonstrated revenue value.

# **27\. Pilot Strategy**

## **Pilot hospital profile**

* Private hospital or hospital group with meaningful insurance/TPA activity.  
* Existing billing/HMIS system that can export data.  
* Billing/TPA team willing to review AI findings.  
* One branch and a limited set of departments initially.  
* A named hospital sponsor who can provide workflow feedback.

## **Pilot scope**

* Do not replace the hospital's existing billing system initially.  
* Mirror/import a controlled set of encounters, charges and claims.  
* Run bill audit, claim readiness, risk, denial and reconciliation workflows.  
* Compare Zenera findings with actual staff decisions and outcomes.  
* Measure time saved, leakage confirmed, claims rework and reconciliation exceptions.

## **Pilot exit criteria**

* Hospital staff use the product weekly.  
* At least one measurable revenue/efficiency benefit is confirmed.  
* Security review has no critical unresolved findings.  
* AI false-positive rate is acceptable to the pilot team.  
* Integration method is stable enough to estimate production deployment effort.  
* The hospital sponsor is willing to provide a testimonial/case study subject to approval.

# **28\. Engineering Repository Structure**

healthos/  
  apps/  
    web/  
  services/  
    api/  
    ai-gateway/  
    document-intelligence/  
    claim-risk/  
    billing-audit/  
  packages/  
    domain/  
    schemas/  
    firebase/  
    ui/  
    config/  
  functions/  
    billing-events/  
    claim-events/  
    workflow-events/  
    notifications/  
  infra/  
    firebase/  
    cloudrun/  
  datasets/  
    synthetic/  
    ai-evals/  
  docs/  
    architecture/  
    api/  
    security/  
    runbooks/  
  tests/  
    unit/  
    integration/  
    security/  
    e2e/

Keep shared domain contracts in one package. AI services should consume typed schemas instead of inventing their own field names.

# **29\. Operational Runbooks Required Before Pilot**

* How to onboard a hospital tenant.  
* How to add a branch and user.  
* How to configure roles and permissions.  
* How to configure tariffs/packages/payer rules.  
* How to restore or replay failed document processing.  
* How to inspect a failed claim-risk job.  
* How to disable an AI module safely.  
* How to handle suspected cross-tenant access.  
* How to revoke employee support access.  
* How to export/delete tenant data according to contract.  
* How to recover from a failed deployment.  
* How to rotate secrets and API keys.

# **30\. Risks & What Can Kill This Project**

| Risk | Why dangerous | Mitigation |
| :---- | :---- | :---- |
| Trying to build a full ERP immediately | Scope explosion | Hold MVP to seven revenue-cycle modules. |
| Weak data model | AI will amplify bad data | Canonical schema before model work. |
| Black-box AI | Hospitals will not trust unexplained outputs | Evidence \+ confidence \+ human review. |
| Poor tenant isolation | Potential catastrophic security incident | Pragna security gate \+ automated isolation tests. |
| Overusing Firestore for heavy analytics | Complexity/cost at scale | Keep transactional data in Firestore; add warehouse later. |
| No hospital discovery | Engineering solves the wrong problem | Ayushi runs structured interviews before and during build. |
| Overfitting to one payer | Product becomes brittle | Configurable payer rules \+ adapter layer. |
| No integration strategy | Hospitals cannot operationalize the product | CSV first, API/webhooks next, interoperability later. |
| No measured ROI | Hard to sell as high-ticket SaaS | Track confirmed leakage, time saved, ageing and rework. |

# **31\. Team Communication & Cadence**

| Cadence | Participants | Purpose |
| :---- | :---- | :---- |
| Daily 15 min | Engineering team | Blockers, dependencies, integration issues. |
| Twice weekly | Module owners \+ Naman/Sanjay | Architecture and cross-module contracts. |
| Weekly demo | Entire HealthOS team | Working software only; no screenshot-only updates. |
| Weekly product review | Ayushi \+ module owners | Hospital workflow findings and priority changes. |
| Weekly security check | Pragna \+ backend/AI owners | Security findings, access changes, dependency issues. |
| End of sprint | Entire team | Demo, metrics, bugs, next-sprint scope. |

Use one backlog. Do not let each module become its own private project.

# **32\. Reference Sources Used for This Specification**

The product recommendations are engineering decisions; the following current references were used to validate Firebase capabilities and Zenera's team/portfolio context.

* Zenera Labs — Home / Team: https://www.zeneralabs.in/  
* Zenera Labs — Engineering Portfolio: https://www.zeneralabs.in/portfolio  
* Firebase — Terms of Service (updated May 1, 2026): https://firebase.google.com/terms/  
* Firebase — Secure data in Cloud Firestore (updated August 2026): https://firebase.google.com/docs/firestore/security/overview  
* Firebase — Security Rules basics: https://firebase.google.com/docs/rules/basics  
* Firebase — Cloud Firestore locations: https://firebase.google.com/docs/firestore/enterprise/locations  
* Google Cloud — HIPAA compliance: https://cloud.google.com/security/compliance/hipaa-compliance  
* Google Cloud — HIPAA Business Associate Addendum: https://cloud.google.com/terms/hipaa-baa

# **33\. Final Instruction to the Team**

| BUILD THE WORKFLOW, NOT THE FEATURES.A hospital should be able to open one encounter and move from patient \-\> charges \-\> bill audit \-\> insurance readiness \-\> discharge \-\> claim risk \-\> query/denial \-\> settlement \-\> reconciliation \-\> management insight without leaving HealthOS. Each module must strengthen that loop. |
| :---- |

Start with the first 10 working days. Do not wait for the entire specification to be “finished” before coding. Lock contracts early, build thin vertical slices, test with synthetic data, and integrate continuously.

**ZENERA HEALTHOS**

*One SaaS. Seven intelligence modules. One revenue-cycle workflow.*