---
name: ai-adoption-pptx
description: Creates "AI Adoption Potential" PPTX slides mapping SAP AI features to a customer's solution capability usage. Produces a pixel-accurate replica of the SAP AI Adoption Potential slide (colored dots for active/inactive capabilities, Base/Premium/Beta/Joule badges, 4-column process-area layout, footer KPIs). Requires the user to upload their Solution Capability Usage Table.xlsx. Trigger when the user mentions AI adoption, AI adoption potential, mapping AI features to customers, or generating an AI adoption slide.
---

# AI Adoption Potential PPTX Skill

Generates the **"AI Adoption Potential"** slide deck: SAP AI features mapped to a customer's
active/inactive solution capabilities, matching the reference design exactly.

## Quick Reference

| Asset | Path |
|-------|------|
| AI Features data (bundled) | `data/AI Features Data.csv` |
| Blank Excel template | `assets/Solution_Capability_Usage_Template.xlsx` |
| Data processing script | `scripts/process_data.py` |
| Slide generation script | `scripts/create_slide.py` |
| Template generator | `scripts/create_template.py` |
| xlsx format docs | `references/xlsx_format.md` |

---

## HARD GATE — Do Not Proceed Without User's xlsx

**STOP HERE if the user has not uploaded a `Solution Capability Usage Table.xlsx`.**

- Do NOT proceed to Step 3 or Step 4.
- Do NOT simulate, invent, assume, or generate any capability data.
- Do NOT use the bundled template as if it were the customer's data.
- Do NOT create a sample slide or demo slide.
- Do NOT use placeholder rows, synthetic rows, or "example" data.

The only exception is Step 2 (providing the blank template to the user). All slide
generation steps require the actual customer xlsx to be uploaded first.

**If the file has not been uploaded, display this message and wait:**

> "To generate your AI Adoption Potential slide, please upload your
> **Solution Capability Usage Table.xlsx** file.
>
> This file must contain your customer's solution capabilities with Active/Inactive
> status mapped to SAP AI Feature IDs. Columns required:
> **Group, Group Title, KPI, Feature ID, Solution Capability, Status**
> (optional: Feature Name for display overrides).
>
> If you don't have this file ready, I can provide a blank template for you to fill in.
> Just let me know."

Do not take any further action until the user either uploads the xlsx or explicitly
asks for the blank template.

---

## Step 1 — Receive Inputs

Once the user uploads their `Solution Capability Usage Table.xlsx`:

1. Save the uploaded file to a working path (e.g. `/tmp/sandbox/work/customer_usage.xlsx`).
2. Ask for (or confirm) two details if not already provided:
   - **Customer/account name** — shown in the slide subtitle (e.g. "PPGF", "Acme Corp").
     If not provided, derive it from the xlsx filename.
   - **Scope label** — shown in the slide title (default: `"Cloud ERP"`).

Do not proceed to Step 3 until the xlsx file is in hand.

---

## Step 2 — Provide Blank Template (only if user requests one)

If the user explicitly asks for a blank template to fill in:

```bash
cd /tmp/sandbox/ai-adoption-pptx
python scripts/create_template.py
# → assets/Solution_Capability_Usage_Template.xlsx
```

Provide the generated file to the user with instructions to:
- Fill in their capabilities (one row per feature).
- Set Status to `Active` or `Inactive` for each row.
- Use Feature IDs from `data/AI Features Data.csv`.
- Return the completed file when ready.

**After providing the template, wait for the user to upload their completed file.**
Do NOT proceed to Step 3 using the blank template itself.

---

## Step 3 — Process Data

With the uploaded xlsx confirmed on disk, run:

```bash
python /tmp/sandbox/ai-adoption-pptx/scripts/process_data.py \
  --csv  "/tmp/sandbox/ai-adoption-pptx/data/AI Features Data.csv" \
  --xlsx "<path-to-uploaded-xlsx>" \
  --customer "<Customer Name>" \
  --scope "<Scope Label>" \
  --output "/tmp/sandbox/work/slide_data.json"
```

Expected output:
```
Loading AI features from: ...
  → 402 features loaded
Loading capability usage from: ...
  → NN rows loaded
  → NN features across N groups
Slide data written to: /tmp/sandbox/work/slide_data.json
```

If there are column detection errors, check `references/xlsx_format.md` and ensure the xlsx
has the required columns (Group, Feature ID, Solution Capability, Status).

---

## Step 4 — Generate PPTX

```bash
python /tmp/sandbox/ai-adoption-pptx/scripts/create_slide.py \
  "/tmp/sandbox/work/slide_data.json" \
  "/tmp/sandbox/AI_Adoption_Potential_<Customer>.pptx"
```

---

## Step 5 — QA

Convert to PDF and visually inspect:
```bash
python /tmp/sandbox/skills/pptx/scripts/office/soffice.py --headless --convert-to pdf \
  "/tmp/sandbox/AI_Adoption_Potential_<Customer>.pptx"

pdftoppm -jpeg -r 150 "/tmp/sandbox/AI_Adoption_Potential_<Customer>.pdf" \
  /tmp/sandbox/work/slides/slide
```

Check:
- [ ] Title shows correct customer name and scope
- [ ] Feature count badge matches total rows in xlsx
- [ ] Green dots = Active, Blue dots = Inactive
- [ ] Base (blue), Premium (gold), Beta (gray), Joule (purple) badges correct
- [ ] Feature names match the xlsx (shortened names if `Feature Name` column provided)
- [ ] Footer stats match: total / active / inactive / base / premium / joule counts
- [ ] No text overflow in feature rows (long names wrap gracefully)

---

## Design Reference

| Element | Color |
|---------|-------|
| Header background | `#00144A` (SAP Navy) |
| Feature count badge | `#1B90FF` (SAP Blue) |
| Active dot | `#107E3E` (Green) |
| Inactive dot | `#0070F2` (Blue) |
| Base badge | `#0070F2` bg / white text |
| Premium badge | `#E6A800` bg / white text |
| Beta badge | `#999999` bg / white text |
| Joule badge | `#5D36FF` bg / white text |
| Column header | `#00144A` bg, `#89D1FF` group label, `#FFFFFF` title |
| Footer background | `#EAECEE` |

Font: **72 Brand** (falls back to Calibri if not installed on end-user machine)
Slide size: **13.33" × 7.5"** (widescreen 16:9)

---

## Notes for Customization

- **Scope beyond Cloud ERP**: Change `--scope` to e.g. `"HCM"` and populate the xlsx
  with SuccessFactors AI feature IDs (J1–J999 range from the CSV).
- **More than 4 groups**: The script renders only the first 4 groups (G1–G4). Split into
  multiple slides if needed.
- **More than 9 features per column**: Features beyond row 9 will overflow below the footer.
  Limit each group to ≤9 features for best results.
- **AI Features Data.csv updates**: Replace `data/AI Features Data.csv` with a newer export
  from the SAP Discovery Center AI feature catalog.

