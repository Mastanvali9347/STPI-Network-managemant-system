import { useMemo } from 'react';

/** Floating particles + grid glow for NOC-style dashboard backdrop. */
export const CyberBackground = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 7) % 100}%`,
        top: `${(i * 23 + 11) % 100}%`,
        delay: `${(i % 8) * 0.4}s`,
        size: 2 + (i % 3),
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-slate-950/40" />
      {particles.map((p) => (
        <span
          key={p.id}
          className="topology-particle absolute rounded-full bg-cyan-400/40"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};
