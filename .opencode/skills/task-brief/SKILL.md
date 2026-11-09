---
name: Task Brief
description: Before starting any delegated task, write a task-specific skill for that exact task (objective, inputs, steps, deliverables, acceptance checks), follow it, and report its path.
---

# Task Brief Protocol

Every agent writes its own task-specific skill before doing the work. The brief is the contract for the task and replaces generic assumptions.

## Location

```text
.opencode/work/<task-slug>/<role-slug>.md
```

Use one short kebab-case `task-slug` for the whole team and the agent role for `role-slug`.

## Required format

```md
---
name: <Role> — <Task>
description: <one line: what this brief accomplishes>
---

# Objective
<one or two sentences>

# Inputs
- Task text from the head or orchestrator
- Repo files read, with paths
- Deliverables from earlier phases, with paths

# Constraints
- ...

# Steps
1. ...

# Deliverables
- <file path(s) or artifact>

# Acceptance checks
- [ ] ...

# Out of scope
- ...
```

## Rules

- Ground it in the real task and real files. No generic filler.
- Keep it under roughly 60 lines.
- Update the brief before changing scope.
- Re-read it at the end and tick every acceptance check.
- Report the brief path in your final message.
- Promote a brief to `.opencode/skills/<id>/SKILL.md` only when the user asks, or the procedure will clearly be reused.
