# DEVELOPMENT.md

## Platform

- Programming language: Typescript
- Shell: Windows 11 Powershell
- Type checking command: `deno check`
- Test command: `deno test`
- Lint command: `deno lint`

## Code standards

- SOLID principles
- Design patterns

## Testing requirements

- Test driven development (TDD): Write the test before implementation of
  features or fixing bugs.
- Workflow for each new feature or bug fix
  1. Create a failing test in `src/<folder>/<module>.test.ts` describing the
     desired behavior.
  2. Execute `deno test src/<folder>/<module>.test.ts` and verify the test
     fails.
  3. Implement the feature in `src/<folder>/<module>.ts` until the test passes.
  4. Run `deno test` to ensure the entire test suite passes and no regressions
     appear.
- Test files are placed side‑by‑side with their implementation files, e.g.
  `src/train/train.ts` and `src/train/train.test.ts`.
- Use "@std/assert" for assert functions. Avoid to use the generic `assert()`
  and use instead more specific ones such as `assertEquals()`,
  `assertInstanceOf()` etc.

## Import modules

Feature may have to import other modules. Use one of these three patterns:

- External modules:
  `import { <symbol>, type <symbol> } from "jsr:@<org>/<module>;"`
- Project feature:
  `import { <symbol>, type <symbol> } from "../<feature>/mod.ts;"`
- Location symbols: `import { <symbol>, type <symbol> } from "./<file>.ts;`

Do not import directly from other folder feature implementation file. Bad
example:

```
import { <symbol>, type <symbol> } from "../<feature>/<file>.ts;
```

Importing files from same folder should never use `mod.ts`. Its use is only for
other features.

When importing multiple symbols from other folder, keep all symbols on same
import line.
