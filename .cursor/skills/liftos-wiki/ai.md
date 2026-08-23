# AI (usage, later)

Do not implement until [ACZ-22](https://linear.app/acz-dev/issue/ACZ-22). This file is the contract so we do not invent billing later.

## Product: early Cursor, not “unlimited Pro”

The coach gets a **free monthly grant** of tokens. After that they **pay for more usage** (packs or metered Stripe), not a flat fee that makes the model free forever.

| State | Chat | Grid |
|---|---|---|
| Inside grant | Works. Chip: tokens left. | Usable. |
| Grant empty, no credit | Refuses. CTA: buy usage. | **Still usable.** |
| Has paid credit | Works. Chip: remaining paid tokens. | Usable. |

The athlete app never calls the model. Only the coach editor does.

## API (when we build it)

One server entry, same Next + Vercel host, same Neon.

- `POST /api/ai/block-chat` (name can change). Body: block id + message. Auth: **coach** session.
- Server uses [Vercel AI SDK](https://sdk.vercel.ai) + one provider key (`OPENAI_API_KEY` or Anthropic). Key never goes to the browser or the RN app.
- After the provider responds: write a **usage event** (coach id, model, tokens in/out, block id) then stream/return the proposal.
- Apply-to-grid is a **separate** action. The model output is a proposal, not a write.

No public “AI REST” for the athlete. No second AI microservice.

## Data (Neon)

When ACZ-23 ships, persist at least:

- `usage_events`: who, when, model, tokens in, tokens out, block id.
- `usage_grants` or a running balance: free monthly remaining + paid remaining.

Sum events to show the chip. Do not trust the client’s token count.

## Billing (ACZ-24)

Stripe after events exist. Prefer **usage**: checkout buys a token pack, or Stripe metered. Avoid “20 € / month unlimited” as the first product — that is not early Cursor and it loses money if one coach pastes huge blocks.

## Out until the editor exists

Provider accounts, prompt tuning, streaming polish, model picker, BYOK. ACZ-12 and blocks first.
