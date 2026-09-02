# Roadmap

Work **in order**. A later milestone stays Backlog until the previous one can ship something a coach can touch.

## Done

- Foundations (stack, pnpm, shadcn, folders).
- Athletes list + detail, feature layers, Neon/Drizzle persist.
- [ACZ-9](https://linear.app/acz-dev/issue/ACZ-9) sidebar shell (merged).
- [ACZ-12](https://linear.app/acz-dev/issue/ACZ-12) add athlete + persist (merged).
- [ACZ-10](https://linear.app/acz-dev/issue/ACZ-10) restyle roster table (merged).

## Now — Coach accounts

| ID | Title | Do next? |
|---|---|---|
| [ACZ-16](https://linear.app/acz-dev/issue/ACZ-16) | Coach sign-in | **This branch.** Auth.js + `coach_id` on athletes. |
| [ACZ-14](https://linear.app/acz-dev/issue/ACZ-14) | Nested names in sidebar | Skip as a full list — does not scale. |
| [ACZ-15](https://linear.app/acz-dev/issue/ACZ-15) | Filter / sort / search | After a few real athletes exist. |
| [ACZ-13](https://linear.app/acz-dev/issue/ACZ-13) | Status, last active, trend | Needs sessions logged. **Defer.** |

## Next (production path)

1. **Exercise library** — [ACZ-17](https://linear.app/acz-dev/issue/ACZ-17) seed, [ACZ-19](https://linear.app/acz-dev/issue/ACZ-19) create. Barbell only. After auth.
2. **Blocks** — [ACZ-18](https://linear.app/acz-dev/issue/ACZ-18) domain, [ACZ-20](https://linear.app/acz-dev/issue/ACZ-20) editor, [ACZ-21](https://linear.app/acz-dev/issue/ACZ-21) assign.
3. **AI chat** — [ACZ-22](https://linear.app/acz-dev/issue/ACZ-22) docked on the editor; coach accepts/edits.
4. **Usage + Stripe** — [ACZ-23](https://linear.app/acz-dev/issue/ACZ-23) meter, [ACZ-24](https://linear.app/acz-dev/issue/ACZ-24) pay. Do not build Stripe before a metered AI call exists.

## Later

- Athlete React Native app (different repo or app).
- Formula primitives and custom formulas (v2).
- Assign block to athlete + adherence (needs athlete logging).

## What not to start this month

AI without a block editor (nowhere to apply the suggestion). Stripe without token events. RN athlete app before a coach can create a block.
