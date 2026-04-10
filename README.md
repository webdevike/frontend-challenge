# Frontend Take-Home Challenge

This take-home has two parts. Budget around 90 minutes total, but spend more if you want to. We care more about how you think than about completeness.

## Setup

```bash
npm install
npm run dev
```

This also works in [StackBlitz](https://stackblitz.com) — just import the repo.

## Part 1 — Feature Addition (~30–45 min)

Open `src/challenge-1/UserSearchList.tsx`.

This component renders a search input and a list of users. Right now it fires a request on every keystroke and has some rough edges. Your job:

1. Add debouncing so we're not making a request on every keystroke.
2. Add a loading indicator while results are being fetched.
3. Add basic error handling (the mock API doesn't error today, but it should be handled gracefully).
4. Make sure that if results come back out of order, the UI always shows results for the most recent query — not a stale one.

You can add files, extract hooks, restructure however you see fit. There's no single "right" approach — just make it solid.

## Part 2 — Refactor (~45–60 min)

Open `src/challenge-2/OrderDashboard.tsx`.

This component works — filters filter, sorts sort, pagination paginates. But it's grown organically and could use some cleanup. Refactor it however you think is best.

Two constraints:
1. **Preserve behavior.** Everything that works today should still work after your refactor.
2. **Be prepared to explain your choices.** We'll discuss your approach in the follow-up.

Please add a short `REFACTOR_NOTES.md` in the project root explaining what you changed and why.

## Submission

Push to a GitHub repo and share the link, or zip and email it.

## What We're Looking For

Judgment, not line count. Clean diffs. Reasoning over cleverness.
