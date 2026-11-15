/* Collision decisions extracted unchanged from engine.js for HW9. */
(function (root) {
  'use strict';

  // x and road boundaries are world coordinates; offset moves both edges.
  function isOutsideRoad(x, left, right, offset) {
    return x < left + offset || x > right + offset;
  }

  // dx and dy are absolute distances between player and obstacle centers.
  // Jump height intentionally does not affect collisions with tall obstacles.
  function hitsObstacle(type, dx, dy, width, depth) {
    return (type === 'block' || type === 'moving') &&
      dx < width / 2 + 12 && dy < depth / 2 + 12;
  }

  // A jump height of exactly 10 clears a gap under the existing game rules.
  function fallsThroughGap(type, dx, dy, width, depth, jumpHeight) {
    return type === 'gap' && dx < width / 2 &&
      dy < depth / 2 && jumpHeight <= 10;
  }

  const api = { isOutsideRoad, hitsObstacle, fallsThroughGap };
  if (typeof module !== 'undefined') module.exports = api;
  root.SkyCollisions = api;
})(typeof window !== 'undefined' ? window : globalThis);
