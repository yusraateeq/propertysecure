---
description: Run the narrowest checks that prove the current change works
---

Verify the current work.

1. Detect the stack and the available scripts (package.json, Makefile, pyproject, etc.).
2. Run the smallest useful check first: typecheck, then lint, then the relevant tests, then build.
3. Fix only failures caused by the current change.
4. Report every command run, pass or fail, and anything still unverified.
