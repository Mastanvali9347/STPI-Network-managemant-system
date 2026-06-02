import { useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NetworkNode } from './NetworkNode';

const nodeTypes = { network: NetworkNode };

const layoutPositions = {
  internet: { x: 250, y: 0 },
  'fw-01': { x: 250, y: 100 },
  'router-wan': { x: 250, y: 200 },
  'core-sw': { x: 250, y: 300 },
  'sw-floor2': { x: 80, y: 420 },
  'sw-floor3': { x: 420, y: 420 },
  'ap-lobby': { x: 20, y: 540 },
  'ap-conf': { x: 140, y: 540 },
};

export const TopologyCanvas = ({ topology }) => {
  const initialNodes = useMemo(
    () =>
      (topology?.nodes || []).map((node) => ({
        id: node.id,
        type: 'network',
        position: layoutPositions[node.id] || { x: 0, y: 0 },
        data: { label: node.label, type: node.type, status: node.status },
      })),
    [topology]
  );

  const initialEdges = useMemo(
    () =>
      (topology?.edges || []).map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: true,
        style: { stroke: '#22d3ee', strokeWidth: 2 },
      })),
    [topology]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  return (
    <div className="h-[min(70vh,600px)] w-full rounded-xl border border-slate-700/60 bg-surface-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#334155" gap={20} />
        <Controls className="!bg-surface-800 !border-slate-600" />
        <MiniMap
          className="!bg-surface-800 !border-slate-600"
          nodeColor={() => '#22d3ee'}
        />
      </ReactFlow>
    </div>
  );
};
