import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { topologySignature } from '../utils/topologyCompare';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { nodeTypes } from './nodeTypes';
import { edgeTypes } from './edgeTypes';
import { toFlowNodes, toFlowEdges } from './topologyData';
import { CyberBackground } from './CyberBackground';
import { DeviceInfoPanel } from './DeviceInfoPanel';
import { TopologyMetricsPanel } from './TopologyMetricsPanel';
import { ConnectionStatus } from '../components/monitoring/ConnectionStatus';
import { useRealtime } from '../hooks/useRealtime';

const FlowToolbar = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  return (
    <Panel position="top-right" className="flex gap-1 m-2">
      {[
        { fn: () => zoomIn(), icon: ZoomIn, label: 'Zoom in' },
        { fn: () => zoomOut(), icon: ZoomOut, label: 'Zoom out' },
        { fn: () => fitView({ padding: 0.15, duration: 400 }), icon: Maximize2, label: 'Fit screen' },
      ].map(({ fn, icon: Icon, label }) => (
        <button
          key={label}
          type="button"
          onClick={fn}
          title={label}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-600/80 bg-slate-900/90 text-slate-300 backdrop-blur hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </Panel>
  );
};

const buildNodeData = (raw, selectedId) => ({
  label: raw.label,
  nodeType: raw.nodeType,
  ipAddress: raw.ipAddress,
  floor: raw.floor,
  status: raw.status,
  traffic: raw.traffic,
  latency: raw.latency,
  activeUsers: raw.activeUsers,
  uptime: raw.uptime,
  selected: raw.id === selectedId,
});

const TopologyFlow = memo(({ topology }) => {
  const { isLive, connectionStatus } = useRealtime();
  const [selectedNode, setSelectedNode] = useState(null);

  const selectedId = selectedNode?.id ?? null;
  const topoSig = useMemo(() => topologySignature(topology), [topology]);

  const initialNodes = useMemo(
    () => toFlowNodes(topology?.nodes, selectedId),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- topoSig tracks payload changes
    [topoSig, selectedId]
  );
  const initialEdges = useMemo(
    () => toFlowEdges(topology?.edges),
    [topoSig]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Patch node/edge data in place instead of replacing the full graph
  useEffect(() => {
    if (!topology?.nodes?.length) return;

    const rawById = Object.fromEntries(topology.nodes.map((n) => [n.id, n]));
    setNodes((current) => {
      if (!current.length) return toFlowNodes(topology.nodes, selectedId);
      return current.map((node) => {
        const raw = rawById[node.id];
        if (!raw) return node;
        const data = buildNodeData(raw, selectedId);
        if (
          node.data?.status === data.status &&
          node.data?.traffic === data.traffic &&
          node.data?.latency === data.latency &&
          node.data?.activeUsers === data.activeUsers &&
          node.data?.selected === data.selected
        ) {
          return node;
        }
        return { ...node, data };
      });
    });

    const edgeById = Object.fromEntries((topology.edges || []).map((e) => [e.id, e]));
    setEdges((current) => {
      if (!current.length) return toFlowEdges(topology.edges);
      return current.map((edge) => {
        const raw = edgeById[edge.id];
        if (!raw) return edge;
        const health = raw.health || 'online';
        const animated = raw.animated !== false && health !== 'offline';
        if (edge.data?.health === health && edge.animated === animated) return edge;
        return {
          ...edge,
          animated,
          data: { health, trafficLoad: raw.trafficLoad ?? 0 },
        };
      });
    });
  }, [topoSig, selectedId, topology, setNodes, setEdges]);

  const onNodeClick = useCallback((_, node) => {
    const raw = topology?.nodes?.find((n) => n.id === node.id);
    setSelectedNode(raw || { ...node.data, id: node.id });
  }, [topology?.nodes]);

  const onPaneClick = useCallback(() => setSelectedNode(null), []);

  if (!topology?.nodes?.length) {
    return (
      <div className="flex h-[min(70vh,640px)] items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-900/50">
        <p className="text-sm text-slate-400">No topology data available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="relative flex-1 min-h-[min(70vh,640px)] rounded-xl border border-cyan-500/20 overflow-hidden topology-glow">
        <CyberBackground />
        <div className="absolute top-3 left-3 z-10">
          <ConnectionStatus status={connectionStatus} isLive={isLive} />
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          fitView
          minZoom={0.2}
          maxZoom={1.8}
          proOptions={{ hideAttribution: true }}
          className="topology-flow"
        >
          <Background color="#1e293b" gap={24} size={1} />
          <Controls
            showInteractive={false}
            className="!bg-slate-900/90 !border-slate-600/80 !shadow-lg !backdrop-blur"
          />
          <MiniMap
            className="!bg-slate-900/90 !border-slate-600/80 !rounded-lg"
            zoomable={false}
            pannable={false}
            nodeColor={(n) => {
              const s = n.data?.status;
              if (s === 'offline') return '#f43f5e';
              if (s === 'warning') return '#fbbf24';
              return '#34d399';
            }}
            maskColor="rgba(11,15,23,0.85)"
          />
          <FlowToolbar />
        </ReactFlow>
      </div>

      <DeviceInfoPanel
        device={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
});

TopologyFlow.displayName = 'TopologyFlow';

/**
 * Main topology dashboard — React Flow + live metrics header.
 */
export const NetworkTopology = ({ topology, loading, error }) => {
  const { isLive } = useRealtime();

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 rounded-lg bg-slate-800/60 animate-pulse border border-slate-700/50"
            />
          ))}
        </div>
        <div className="flex h-[min(70vh,640px)] items-center justify-center rounded-xl border border-slate-700/60 bg-slate-900/50">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
            <p className="mt-3 text-sm text-slate-400">Loading network topology…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <TopologyMetricsPanel metrics={topology?.metrics} isLive={isLive} />
      <TopologyFlow topology={topology} />
    </div>
  );
};

export const NetworkTopologyWithProvider = (props) => (
  <ReactFlowProvider>
    <NetworkTopology {...props} />
  </ReactFlowProvider>
);
