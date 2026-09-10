# Design Claims RAG Architecture

**Owner:** Subhraneel Goswami — Claims Intelligence Lead
**Timeline:** Day 1–2
**Priority:** Critical
**Deliverable:** RAG architecture design doc

---

## 1. Objective

Design the end-to-end Retrieval-Augmented Generation pipeline that powers the Claims Intelligence module — denial interpretation, claim validation, appeal generation, and the real-time claims advisor.

---

## 2. Core Components

### 2.1 Ingestion Layer

| Step | Description |
|------|-------------|
| Source collection | Denial policies, payer guidelines, CMS rules, payer-specific claim requirements, past denial letters |
| Format handling | PDF, DOCX, HTML, plain text — route through format-specific extractors |
| Chunking strategy | Semantic chunking by policy section / clause / paragraph; preserve document metadata (payer, effective date, section ID) |
| Embedding model | Choose between OpenAI `text-embedding-3-small`, Cohere `embed-v3`, or open-source (`bge-large-en-v1.5`) — evaluate on latency, cost, and retrieval quality |
| Vector store | pgvector (Postgres via NeonDB) for tenant-scoped vectors alongside operational data; index with HNSW or IVFFlat |

### 2.2 Retrieval Layer

| Component | Details |
|-----------|---------|
| Hybrid search | BM25 (keyword) + semantic search (vector similarity) with reciprocal rank fusion |
| Query expansion | Generate 2–3 paraphrased queries per user question to improve recall |
| MMR (Maximal Marginal Relevance) | Deduplicate near-identical chunks, diversify results |
| Tenant scoping | Every query filtered by `tenantId` — no cross-tenant retrieval (enforced via Postgres RLS policies) |
| Source metadata filtering | Filter by payer, document type, effective date range, section |

### 2.3 Generation Layer

| Component | Details |
|-----------|---------|
| Prompt template | Versioned in prompt registry (Naman's system); each invocation records prompt version |
| Context window | Top-k retrieved chunks (k=5–10) injected into system prompt |
| Structured output | JSON schema-validated response: answer, confidence, evidence refs, source citations |
| Guardrails | Pre-call: PII filter, schema check. Post-call: hallucination detection, confidence threshold |

### 2.4 Evidence & Citation

- Every AI answer must cite source document + page/chunk
- Citation format: `{ documentId, section, page?, chunkIndex, text }`
- Confidence labels: `"Found in source"` | `"Not found"` | `"Potentially applicable"` | `"Requires human confirmation"`

---

## 3. Data Flow

```
User Query (denial letter, claim question)
  → Query Expansion (2-3 paraphrases)
  → Hybrid Retrieval (BM25 + vector, tenant-scoped)
  → MMR Deduplication
  → Top-k Chunks + Metadata
  → Prompt Assembly (versioned template + context + guardrails)
  → LLM Inference (via AI Gateway)
  → Structured Output Validation (JSON Schema)
  → Confidence Check
     ├─ Above threshold → Persist finding, return to user
     └─ Below threshold → Route to Human Review Queue
  → Emit Audit Event
```

---

## 4. Storage Design

### Tables (Postgres via NeonDB)

| Collection | Purpose |
|------------|---------|
| `documents` | Ingested source documents with metadata (payer, type, effective date) |
| `chunks` | Vectorized chunks with embedding, source ref, section metadata |
| `queries` | User queries with retrieved chunks, generated answer, confidence |
| `findings` | AI findings linked to claims/denials with evidence refs |
| `audit_events` | Every retrieval + generation logged for compliance |

---

## 5. Evaluation Criteria

| Metric | Target |
|--------|--------|
| Retrieval recall@5 | > 85% |
| Retrieval precision@5 | > 70% |
| End-to-end answer accuracy | > 80% |
| Citation accuracy | > 90% (cited sources actually support the answer) |
| Latency (p95) | < 3 seconds per query |
| Cost per query | < $0.02 |

---

## 6. Open Questions

- [ ] Embedding model: managed (OpenAI/Cohere) vs self-hosted (bge-large)?
- [ ] Chunk size: 256 vs 512 tokens? Overlap strategy?
- [ ] Vector store: pgvector vs separate Weaviate/Qdrant instance?
- [ ] How to handle payer-specific terminology variations?
- [ ] Versioning strategy for re-ingested documents (when policies update)?

---

## 7. Success Criteria

- [ ] Architecture diagram completed
- [ ] Chunking strategy validated on 3 sample documents
- [ ] Embedding model benchmarked on retrieval quality
- [ ] Hybrid retrieval pipeline prototyped with test data
- [ ] Structured output schema defined and validated
