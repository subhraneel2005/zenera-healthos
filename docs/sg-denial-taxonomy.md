# Define Denial Reason Taxonomy

**Owner:** Subhraneel Goswami — Claims Intelligence Lead
**Timeline:** Day 1–2
**Priority:** Critical
**Deliverable:** Denial taxonomy v1.0

---

## 1. Objective

Create a hierarchical classification system for all claim denial and query reasons. This taxonomy powers the Denial/Query Intelligence module (M5), feeds the claim risk predictor, and enables consistent categorization across the platform.

---

## 2. Taxonomy Structure

### Level 1 — Category

Top-level grouping of denial types.

### Level 2 — Reason

Specific denial reason within a category.

### Level 3 — Sub-reason (optional)

Granular detail for complex denial types.

---

## 3. Denial Taxonomy v1.0

### 3.1 Documentation & Evidence

| L2 Reason | L3 Sub-reason | Description |
|-----------|---------------|-------------|
| Missing documentation | — | Required document not submitted with claim |
| Insufficient clinical evidence | — | Documentation present but does not support the level of service billed |
| Missing physician signature | — | Orders/reports lack required signatures |
| Illegible documentation | — | OCR/human cannot read the submitted documents |
| Incomplete claim form | — | Required fields blank or inconsistent |
| Missing prior authorization | — | Service required pre-auth that was not obtained |
| Expired prior authorization | — | Pre-auth obtained but expired before service date |

### 3.2 Eligibility & Coverage

| L2 Reason | L3 Sub-reason | Description |
|-----------|---------------|-------------|
| Patient not eligible | — | No active coverage on date of service |
| Service not covered | — | Procedure/code excluded from patient's plan |
| Plan limitation exceeded | — | Annual/lifetime maximum reached |
| Waiting period not met | — | Service within plan's waiting period |
| Out-of-network provider | — | Provider not in patient's network |
| Non-covered service for plan type | — | e.g., cosmetic procedure under basic plan |

### 3.3 Coding & Billing

| L2 Reason | L3 Sub-reason | Description |
|-----------|---------------|-------------|
| Invalid/incorrect CPT code | — | Code does not match the service described |
| Invalid ICD-10 diagnosis code | — | Diagnosis code does not support medical necessity |
| Code mismatch | CPT-ICD mismatch | Procedure code inconsistent with diagnosis |
| | Duplicate code | Same code billed multiple times for same encounter |
| | Unbundling | Separate codes billed for services that should be bundled |
| Incorrect units/quantity | — | Billed quantity does not match documentation |
| Incorrect rate/charge | — | Billed amount exceeds fee schedule or contracted rate |
| Modifier misuse | — | Modifier applied incorrectly or missing |
| Duplicate claim | — | Same claim submitted multiple times |
| Wrong billing entity | — | Claim billed under incorrect provider/NPI |

### 3.4 Medical Necessity

| L2 Reason | L3 Sub-reason | Description |
|-----------|---------------|-------------|
| Not medically necessary | — | Service not justified by diagnosis or clinical guidelines |
| Experimental/investigational | — | Service classified as experimental by payer |
| Not first-line therapy | — | Conservative treatment not attempted first |
| Clinical guidelines not met | — | Service does not meet payer's clinical criteria |

### 3.5 Timely Filing

| L2 Reason | L3 Sub-reason | Description |
|-----------|---------------|-------------|
| Claim filed past deadline | — | Submission exceeds payer's filing limit |
| Appeal filed past deadline | — | Appeal submission exceeds allowed window |
| Late notification | — | Payer not notified within required timeframe |

### 3.6 Policy & Contract

| L2 Reason | L3 Sub-reason | Description |
|-----------|---------------|-------------|
| Policy exclusion | — | Specific exclusion in patient's policy |
| Policy limit exceeded | — | Benefit maximum reached |
| Coordination of benefits issue | — | Primary/secondary payer coordination failure |
| Pre-existing condition | — | Service related to pre-existing condition exclusion |
| Non-participating provider | — | Provider not contracted with payer |

### 3.7 Payer / Administrative

| L2 Reason | L3 Sub-reason | Description |
|-----------|---------------|-------------|
| Payer processing error | — | Error on payer's side (system, manual) |
| Duplicate payment | — | Payer already paid this claim |
| Wrong payer billed | — | Claim sent to incorrect payer |
| Internal payer review | — | Payer flagged for manual review |
| System/system integration error | — | EDI/837 parsing error |

---

## 4. Resolution Mapping

Each denial reason maps to recommended resolution actions:

| Denial Category | Resolution Actions |
|-----------------|-------------------|
| Missing documentation | Request specific document, re-submit claim |
| Coding error | Correct code, re-bill with modifier if needed |
| Eligibility issue | Verify coverage, coordinate benefits, appeal if wrong |
| Medical necessity | Gather additional clinical evidence, peer-to-peer review |
| Timely filing | Late submission with good cause exception, escalate |
| Policy exclusion | Review policy terms, check for exceptions, patient responsibility |
| Payer error | Contact payer, provide evidence, escalate |

---

## 5. Data Model

```json
{
  "denialReasonId": "DR-DOC-001",
  "category": "documentation_evidence",
  "reason": "missing_prior_authorization",
  "subReason": null,
  "label": "Missing Prior Authorization",
  "description": "Service required pre-auth that was not obtained",
  "resolutionActions": ["request_retroactive_auth", "appeal_with_clinical_evidence"],
  "severity": "high",
  "applicablePayers": ["all"],
  "applicableClaimTypes": ["inpatient", "outpatient", "professional"]
}
```

---

## 6. Validation Criteria

- [ ] All 2024 denial reason codes from CMS mapped to taxonomy
- [ ] Top 20 denial reasons from 3 pilot hospitals categorized
- [ ] Each reason has at least one resolution action
- [ ] Taxonomy covers ≥ 95% of observed denial reasons in test data
- [ ] No ambiguous categories (each denial maps to exactly one L2 reason)

---

## 7. Success Criteria

- [ ] Taxonomy document completed with all L1/L2/L3 reasons
- [ ] Resolution actions mapped to each reason
- [ ] Validated against 100 sample denial letters
- [ ] Imported into Postgres (NeonDB) as config data
- [ ] Reviewed by Chandini (ML) for feature engineering alignment
