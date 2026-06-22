# Contributing to CSMS Skills Library

This document explains how the submission, review, and management process works for everyone involved.

---

## For Regular Users — Submitting a Skill

1. **Click "Submit a Skill"** on the CSMS Skills Library site. This opens a GitHub Issue form.
2. **Fill in all required fields:**
   - Title, Description, Tool, Tags, Author, Version (required)
   - Customer Group, Task, Author Role (optional but recommended)
   - Skill File Content — paste your raw markdown skill file directly (no code fences)
3. **Complete the checklist** confirming you've tested the skill and it contains no confidential data.
4. **Submit the issue.** It will be automatically labelled `skill-submission` and `pending-review`.
5. **Wait for moderator review.** A moderator will either approve or reject your submission. You'll be notified via GitHub notifications on your issue.

### What happens after submission

| Outcome | What happens |
|---------|-------------|
| **Approved** | A moderator adds `skill-approved` → automation creates a PR → moderator reviews PR → on merge, your skill appears live |
| **Rejected** | Moderator closes the issue with a comment explaining why |

You do not need any special GitHub access to submit — just open a GitHub Issue.

---

## For Moderators — Reviewing Submissions

Moderators are GitHub collaborators with **Write access** to this repository. Contact the repository owner to be added.

### Approving a submission

1. Open the Issue labelled `skill-submission` / `pending-review`.
2. Read through the submitted content carefully.
3. If it looks good: **add the label `skill-approved`** to the issue.
4. The automation workflow will:
   - Parse the issue body
   - Create a new branch `skill/<id>`
   - Add the skill to `data/skills.json` and create the `.md` file in `skill-files/`
   - Open a Pull Request with a review checklist
   - Comment on the issue with the PR link
5. **Review the PR** — check the JSON entry is correct and the skill file content looks right.
6. **Merge the PR** to publish. GitHub Pages redeploys automatically within ~60 seconds.

### Rejecting a submission

1. Add a comment to the issue explaining what needs to change (or why it's not suitable).
2. Close the issue. If the submitter corrects their submission, they can open a new one.

### Editing a published skill

Edit files directly on `main` via GitHub's web editor (or open a PR from a branch):

- **To edit skill metadata** (title, tags, description, etc.): edit `data/skills.json`, find the entry by `id`, and update the fields.
- **To edit the skill file content**: edit `skill-files/<filename>.md` directly.
- Push to `main` (or merge your PR) — the site redeploys automatically.

### Removing a skill

Open `data/skills.json`, find the skill entry, and either:
- **Set `"status": "removed"`** — skill disappears from the site but the entry is kept for records
- **Delete the entry entirely** — cleaner, but permanent

Commit directly to `main` or via a PR.

### Adding dropdown options (Customer Groups, Tasks)

Edit `data/config.json`:

```json
{
  "repoUrl": "https://github.com/your-org/your-repo",
  "customerGroups": ["CSM", "CRE"],
  "tasks": ["QBR Generation", "New Task Here"]
}
```

The **Tool** dropdown is data-driven — it builds itself from whatever `tool` values appear in `skills.json`. No config change needed; just use a new tool name in a skill entry.

---

## Skill File Format

Skill files are `.md` files stored in `skill-files/`. They should follow this structure:

```markdown
---
name: your-skill-name
description: "One sentence describing the skill."
version: 1.0.0
author: Your Name
tool: ToolName
tags:
  - tag1
  - tag2
---

# Skill Title

## When to Use This Skill

[Required — describe the scenarios where this skill helps]

## Core Principles

[Main guidance, rules, or best practices]

## Examples

[Optional — concrete examples or query templates]
```

---

## Ratings

- **Community ratings** (`communityRating`, `ratingCount` in `skills.json`) are set manually by moderators when publishing or updating a skill.
- **User ratings** are stored in each visitor's browser localStorage only — not shared between users, not sent anywhere.
- There is no ratings backend.

---

## Local Development

To preview the site locally you need a simple HTTP server (browsers block `fetch()` on `file://` URLs):

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .

# VS Code: install "Live Server" extension and click "Go Live"
```

Then open `http://localhost:8080`.
