# Frontend Coding Interview

This session has two parts. Your interviewer will walk you through each one.

## Setup

```bash
npm install
npm run dev
```

This also works in [StackBlitz](https://stackblitz.com) — just import the repo.

## Part 1 — Feature Addition

Open `src/challenge-1/UserSearchList.tsx`.

This component renders a search input and a list of users. Right now it fires a request on every keystroke and has some rough edges. Your job:

1. Add debouncing so we're not making a request on every keystroke.
2. Add a loading indicator while results are being fetched.
3. Add basic error handling (the mock API doesn't error today, but it should be handled gracefully).
4. Make sure that if results come back out of order, the UI always shows results for the most recent query — not a stale one.

You can add files, extract hooks, restructure however you see fit.

## Part 2 — Refactor

Open `src/challenge-2/OrderDashboard.tsx`.

This component works — filters filter, sorts sort, pagination paginates. But it's grown organically and could use some cleanup. Refactor it however you think is best.

One constraint: **preserve behavior.** Everything that works today should still work after your refactor.

Think out loud — we're interested in how you prioritize and what you notice.
