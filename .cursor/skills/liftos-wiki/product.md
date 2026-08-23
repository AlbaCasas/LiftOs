# Product

**LiftOS** is the Cursor of powerlifting programming. Coaches today live in Excel; LiftOS is the AI-native editor that replaces that sheet.

Analogy (Alba): VS Code → Cursor, Excel → LiftOS.

## Who pays

The **coach**. They create programs, manage athletes, and talk to an AI while editing.

Billing is **usage**, like early Cursor: a **free monthly token grant**, then they **buy more tokens**. Not a flat “Pro = unlimited”. Details: [ai.md](ai.md).

The athlete app (React Native, later) is a viewer/logger. Not the buyer of the MVP.

## Job to be done

Write a training block for an athlete in minutes, with the model proposing sets while the coach stays in control — like Cursor suggesting code the user accepts or edits.

## MVP surfaces

| Surface | Role |
|---|---|
| Athletes | Roster + detail (exists: list, detail, Postgres). |
| Exercise library | Default barbell lifts + coach-created. Barbell only. |
| Blocks | Weeks → days → exercises. Primitives: weight, RPE, %, reps. |
| AI chat | Docked next to the block editor (Cursor layout). |
| Usage | Free limit; paywall when tokens run out. |

Formulas (intensity, volume, stress index) and custom formulas are **v2**.

## Out of scope until the coach loop sells

- Athlete-facing React Native app.
- Nutrition, wearables, community, video courses.
- Multi-coach orgs, white-label.
- Non-barbell exercise catalog.

## Constraints

- This repo is the **coach web app** (Next.js). No React Native components here.
- Default locale `es`. Copy and Linear can be English if that is the current repo habit; UI strings go through next-intl.
