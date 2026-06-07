import { useEffect, useState } from 'react';

/** Smooth numeric transition for KPI cards */
export const useAnimatedCounter = (target = 0, duration = 600) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const end = Number(target) || 0;
    const start = value;
    const startTime = performance.now();

    let frameId;
    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(start + (end - start) * eased));
      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return value;
};
