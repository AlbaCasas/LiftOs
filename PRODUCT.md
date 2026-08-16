# LiftOS

LiftOS is a coaching app for powerlifting. It helps coaches write programs for their athletes, keep those programs easy to change, and see the numbers that matter while they do it.

The coach is the only user for now. Athletes do not log in. The job is to plan training well, not to be a social app, a marketplace, or a consumer fitness tracker.

## Who it is for

Strength coaches who run a small or mid-size roster and already think in programs, blocks, sessions, volume, and PRs.

They need to:

- see the whole roster in one list, not hunt athlete by athlete
- write a program once and reuse or adapt it
- change a week or a session without fighting the tool
- know how much volume an athlete is actually doing
- see PRs and whether someone is progressing or stalling
- plan a taper into a meet
- keep their own exercise library, including variations

They do not want a complicated system. They want something they can open mid-week, change a session, and trust.

## What success looks like

A coach can open the app, scan every athlete in one table, then drop into a program and change it as the block unfolds. They should answer these without a spreadsheet:

- Who is on my roster, and who needs a look today?
- What is this athlete doing this week?
- How much volume are they doing on squat, bench, and deadlift?
- What are their current PRs?
- Are we accumulating, intensifying, or tapering?
- What did I prescribe for Thursday?

If those answers are faster and clearer here than in Google Sheets, the product is working.

## Core objects

Keep the model small. Everything a coach touches should map to one of these.

| Object | Meaning |
| --- | --- |
| **Athlete** | A lifter on the coach's roster. Name, weight class, status, current PRs (SQ / BP / DL / total), last active, trend, notes, current program. |
| **Exercise** | A movement in the coach's library. Squat, bench, deadlift, and everything else they use. |
| **Variation** | A named version of an exercise. Pause squat, close-grip bench, deficit deadlift. Variations belong to a parent exercise so volume and PRs can still roll up. |
| **Program** | A plan that can be assigned to one or more athletes. Made of blocks. |
| **Block** | A stretch of training with a purpose: accumulation, intensification, peak, deload, taper. Made of weeks and sessions. |
| **Session** | One training day. A list of exercises with sets, reps, load, and notes. |
| **Set** | The smallest unit: exercise (or variation), sets × reps, load, RPE or % if the coach uses them, optional note. |

Do not invent extra layers until a coach actually needs them.

## What the coach can do

### Roster

The coach sees **all athletes in one list**. This is the home screen, not a buried page. It should feel like a working table: scan, sort, open someone, get back.

Reference: the Athletes table — sidebar of names on the left, full roster table in the main pane, **Add athlete** as the primary action.

The table shows, at a glance:

| Column | Why it is there |
| --- | --- |
| **Name** | Who they are. Click through to that athlete. |
| **Class** | Weight class (e.g. 57kg, 83kg, 105kg). |
| **Status** | Who needs attention. Start simple: On Track, Flagged. Color is signal, not decoration. |
| **SQ / BP / DL / Total** | Current PRs on the main lifts, plus total. The numbers a powerlifting coach looks for first. |
| **Last active** | How recently there was work (session logged or program touched). Stale athletes stand out. |
| **Trend** | Up, down, or flat — a quick read on whether they are moving, not a chart. |

Around the table:

- Search / filter the list by name
- Filter by status and class
- Sort any column (name, class, lifts, last active)
- Optional grouping later; default is a flat list, name A–Z
- Add athlete without leaving the list
- Sidebar lists the same athletes for quick jump, plus Blocks

The list answers “who do I coach and who needs me?” It does not try to be the program editor.

### Programs

- Create a program from scratch
- Edit a program after it is assigned (change a week, swap an exercise, add a session)
- Duplicate a program or a block to reuse it with another athlete
- See the program as weeks and days, not as a wall of text

### Blocks and sessions

- Group weeks into blocks with a purpose (including taper)
- Author a session as a simple list of work: exercise, sets, reps, load
- Add coach notes on a session or a lift
- Move or copy a session to another day

### Volume

- Show weekly and block volume per athlete
- Break volume down by main lift (squat / bench / deadlift) and by variation when useful
- Make overload or a sudden drop obvious, so the coach does not have to add it up by hand

Volume is a tool for writing better programs. It is not a dashboard for its own sake.

### PRs

- Store current PRs per athlete, at least on the main lifts
- Update a PR when the coach records one
- Use PRs as the reference for percentages when a program is written that way

### Taper

- Mark a block as a taper
- Drop volume in a way the coach can see and control
- Keep intensity and meet-week sessions easy to read

Taper is a kind of block, not a separate product.

### Exercise library

- Coach creates their own exercises
- Coach creates variations under a parent exercise
- Choosing an exercise in a session is fast: search, pick, done
- Volume and PRs can follow the parent (pause squat still counts as squat volume) while still showing the variation when the coach wants that detail

## Product principles

1. **Simple first.** If a coach needs a manual to write a session, the design failed. Prefer fewer screens and obvious actions.
2. **Roster first, programs next.** Open the app and see everyone. Click an athlete when you need to write or change their program. The list is for scanning; the editor is for working.
3. **Easy to change.** Training changes every week. Editing a session should feel as light as editing a cell, not like submitting a form.
4. **Useful numbers, not charts for decoration.** Volume, PRs, and taper only appear when they help a decision.
5. **The coach is the expert.** Do not teach powerlifting. Do not gamify. Do not hide the data behind friendly cards.
6. **Opinionated default, not a locked method.** Start with a clear powerlifting workflow (blocks → weeks → sessions, main lifts + variations). Do not hard-code one coach's entire method as the only way to train.

## What we will not build yet

These are easy to want and expensive to do well. Leave them out until the program workflow is excellent.

- Athlete login or athlete-facing logging
- Chat, video, or comments threads
- Billing, packages, or payments
- Wearables, bodyweight graphs, sleep, or wellness scores
- Social feed, leaderboards, or badges
- A marketplace of public programs
- Automatic program generation that replaces the coach

## Design direction

We do not invent a new look. The app is a quiet instrument panel: tinted near-white chrome, ink-dark text, dense tables, color only for status and trend. Not a fitness app, not a SaaS dashboard.

A coach should learn it in one sitting because it matches how they already think: athlete → program → block → session.

### App shell [decided]

Two columns. Left is navigation. Right is the work.

**Sidebar (keep it short)**
- **Athletes** is the home tab
- **Blocks** is the only other tab for now
- Search jumps to an athlete or a block
- Do not put the full roster in the sidebar. 10–30 names there becomes a second, worse table
- Click **Athletes** to see everyone. Click a row in the table to open one person

**Main pane**
- `/` is the Athletes table (name, class, status, SQ, BP, DL, total, last active, trend)
- `/athletes/[id]` is that athlete
- `/blocks` is program blocks, later

If jumping by name is missed, add a short recent list later. Do not start there.

Surfaces, in build order:

1. **Roster (Athletes table)** — home screen
2. **Athlete** — current program, recent sessions, PRs, volume
3. **Program / block editor** — the main writing surface
4. **Exercise library** — exercises and variations
5. **Volume** — weekly / block totals, by lift

## Open questions

These are not decided. Do not build a clever answer until the simple path is in use.

- How should a session be written? Shorthand (`squat 5x3 @8`) vs a structured grid vs both?
- Do percentages live off competition PRs, training maxes, or whatever the coach types?
- Is volume sets × reps × load, hard sets only, or something the coach can choose?
- Can one program be shared across athletes with small edits, or is every assignment a copy?
- Do we need RPE, percentages, and absolute load in v1, or start with one and add later?
- How much of meet-day / taper is a dedicated flow vs just another block?
- What should **Flagged** mean in v1 (missed session, falling PRs, coach-set, or all of those)?
- Is **Last active** last prescribed session, last completed session, or last edit?
- Is **Trend** based on total, on a chosen lift, or on recent e1RM / volume?

## Source of truth

This file is the product brief for this repo. If a feature does not help a coach write, edit, or understand a program, it does not belong yet.
