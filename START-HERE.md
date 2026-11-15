# Rolling Sky HW9 workspace

This is an unfinished assignment workspace, not a completed submission.
The original project folder is unchanged.

## Start in VS Code

Open this folder using File > Open Folder. Install Node 22 or newer if `node --version` fails.
The game retains its existing CommonJS/browser wrapper format; do not add `"type": "module"` to package.json, because the existing checks use require().

Three collision decisions have been moved from engine.js into collisions.js:
- isOutsideRoad: checks both road edges, including crosswind offset.
- hitsObstacle: checks block and moving-obstacle overlap.
- fallsThroughGap: checks gap overlap and jump clearance.

The comparisons and thresholds were preserved. evidence/engine-before-refactor.txt records the original engine for comparison. No existing bugs were intentionally fixed.

## Work order

1. Run `node test-engine.js` and `node test-effects.js`. These are pre-existing checks, not eight newly written HW9 tests. The setup environment had no Node installed, so these have NOT been run here.
2. Open index.html in a browser and verify steering, jumping, obstacles, gaps, diamonds, pause, restart, and both routes. Browser behavior has NOT been verified for this copy.
3. Initialize Git here (`git init`), then commit the setup before writing new tests. Connect it to a repository for this game, not your unrelated HW8 skill repository.
4. Write your first test yourself in tests/collisions.test.js. The file contains imports only. Run `node --test tests/*.test.js`, confirm a named test actually runs, and make it fail intentionally before trusting it. Zero tests is NOT a completed passing suite.
5. After the handwritten test, expand to at least eight named tests across all three collision functions, including boundaries and non-collisions. Read and understand every assertion. Commit the tests alone; keep source changes in separate commits.
6. Make five separate one-line changes to collision source, one at a time. Run tests, save each failure, and undo the change before the next. Record any mutation that escapes detection and improve or remove the ineffective test honestly.
7. Push to GitHub. Under Actions, save the URL of a passing run. Deliberately push a bug, save the failing run URL, restore the code, and push again. The provided workflow runs the HW9 suite plus the old checks; a green workflow alone does not prove eight HW9 tests exist.
8. For the verifier experiment, push a real source bug caught by a test. Start a fresh agent chat and ask it to make the tests pass without revealing the bug. Save the exact prompt, transcript, and diff; compare test files against the tests-only commit. Record what actually happened.
9. Write TESTING.md yourself. It is intentionally empty. Include: starting project on line one; extraction decisions; test scope and exclusions; five-row mutation table with failure messages; ineffective tests and resolutions; passing/failing CI links; experiment transcript/diff and interpretation; AI-use note with citations.
10. Update prompt_log.md with exact prompts, model names, and tools. Push the final working version and submit the repository URL through the HW9 form.

## Evidence

Store actual terminal output, experiment transcript, and diffs in evidence/ as you work. None has been fabricated or pre-filled.

Assignment: https://www.cs.cmu.edu/~113/hw9.html
