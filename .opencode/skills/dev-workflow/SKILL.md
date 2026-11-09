---
name: Dev Workflow
description: Take a task from request to verified change in this project — understand, explore, plan, implement, verify, report. Use for any multi-step coding task.
---

# Dev Workflow

Use this skill for any task that touches more than one file or is not fully specified.

## 1. Understand

- Restate the goal in one or two sentences.
- List what is unknown and what you will check in the code instead of asking.
- Ask the user only when the answer changes the approach, scope, or data model.

## 2. Explore

- Search before assuming: locate the files, symbols, and existing patterns that already solve something similar.
- Read the actual code you will change, plus its callers.
- Note existing conventions: naming, error handling, tests, folder layout.
- Findings are inputs, not edits. Do not change files in this phase.

## 3. Plan

For anything beyond a small single-file edit, write a short plan:

1. Goal and non-goals.
2. Files to add or modify, with one line each.
3. Ordered steps.
4. Risks and rollback.
5. Verification commands.

Use `/plan <task>` to run this in the plan agent.

## 4. Implement

- Smallest change that fully solves the problem.
- One concern per change. No unrelated refactors.
- Follow the surrounding code style even if you would write it differently.
- Update tests and docs in the same change when behavior changes.
- If you discover the plan was wrong, stop and revise the plan before continuing.

## 5. Verify

Run the narrowest check that actually proves the change:

1. Typecheck.
2. Lint.
3. Relevant unit/integration tests.
4. Build.
5. Manual or targeted run for behavior that tests do not cover.

Use `/verify`. A failing check means the task is not done. Never report success for something you did not run.

## 6. Report

Include:

- What changed and why.
- What you verified, with the exact commands.
- What you did not verify and why.
- Follow-ups the user should know about.

## Escalate to the user when

- A change requires deleting or rewriting unfamiliar work.
- A new dependency or infrastructure change is needed.
- Requirements conflict and the tie-break changes behavior.
- Verification cannot be run in this environment.
