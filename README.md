# Life Sim v0.6.2 — Living World

A browser-based life simulation built with plain HTML, CSS and vanilla JavaScript.

## v0.6.1 highlights
- Persistent NPCs with traits, careers, relationships and aging.
- Dynamic, state-aware events plus delayed consequences.
- Timeline/lifetime statistics and legacy generation continuation.
- Expanded careers, companies, boss relationships, certifications and layoffs.
- Economy cycles, inflation, city costs/wages, housing and moving.
- Health conditions and medical costs.
- Education majors, scholarships and student debt.
- Expanded crime, fines and jail.
- Business industries, employees, reputation, valuation and sale.
- Named partners, dates, gifts, arguments, marriage/divorce and children.
- Inventory/vehicles with condition and value.
- Difficulty settings, save slots, import/export and achievements.
- Mobile-first bottom navigation and clearer progress feedback.

## Files
Keep all five files together in the repository root:
- `index.html`
- `styles.css`
- `gameData.js`
- `game.js`
- `README.md`

GitHub Pages can publish directly from the `main` branch and repository root.


## v0.6.1
- Reworked Life Story log into chronological age sections.
- Records ordinary player actions as narrative entries.
- Adds contextual ambient life entries when aging.
- Keeps older v0.6 saves compatible.

## v0.6.2 polish & balance
- Restored 🔒 indicators for jobs you do not qualify for, with live missing-requirement details.
- Added 10 Action Points per year; common repeatable improvement actions consume AP and refresh when aging.
- Repeating the same improvement action in one year has diminishing returns.
- Added light neglect consequences for school, relationships, family, fitness and work.
- Added clearer Action Point and job-qualification feedback while preserving v0.6 saves.
