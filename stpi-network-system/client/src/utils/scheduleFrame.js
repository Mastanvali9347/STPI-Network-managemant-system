/**
 * Coalesce rapid callbacks into one requestAnimationFrame tick.
 * Reduces main-thread work from burst Socket.IO events.
 */
export const scheduleFrame = (() => {
  let frameId = null;
  const queue = new Set();

  const flush = () => {
    frameId = null;
    const fns = [...queue];
    queue.clear();
    fns.forEach((fn) => fn());
  };

  return (fn) => {
    queue.add(fn);
    if (frameId == null) {
      frameId = requestAnimationFrame(flush);
    }
  };
})();
