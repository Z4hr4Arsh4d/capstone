# WORKFLOW.md — Build-It-Twice: Settings Form

**Feature:** a website settings form with validation, built twice in independent branches.
**Round 1** (`round1-vague`): one lazy sentence — "make a settings form with validation" —
output accepted blind, no plan mode. **Round 2** (`round2-precise`): a precise spec with field
rules, accessibility requirements, behavior examples, and a verification step, run in a fresh
session with plan mode on (explore → plan → code).

## Correctness
Round 1 actually came out decent — it built a Site Preferences form (display name, email, theme,
notification opt-ins) with real client-side validation via `checkValidity()`. But it **silently
dropped a field**: there is no "playlist size" number input at all, so the 5–50 range rule was
never implemented — the vague prompt let the model choose the fields, and it chose its own.
Round 2 enforced exactly the three specified fields, including the integer 5–50 field, with the
boundary handled inclusively (50 passes).

## Accessibility
Both rounds were accessible — real `<label>`s, `fieldset`/`legend`, `aria-invalid`,
`aria-describedby`, `aria-live`, and a `prefers-reduced-motion` guard. **This is the surprise
finding:** round 1's "lazy" prompt produced accessible code *because CLAUDE.md injected my
conventions*. The vague prompt wasn't really vague — my project rules did the work the prompt
didn't. So on this repo, accessibility isn't where the vague/precise gap shows up; it's already
baked into the rules file.

## Edge cases & tests
This is the real gap. Round 1 shipped **zero tests** and no explicit edge-case handling — I'd have
to verify it by hand. Round 2 split validation into its own module (`js/validation.js`) so it could
be tested, wrote tests, and ran them: **`node --test` → 25/25 passing**, covering short name, bad
email, size 4, size 51, and the size-50 boundary. It then manually drove the form in a real Chrome
tab and confirmed each error string. Round 1 verified nothing.

## The AI mistake I caught
Round 1 quietly built the wrong feature set — it substituted "theme + notifications" for the
playlist-size field and shipped no tests to reveal the omission. I caught it by diffing the two
branches: round 2 had a range-validated number field and a passing test for it, round 1 had
neither. A vague prompt doesn't just produce weaker code; it lets the model **redefine the task**,
and without tests nothing flags that it drifted.

## Review effort (the lesson)
Round 1 generated in **2m 22s** and I accepted it blind — near-zero up-front time. But to actually
ship it I'd have to add the missing field, its range validation, and a test suite: real rework.
Round 2 took **~18 minutes** including exploration, plan review, and the model writing and running
its own tests — but it came out shippable, tested, and correct, with no rework. Slower to start,
faster to *done*. That's the whole point: the vague round front-loads speed and back-loads fixing;
the precise round front-loads thinking and ships finished.
