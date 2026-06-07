import { useEffect, useState, useMemo } from 'react';
import {
  Server,
  Wifi,
  Users,
  Gauge,
  Bell,
  Zap,
  Activity,
  Radio,
  CircleAlert,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { ConnectionStatus } from '../components/monitoring/ConnectionStatus';
import { ChartSkeleton } from '../components/monitoring/Skeleton';
import { AnimatedStatCard } from '../components/analytics/AnimatedStatCard';
import { ChartRangeFilter } from '../components/analytics/ChartRangeFilter';
import {
  BandwidthLineChart,
  TrafficAreaChart,
  FloorUsersBarChart,
  DeviceCategoryPieChart,
  HealthRadarChart,
} from '../components/analytics/AdvancedCharts';
import { HeatmapGrid } from '../components/analytics/HeatmapGrid';
import { AIInsightsPanel } from '../components/insights/AIInsightsPanel';
import { enterpriseApi } from '../api/enterpriseApi';
import { useRealtime } from '../hooks/useRealtime';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

const FALLBACK_KPIS = {
  totalDevices: 0,
  onlineDevices: 0,
  offlineDevices: 0,
  activeWifiNetworks: 0,
  connectedUsers: 0,
  bandwidthUsagePercent: 0,
  internetSpeedMbps: 0,
  alertCount: 0,
  packetTraffic: 0,
  deviceHealthPercent: 0,
};

export const AnalyticsPage = () => {
  const { connectionStatus, isLive } = useRealtime();
  const [range, setRange] = useState('24h');
  const [data, setData] = useState(null);
  const [insights, setInsights] = useState({ insights: [], recommendations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const [analyticsRes, insightsRes] = await Promise.all([
          enterpriseApi.getExtendedAnalytics(range),
          enterpriseApi.getInsights(),
        ]);

        if (active) {
          setData(analyticsRes?.data || null);
          setInsights(insightsRes?.data || { insights: [], recommendations: [] });
        }
      } catch (err) {
        if (active) {
          console.error('[Analytics] Fetch failed:', err);
          setError('Failed to load analytical data. Please check your connection.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [range]);

  const heatmapData = useMemo(() => Array.isArray(data?.heatmap) ? data.heatmap : [], [data]);
  const bandwidthData = useMemo(() => Array.isArray(data?.bandwidth) ? data.bandwidth : [], [data]);
  const trafficData = useMemo(() => Array.isArray(data?.traffic) ? data.traffic : [], [data]);
  const floorUsersData = useMemo(() => Array.isArray(data?.floorUsers) ? data.floorUsers : [], [data]);
  const deviceCategoriesData = useMemo(() => Array.isArray(data?.deviceCategories) ? data.deviceCategories : [], [data]);
  const healthRadarData = useMemo(() => Array.isArray(data?.networkHealthRadar) ? data.networkHealthRadar : [], [data]);

  const insightsList = useMemo(() => Array.isArray(insights?.insights) ? insights.insights : [], [insights]);
  const recommendationsList = useMemo(() => Array.isArray(insights?.recommendations) ? insights.recommendations : [], [insights]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-slate-900/50 rounded-2xl border border-rose-500/10">
        <CircleAlert className="h-12 w-12 text-rose-500 mb-4 opacity-70" />
        <h2 className="text-xl font-semibold text-white">Analytics Unavailable</h2>
        <p className="mt-2 text-slate-400 max-w-md mx-auto">{error}</p>
        <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
          Tip: Check if your backend URL (VITE_API_URL) matches the live service.
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 rounded-lg bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Advanced Analytics</h1>
          <p className="text-sm text-slate-400">Enterprise metrics · STPI Intelligent Monitoring NOC</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ChartRangeFilter value={range} onChange={(val) => setRange(val)} />
          <ConnectionStatus status={connectionStatus} isLive={isLive} />
        </div>
      </div>

      <ErrorBoundary name="KPI Stats">
        {loading ? (
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="h-24 rounded-xl bg-slate-800/60 animate-pulse shimmer-border" />
            ))}
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            <AnimatedStatCard label="Total Devices" value={k.totalDevices} icon={Server} live={isLive} />
            <AnimatedStatCard label="Online" value={k.onlineDevices} accent="emerald" icon={Activity} live={isLive} />
            <AnimatedStatCard label="Offline" value={k.offlineDevices} accent="rose" icon={Server} live={isLive} />
            <AnimatedStatCard label="WiFi Networks" value={k.activeWifiNetworks} icon={Wifi} live={isLive} />
            <AnimatedStatCard label="Connected Users" value={k.connectedUsers} icon={Users} live={isLive} />
            <AnimatedStatCard label="Bandwidth" value={k.bandwidthUsagePercent} suffix="%" icon={Gauge} accent="amber" live={isLive} />
            <AnimatedStatCard label="Internet" value={k.internetSpeedMbps} suffix=" Mbps" icon={Zap} live={isLive} />
            <AnimatedStatCard label="Live Alerts" value={k.alertCount} accent="rose" icon={Bell} live={isLive} />
            <AnimatedStatCard label="Packet Activity" value={k.packetTraffic} icon={Radio} accent="violet" live={isLive} />
            <AnimatedStatCard label="Cloud Health" value={k.deviceHealthPercent} suffix="%" accent="emerald" live={isLive} />
          </div>
        )}
      </ErrorBoundary>

      <ErrorBoundary name="AI Insights">
        <Card title="STPI AI Smart Insights" className="bg-white/5! border-white/10!">
          <AIInsightsPanel
            insights={insightsList}
            recommendations={recommendationsList}
            loading={loading}
          />
        </Card>
      </ErrorBoundary>

      <div className="grid gap-6 lg:grid-cols-2">
        <ErrorBoundary name="Bandwidth Chart">
          <Card title="Bandwidth Usage (Mbps)" subtitle={`Timeframe: ${range}`} className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <BandwidthLineChart data={bandwidthData} />}
          </Card>
        </ErrorBoundary>

        <ErrorBoundary name="Traffic Analysis">
          <Card title="Network Traffic Intensity" subtitle="Packet flow analysis" className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <TrafficAreaChart data={trafficData} />}
          </Card>
        </ErrorBoundary>

        <ErrorBoundary name="User Distribution">
          <Card title="Floor-wise Occupancy" subtitle="Active user counts" className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <FloorUsersBarChart data={floorUsersData} />}
          </Card>
        </ErrorBoundary>

        <ErrorBoundary name="Category Distribution">
          <Card title="IoT Device Segmentation" subtitle="Inventory split" className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <DeviceCategoryPieChart data={deviceCategoriesData} />}
          </Card>
        </ErrorBoundary>

        <ErrorBoundary name="Radar Metrics">
          <Card title="Multi-vector System Health" subtitle="Performance indicators" className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <HealthRadarChart data={healthRadarData} />}
          </Card>
        </ErrorBoundary>

        <ErrorBoundary name="Heatmap Utilization">
          <Card title="Historical Utilization Heatmap" subtitle="Floor vs Time" className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <HeatmapGrid data={heatmapData} />}
          </Card>
        </ErrorBoundary>
      </div>
    </div>
  );
};

