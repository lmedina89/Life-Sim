# Life Sim v0.7.4.1 — Hotfix

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


## v0.7.4.1 hotfix
- Fixed AGE navigation: aging from any menu now reliably returns to the Life screen.
- Life Story still jumps to the newest entries when returning home.
- Living with Parents now uses a reduced annual contribution instead of full independent-adult living costs.
- If annual expenses exceed available cash/income, the amount converted to debt is now explicitly recorded in Life Story.
- Investment selling and all other v0.7.4 behavior remain unchanged.


## v0.7.4.2 UX hotfix
- Life Story now renders newest age first, so the current year is immediately visible at the top.
- Returning to Life positions the Life Story at the top rather than relying on browser auto-scroll.
- The Skills menu continues to show live skill progress bars and numeric values.
- Data-driven Activities now report immediate visible progression after use, such as `Technology 42 → 45 (+3)`.
- Mind & Body actions report immediate stat changes as well.
- No AP costs, balance values, investment mechanics, save key, or gameplay rules were intentionally changed.


## v0.7.4.3 final UI/finance polish
- Core Life stats stay visible above the bottom navigation on mobile while Life Story scrolls independently.
- Added persistent Dating Preference: Women, Men, or Anyone. Newly generated dates now have gender and respect the selected preference.
- Higher Education now previews annual tuition, duration, estimated total cost, scholarship impact, and whether first-year loans may be needed before enrollment.
- Debt can be repaid in $1,000, $10,000, 25%, or Pay All amounts with no AP cost.
- Debt remains player-controlled and is not automatically paid from positive cash.
- Debt interest rate and last year's interest are visible; yearly interest is also recorded in Life Story.
- Existing save key and v0.7.4.2 gameplay/balance remain compatible.


## v0.7.4.4 Career / Finance / Education polish
- Jobs now use realistic market salary ranges. Raises are smaller and capped near the role's market ceiling instead of compounding indefinitely.
- Successful applications create a job offer that can be accepted, negotiated once, or declined without leaving the current job first.
- Offers consider experience, education above minimum requirements, relevant skill, matching major, certifications, performance, preferred education, and reasonable current-salary leverage while remaining inside the role's market range.
- Current Occupation shows role starting salary and lifetime career earnings, with clearer raise feedback.
- Savings and Investments use scalable reusable transfer amounts: $1K, $10K, $100K, 25%, All, or Custom.
- Higher Education uses one Program selector, relevant School/Major fields, one cost/requirement summary, and one Enroll button.
- The persistent top cash display abbreviates large values while Assets keeps exact dollar amounts.
- Living with parents is intentionally very cheap: a $1,000 base annual personal-expense amount with no separate parent-housing charge.
- Existing save key remains unchanged and v0.7.4.3 saves are normalized forward.


## v0.7.4.5 Life Economy Polish
- Fixed family-time actions so deceased relatives remain visible in family history but cannot participate in interactions; the action disables when no living family members are available.
- Added Communication as a normal 1-AP trainable skill using the same diminishing-return progression system as the other skills.
- Completing Trade School, College, or Graduate School now queues a visible Graduation milestone event instead of relying only on Life Story.
- Housing now tracks a separate mortgage balance, mortgage rate, remaining term, purchase price, current market value, equity, property tax, maintenance, insurance, utilities, and HOA where applicable.
- New home purchases use a 10% down payment and 30-year mortgage. Players can make scalable extra mortgage payments, pay the mortgage off, and sell the home with selling costs.
- Net worth now subtracts the separate mortgage balance, so owned-home value contributes as equity rather than as free value.
- Finances now show monthly and annual Bills & Expenses with a category breakdown.
- Added selectable Frugal, Modest, Comfortable, Wealthy, and Luxurious lifestyles that affect personal expenses and small yearly happiness/stress effects.
- Vehicles add annual ownership costs, and dependent costs vary for young children, school-age children, and teens.
- Living with parents remains intentionally cheap by default (roughly $1,000 base personal spending before location/inflation/difficulty).
- Existing save key remains `lifeSimV06`; older saves normalize forward without reclassifying their existing general debt as a new mortgage.
