# Prompt log
- brianstorm what are some tests suitable for my rolling sky game
- For your Rolling Sky game, these would be useful tests. The first eight ideas extend your current collision suite.
Area	Scenario to test	Expected behavior
Road edges	Ball is in the middle of the road	No off-road detection
Road edges	Road shifts left with a negative offset	Both boundaries shift left correctly
Road edges	Ball is exactly on a shifted boundary	Ball is still considered on the road
Obstacles	Ball overlaps horizontally but is far ahead of the obstacle	No collision
Obstacles	A moving obstacle overlaps the ball	Collision detected
Obstacles	A diamond occupies the same position as the ball	It is not treated as a damaging obstacle
Gaps	Ball overlaps a gap while grounded	Fall detected
Gaps	Ball overlaps a gap while its jump height is above 10	No fall detected
Game state	Ball crosses a road edge during a jump	Player still loses by falling
Game state	Ball hits a tall obstacle while jumping	Player loses by crashing
Collectibles	Ball touches the same diamond over multiple updates	Diamond is counted only once
Scoring	Player collects one diamond without additional movement	Score increases by 100
Jumping	Player presses jump again while airborne	Current jump is not restarted
End of game	Player reaches the finish without a collision	Status becomes won
End of game	Simulation updates after the player loses	Player position and distance stop changing
Restart	Player restarts after losing	Distance, diamonds, and loss state reset
- Do I have to write the collision function my self? If so, how would it look like
- our existing collisions.js already contains this function:
function isOutsideRoad(x, left, right, offset) {
  return x < left + offset || x > right + offset;
}
It checks whether the ball is outside either road edge:
- x: the ball’s horizontal position.
- left, right: the road’s boundaries.
- offset: how far the road has shifted sideways.
- ||: means “or.”
It returns true when the ball is left of the shifted left edge or right of the shifted right edge; otherwise, it returns false.
- engine.js runs the game’s rules and keeps track of what is happening. It doesn’t draw the game on the screen.

It handles:
- Levels: their speeds, lengths, and obstacle layouts.
- Player state: position, movement, jump time, distance, and collected diamonds.
- Movement: advances the ball and updates steering.
- Collisions: calls the functions in collisions.js, then applies consequences such as losing.
- Scoring and winning: calculates points and checks whether you reached the finish.
- Special challenges: calculates darkness and sideways road movement.
The files work together like this:

collisions.js decides whether a collision occurs → engine.js updates the game state → game.js displays the result.

For example, if isOutsideRoad(...) returns true, engine.js marks the player as lost with a fall, and game.js shows the falling effect.
Yes. engine.js connects to several files:
File	Connection to engine.js
collisions.js	Supplies the three collision functions that the engine calls.
game.js	Calls the engine to create a game, update movement, jump, and calculate scores. It then draws the results.
index.html	Loads collisions.js, then engine.js, then game.js in that order.
test-engine.js	Loads the engine and checks gameplay behavior.
test-effects.js	Uses the engine while checking animation and restart behavior.


Your new tests/collisions.test.js tests collisions.js directly, so it doesn’t need to load engine.js.

Changes to the engine can affect gameplay and the existing tests, which is why you should run those tests after modifying it.

- Thanks, explain the workflow files to me and how they initiate the tests.
- Your workflow file is .github/workflows/tests.yml. It tells GitHub Actions when to run tests, what computer to use, and which commands to execute.

Here’s what each part of your file does:
name: Collision tests
on: [push, pull_request]
The workflow appears as Collision tests in GitHub’s Actions tab. It starts automatically when you push commits or when a pull request is opened or updated.
jobs:
  test:
    runs-on: ubuntu-latest
This defines a job called test. GitHub provides a temporary Ubuntu Linux computer to run it.
steps:
  - uses: actions/checkout@v4
Downloads your repository’s code onto that computer.
  - uses: actions/setup-node@v4
    with:
      node-version: '22'
Sets up Node.js version 22 so the computer can run your JavaScript.
  - name: Run HW9 collision tests
    run: node --test tests/*.test.js
Starts Node’s test runner. It loads files matching tests/*.test.js, including collisions.test.js. That file loads your collision functions and executes each test(...), checking its assertions.
  - name: Run existing gameplay regression checks
    run: node test-engine.js
  - name: Run existing animation checks
    run: node test-effects.js
Runs your two older check scripts in sequence. If a test command fails, the job normally stops running subsequent test steps and receives a red X. If all steps succeed, it receives a green check.

The sequence is:

Save locally → commit → push to GitHub → GitHub starts the workflow → tests run → result appears in Actions.
- which files are neccasary for the testing
- For your eight collision tests, only these two files are needed:
File	Purpose
collisions.js	Contains the collision functions being tested.
tests/collisions.test.js	Calls those functions and checks their results.


Run them with Node.js:
node --test tests/collisions.test.js
For your full GitHub Actions workflow, you also need:
- .github/workflows/tests.yml — starts the automated checks.
- test-engine.js and engine.js — gameplay checks and game logic.
- test-effects.js and game.js — animation checks and display logic.
index.html and style.css are needed to play the game, but not for these automated checks. TESTING.md, prompt_log.md, and evidence files document your work; they don’t execute tests.
