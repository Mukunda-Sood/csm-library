---
name: top1pct-cpo-briefing
version: 5.0
date: June 2026
description: >
  Generate a "Top 1%" CPO Procurement Activation Briefing — a decision-oriented
  deck + matching microsite designed to secure a single low-friction activation
  decision from a CPO. Also covers the standalone Buy Channel Analysis (shorter
  format). Customer- and industry-agnostic. Trigger when the user asks for a
  procurement activation briefing, CPO engagement deck, Ariba activation
  analysis, buy channel deep-dive, or similar.
---

# Top 1% CPO Procurement Activation Briefing

**Skill Framework — Any Account, Any Industry**

Version 5.0 — June 2026

Reorients the procurement narrative from "transactional processing" to "strategic indirect spend governance." Applies to any account with an under-utilized SAP Ariba footprint.

**Trigger phrases:** "CPO briefing," "procurement activation," "indirect spend governance," "buy channel strategy," "spend under management," "buy channel analysis," "channel governance deck"

---

## 0. Inputs and Activation

### What the CSM Uploads (2 Documents)

| # | Document | Source | What the agent extracts |
|---|----------|--------|------------------------|
| 1 | **EKX Analysis** (PDF) | Exported from EKX platform | Solutions in scope (modules owned/entitled), compliance benchmarks (compliant spend %, exception-free %, R2O days, catalog lines %), platform entitlement, module fees, cACV breakdown, deployment credit, activation status, utilization % |
| 2 | **Buy Channel Report** (PDF) | Exported from SAP Ariba | Channel mix (6 channels with $ and %), requisition count, supplier count, average spend per supplier, exception rate, exception count |

### What the Agent Derives Autonomously (No Upload Needed)

| Data | How | Feeds into |
|------|-----|-----------|
| 10-K / Annual Report | Agent searches and reads the customer's most recent public filing | Citations (Section 4), challenge identification, strategic vocabulary |
| Customer challenges | Agent analyzes the filing across 7 procurement-relevant themes | Peer selection criteria, pilot category justification, narrative framing |
| Peer selection | Agent matches customer challenges to peers who solved them using in-scope SAP solutions | Peer Synthesis slide, deep-dive appendix, translation tables |
| Value quantification | Agent applies formulas (Section 9) to extracted variables | Value at Stake, Value Totals, Consequences, Executive Summary |
| Pilot categories | Agent derives from filing language + Buy Channel spend patterns + solutions in scope | Category Activation slide, appendix workstreams |
| Channel architecture | Agent maps spend patterns to governed channels available within entitlement | Channel Architecture slide, Strategic Routing appendix |

### Solutions-in-Scope Constraint (Critical)

The EKX Analysis defines the boundary of all recommendations. The agent MUST:

1. **Only recommend governed channels the customer can activate with their current entitlement.** If the customer does not own the Contracts module, do not recommend Release Contracts as a primary channel. If they lack Guided Buying, do not propose Catalog-via-GB as a channel.
2. **Only select peers who solved challenges using solutions within the customer's scope.** A peer that achieved results with Ariba Network + Sourcing + Contracts is only valid proof if the customer owns those same modules (or they are in their entitlement but dormant).
3. **Only propose pilot categories that can be governed using owned/entitled modules.** Do not propose a Catalog pilot if the customer has no Buying module entitlement.
4. **Reflect the entitlement gap honestly in "What You Own."** Show: (a) what they pay for, (b) what they use, (c) what they could activate with zero incremental cost. This reframes the conversation from "buy more" to "activate what you already own."
5. **Calculate value quantification only for activatable solutions.** Rate drift savings require Contracts; sourcing savings require Sourcing module; exception reduction requires Guided Buying. If a module is not in scope, exclude that value component and note the limitation.

If the EKX Analysis reveals modules NOT in the customer's current entitlement that would meaningfully expand governance coverage, note this in the appendix (Source Index slide) as a "future state consideration" — never in the main flow. The main flow must be executable with existing entitlement.

### Activation Trigger

The CSM uploads the two documents and says any of:
- "Build the Buy Channel Analysis for [Company]"
- "CPO briefing for [Company]"
- "Procurement activation deck for [Company]"
- "Channel governance analysis for [Company]"

The agent handles everything from there: extraction, filing search, peer matching, value calculation, and output generation.

---

## 1. Triage Decision Tree

Before beginning, classify the account to determine which configuration to produce.

### Step 1: Data Availability

| Question | If YES | If NO |
|----------|--------|-------|
| Do you have a Buy Channel Report? | Proceed | STOP — request from Ariba platform team; cannot build without this |
| Do you have SAP Ariba Benchmark data? | Full quantification available | Use Buy Channel data only; label all comparisons "internal baseline" |
| Do you have a Level 0 / cACV dashboard? | Include "What You Own" slide | Replace with qualitative module-usage description from account knowledge |
| Does the customer have a public filing (10-K, annual report)? | Use 10-K Citation Framework (Section 4) | Use Alternative Citation Sources (see below) |
| Do you have access to at least 1 relevant peer story? | Include peer evidence | Replace with Hackett/Ardent/Deloitte industry benchmark; cite the research firm |

### Step 2: Account Classification

| Dimension | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| **Filing status** | Public (SEC/ESEF) | Private / subsidiary | Government / nonprofit |
| **Ariba spend scale** | Enterprise (>$200M) | Mid-market ($30M–$200M) | Growth (<$30M) |
| **Current activation** | Dormant (0% compliant) | Partial (1–25% compliant) | Moderate (>25% compliant) |
| **Industry peer availability** | Pre-validated peers exist | Peers findable via story-finder | No direct industry match |

### Step 3: Configuration Output

| Classification | Format | Narrative emphasis | Exposure basis |
|----------------|--------|-------------------|----------------|
| Public + Enterprise + Dormant | Full Briefing or Buy Channel | Absolute $ shock value | 100% of Non-Catalog spend |
| Public + Enterprise + Partial | Full Briefing | "Incomplete governance" | Ungoverned portion only |
| Private + Enterprise + Dormant | Full Briefing (alt. citations) | $ exposure + peer proof | 100% of Non-Catalog spend |
| Private + Mid-market + Dormant | Buy Channel Analysis | % concentration + ROI on platform cost | 100% of Non-Catalog spend |
| Any + Growth | Buy Channel Analysis (compressed) | Cost-of-inaction vs. platform fee | Simplified: drift + exceptions only |
| Any + Moderate (>25%) | Neither — this skill does not apply | Account needs sourcing expansion play, not activation | N/A |

> **Hard stop:** If compliant spend exceeds 25%, this skill is the wrong tool. The account needs a sourcing expansion or contract optimization play, not an activation briefing.

### Alternative Citation Sources (Non-Public Companies)

When no 10-K or annual report exists, substitute from this priority list:

| Source | What to extract | Credibility |
|--------|----------------|-------------|
| Parent company's public filing | References to subsidiary operations, shared services, cost programs | High — board-approved language |
| Published press releases | Named programs, investment announcements, leadership quotes | Medium-high — company-sanctioned |
| Earnings call transcripts (if parent is public) | CFO/CEO commentary on cost structure, margins, priorities | High — executive voice |
| Industry association reports | Sector-wide cost pressures, benchmarks | Medium — not company-specific |
| LinkedIn/conference presentations by company executives | Strategic priorities, transformation language | Low-medium — informal, verify context |
| News coverage (FT, WSJ, trade press) | Named initiatives, M&A context, competitive pressures | Medium — third-party framing |

**Rules for alternative citations:**
1. Always disclose the source type: "Per [Company] press release, [date]" — never imply it is a regulatory filing.
2. Use executive quotes where possible — they carry more weight than journalist paraphrasing.
3. Maximum 2 alternative citations in main flow; additional in appendix.
4. If NO credible company-specific source exists, use the industry benchmark approach: "Hackett research indicates that companies in [industry] with ungoverned indirect spend experience 1–3% rate drift annually."

---

## 2. Purpose and Audience

This skill produces CPO-level briefings that reorient the procurement narrative from "transactional processing" to "strategic indirect spend governance." Two deliverable formats:

| Format | Slides | Meeting Duration | When to Use |
|--------|--------|-----------------|-------------|
| **Full CPO Briefing** | 15 main + 15 appendix (30 total) | 45-60 min | Full sourcing activation strategy; all data sources available |
| **Buy Channel Analysis** | 12 main + 5 appendix (17 total) | 20-30 min | Channel governance focus; Buy Channel Report + Benchmark data sufficient |

The primary audience is the Chief Procurement Officer (CPO) or VP Procurement at a company with an active SAP Ariba footprint that is under-utilized.

> **The central strategic question:** "We have $X of indirect spend in the system — how much of it is actually under management?"

---

## 3. Narrative Architecture — The Story Arc

### Full Briefing — Main Flow (15 Slides)

| # | Slide | Purpose |
|---|-------|---------|
| 1 | Title | Context + 3 anchor metrics (total indirect / ungoverned % / $0 governed channel) |
| 2 | Executive Summary | SITUATION / EXPOSURE / PLATFORM COST / ASK / RISK (forwardable to CFO) |
| 3 | Value at Stake | Dollar leakage table + ROI metrics — quantify cost of inaction |
| 4 | The CPO Question | Benchmark gap table — create urgency via peer comparison |
| 5 | Discipline Gap | Side-by-side: governed direct vs. ungoverned indirect (Enhancement B) |
| 6 | Buy Channel Reality | Current state vs. target state — show the routing problem |
| 7 | Consequences | Evidence + mechanism table — make abstract risk concrete |
| 8 | Maturity Model | 5-layer capability stack with account-specific gap annotations |
| 9 | Category Activation | 3 pilot categories with filing citations per card |
| 10 | Peer Synthesis | 4 peers × 1 dimension each — synthesis table with translation column |
| 11 | What You Own | Entitlement vs. activation gap — reframe as governance, not technology |
| 12 | Roadmap | Foundation (1-3 mo) > Prove (4-6 mo) > Scale (7-12 mo) |
| 13 | KPI Framework | 6 metrics with targets + strategic program linkage |
| 14 | Q4 Board Report | Before/After personal narrative for the CPO |
| 15 | The One Ask | Single action + risk of delay — dark background, filing quote, 3 closing metrics |

### Full Briefing — Appendix (15 Slides)

| # | Slide | Purpose |
|---|-------|---------|
| A1 | Appendix Divider | "Appendix" + section list |
| A2 | Full Benchmark Table | Every metric used in the body, with peer avg + TQ + position |
| A3 | Two-Bucket Classification | Direct vs. Indirect 5-test framework with account-specific categorization |
| A4 | Anchor Metric Methodology | Defends the denominator choice (invoice spend vs. PO spend); mandatory if AP metrics blank |
| A5 | Closest Peer Deep-Dive: Profile | Company profile, revenue, industry, starting state, what created their gap |
| A6 | Closest Peer Deep-Dive: Activation Sequence | 3-5 phases from dormant to governed with timeline and metrics per phase |
| A7 | Closest Peer Deep-Dive: Full Translation Table | Minimum 7 rows mapping peer outcome → customer-specific equivalent |
| A8 | Peer 2 Summary Card | Profile + dimension proved + 3-4 headline metrics + 1 translation row |
| A9 | Peer 3 Summary Card | Same structure |
| A10 | Peer 4 Summary Card | Same structure |
| A11 | Engagement Sequence | T1–T4 timeline anchored to a real deadline (renewal, fiscal year, board cycle) |
| A12 | Strategic Routing Model Detail | 5 channels with implementation prerequisites and sequencing |
| A13 | Category Activation Workstreams | 3 pilot categories with owner, timeline, success measure, dependencies |
| A14 | KPI Tracking Framework | 6 metrics with formula, baseline, 6-month target, 12-month target, strategic link |
| A15 | Source Index & Confidence | Every data source cited in the deck with HIGH/MEDIUM/LOW confidence rating |

### Buy Channel Analysis — Main Flow (12 Slides)

| # | Slide | Purpose |
|---|-------|---------|
| 1 | Title | Context + 3 anchor metrics (total / Non-Catalog % / $0 governed channel) |
| 2 | Executive Summary | SITUATION / EXPOSURE / PLATFORM COST / ASK / RISK |
| 3 | Channel Breakdown | Where spend flows today — 6-row channel table with governance tags |
| 4 | Compliance Gap | Benchmark gaps quantified — 4 metric cards + gap table |
| 5 | What It Costs | 5 consequences with evidence source and causal mechanism |
| 6 | Value Sim: Before | How an invoice passes without governance (5-step flow diagram) |
| 7 | Value Sim: After | Same supplier with governed channel active (5-step flow diagram) |
| 8 | Value Totals | Quantified exposure range + 4 metric cards + directional caveat |
| 9 | Channel Architecture | 5 governed channels matched to 5 spend patterns |
| 10 | Peer Proof | Single highest-fidelity peer with synthesis + translation table |
| 11 | Implementation | Foundation / Pilot / Scale (12-week to 12-month timeline) |
| 12 | The One Ask | Dark background, filing quote, ask box, 3 closing metrics |

### Buy Channel Analysis — Appendix (5 Slides)

| # | Slide | Purpose |
|---|-------|---------|
| A1 | Appendix Divider | "Appendix" + section list |
| A2 | Full Benchmark Table | Complete metric table with gaps |
| A3 | Supplier Concentration | Channel assignment framework + transparency note |
| A4 | Feature Deep-Dive | Governed channel comparison (e.g., Release Contract vs. BPO mechanics) |
| A5 | Source Index & Confidence | All data sources + confidence levels + transparency statement |

### Shared Principles (Both Formats)

- Same design system (colors, fonts, helper functions)
- Same variable map (Buy Channel uses a subset)
- Same closing structure (single ask = read-only data extract)
- Same source transparency standards
- Same 10-K citation treatment (connective tissue, never its own slide)

---

## 4. Enhancement A: 10-K Citation Framework

### Principle

Verbatim quotes from the account's own public filing (10-K, annual report, investor presentation) are embedded as connective tissue across multiple slides — never as a dedicated "strategic alignment" slide. Each recommendation self-justifies in the company's own strategic vocabulary.

### Why This Works

A CPO who reports to a CFO or CEO needs internal justification for any activation investment. If the briefing says "your own filing states [exact language] — here is how governed procurement directly addresses that stated priority," the CPO does not have to build the business case from scratch. The filing language becomes the authorization mechanism.

### 7 Citation Themes (Any Industry)

| Theme | What to look for | Where it appears |
|-------|-----------------|------------------|
| Cost-reduction / efficiency program | Named program (e.g., Continuous Improvement, Zero-Based, Operational Excellence) | Business Description, MD&A, Risk Factors |
| Logistics / distribution cost | Transportation, warehousing, 3PL cost pressure, freight inflation | Risk Factors, MD&A |
| Marketing / SG&A spend | Total marketing $, advertising $, brand investment, agency spend | Notes to Financials, MD&A |
| Supply chain risk | Supplier concentration, single-source risk, disruption language | Risk Factors |
| Working capital / cash management | Payment terms, cash conversion cycle, AP programs, SCF | MD&A, Notes |
| Gross margin pressure | COGS drivers, cost inflation, inability to pass through costs | MD&A, Risk Factors |
| Procurement / indirect efficiency | Shared services, GBS, procurement transformation | Risk Factors, Business Description |

### Where Citations Land

| Slide / Section | Citation role |
|----------------|--------------|
| Executive Summary (RISK row) | Stated efficiency imperative — "this is your priority, not ours" |
| Value at Stake / Consequences | Named cost program — reframes indirect governance as a program workstream |
| What It Costs (final row) | Program-failure risk language — makes ungoverned spend a boardroom risk |
| Category Activation (each card) | Category-specific cost/risk language — each pilot self-justifies |
| What You Own | Transformation initiative — links activation to existing executive program |
| KPI Framework | Margin/cost target — makes "spend under management" a financial metric |
| The One Ask (closing) | Program outlook statement — CPO leaves with authorization vocabulary attached |

### 5 Rules

1. **Keep quotes short** — one sentence each. The translation does the work.
2. **Cite the section** — "Item 1A — Risk Factors" or "Item 7 — MD&A" (or equivalent for non-US filings).
3. **Never adversarial** — tone is "your filing confirms this is a priority; here is the execution path."
4. **Verbatim only** — do not paraphrase. Power is in the exact board-approved language.
5. **Never its own section** — the filing is the grammar of the argument, not a chapter.

### Design Treatment

**Deck:** Grey-bordered italic quote block with vertical accent bar. Helper function `cite(s, x, y, w, quote, ref)` renders a 0.04" grey rect + italic text + source reference below.

**Microsite:** CSS class `.cite`: `border-left: 3px solid var(--grey4); background: rgba(0,0,0,.018); font-style: italic; font-size: 12.5px`. Child `.ref`: `font-size: 10px; font-style: normal; color: var(--grey6)`.

---

## 5. Enhancement B: Direct vs. Indirect Sourcing Contrast

### Principle

Every company with a procurement function applies some form of sourcing discipline to its core inputs. The briefing must acknowledge this sophistication — and then show that it stops at the indirect boundary. This pre-empts the CPO's instinctive objection ("we already source well") and narrows the recommendation to a defensible, industry-aware scope.

### The Two-Bucket Model (by Industry)

| Industry | Non-sourceable / locked direct spend | Competitively sourceable indirect spend |
|----------|--------------------------------------|----------------------------------------|
| Food / CPG | Origin-specific inputs, proprietary formulations, forward-purchased commodities, primary packaging | Marketing services, IT, logistics/3PL, plant MRO, facilities, professional services, tertiary packaging |
| Pharma / Life Sciences | API suppliers (regulatory-locked), GMP-certified raw materials, clinical CROs under MSA | Marketing services, IT, facilities, fleet, consulting, contingent labor |
| Automotive / Manufacturing | Tier-1 components (design-locked), tooling-specific suppliers, JV-bound parts | MRO, logistics, IT, professional services, contingent labor, facilities |
| Retail / Consumer | Private-label manufacturers (spec-locked), branded goods (non-negotiable), seasonal produce | Store services, logistics, marketing, IT, facilities, professional services |
| Utilities / Energy | Fuel supply (market-priced, hedged), regulated equipment (single-source OEMs) | IT, fleet, professional services, MRO, facilities, vegetation management |
| Technology / Software | Cloud infrastructure (committed contracts), silicon supply (allocation-based) | Marketing, consulting, facilities, contingent labor, T&E, professional services |
| Financial Services | Trading counterparties, regulated service providers (clearing, custody) | IT, consulting, facilities, marketing, contingent labor, office services |

### Classification Framework (5-Test)

| Test | If YES → DIRECT (exclude) | If NO → INDIRECT (include) |
|------|---------------------------|----------------------------|
| Does the item become part of the finished product? | Raw materials, active ingredients | Plant consumables, cleaning |
| Does the item ship WITH the product to the end customer? | Primary packaging, labels | Tertiary packaging (pallets, wrap) |
| Is the supplier locked by regulatory/quality certification? | GMP suppliers, food-grade certified | Industrial suppliers |
| Is the supplier locked by product specification or IP? | Proprietary formulations | Commodity industrial goods |
| Would switching change the product delivered to customers? | Origin-specific ingredients | Services, logistics, facilities |

**CRITICAL:** When in doubt, exclude and flag for validation. Narrower is more credible.

### Constructing the Two-Bucket Model for Unlisted Industries

If the customer's industry does not appear in the table above, build it:

1. **Left column (Direct / locked):** Apply the 5-test classification framework. Anything that passes 2+ tests belongs here. Start with the company's COGS line items from their filing or industry knowledge.
2. **Right column (Indirect / sourceable):** Everything that fails all 5 tests. Default categories that appear in nearly every industry: IT services, facilities management, professional services (consulting, legal, audit), contingent labor, travel & entertainment, fleet, office supplies, marketing services.
3. **Validate with the customer's own language.** If their filing or press materials describe a category as "strategic" or "proprietary," move it left. If they describe cost pressure or efficiency goals around a category, it belongs right.
4. **When uncertain:** List the category in a "Validation Required" third column and flag it in the appendix. Never assert sourcing applicability for a category you cannot defend.

### Industry-Specific Nuances

| Industry | Common trap | Guidance |
|----------|-------------|----------|
| Healthcare / Life Sciences | Assuming all medical supplies are direct | Distinguish: clinical (regulated) vs. non-clinical (facilities, IT, admin) |
| Higher Education | No obvious "product" — everything feels indirect | Left column = tenured faculty, accreditation-locked services; Right = facilities, IT, admin services, contingent staff |
| Government / Public Sector | Regulated procurement processes | Left column = mandate-locked vendors (e.g., sole-source by regulation); Right = competed categories under threshold |
| Construction / Engineering | Project-specific suppliers | Left = design-specified materials; Right = general consumables, equipment rental, site services |
| Media / Entertainment | Content licensing feels "indirect" but is core | Left = licensed content, talent; Right = production services, facilities, technology, marketing |

### Slide Structure

- **Left column (green accent):** "Direct / core inputs — already governed." List the specific mechanisms the company uses. Include a verbatim filing citation proving their sourcing sophistication.
- **Right column (red accent):** "Indirect spend ($X) — zero discipline applied." Mirror with "No [equivalent]" for each mechanism. Include Buy Channel data evidence.
- **Punchline (centered, bold):** "[Company] already knows how to source strategically. The gap is applying that same discipline to indirect."

### 4 Rules

1. Never propose competitive sourcing for locked direct materials — a CPO will immediately reject it and the entire briefing loses credibility.
2. Present the contrast as a STRENGTH — a deliberately narrow, defensible scope that respects the CPO's intelligence about their own supply base.
3. Always include at least one filing citation on the direct-materials side proving the company's own stated sourcing sophistication.
4. Industry-adapt the left column — use the company's own terminology for their direct procurement mechanisms.

---

## 6. Peer Selection Framework

### The Four Proof Dimensions

| Dimension | What it proves | Roadmap phase validated |
|-----------|---------------|------------------------|
| Category-led activation | Structured sourcing delivers measurable savings | Foundation + Prove |
| Buy-channel compliance | Governed channels achieve high adoption when easier than alternatives | Scale (enforcement) |
| Pilot-to-global sequence | A single successful pilot earns enterprise authorization | Prove → Scale |
| Network adoption speed | Supplier enablement can compress from months to days | Foundation (setup) |

### Selection Logic — Challenge-First Matching

Peer selection is driven by **challenge alignment**, not surface demographics. The agent:

1. **Analyzes the customer's 10-K / annual report** to extract their specific procurement-relevant challenges (cost program gaps, margin pressure, supply chain risk, working capital constraints, efficiency mandates).
2. **Identifies candidate peers** by locating companies that faced demonstrably similar challenges AND resolved them using SAP solutions within the customer's current entitlement scope.
3. **Validates each candidate** by analyzing the peer's own public filing or published case study to confirm: (a) the challenge was real (not marketing narrative), (b) the resolution involved SAP Ariba/procurement platform capabilities that the customer already owns or could activate, (c) quantified outcomes are published and verifiable.

The agent uses its full analytical capabilities — 10-K parsing, story-finder, case study databases, web research — autonomously. It does NOT need prescriptive search templates. The selection criteria below define WHAT to optimize for; the agent determines HOW to find and validate candidates.

### Selection Criteria (Weighted)

| Criterion | Weight | What it measures |
|-----------|--------|-----------------|
| **Challenge alignment** | 30% | Did this peer face the SAME type of procurement challenge the customer faces? (e.g., ungoverned indirect spend, dormant sourcing, rate drift on repeating categories) |
| **Solution overlap** | 25% | Did the peer solve it using SAP solutions the customer already owns or has in their entitlement? (Ariba Sourcing, Contracts, Guided Buying, Network) |
| **Industry / sector match** | 20% | Same sub-sector > same broad sector > adjacent vertical > cross-industry |
| **Scale / revenue proximity** | 15% | Within 1.5x (ideal) → within 3x → within 5x → >5x |
| **Outcome quality** | 10% | Multiple quantified KPIs + timeline published > 2-3 metrics > qualitative only |

### Intelligent Peer Ranking and Deep-Dive Selection

Score each candidate on a 4-point scale per criterion:

| Criterion | 4 (Strongest) | 3 | 2 | 1 (Weakest) |
|-----------|---------------|---|---|-------------|
| Challenge alignment | Same challenge type + same starting state (e.g., 0% governed, dormant sourcing) | Same challenge type, different severity | Related challenge (same domain) | Generic "transformation" — no specific overlap |
| Solution overlap | Resolved using identical modules customer owns | Same platform, adjacent modules | SAP platform but different product line | Non-SAP or unspecified tooling |
| Industry match | Same sub-sector | Same broad sector | Adjacent sector | Cross-industry |
| Scale proximity | Within 1.5x revenue | Within 3x | Within 5x | >5x difference |
| Outcome quality | Multiple quantified KPIs + timeline published | 2-3 quantified metrics | 1 metric or qualitative only | No published outcomes |

**Weighted composite score = (Challenge×3 + Solution×2.5 + Industry×2 + Scale×1.5 + Outcome×1) / 10.** Range: 1.0–4.0. The peer with the highest composite score becomes the **deep-dive peer** (3 appendix slides). The remaining 3 peers receive summary cards (1 slide each).

**For the Buy Channel format:** Only the single highest-scoring peer appears (main flow Slide 10). No appendix deep-dive — the shorter format relies on synthesis only.

### Why Challenge Alignment Outweighs Industry Match

A peer from a different sector that faced the EXACT same procurement challenge (e.g., "98% of indirect routed through Non-Catalog with zero contract enforcement") and solved it with the same Ariba modules is MORE persuasive than a same-industry peer that solved a tangentially related problem. The CPO's reaction to challenge-aligned proof is: "That's us." The reaction to industry-matched but challenge-misaligned proof is: "Interesting, but our situation is different."

Exception: For the **Category-led activation** dimension, industry match matters more because category structures are sector-specific. Weight industry at 30% for that dimension only.

### Peer Profile Template

For each selected peer, document:
- **Profile:** Company name, revenue, industry, geography, what created their procurement gap
- **What it proves:** One sentence — which dimension this peer validates
- **Headline metrics:** 4-7 quantified outcomes
- **Activation sequence:** 3-5 phases from current state to outcome state
- **Account translation table:** Minimum 5 rows (7 for deep-dive peer) mapping peer metric → customer-specific equivalent

### Peer Discovery Process

The agent autonomously executes peer discovery using its full capability set:

1. **Extract customer challenges from filing.** Parse the customer's 10-K (or alternative source) for the specific procurement-relevant pain points: named cost programs, stated margin pressures, supply chain risks, working capital objectives, efficiency mandates. These become the matching criteria.

2. **Identify candidate peers.** Using story-finder, case study databases, SAP references, and web research, locate companies that:
   - Faced one or more of the SAME challenges
   - Resolved them using SAP Ariba / procurement solutions within the customer's entitlement scope
   - Have published, quantifiable outcomes

3. **Validate via peer filing / case study.** For each candidate, confirm:
   - The challenge was real (verifiable in their own filing or published press)
   - The resolution timeline and metrics are specific (not marketing generalities)
   - The SAP solution used matches what the customer already owns

4. **Score and rank.** Apply the weighted scoring rubric. Select top 4 for Full Briefing (top 1 for Buy Channel). Designate highest-scoring as DEEP_DIVE_PEER.

5. **Build translation tables.** For each selected peer, construct the account-specific translation (peer outcome → customer equivalent) using actual customer data from the Variable Map.

Accept the highest-fidelity match per proof dimension. If no strong match exists for a dimension, use the fallback hierarchy below.

### When No Industry Peer Exists

| Fallback | When to use | How to present |
|----------|-------------|----------------|
| Cross-industry peer with same architecture | Always acceptable for "Network adoption speed" and "Pilot-to-global" dimensions | "While in a different industry, [Peer] shares the same SAP Ariba architecture and starting point" |
| Analyst benchmark (Hackett, Ardent, Deloitte CPO Survey) | Acceptable for "Category-led activation" | "Hackett research across 200+ enterprises shows 6–12% sourcing savings on first-time competitively tested categories" |
| SAP aggregate statistic | Last resort | "SAP Ariba customers who activate sourcing achieve [X] on average" — cite source precisely |

**Rule:** Never leave a proof dimension empty. If you cannot find a peer, substitute an analyst benchmark. If you cannot find a benchmark, remove the dimension from the synthesis slide and reduce to 3 peers / 3 dimensions.

---

## 7. Data Sources Required

| Source | What it provides | Required for |
|--------|-----------------|--------------|
| Buy Channel Report | Channel mix ($, %), requisition count, supplier-level spend, exceptions | Both formats |
| SAP Ariba Benchmark | Compliant spend %, exception-free %, R2O cycle time, catalog lines %, peer cohort | Both formats |
| Level 0 Dashboard | Module usage, cACV by module, entitlement vs. activation, deployment credit | Full briefing |
| 10-K / Annual Report (or alternative) | Revenue, cost structure, strategic program names, risk language, margin trend | Full briefing (2-3 quotes for Buy Channel) |
| Peer case studies (3-5 candidates) | Quantified outcomes from similar-profile companies via story-finder | Both (4 for full; 1 for Buy Channel) |

---

## 8. Variable Map

All customer-specific data lives in a single V object. The Buy Channel Analysis uses a subset (marked with *).

### Company Context

| Variable | Description | Buy Channel? |
|----------|-------------|:---:|
| COMPANY_NAME | Full legal or brand name | * |
| COMPANY_SHORT | Short name for slide labels | * |
| INDUSTRY | Industry vertical | * |
| FISCAL_YEAR | Most recent filing fiscal year | * |
| REVENUE | Total revenue | * |
| BRIEFING_DATE | Date of the briefing | * |
| STRATEGIC_PROGRAM | Named efficiency/cost program from filing | * |
| MARGIN_TREND | Recent margin direction | * |

### Spend Metrics (Buy Channel Report)

| Variable | Description | Buy Channel? |
|----------|-------------|:---:|
| INVOICE_SPEND | Total indirect invoice spend (compliance denominator) | * |
| NON_CATALOG_SPEND | Non-Catalog PO spend | * |
| NON_CATALOG_PCT | % of invoice spend in Non-Catalog | * |
| CATALOG_SPEND | Catalog PO spend | * |
| CATALOG_PCT | % in Catalog | * |
| RELEASE_CONTRACT_SPEND | Release Contract spend (often $0) | * |
| IAC_SPEND | Invoice Against Contract spend (often $0) | * |
| BPO_SPEND | BPO channel spend | * |
| SERVICE_PO_SPEND | Service PO spend | * |
| SUPPLIER_COUNT | Active suppliers on Network | * |
| AVG_SPEND_PER_SUPPLIER | Average spend per supplier | * |
| REQUISITION_COUNT | Annual Non-Catalog requisitions | * |
| EXCEPTION_COUNT | Annual exceptions | * |
| EXCEPTION_RATE | Exception rate % | * |

### Benchmark Metrics

| Variable | Description | Buy Channel? |
|----------|-------------|:---:|
| COMPLIANT_SPEND_PCT | Current compliant spend % | * |
| COMPLIANT_SPEND_TQ | Top quartile benchmark | * |
| COMPLIANT_INV_PCT | Current compliant invoices % | * |
| COMPLIANT_INV_TQ | Top quartile | * |
| COMPLIANT_PO_PCT | Current compliant POs % | * |
| COMPLIANT_PO_TQ | Top quartile | * |
| EXCEPTION_FREE_PCT | Current exception-free invoices % | * |
| EXCEPTION_FREE_AVG | Peer average benchmark | * |
| R2O_DAYS | Current R2O cycle time | * |
| R2O_PEER_AVG | Peer average | * |
| CATALOG_LINES_PCT | Current catalog PO lines % | * |
| CATALOG_LINES_AVG | Peer average | * |
| INVOICE_APPROVAL_DAYS | Current invoice approval time | |
| INVOICE_APPROVAL_PEER | Peer average approval time | |

### Platform Entitlement (Level 0)

| Variable | Description | Buy Channel? |
|----------|-------------|:---:|
| TOTAL_ACAV | Total annual contract value | * |
| SOURCING_FEE | Sourcing module annual fee | * |
| CONTRACTS_FEE | Contracts module annual fee | |
| BUYING_FEE | Buying & Invoicing annual fee | |
| SUCCESS_FEE | Success plan fee | |
| SOURCING_EVENTS | Sourcing events run (lifetime) | * |
| SOURCING_USERS | Licensed sourcing users | |
| CONTRACTS_STORED | Contracts in repository | |
| CONTRACTS_LINKED | Contracts linked to POs | |
| CONTRACTS_USERS | Licensed contracts users | |
| UTILIZATION_PCT | Overall platform utilization % | |
| UNUSED_CREDIT | Unused deployment credit ($) | * |

### 10-K / Filing Citations (verbatim quotes)

| Variable | Description | Buy Channel? |
|----------|-------------|:---:|
| CITE_COST_PROGRAM | Risk/efficiency program quote | * |
| CITE_COST_PROGRAM_REF | Citation reference (section + year) | * |
| CITE_STRATEGY | MD&A or strategy quote | * |
| CITE_STRATEGY_REF | Citation reference | * |
| CITE_INFLATION | Cost inflation / pass-through quote | * |
| CITE_INFLATION_REF | Citation reference | * |
| CITE_SOURCING | Sourcing approach quote | |
| CITE_SOURCING_REF | Citation reference | |
| CITE_TRANSFORMATION | GBS/transformation initiative quote | |
| CITE_TRANSFORMATION_REF | Citation reference | |
| CITE_MARGIN | Gross margin trend quote | |
| CITE_MARGIN_REF | Citation reference | |

### Pilot Categories (3 recommended)

| Variable | Description | Buy Channel? |
|----------|-------------|:---:|
| PILOT_N_NAME | Category name (N = 1, 2, 3) | |
| PILOT_N_PROOF | What governance dimension it proves | |
| PILOT_N_CHANNEL | Target governed channel | |
| PILOT_N_CITE | Filing quote justifying selection | |
| PILOT_N_CITE_REF | Citation reference | |

### Peer Evidence (4 peers for Full; 1 for Buy Channel)

| Variable | Description |
|----------|-------------|
| PEER_N_NAME | Peer company name (N = 1-4) |
| PEER_N_INDUSTRY | Peer industry |
| PEER_N_REVENUE | Peer revenue |
| PEER_N_DIMENSION | Which proof dimension this peer validates |
| PEER_N_METRICS | 4-7 quantified headline outcomes |
| PEER_N_TRANSLATION | Customer-equivalent statement (minimum 5 rows; 7 for deep-dive peer) |
| PEER_N_SCORE | Composite fidelity score (5-20) |
| DEEP_DIVE_PEER | Index (1-4) of the highest-scoring peer |

---

## 9. Value Quantification

### Formulas (Apply to extracted variables)

| Component | Conservative | Mid-range | Source |
|-----------|-------------|-----------|--------|
| Rate drift | 1% × NON_CATALOG_SPEND | 2% × NON_CATALOG_SPEND | Hackett Group benchmark |
| Sourcing savings | 5% × PILOT_SCOPE | 10% × PILOT_SCOPE | Industry average for first competitive event |
| Exception cost | EXCEPTION_COUNT × $15 | EXCEPTION_COUNT × $25 | APQC benchmark |
| **Total annual exposure** | Sum of above (low) | Sum of above (high) | — |

Where: `PILOT_SCOPE = ~10% of INVOICE_SPEND` (estimated pilot addressable spend)

### Derived Metrics

| Metric | Formula |
|--------|---------|
| ROI_MULTIPLE | TOTAL_EXPOSURE_LOW / TOTAL_ACAV |
| QUARTERLY_DRIFT_LOW | TOTAL_EXPOSURE_LOW / 4 |
| QUARTERLY_DRIFT_HIGH | TOTAL_EXPOSURE_HIGH / 4 |

### Scale-Adjusted Narrative Calibration

The emotional weight of each argument shifts by account size:

| Account Scale | Primary urgency lever | Secondary lever | De-emphasize |
|---------------|----------------------|-----------------|--------------|
| Enterprise (>$200M Ariba spend) | Absolute $ exposure | Peer gap (% vs. top quartile) | Platform cost (feels proportionate) |
| Mid-market ($30M–$200M) | Percentage concentration ("98% ungoverned") | ROI multiple ("5x return on platform cost") | Absolute $ (may be small) |
| Growth (<$30M) | Platform cost vs. value captured | Speed/cycle time gains | Absolute $ exposure (not boardroom-level) |

### Adjusting for Partial Activation

If COMPLIANT_SPEND_PCT > 0%, modify exposure calculation:

```
EXPOSED_SPEND = NON_CATALOG_SPEND × (1 - COMPLIANT_SPEND_PCT / 100)
RATE_DRIFT_LOW = 1% × EXPOSED_SPEND
RATE_DRIFT_HIGH = 2% × EXPOSED_SPEND
SOURCING_LOW = 5% × (EXPOSED_SPEND × 0.10)
SOURCING_HIGH = 10% × (EXPOSED_SPEND × 0.10)
```

Narrative shift: Replace "0% governed" with "X% governed — but Y% of spend ($Z) remains outside any compliance mechanism."

### Adjusting KPI Targets for Non-Zero Starting Points

Do not use fixed targets (0% → 15% → 30%). Use relative improvement:

```
6_MONTH_TARGET = CURRENT + ((TOP_QUARTILE - CURRENT) × 0.33)
12_MONTH_TARGET = CURRENT + ((TOP_QUARTILE - CURRENT) × 0.60)
```

Always round to nearest 5% for presentation clarity.

### The Directional Caveat (Mandatory)

Every value estimate in the deck MUST carry the caveat: "Validated figures require the AP category extract." Label all ranges as "directional." This is not a weakness — it IS the strategy:
- The range creates curiosity ("Is it really that much?")
- The caveat channels curiosity into the ask ("only one way to find out")
- Labeling estimates as directional makes CONFIRMED numbers (channel mix, $0 Release Contract) MORE credible by contrast

---

## 10. Design System

### Layout Constants

- Canvas: 10 × 5.625 inches (widescreen 16:9)
- Header band: full-width, 1.0" tall, fill blue11
- Content area: starts at y=1.15
- Font stack: "72 Brand Medium" (headings), "72 Brand" (body)
- Card style: roundRect with outer shadow (blur:4, offset:1, opacity:0.08)

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| blue7 | 0070F2 | Primary accent, default metric cards |
| blue10 | 002A86 | Table headers, strategic text |
| blue11 | 00144A | Header bands, title backgrounds, dark slides |
| blue2 | D1EFFF | Highlight panels |
| teal7 | 07838F | Phase 2 / secondary accent |
| green7 | 188918 | Positive outcomes, targets, governed state |
| mango6 | E76500 | Warnings, caveats |
| red7 | D20A0A | Gaps, exposure, risk, ungoverned state |
| grey4 | A9B4BE | Kicker text, citation borders |
| grey6 | 5B738B | Descriptions, secondary text |
| grey7 | 475E75 | Body text |
| grey10 | 223548 | Primary dark text |
| shell | F5F6F7 | Content slide backgrounds |
| white | FFFFFF | Header text, dark-bg text |

### Helper Functions

```javascript
hdr(slide, kicker, title, subtitle)     // Header band with kicker + title + subtitle
card(slide, x, y, w, h, accent, bg)     // Rounded card with left accent bar
metric(slide, x, y, w, h, value, label, desc, accent)  // Metric card
bul(slide, items, x, y, w, h, fontSize, color)          // Bullet list
tbl(slide, rows, x, y, w, colW, rowH)                   // Table
cite(slide, x, y, w, quote, ref)        // Citation block (grey bar + italic)
divider(title, subtitle)                // Section divider slide (dark bg)
```

### Microsite Design

The microsite uses the same narrative structure as the deck, rendered as a single-page HTML with:
- Fixed sidebar navigation (dark blue11 background)
- Hero section with customer name + 3 anchor metrics
- Collapsible appendix sections
- CSS variables matching the color palette above
- `.cite` class for 10-K quotes, `.metric` for KPI cards, `.card` for content blocks

---

## 11. Buy Channel Analysis — Detailed Slide Specification

### When to Use

- CPO meeting focuses narrowly on channel governance
- Buy Channel + Benchmark data available (Level 0 optional)
- Time-to-delivery matters (1-2 hours vs. 3-4 for full briefing)
- Goal is to secure the AP extract as an isolated decision

### How It Differs from the Full Briefing

| Dimension | Full CPO Briefing | Buy Channel Analysis |
|-----------|-------------------|---------------------|
| Scope | End-to-end sourcing activation | Channel governance only |
| Peer depth | 4 peers (synthesis) + 1 deep-dive in appendix | 1 peer (synthesis only) |
| Filing citations | 7 themes, 6+ quotes across deck | 2-3 key quotes |
| Category activation | 3 pilot cards with filing citation per card | Routing architecture only |
| Maturity model | 5-layer framework with gap annotations | Not included |
| Decision complexity | Multiple strategic decisions | Single ask only |
| Appendix | 15 slides (full methodology) | 5 slides (data backup) |

### Value Simulation Methodology

**Step 1: Identify the dominant supplier pattern from Buy Channel data.**
- Physical goods dominate Non-Catalog → Release Contract is primary governed channel
- Recurring services dominate → BPO / IAC is primary
- Variable services dominate → Service PO + SES is primary

**Step 2: Map the current flow (Before — Slide 6).**
1. Requisition created manually (no catalog/contract reference)
2. PO issued at last-known rate (ceiling check only)
3. Goods received — 2-way match (qty only; price NOT validated)
4. Invoice arrives at supplier's updated rate (drift — no flag raised)
5. Approved and paid — rate drift absorbed into cost base undetected

**Connector sentence (slide bottom):** "This is the cost base your [STRATEGIC_PROGRAM] cannot see."

**Step 3: Map the governed flow (After — Slide 7).**
1. Guided Buying tile → category pre-mapped to governed channel → auto-routes
2. PO references contract → rate locked → qty tolerance set
3. 3-way match (PO qty vs. received qty vs. contract rate) → variance = hold
4. Invoice rate checked → drift detected before approval → supplier notified
5. Clean = auto-approve; exception = audit trail → drift eliminated

**Step 4: Calculate scale impact.**
Apply value quantification formulas from Section 9.

### Executive Summary Format (Both Formats)

Mandatory 5-row table. Each row: label column (22%) + detail column (78%):

| Row | Content Rule | Tint |
|-----|-------------|------|
| SITUATION | Total indirect spend + ungoverned % + $0 governed channels + platform status | Blue |
| EXPOSURE | Rate drift range + sourcing savings range + exception costs. "Compounds quarterly." | Red |
| PLATFORM COST | Module fees (with zero-usage note) + unused credit | None |
| THE ASK | "Authorize a read-only [data type] extract. One email. [N] business days. Zero cost, zero risk." | Green |
| RISK OF INACTION | Quarterly drift range + strategic program blind spot language | None |

### 10 Critical Design Rules

1. **Executive Summary must be forwardable.** A CFO reading only slide 2 must understand the problem, the cost, the action, and why delay is expensive.
2. **Value Simulation uses a REAL supplier pattern.** Reference actual spend profile from Buy Channel data. Specificity creates credibility. Never use "Supplier A."
3. **Before/After is the emotional core.** The CPO sees their money flowing ungoverned, then sees rate validation active. This creates the decision impulse.
4. **Channel Architecture replaces configuration checklists.** Never present Guided Buying setup tasks to a CPO. Present the governance model at their level of abstraction.
5. **Supplier names belong in appendix only.** Naming specific suppliers in main flow creates defensiveness.
6. **One peer is enough for Buy Channel.** Pick highest-fidelity match. Additional peers appear in the full briefing appendix.
7. **The directional caveat is mandatory.** Every modeled value carries "Validated figures require the extract." This reinforces the ask.
8. **$0 governed channel is the most powerful data point.** Surface it on title, channel table, consequences, and closing. Repetition is intentional.
9. **Non-Catalog is ungoverned, not "bad."** The problem is concentration (spend designed for <20% of transactions carrying 90%+). The issue is structural, not the channel itself.
10. **The closing carries the filing quote.** CPO leaves hearing their own strategic language — not the vendor's. The business case is pre-built in their own vocabulary.

---

## 12. Full Briefing Appendix — Detailed Specification

### Appendix Design Principles

- Every appendix slide supports a specific main-flow slide (reference noted)
- The appendix must be defensible standalone — if printed without the main flow, it should still make logical sense
- Deep-dive peer receives 3 full slides; other peers receive 1 summary card each
- Source Index is always the final slide — confidence ratings create trust

### Slide-by-Slide Specification

**A1: Appendix Divider**
- Dark background (blue11). "Appendix" title. List of section names below.

**A2: Full Benchmark Table** (supports main Slides 4, 13)
- Every metric referenced anywhere in the deck, with: Customer value | Peer Average | Top Quartile | Gap | Position badge
- Include metrics NOT used in the main flow but available from the Benchmark report — completeness demonstrates rigor

**A3: Two-Bucket Classification** (supports main Slide 5)
- Full 5-test framework applied to THIS customer's industry
- Left column: specific items classified as direct/locked, with justification
- Right column: specific items classified as indirect/sourceable
- "Validation Required" column if any categories are uncertain
- Filing citation proving the direct-side sophistication

**A4: Anchor Metric Methodology** (supports main Slides 1-3)
- Defends the denominator choice: why Invoice Spend (not PO Spend or Total Spend) is the correct anchor
- Mandatory if any AP/invoice metrics are blank in the Benchmark
- Shows the calculation chain: Invoice Spend → Channel Mix → Compliance % → Exposure

**A5: Deep-Dive Peer — Profile** (supports main Slide 10)
- Company: name, revenue, industry, geography, employee count
- Starting state: what their procurement looked like before activation (must mirror customer's current state)
- Gap that triggered action: what business pressure forced the change
- Architecture: which SAP modules deployed, in what sequence

**A6: Deep-Dive Peer — Activation Sequence**
- 3-5 phases with: phase name, duration, key actions, metrics achieved per phase
- Timeline visualization (Foundation → Prove → Scale or equivalent)
- Call out which phase the CUSTOMER would be entering (Phase 1)

**A7: Deep-Dive Peer — Full Translation Table**
- Minimum 7 rows mapping: Peer outcome (left) → Customer-specific equivalent (right)
- Each row must cite specific customer data (from Buy Channel, Benchmark, or Level 0)
- Final row: "What this means for [COMPANY_SHORT]" — a single synthesizing sentence

**A8-A10: Peer 2/3/4 Summary Cards**
- Each on one slide. Structure per card:
  - Company name + revenue + industry (one line)
  - Dimension proved (one line, bold)
  - 3-4 headline metrics
  - 1-2 translation rows mapping to customer
  - Source citation

**A11: Engagement Sequence** (supports main Slide 15)
- 4 touches (T1-T4) with: timing, purpose, owner, gate condition, success criteria
- Anchored to a real deadline: renewal date, fiscal year start, board reporting cycle, or credit expiry
- T1 = Internal alignment; T2 = Diagnostic discovery; T3 = Proof/sprint proposal; T4 = Executive ownership

**A12: Strategic Routing Model Detail** (supports main Slides 6, 9)
- 5 governed channels with: spend pattern, governance mechanism, implementation prerequisites, typical timeline to activate
- Sequencing recommendation: which channel to activate first based on this customer's data (highest concentration channel first)

**A13: Category Activation Workstreams** (supports main Slide 9)
- 3 pilot categories, each with: category name, estimated addressable spend, target channel, filing citation, workstream owner, 90-day deliverable, success metric, dependency

**A14: KPI Tracking Framework** (supports main Slide 13)
- 6 KPIs, each with: metric name, formula, current baseline, 6-month target, 12-month target, strategic program link, data source
- Targets calculated using the relative improvement formula (Section 9)
- Directional caveat: "Targets are illustrative pending AP extract; actuals calibrated in Foundation phase"

**A15: Source Index & Confidence**
- Every data source cited in the deck:
  - Source name, date, what was extracted, confidence level (HIGH/MEDIUM/LOW)
- Confidence definitions:
  - HIGH = directly observed in customer-provided data or public filing
  - MEDIUM = derived from observed data via published methodology (cite methodology)
  - LOW = estimated based on industry benchmarks (cite benchmark source)
- Transparency statement: "All modeled figures are directional. Validation requires [the ask]."

---

## 13. Workflow

### Step 1: Triage

Apply the Decision Tree (Section 1). Determine format, filing status, scale, activation level.

### Step 2: Extract Variables

From uploaded documents, populate the full V object (Section 8). Flag any variables that cannot be populated — these determine which slides use caveats or alternative content.

### Step 3: Analyze Filing and Extract Citations

Analyze the customer's most recent public filing across the 7 Citation Themes (Section 4). The agent reads the full filing to:
- Extract 2-6 verbatim quotes with section references for use as connective tissue
- Identify the customer's specific procurement-relevant challenges (cost programs, margin pressures, supply chain risks, efficiency mandates)
- Determine the customer's strategic vocabulary (program names, priority language, risk framing)

These challenges and vocabulary feed directly into peer selection (Step 6) and pilot category justification (Step 5). If no public filing exists, apply Alternative Citation Sources (Section 1).

### Step 4: Calculate Value Quantification

Apply formulas from Section 9. Adjust for partial activation if COMPLIANT_SPEND_PCT > 0. Generate both conservative and mid-range scenarios.

### Step 5: Select Pilot Categories (Full Briefing only)

Choose 3 categories that:
- Are mentioned or implied in the filing (so you can cite it)
- Each proves a different governance dimension (price validation, supplier rationalization, channel compliance)
- Each targets a different governed channel (Release Contract, BPO, Catalog)
- Are large enough to matter but small enough to pilot without enterprise change

### Step 6: Select and Rank Peers

Using the Peer Selection Framework (Section 6):
1. Extract customer-specific challenges from the filing analysis (Step 3 output)
2. Identify candidate peers that solved similar challenges using SAP solutions within the customer's entitlement scope
3. Validate each candidate's outcomes against their own filing or published case study
4. Score using the weighted rubric (challenge alignment 30%, solution overlap 25%, industry 20%, scale 15%, outcome quality 10%)
5. Designate highest composite-score peer as DEEP_DIVE_PEER
6. For Buy Channel: use only the single highest-scoring peer

### Step 7: Generate Outputs

Produce:
- Slide deck (PPTX via pptxgenjs and the pptx skill)
- Microsite (HTML) with same narrative structure

**Output filenames:**
- `{{COMPANY_SHORT}}_CPO_Briefing_{{YYYY-MM-DD}}.pptx`
- `{{COMPANY_SHORT}}_Buy_Channel_{{YYYY-MM-DD}}.pptx`
- `{{COMPANY_SHORT}}_Microsite_{{YYYY-MM-DD}}.html`

### Step 8: QA Checklist

Before delivery, verify:
- [ ] Executive Summary is self-contained and forwardable (passes the "CFO reads only slide 2" test)
- [ ] All filing citations are verbatim with section references
- [ ] No SAP product names appear as layer labels in the Maturity Model
- [ ] Value Simulation uses a REAL supplier pattern from the data (not generic)
- [ ] All modeled values carry the directional caveat
- [ ] $0 governed channel appears on title, channel table, consequences, and closing
- [ ] Peer translation tables use customer-specific data (not generic statements)
- [ ] Deep-dive peer has minimum 7 translation rows with customer data citations
- [ ] Channel Architecture uses governance language, not configuration language
- [ ] The One Ask is a single, zero-risk, zero-cost action completable in one week
- [ ] KPI targets use relative improvement formula (not fixed targets) if starting >0%
- [ ] Source Index accurately reflects confidence levels
- [ ] No data is fabricated — every number traces to a specific source
- [ ] Industry context shapes the Two-Bucket Model (no one-size-fits-all)
- [ ] Pilot categories are sourced from filing language and customer data (not repeated from any example)

---

## 14. Important Notes

- This skill is **customer-agnostic and industry-agnostic.** Every element is parameterized via the Variable Map. No customer names, peer names, spend figures, or category selections are hardcoded.
- The three-source model (Buy Channel + Benchmark + Filing) maps to any company with an Ariba footprint regardless of industry, geography, or scale.
- Pilot categories MUST be derived from the specific customer's filing language and Buy Channel data. Never reuse categories from another engagement or example.
- Peers MUST be freshly selected via story-finder for each engagement using the Peer Selection Framework. Never default to the same set of peer companies across accounts.
- The Two-Bucket Model MUST be constructed for each customer's specific industry using the 5-test classification framework. Never copy a prior engagement's categorization.
- If fewer than the required data sources are available, proceed with what's given but label all affected slides with appropriate confidence caveats.
- This skill supersedes all prior versions (cpo-procurement-briefing v1/v2, top1pct-briefing v3.0/v4.0/v4.1).

