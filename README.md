# Life Sim v0.7.4 — Data Core III

A browser-based life simulation built with plain HTML, CSS and vanilla JavaScript.

## v0.7 highlights
- Rebuilt the mobile interface around a compact, one-screen Life view.
- Life Story is now the main focus directly under the character header.
- Fixed five-button bottom navigation: Occupation, Assets, Age, Relationships and Activities.
- Large center Age button remains available from every main gameplay menu.
- Existing controls are organized into collapsible category menus instead of one long page.
- Occupation now groups school, higher education, certifications, current career and the job market.
- Assets now groups finances, investments, housing, belongings/vehicles and businesses.
- Relationships now uses clearer Family, Children, Friends and Partner sections.
- Activities now groups Mind & Body, Skills, Crime and Moving.
- Action Point costs are visible directly on actions and unavailable actions disable when AP is exhausted.
- Locked jobs retain the 🔒 indicator and show missing requirements.
- Investment gains/losses are reported in the Life Story and shown in the Assets menu.
- Detailed stats, achievements, save slots, import/export and character creation moved into Profile & Settings.
- Existing v0.6 save key and save migration behavior are preserved.

## Files
Keep all five files together in the repository root:
- `index.html`
- `styles.css`
- `gameData.js`
- `game.js`
- `README.md`

GitHub Pages can publish directly from the `main` branch and repository root.


## v0.7.1 Data Core
- Began the data-driven architecture migration without changing save keys or core simulation behavior.
- AP maximum, diminishing returns, life stages, education ranks, legal-defense tiers, repeatable activities and school clubs now come from `gameData.js`.
- AP is persistent in the top character header beside name and cash so it remains visible across menus.
- Existing v0.6/v0.7 saves remain compatible.


## v0.7.2 Data Core II
- Added a reusable requirements/conditions engine used by job locks, education programs, certifications, relationship gates, and achievements.
- Jobs now carry declarative requirement definitions while retaining legacy fields for compatibility.
- Achievements now unlock from data-defined requirements instead of a hard-coded switch statement.
- Education and certification eligibility/boosts are data-driven.
- Core finance action amounts and relationship tuning values were moved into `gameData.js`.
- Preserves the `lifeSimV06` save key and v0.7.1 UI/gameplay behavior.
- No new gameplay systems were added in this architectural pass.


## v0.7.4 Data Core III
- Added a generic data-defined action/effect runner used by repeatable Activities and career effort actions.
- Career application, work, networking, promotion and raise tuning now live in `gameData.js` instead of being embedded as magic numbers in handlers.
- Yearly school, economy, career, finance and relationship tuning values moved into structured balance data.
- Existing yearly mechanics and probability ranges were intentionally preserved while moving their configuration out of `game.js`.
- Extended the shared effect engine so data can modify ordinary stats plus salary percentages, business cash/reputation, boss quality and partner quality.
- Preserves the `lifeSimV06` save key, current UI, persistent AP/name/cash header and v0.7.2 save compatibility.
- No new gameplay systems were added in this architectural pass.


## v0.7.4 final pre-v0.8 polish
- Investments can now be sold back to cash: $1,000, 25%, or all.
- Selling investments costs no Action Points and is recorded in Life Story.
- Aging from any menu returns to the Life screen and positions Life Story at the newest entries.
- Closing a menu also returns to Life Story at the newest entries.
- Investment and child-support actions show clearer locked-state explanations.
- NPC rows omit the temporary "No trait" label when no trait is present.
- Existing balance, investment-return mechanics, AP rules, and save key remain unchanged.
