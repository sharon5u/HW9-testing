I started from my HW7 rolling sky collision game codebase. I extracted three collision checks: road edges, obstacles, and gaps—from engine.js into collisions.js so they could be tested without playing the game. During testing setup, Node.js needed installing, and an unsaved edit initially caused the previous version of a test to run.
Break-it-on-purpose table: 
- Changing the left-edge comparison from < to > caused the left-edge test to fail with AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: false !== true.
- Changing the right-edge comparison from > to >= caused the exact-road-edge test to fail with AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: true !== false.
- Removing offset from the left boundary caused the road-offset test to fail with AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: false !== true.
- Removing + 12 from the obstacle’s horizontal collision threshold caused the obstacle-boundary test to fail with AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: false !== true.
- Changing the gap-clearance comparison from < 10 to <= 10 caused the jump-clearance test to fail with AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: true !== false.

CI Link: 
https://github.com/sharon5u/HW9-testing/actions/runs/43661128175
