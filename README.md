# CSMS Skills Library

A GitHub-hosted AI skills marketplace for the CSMS team. Browse, search, filter, rate, and download skill files for EKX, SAP Joule, and other AI tools.

---

## Live Site

```
https://<your-github-org>.github.io/<repository-name>/
```

---

## Features

- **Skills marketplace** — card-based browsing with full-text search
- **Filters** — Tool, Customer Group (CSM/CRE), Task, and Tag dropdowns
- **Modal view** — full skill description, file preview, and download
- **Star ratings** — rate any skill (stored locally in your browser)
- **Submit a Skill** — users submit via GitHub Issues; moderators approve via labels
- **Automated publishing** — approval triggers a workflow that creates a PR; merging publishes the skill live
- **Responsive** — works on desktop, tablet, and mobile

---

## Hosting on GitHub Pages

### First-Time Setup

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CSMS Skills Library"
   git remote add origin https://github.com/<your-org>/<your-repo>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository → **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save

3. **Enable workflow permissions** *(required for the approval automation)*:
   - Go to **Settings** → **Actions** → **General**
   - Under **Workflow permissions**, select **Read and write permissions**
   - Check **Allow GitHub Actions to create and approve pull requests**
   - Save

4. **Update your repo URL** in `data/config.json`:
   ```json
   {
     "repoUrl": "https://github.com/your-org/your-repo",
     ...
   }
   ```
   This powers the "Submit a Skill" button on the site.

5. **Wait for deployment** — go to the **Actions** tab to watch the workflow. Once complete, the site is live.

### Subsequent Updates

Every push to `main` automatically redeploys via `.github/workflows/pages.yml`. No manual steps needed.

---

## Administration

### Roles

| Role | GitHub access | Can do |
|------|--------------|--------|
| **Owner** | Repository admin | Everything |
| **Moderator** | Collaborator with Write access | Label issues, merge PRs, edit/remove skills |
| **User** | None required | Submit via Issues, rate via browser |

### Adding moderators

Go to **Settings** → **Collaborators and teams** → **Add people** → set role to **Write**.

### Submission pipeline

```
User submits Issue (filled form)
    → Issue auto-labelled: skill-submission, pending-review
        → Moderator reviews and adds label: skill-approved
            → GitHub Actions workflow fires:
                - Parses issue body
                - Creates branch skill/<id>
                - Adds skill to skills.json + creates .md file
                - Opens a PR with review checklist
                - Comments on issue with PR link
                    → Moderator reviews and merges PR
                        → Site redeploys automatically (~60s)
```

### Rejecting a submission

Close the issue with a comment explaining why. No label needed.

### Editing or removing a published skill

See [CONTRIBUTING.md](CONTRIBUTING.md) for full instructions. Short version:
- **Edit**: update `data/skills.json` or `skill-files/<filename>.md` directly on GitHub, commit to `main`
- **Remove**: set `"status": "removed"` in the skill's JSON entry (or delete the entry entirely)

### Managing dropdown options

Edit `data/config.json` to add/remove Customer Groups or Tasks. Tools are data-driven — new tool names appear automatically when used in a skill entry.

---

## Project Structure

```
csms-library/
├── index.html                    # Single-page application
├── styles.css                    # All visual styles (SAP branded)
├── app.js                        # Application logic
│
├── data/
│   ├── skills.json               # Skills database
│   └── config.json               # Dropdown options + repo URL
│
├── skill-files/                  # Downloadable skill .md files
│   └── ekx-sparql-query-builder.md
│
├── assets/
│   └── sap-logo.svg
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── skill-submission.yml  # Structured submission form
│   └── workflows/
│       ├── pages.yml             # GitHub Pages auto-deploy
│       └── approve-skill.yml     # Skill approval automation
│
├── CONTRIBUTING.md               # Full workflow guide
└── README.md                     # This file
```

---

## Technology

Static site — no server, no database, no build step.

- Pure HTML, CSS, and vanilla JavaScript
- Data loaded from JSON files via the Fetch API
- Ratings stored in `localStorage` (per browser, not shared)
- GitHub Issues + GitHub Actions for content submission and moderation
- Deployed via GitHub Pages

---

## Rating System

User star ratings are stored in each visitor's browser `localStorage` — they are not shared between users. The `communityRating` and `ratingCount` fields in `skills.json` are set manually by moderators when publishing or updating a skill.

---

## License

Internal use only. Not for external distribution. All content is the property of the CSMS team and SAP SE.
