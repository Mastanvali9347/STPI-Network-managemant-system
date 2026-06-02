import { NetworkTopologyWithProvider } from '../topology/NetworkTopology';
import { useTopologyRealtime } from '../topology/hooks/useTopologyRealtime';

export const TopologyPage = () => {
  const { topology, loading, error } = useTopologyRealtime();

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-linear-to-r from-slate-900 via-slate-900 to-cyan-950/30 p-5 sm:p-6 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Enterprise Network Topology
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time NOC-style map — Internet, core routing, floors, server room, and WiFi.
            Simulated data for educational monitoring only.
          </p>
        </div>
      </div>

      <NetworkTopologyWithProvider topology={topology} loading={loading} error={error} />
    </div>
  );
};
