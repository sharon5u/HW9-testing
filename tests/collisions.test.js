const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isOutsideRoad, hitsObstacle, fallsThroughGap } = require('../collisions.js');

//Written by me
test('the ball is off the road when it crosses the left edge', () => {
  const actual = isOutsideRoad(89, 90, 510, 0);

  assert.equal(actual, true);
});
//Written by AI
test('the ball is off the road when it crosses the right edge', () => {
  assert.equal(isOutsideRoad(511, 90, 510, 0), true);
});

test('the ball exactly on either road edge is not outside', () => {
  assert.equal(isOutsideRoad(90, 90, 510, 0), false);
  assert.equal(isOutsideRoad(510, 90, 510, 0), false);
});

test('road offset shifts the boundaries used for falling', () => {
  // A shift of 40 moves the road boundaries to 130 and 550.
  assert.equal(isOutsideRoad(129, 90, 510, 40), true);
  assert.equal(isOutsideRoad(530, 90, 510, 40), false);
});

test('overlapping blocks and moving obstacles cause collisions', () => {
  assert.equal(hitsObstacle('block', 0, 0, 56, 62), true);
  assert.equal(hitsObstacle('moving', 0, 0, 56, 62), true);
});

test('obstacle collision stops at the horizontal and forward boundaries', () => {
  // Width 56 gives a horizontal threshold of 40.
  // Depth 62 gives a forward threshold of 43.
  assert.equal(hitsObstacle('block', 39, 42, 56, 62), true);
  assert.equal(hitsObstacle('block', 40, 0, 56, 62), false);
  assert.equal(hitsObstacle('block', 0, 43, 56, 62), false);
});

test('an overlapping gap causes a fall only below the clearance height', () => {
  assert.equal(fallsThroughGap('gap', 0, 0, 80, 100, 9), true);
  assert.equal(fallsThroughGap('gap', 0, 0, 80, 100, 10), false);
});

test('gap falls require being inside the gap and the correct object type', () => {
  assert.equal(fallsThroughGap('gap', 40, 0, 80, 100, 0), false);
  assert.equal(fallsThroughGap('gap', 0, 50, 80, 100, 0), false);
  assert.equal(fallsThroughGap('diamond', 0, 0, 80, 100, 0), false);
});