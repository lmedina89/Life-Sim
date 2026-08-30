# Life Sim v0.7.7 — Life Variety & Replayability

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
- Investment gains/losses are shown in Assets and retained in Banking & Transactions instead of cluttering Life Story.
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


## v0.7.5 — Content & Life Depth

This is the final major content/depth pass planned for the 0.7 foundation before v0.8 People & Relationships.

### Data Core IV / content architecture
- Content definitions remain concentrated in `gameData.js`; reusable state transitions, rendering, requirements, history, aging, and generic effects remain in `game.js`.
- 86 occupations are organized into 21 career fields with level-based ladders and data-defined requirements.
- Job requirements now support certifications, alternate certifications, majors, graduate paths, professional reputation, fitness, and clean-record checks.
- Related experience, education, skills, certifications, performance, reputation, and current-market leverage influence job offers through reusable calculations.
- Career-specific event eligibility uses data-defined `careerTracks` tags rather than hard-coded job-name checks.

### Career depth
- Expanded IT, Software, Automation, Industrial, Operations, Service, Trades, Healthcare, Science, Education, Finance, Business, Sales, Creative, Government, Law, Military, Transportation, Construction, Technology, and Executive paths.
- Added professional reputation, persistent career history, starting/final salary records, promotion records, bounded exceptional salary ceilings, and retirement.
- Retirement unlocks from data-defined age/experience requirements and provides a simple annual retirement income.

### Education and credentials
- 12 college majors.
- 5 named trade programs.
- 8 graduate paths including MBA, technical master's paths, MEd, MPA, PhD, MD, and JD.
- 15 categorized certifications.
- Completed education and certifications are stored as structured permanent records with age/school/field information.

### Events, hobbies, and milestones
- 42 events across Childhood, School, Education, Career, Financial, Housing, Health, Family, Relationship, Social, Crime, Business, Hobby, Random Life, and Later Life pools.
- Career-track-specific events for technology, industrial/trades, healthcare, law/government, business/sales/finance, and creative work.
- 12 data-defined hobbies with proficiency tracking.
- Major milestones include first career, first home, marriage, parenthood, entrepreneurship, millionaire/$10M net worth, executive career, and retirement.

### Life Record, family, and later life
- New Life Record & Legacy view for education, certifications, career history, accomplishments, and milestones.
- New Family Tree view keeps living and deceased relatives, ex-partners, children, grandchildren, and ancestors.
- NPC death now records age at death and structured family history.
- Adult children receive an independence marker; a lightweight grandchild hook gives later lives more continuity before the full v0.8 NPC simulation.
- Existing generation continuation now carries basic ancestry/sibling lineage forward.

### Annual recap and assets
- Last Year Recap summarizes gross career/retirement income, expenses, investment change, net-worth movement, and major structured events.
- Housing choices expanded to 11 tiers/options and vehicle choices to 8.
- v0.7.4.5 mortgage, home equity, bills, lifestyle, vehicle costs, dependent costs, savings, investments, debt, and mobile navigation are preserved.


## v0.7.5.1 — Save & Persistence Polish

This is a narrow persistence patch on top of the tested v0.7.5 Content & Life Depth build. Gameplay, balance, careers, events, assets, AP, and economy behavior are intentionally unchanged.

- Current saves, autosaves, slots, copy/paste exports, and downloaded backups now write the current game version.
- Added `saveSchemaVersion` separately from the visible game version so future save-format migrations can be handled explicitly.
- Added `savedAt` timestamps and user-visible save times.
- Save slots now show character/age/generation/career/cash metadata and last-saved time before loading.
- Slot loads require confirmation and create an automatic recovery backup of the current life first.
- Download Backup creates a portable JSON file named like `LifeSim-Luis-Age60-v0.7.5.1.json`.
- Choose Backup supports JSON file import and previews/validates the selected save before replacing the current life.
- Pasted raw JSON remains available under Advanced / Copy-Paste Save Data.
- Imported legacy saves are normalized to the current game version/schema and report the migration.
- Malformed saves and saves from a newer unsupported schema are rejected rather than partially loading.
- Reset and Start Another Life also preserve the prior state as a recovery backup.
- Recovery Backup is exposed in the UI so the player can preview and restore the automatically preserved life.


## v0.7.6 — Life Variety & Activities

- Expanded the state-aware event library to well over 125 total life events spanning childhood, school, education, careers, money, housing, health, family, relationships, social life and later life.
- Added richer event decisions with costs, delayed consequences, relationship effects, AP choices and state-aware requirements.
- Added hobby progression tiers: Beginner, Hobbyist, Skilled, Advanced and Master.
- Added 48 hobby opportunities across all 12 hobbies, including contests, gigs, commissions, tournaments and mastery-level opportunities.
- Added entertainment, fitness, travel, personal development and philanthropy activities.
- Added lifetime travel, philanthropy and hobby-income tracking.
- Expanded vehicles and possessions with motorcycles, boats, luxury vehicles, collectibles, professional gear and ultra-luxury purchases.
- Added more partner, friend and child interactions without replacing the existing relationship architecture.
- Expanded achievements and milestone presentation for hobbies, careers, travel, wealth, family, philanthropy and major purchases.
- Preserves the v0.7.5.1 save schema and existing `lifeSimV06` save key for backward compatibility.

## v0.7.6.1 — Career & Experience Polish
- Audits every job so its declared minimum age is actually enforced; closes the teenage Construction Foreman exploit and similar gaps.
- Adds related-career experience requirements to senior/leadership roles so high-level jobs cannot be farmed simply by having high stats.
- Expands the job catalog from 86 to 103 roles with more intermediate, senior, lead, manager, director and executive steps in IT, automation, science, construction, software, finance and healthcare.
- Adds true same-company promotion offers with Accept / Negotiate / Decline instead of instantly replacing every promotion with a raise.
- Adds promotion tenure expectations based on role level while preserving cross-career changes through education and certifications.
- Education and certifications now surface when they open new career paths.
- Vacations now choose named destinations, show a full experience card and create permanent Life Record entries.
- Hobby opportunities now show venue/context, success/failure details, earnings and proficiency-influenced outcomes; mastering a hobby gets a named milestone.
- Significant purchases get stronger feedback, including first-vehicle and major-purchase experience cards.
- Adds Assets → Banking & Transactions with persistent, categorized transaction history for income, bills, transfers, investments, housing, purchases, travel, education, business, family, donations and debt.
- Routine transfers, investment returns and debt-interest bookkeeping no longer clutter Life Story; meaningful financial milestones remain there.
- Adds event repeat controls with cooldowns and occurrence limits so the expanded event library feels less repetitive across a life.
- Career history is grouped by employer so internal promotion paths read more like a résumé.
- Annual recap now emphasizes year highlights alongside income, expenses, investment change and net-worth movement.
- Preserves save schema 1, the `lifeSimV06` save key and backward migration from older v0.7 saves.


## v0.7.7 — Life Variety & Replayability
AB phase adds core mobile polish, scroll-stable repeated business actions, expanded everyday activities, richer travel destinations, solo/partner/family travel costs, travel journal entries, travel memories, and occasional travel incidents.

CD phase expands all 12 hobby paths with 24 additional progression opportunities, adds 18 possessions/vehicles and possession-unlocked activities, adds more career ladder roles and alternative career branches, and expands workplace events.

EF phase deepens businesses with annual revenue/payroll/profit and growth stages, adds home improvements and homeowner events, adds more than 60 replayability events, and expands achievements, milestones, and memory capture.
