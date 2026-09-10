# HealthOS — Pitch Deck

**Company:** Zenera Labs
**Product:** HealthOS — AI-Powered Hospital Revenue & Operations SaaS
**Version:** 2.0
**Last Updated:** September 2026

---

## Slide 1: Title

**ZENERA HEALTHOS**

AI-Powered Hospital Revenue & Operations SaaS

One SaaS. Seven Modules. One Revenue-Cycle Workflow.

*Zenera Labs · September 2026*

---

## Slide 2: The Problem

### Hospitals Lose Millions Every Year

| Problem | Impact |
|---------|--------|
| **Missed Charges** | 2-5% of billable services go unbilled |
| **Claim Denials** | 15-25% of claims denied on first submission |
| **Manual Chasing** | 40% of billing staff time spent on phone calls and follow-ups |
| **No Visibility** | CFOs don't know where money is until it's too late |
| **Reconciliation Gaps** | Payments mismatched, underpayments undiscovered |

> **The average 200-bed hospital loses ₹3-8 Crore annually to revenue leakage.**

---

## Slide 3: Why It Happens

### The Root Cause: Disconnected Systems

```
[HIS] → [Billing] → [Claims] → [Insurance] → [Finance]
  ↓         ↓           ↓            ↓            ↓
Paper     Excel       Phone       Email       Spreadsheet
```

- No single source of truth
- No AI to catch errors
- No automation for routine work
- No real-time visibility
- No predictive intelligence

---

## Slide 4: The Solution

### HealthOS — Intelligence Layer for Hospital Revenue

> **HealthOS sits on top of your existing systems.**
> It doesn't replace your HIS/HMIS — it makes them smarter.

| Capability | How |
|-----------|-----|
| **Find Lost Revenue** | AI scans every charge for missed, duplicate, and incorrect bills |
| **Prevent Claim Problems** | Validate claims against payer rules before submission |
| **Automate Reconciliation** | Match payments to claims automatically |
| **Predict Claim Risk** | Score every claim's rejection risk before it goes out |
| **Interpret Denials** | Classify denials, find root causes, generate appeals |
| **Eliminate Chasing** | Automated workflows move tasks between departments |

---

## Slide 5: Seven Modules, One Platform

### The Revenue-Cycle Intelligence Stack

| # | Module | What It Does |
|---|--------|-------------|
| 1 | **AI Bill Auditor** | Catch missed, duplicate, and package-mismatch charges |
| 2 | **Insurance & TPA Copilot** | Turn policy docs into claim-readiness views |
| 3 | **AI Discharge Manager** | Stop discharge from becoming a department-chasing exercise |
| 4 | **Claim Risk Predictor** | Score claims before submission — know who will reject |
| 5 | **Denial / Query Intelligence** | Turn every denial into reusable operational knowledge |
| 6 | **Revenue Reconciliation** | See exactly where every dollar is across all states |
| 7 | **Revenue Leakage Radar** | Leadership dashboard showing where money is lost or delayed |

> **Each module reinforces the others.** Data flows between modules create compounding value.

---

## Slide 6: How It Works

### The Revenue-Cycle Loop

```
Patient → Encounter → Charges → Bill Audit → Claim → Risk Score
  → Submission → Insurance → Denial? → Appeal → Settlement → Reconciliation
```

**Every step is intelligent. Every step has evidence. Every step is auditable.**

### Key Principles
- **Deterministic math** for financial calculations (no LLM guessing)
- **AI for intelligence** — pattern recognition, classification, prediction
- **Human review** for every AI finding — accept, dismiss, investigate
- **Evidence trail** for compliance — who, what, when, why

---

## Slide 7: AI Bill Auditor

### Before HealthOS
> Billing executive manually reviews every charge. Misses 3-5% of issues. Takes 4 hours per encounter.

### After HealthOS
> AI scans every charge in 10 seconds. Catches missed charges, duplicates, package inconsistencies. Presents findings with evidence and dollar impact.

| Detection Category | Example |
|-------------------|---------|
| Missed charge | Lab test performed but not billed |
| Duplicate charge | Same CPT code billed twice |
| Package inconsistency | Surgery package missing included items |
| Quantity anomaly | 10x normal units billed |
| Rate anomaly | Charge exceeds fee schedule |
| Documentation gap | Missing physician order |

**Result:** 80%+ precision, <20% false positive rate

---

## Slide 8: Claim Risk Predictor

### Know Before You Submit

Every claim gets a risk score (0-100) with:

| Output | Description |
|--------|-------------|
| **Risk Score** | 0-100 numerical score |
| **Risk Band** | LOW / MEDIUM / HIGH |
| **Top Factors** | Why this claim is at risk (e.g., missing documentation) |
| **Recommended Actions** | What to do before submission |
| **Evidence** | Links to source documents and data |

> **Impact:** 30% reduction in claim denials within 60 days

---

## Slide 9: Denial Intelligence

### Turn Every Denial Into Knowledge

| Step | Action |
|------|--------|
| 1 | Import denial letter (PDF, email, EDI) |
| 2 | AI classifies denial reason (30+ categories) |
| 3 | Links to relevant policy/claim evidence |
| 4 | Generates root-cause summary |
| 5 | Creates prevention rule for future claims |
| 6 | Feeds claim risk model for continuous improvement |

> **Result:** Denial resolution time drops from 14 days to 3 days

---

## Slide 10: Revenue Reconciliation

### See Exactly Where Every Dollar Is

```
Invoice Total: ₹1,00,000
  - Deductions: ₹15,000
  - Patient Responsibility: ₹10,000
  - Write-offs: ₹5,000
  = Expected Payer Settlement: ₹70,000

Actual Settlement: ₹65,000
Variance: -₹5,000 ⚠️
```

| Status | Meaning |
|--------|---------|
| Matched | Payment matches expected amount |
| Underpaid | Payer paid less than expected |
| Overpaid | Payer paid more — refund or credit |
| Pending | Payment not yet received |
| Unknown | Manual review needed |

> **Never ask an LLM to calculate totals.** Deterministic code only.

---

## Slide 11: Revenue Leakage Radar

### The CFO Dashboard

| Metric | What It Shows |
|--------|-------------|
| Billed Today | Total charges sent today |
| Expected Realization | What you'll actually collect |
| Revenue at Risk | Claims likely to be denied or delayed |
| Stuck Claims | Claims pending > 30 days |
| Potential Missed Charges | Charges AI thinks are missing |
| Query Rate | % of claims getting queries |
| Settlement Variance | Difference between expected and actual |

> **One screen. Every dollar accounted for.**

---

## Slide 12: Technical Architecture

### Built for Healthcare

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js, shadcn/ui, Tailwind CSS |
| **Auth** | better-auth (self-hosted, role-based) |
| **Database** | Postgres (NeonDB) — relational, ACID, tenant-isolated |
| **Vector Store** | pgvector — policy/claim chunks alongside operational data |
| **AI/ML** | Python FastAPI on Cloud Run — OCR, RAG, ML inference |
| **Document Processing** | Cloud Vision API, extraction engine |
| **Notifications** | FCM, email-SMS (no PHI in text) |

### Security First
- Tenant isolation on every query (Postgres RLS)
- Immutable audit trail for all financial actions
- No PHI in logs, analytics, or push notifications
- Secrets in Secret Manager, never in source
- App Check + Security Rules + IAM

---

## Slide 13: Market Opportunity

### Hospital Revenue-Cycle Market

| Metric | Value |
|--------|-------|
| **Market Size (India)** | ₹50,000 Cr+ annually |
| **Target Segment** | Private hospitals, 50-500 beds |
| **Number of Target Hospitals** | 10,000+ |
| **Average Revenue per Hospital** | ₹6-12L/year |
| **TAM** | ₹6,000-12,000 Cr |
| **SAM (Year 3)** | ₹600-1,200 Cr |
| **SOM (Year 1)** | ₹50-100 Cr |

### Growth Drivers
- Digital health mandates increasing
- Insurance penetration growing (Ayushman Bharat)
- Hospitals digitizing billing and claims
- AI adoption in healthcare accelerating
- Regulatory compliance requirements tightening

---

## Slide 14: Business Model

### Revenue Streams

| Stream | Description | Year 1 | Year 3 |
|--------|-------------|--------|--------|
| **SaaS Subscriptions** | Monthly/annual per-hospital | 70% | 60% |
| **Implementation Fees** | Setup, migration, training | 20% | 15% |
| **Add-Ons** | Custom integrations, advanced analytics | 10% | 25% |

### Unit Economics

| Metric | Target |
|--------|--------|
| **ACV (Annual Contract Value)** | ₹6-12L ($7-15K) |
| **Gross Margin** | 80%+ |
| **CAC Payback** | < 12 months |
| **LTV:CAC Ratio** | > 5:1 |
| **Net Revenue Retention** | > 110% |
| **Logo Churn** | < 10% annually |

---

## Slide 15: Go-to-Market Strategy

### Phase 1: Pilot (Months 1-3)
- 3-5 pilot hospitals (free 30-day pilots)
- Focus: Mumbai, Pune, Bangalore
- Segment: Mid-size private hospitals (100-300 beds)
- Goal: Prove ROI, build case studies

### Phase 2: Early Revenue (Months 4-6)
- Convert pilots to paid
- Start outbound sales
- Hire 2 SDRs + 1 AE
- Goal: 10 paying customers

### Phase 3: Scale (Months 7-12)
- Expand to Delhi, Chennai, Hyderabad
- Launch partner channel (HIS vendors, consultants)
- Self-serve signup for Core tier
- Goal: 50 paying customers

---

## Slide 16: Competitive Advantage

### Why HealthOS Wins

| Advantage | Detail |
|-----------|--------|
| **Revenue-cycle focus** | We don't try to be everything — we nail revenue intelligence |
| **Overlay model** | Works with existing systems, not a rip-and-replace |
| **Seven modules** | Data flows between modules create compounding value |
| **AI + deterministic** | AI for intelligence, code for financial math |
| **Explainable AI** | Every finding has evidence + reviewer trail |
| **Healthcare-native** | Built for HIPAA/compliance from day one |
| **Indian market** | Designed for Indian hospital workflows and payers |

---

## Slide 17: Traction & Milestones

### What We've Built
- [x] Complete product architecture
- [x] RAG pipeline for claims intelligence
- [x] Denial reason taxonomy (30+ categories)
- [x] Claim requirements knowledge base (6 claim types × 6 payers)
- [x] AI Bill Auditor prototype
- [x] Claim Risk Predictor model design
- [x] Revenue Reconciliation engine
- [x] Full security architecture (tenant isolation, audit trail)

### What's Next
- [ ] Pilot hospital recruitment (3-5 hospitals)
- [ ] MVP launch (Core + Professional tiers)
- [ ] First paying customers
- [ ] Series A preparation

---

## Slide 18: Team

### The People Behind HealthOS

| Name | Role | Background |
|------|------|-----------|
| **Swastik Dutta** | Product Engineering Lead | App architecture, navigation, dashboard UX |
| **Sanjay S** | Backend & Firebase Platform Lead | Firestore schema, Cloud Functions, API contracts |
| **Naman AU** | Shared AI Platform Lead | AI gateway, structured outputs, prompt registry |
| **Pragna R** | Security & Compliance Lead | Threat model, tenant isolation, security rules |
| **Subhraneel Goswami** | Claims Intelligence Lead | RAG, denial interpretation, claim explainability |
| **Priyanka M** | Revenue Analytics Lead | KPI model, reconciliation engine, leakage economics |
| **Dhyuthi Shree KS** | Document Intelligence Lead | Ingestion, extraction, OCR, metadata mapping |
| **Chandini N** | Claim Risk ML Lead | Risk scoring, feature engineering, drift monitoring |
| **Chandana Gowda** | Billing Audit ML Lead | Anomaly detection, missed/duplicate charge detection |
| **Ayushi Gautam** | Hospital Discovery & Pilot Lead | Workflow discovery, buyer interviews, pilot recruitment |
| **Debanjali Biswas** | Product Marketing & Enablement | Messaging, demo narrative, case studies |

> **11-person team covering product, engineering, AI/ML, security, and go-to-market.**

---

## Slide 19: The Ask

### What We Need

| Need | Amount | Purpose |
|------|--------|---------|
| **Pilot Hospitals** | 3-5 | Free 30-day pilots to prove ROI |
| **Seed Funding** | ₹4-5 Cr ($500-600K) | 18-month runway for MVP → Series A |
| **Advisors** | 2-3 | Healthcare industry, SaaS scaling |

### What We Offer
- Early access to HealthOS platform
- Input on product roadmap
- Equity participation (for investors)
- Revenue share (for pilot hospitals)

---

## Slide 20: Vision

### Where We're Going

**Year 1:** Prove the model with 50 hospitals
**Year 2:** Become the default revenue-cycle platform for Indian private hospitals
**Year 3:** Expand to Southeast Asia and Middle East
**Year 5:** The operating system for hospital revenue — globally

> **We're not building software. We're building the intelligence layer for hospital revenue.**

---

## Appendix A: ROI Calculator

### Sample Hospital (200 beds, ₹100Cr revenue)

| Metric | Current | With HealthOS |
|--------|---------|---------------|
| Claim denial rate | 20% | 12% |
| Annual denied claims | ₹4 Cr | ₹2.4 Cr |
| Revenue recovered | — | ₹1.6 Cr |
| Billing staff time saved | — | 2 FTEs (₹12L/year) |
| Reconciliation time | 5 days | 1 day |
| **Annual savings** | — | **₹1.72 Cr** |
| **HealthOS cost** | — | **₹12L/year** |
| **ROI** | — | **14x** |

---

## Appendix B: Pilot Results Template

### 30-Day Pilot Metrics

| Metric | Baseline | Pilot Result | Improvement |
|--------|----------|-------------|-------------|
| Claim denial rate | __% | __% | __% |
| Missed charge detection | __/month | __/month | __% |
| Reconciliation time | __ days | __ days | __% |
| Claim processing time | __ mins | __ mins | __% |
| Revenue at risk identified | ₹__ | ₹__ | ₹__ |
| Billing staff hours saved | __ hrs/week | __ hrs/week | __% |
