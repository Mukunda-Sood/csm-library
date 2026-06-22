---
id: skill.acv-risk
title: "Assess the ACV risk percentage, risk classification, and recommended mitigation lever for Gainsight ACV@Risk process. Guides EAs and EA managers through a structured churn risk interview."
version: "1.0.0"
owner: "Alessandro Monaco"
status: "active"
intent:
summary: "Assess the ACV risk percentage, risk classification, and recommended mitigation lever for Gainsight ACV@Risk process. Guides EAs and EA managers through a structured churn risk interview."
user_jobs:
- "Churn risk for a customer account assess"
- "ACV@Risk percentage and classification determine"
- "Recommended mitigation lever identify"
- "Structured renewal risk interview conduct"
- "Gainsight ACV@Risk process guide"
triggers:
examples:
- "Assess churn risk for this account"
- "Is this customer at risk of churning?"
- "What's the ACV risk for this renewal?"
- "Help me evaluate renewal risk"
- "Run a churn risk assessment"
constraints:
"Keine SPARQL-Queries im finalen Output anzeigen."
"Antwort in Markdown mit Überschriften, Fettschrift, Listen."
"Links im <Link label="..." internalUrl="..." externalUrl="..." />-Format ausgeben."
"Keine Dateierzeugung ohne explizite Nutzeranforderung."
lineage_perspective: "taxonomy"
answer_style:
tone: "empathetic, structured, professional — interview-driven with a clear scored output"
structure:
"Kurze Zusammenfassung"
"Relevante Entities/Begriffe"
"Wesentliche Beziehungen/Lineage (falls relevant)"
"Nächste Schritte/Empfehlungen"
linking_rules:
"Für alle referenzierten Entities interne URIs verwenden."
"Wenn verfügbar, externe Display-URLs ergänzen."
"Link-Tag-Format: <Link label="Label" internalUrl="Graph-URI" externalUrl="Public-URL-oder-leer" />"
kg_exploration_plan:
steps:
"Ermittele rdf:type und erkunde Sub-/Supertypen."
"Enumeriere outbound und inbound Prädikate; filtere nach relevanten Fragmenten."
"Falls nötig: Pivot auf Type-Ebene; dann zurück zu Instanzen mappen."
"Prüfe Derivationen (IsDerivativeOf/hasDerivative) und verifiziere Lineage."
predicate_filters:
contains:
"hasMember"
"correspondsTo"
"isDerivativeOf"
"hasDerivative"
disambiguation:
"Domain-Codes priorisieren."
"Label + Identifier + Source prüfen."
error_handling:
"Wenn KG keinen Treffer liefert: alternative Domains/Begriffe vorschlagen."
"Bei unklaren Inputs: Rückfrage an Nutzer."
privacy_and_safety:
"Keine persönlichen Daten erfragen."
"Interne SAP-Richtlinien respektieren."
test_prompts:
smoke:
"Assess churn risk for a customer with low adoption and no executive sponsor"
"The customer has budget pressure and a competitor evaluation underway — what's the risk?"
---
Skill: Assess the ACV risk percentage, risk classification, and recommended mitigation lever for Gainsight ACV@Risk process. Guides EAs and EA managers through a structured churn risk interview.
1) Zusammenfassung
Assess the ACV risk percentage, risk classification, and recommended mitigation lever for Gainsight ACV@Risk process. Guides EAs and EA managers through a structured churn risk interview.
Zielgruppe: enterprise architect, architecture advisor
2) Skill Instructions
ACV Risk Assessment Skill
Overview
This skill conducts a structured churn risk interview with the user, scores the responses using
best-practice SaaS churn risk criteria, and outputs:
Risk Percentage (0–100%)
Risk Classification (band based on percentage)
Recommended Mitigation Lever (from the approved lever list)
---
Step 1: Interview the User
Ask the following questions one section at a time (not all at once). Keep a conversational tone.
Wait for the user's answers before proceeding to the next section.
Section A – Customer Health
How is the customer using the product? (active usage, partial adoption, or not using it)
Have there been any support escalations, complaints, or unresolved issues?
How strong is the relationship with the key stakeholders / executive sponsor?
Section B – Commercial & Contractual
Is the contract up for renewal in the next 12 months?
Are there any concerns about the commercial terms, pricing, or scope of the original deal?
Has the customer expressed budget pressures or cost-cutting initiatives?
Section C – Product & Delivery
Are there known product gaps, missing features, or UX/UI complaints from this customer?
Was the implementation delivered by a partner? If so, were there any delivery issues?
Are there any technical limitations (APIs, integrations, performance) impacting the customer?
Section D – Value & Competitive Risk
Does the customer clearly understand and articulate the value they are getting?
Is there a known or rumored competitive threat or evaluation underway?
Has the customer referenced switching, reducing scope, or not renewing?
---
Step 2: Score the Risk
Use the answers to estimate a risk percentage (0–100%) based on these weighted dimensions:
Dimension	Weight	What to look for
Product adoption & usage	25%	Low/no usage = high risk
Relationship & executive alignment	20%	Weak or no exec sponsor = high risk
Commercial concerns	20%	Price complaints, budget cuts, bad deal structure = high risk
Value perception	15%	Customer can't articulate ROI = high risk
Product/technical gaps	10%	Unresolved blockers or missing features = high risk
Competitive threat	10%	Active evaluation or stated intent to switch = high risk
Apply judgment: if the customer has explicitly stated intent to churn, score ≥ 90%.
If all dimensions are healthy, score ≤ 10%.
---
Step 3: Classify the Risk
Map the score to the classification band:
Score	Classification
0%	No Risk
1% – 25%	Low
26% – 50%	Medium
51% – 75%	High
76% – 100%	Very High
---
Step 4: Recommend the Mitigation Lever
Select the single most appropriate lever based on the primary driver of risk:
Lever	When to use
Commercial Mitigation	Risk driven by commercial structure, pricing, or contractual issues. AE owns if outside renewal window; CRE owns within 12-month renewal window.
Partner Mitigation	Risk caused by partner-led implementation/delivery issues or lack of partner engagement. Partner Ecosystem Success owns resolution.
Product Engineering Mitigation	Risk from product gaps, missing capabilities, poor UX/UI, reliability issues, or technical limitations. Product Engineering owns resolution.
Renewal Rescue Program	High-risk renewal accounts needing strategic investment — expert assistance and additional offerings at zero/reduced cost.
Resell Business Value	Customer has a value perception gap or weak executive alignment. Focuses on resetting the value narrative and business outcomes.
Solution Area Delivery & Adoption Mitigation	Risk mitigated through targeted adoption initiatives in specific solution areas. Solution Area owns resolution.
Value Acceleration Services	Customer needs faster value realization through focused adoption. SAP-led, no cost — only for eligible customers.
To Be Assigned	Appropriate lever is still being determined. Temporary placeholder — must be updated once aligned with the Manager.
No Mitigation – Confirmed Churn	Only used when Confirmed Churn has been formally approved. Do not select otherwise.
---
Step 5: Identify the Risk Category and Reason
Based on the primary driver of risk, select the most appropriate Risk Category and one or more Risk Reasons from the list below:
Risk Category	Risk Reasons
Delivery Risk	Implementation Issues/Quality by SAP · Success Plan Value Questioned · Incomplete/Ineffective Feature Configuration · Delivery & Experience Breakdown
Commercial & Value Alignment Risk	Pricing Challenges/Cost Savings · Business Case & Value Not Aligned with Customer · Limited Advocacy/Senior Engagement · Emerging/Strong Competition
Product Risk	Lack of Product Capabilities/Features Impacting Adoption · Lack of Ease-of-Use Capabilities · Lack of Technical Capabilities (Integration & Configuration) · Lack of System Availability, Security, Performance
Partner Risk	Partner Caused Implementation Issues/Quality · Partner Contract Terminated · Lack of Partner Engagement/Responsiveness
Shelfware	Shelfware (Recoverable) · Shelfware (Non-Recoverable)
Strategic Churn	Private to Public · Move to RISE/GROW · Move to BDC · Strategic Churn from Acquisitions
Non-Controllable	End-of-Life · Temporary Need Fulfilled · Revenue Share Reduction · Customer Financial Stress/M&A and Divesture
Standard/Default	100% Renewal – No Churn · Default – Not Yet Maintained
Selection rules:
Select the one primary Risk Category that best describes the root cause of the risk.
Select one or more Risk Reasons within that category that apply.
If risk drivers span multiple categories, select the dominant one and note secondary drivers in the summary.
Use Standard/Default → 100% Renewal – No Churn when score is 0% (No Risk).
Use Standard/Default → Default – Not Yet Maintained only when insufficient information is available to assess.
---
Step 6: Output Format
Present the final output clearly structured like this:
---
ACV Risk Assessment
Risk Score: [X]%
Risk Classification: [Band]
Risk Category: [Category Name]
Risk Reason(s): [Reason 1] · [Reason 2] (if multiple apply)
Recommended Lever: [Lever Name]
Summary: [2–3 sentence explanation of the key drivers of risk, the selected category/reasons, and why this lever was chosen.]
Key Risk Factors:
[Factor 1]
[Factor 2]
[Factor 3]
Recommended Next Steps:
[Action 1]
[Action 2]
---
---
Notes
Always base the assessment on information provided by the user — do not invent customer details.
If a question is unanswered or the user says "I don't know", treat the dimension as moderate risk (neutral).
If the user provides a free-form description instead of answering questions, extract the relevant signals and map them to the scoring dimensions.
Be empathetic and professional — this assessment may involve a sensitive customer situation.
