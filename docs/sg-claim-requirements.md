# Define Claim Requirements Knowledge Base

**Owner:** Subhraneel Goswami — Claims Intelligence Lead
**Timeline:** Day 2
**Priority:** High
**Deliverable:** Requirements knowledge base

---

## 1. Objective

Build a structured knowledge base of claim submission requirements for each major claim type and payer. This powers the pre-submission claim validator (M1/M4), the Insurance & TPA Copilot (M2), and the appeal letter generator.

---

## 2. Claim Types to Cover

| Claim Type | Description |
|------------|-------------|
| Professional (CMS-1500) | Physician services, outpatient procedures, DME |
| Institutional (UB-04) | Hospital inpatient, outpatient facility, SNF |
| Dental (ADA 2024) | Dental procedures |
| Pharmacy (NCPDP) | Prescription drug claims |
| Auto/Workers' Comp | No-fault, workers' compensation |
| Claims | Government-sponsored (Medicaid, Medicare) |

---

## 3. Requirements Schema

For each claim type × payer, define:

```json
{
  "claimType": "professional",
  "payer": "united_healthcare",
  "requirements": {
    "mandatoryDocuments": [
      { "document": "CMS-1500 form", "condition": "always" },
      { "document": " physician order", "condition": "lab/imaging" },
      { "document": "prior authorization", "condition": "pre-auth required procedures" },
      { "document": "medical records", "condition": "complex/procedure-heavy" }
    ],
    "mandatoryFields": [
      { "field": "patient_name", "match": "exact" },
      { "field": "dob", "match": "exact" },
      { "field": "insurance_id", "match": "exact" },
      { "field": "npi_provider", "match": "exact" },
      { "field": "service_date", "match": "exact" },
      { "field": "cpt_code", "match": "valid_code" },
      { "field": "icd10_code", "match": "valid_code" },
      { "field": "diagnosis_pointer", "match": "valid_range" },
      { "field": "charge_amount", "match": "positive_number" },
      { "field": "units", "match": "positive_integer" }
    ],
    "codingRules": [
      { "rule": "CPT-ICD alignment", "description": "Diagnosis must support procedure medical necessity" },
      { "rule": "No duplicate codes", "description": "Same CPT code cannot appear twice on same date" },
      { "rule": "Modifier required", "description": "Modifiers needed for bilateral, multiple procedures, etc." }
    ],
    "filingDeadline": {
      "daysFromService": 90,
      "note": "Check payer-specific deadlines"
    },
    "specialRules": [
      "Bundling: Use NCCI edits to check for code bundling issues",
      "Place of service: POS code must match service setting"
    ]
  }
}
```

---

## 4. Payer-Specific Rules

### 4.1 United Healthcare

| Rule | Detail |
|------|--------|
| Prior auth required | Cardiology interventions, advanced imaging, specialty drugs |
| Filing deadline | 90 days from date of service |
| Modifier 25 | Required for E/M on same day as procedure |
| bundling | Strict NCCI edit enforcement |

### 4.2 Blue Cross Blue Shield

| Rule | Detail |
|------|--------|
| Prior auth required | Inpatient stays, complex imaging, biologics |
| Filing deadline | 90 days (varies by plan) |
| Specialty drugs | Require step therapy documentation |
| Coordination of benefits | Must verify primary/secondary order |

### 4.3 Cigna

| Rule | Detail |
|------|--------|
| Prior auth required | Transplant services, genetic testing, DME |
| Filing deadline | 90 days |
| Medical necessity | Strict adherence to InterQual/Milliman criteria |
| Network requirements | In-network referral required for specialists (some plans) |

### 4.4 Aetna

| Rule | Detail |
|------|--------|
| Prior auth required | Radiology, oncology, surgical procedures |
| Filing deadline | 90 days |
| Experimental | LCD/NCD coverage determinations strictly followed |
| Modifier requirements | Modifier 59 for distinct procedural services |

### 4.5 Medicare

| Rule | Detail |
|------|--------|
| Filing deadline | 1 year from date of service |
| ABN | Advance Beneficiary Notice required for non-covered services |
| DME | Must have valid physician order + certificate of medical necessity |
| Prior auth | Limited — mostly for certain DME and outpatient procedures |

### 4.6 Medicaid

| Rule | Detail |
|------|--------|
| Filing deadline | Varies by state (typically 60–90 days) |
| Prior auth | Extensive — nearly all specialty services |
| Referral | Primary care referral required for specialists |
| EPSDT | Pediatric services have expanded coverage |

---

## 5. Validation Rules Engine

The knowledge base feeds a rule engine that runs pre-submission checks:

```
For each claim:
  1. Load requirements for {claimType} × {payer}
  2. Check mandatory documents → flag missing
  3. Check mandatory fields → flag empty/invalid
  4. Check coding rules → flag violations
  5. Check filing deadline → flag if approaching/exceeded
  6. Check payer-specific rules → flag violations
  7. Calculate readiness score: (passed / total checks) × 100
  8. Return: { score, violations[], warnings[], missingDocs[] }
```

---

## 6. Data Model

### Postgres Table: `claim_requirements`

```json
{
  "id": "prof_uhc_001",
  "claim_type": "professional",
  "payer": "united_healthcare",
  "version": "1.0",
  "effective_date": "2026-01-01",
  "mandatory_documents": [...],
  "mandatory_fields": [...],
  "coding_rules": [...],
  "filing_deadline": {...},
  "special_rules": [...],
  "updated_at": "2026-01-01T00:00:00Z",
  "updated_by": "system"
}
```

---

## 7. Success Criteria

- [ ] All 6 claim types documented
- [ ] Top 6 payers covered (UHC, BCBS, Cigna, Aetna, Medicare, Medicaid)
- [ ] Each claim type × payer has ≥ 8 mandatory field checks
- [ ] Coding rules cover NCCI edits, modifier requirements, bundling
- [ ] Validated against 50 real claims from pilot hospital data
- [ ] Imported into Postgres (NeonDB) config table
- [ ] Rule engine prototype validates claims against KB
