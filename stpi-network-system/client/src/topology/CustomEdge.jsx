import { memo } from 'react';
import { BaseEdge, getSmoothStepPath } from '@xyflow/react';

const STROKE = {
  online: '#34d399',
  warning: '#fbbf24',
  offline: '#f43f5e',
};

const GLOW = {
  online: 'drop-shadow(0 0 6px rgba(52,211,153,0.8))',
  warning: 'drop-shadow(0 0 6px rgba(251,191,36,0.8))',
  offline: 'drop-shadow(0 0 4px rgba(244,63,94,0.5))',
};

/**
 * Animated link — color reflects path health (green / yellow / red).
 */
export const CustomEdge = memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    animated,
  }) => {
    const health = data?.health || 'online';
    const [edgePath] = getSmoothStepPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
      borderRadius: 12,
    });

    const stroke = STROKE[health] || STROKE.online;
    const glow = GLOW[health] || GLOW.online;
    const strokeWidth = health === 'offline' ? 1.5 : 2.5;

    return (
      <>
        <BaseEdge
          id={id}
          path={edgePath}
          style={{
            stroke,
            strokeWidth,
            filter: glow,
            opacity: health === 'offline' ? 0.5 : 1,
          }}
          className={animated ? 'topology-edge-pulse' : ''}
        />
      </>
    );
  }
);

CustomEdge.displayName = 'CustomEdge';
