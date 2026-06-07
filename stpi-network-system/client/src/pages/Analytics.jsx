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
  AlertCircle,
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

  const k = useMemo(() => data?.kpis || FALLBACK_KPIS, [data]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="h-12 w-12 text-rose-500 mb-4 opacity-50" />
        <h2 className="text-xl font-semibold text-white">Analytics Unavailable</h2>
        <p className="mt-2 text-slate-400 max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-400"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Advanced Analytics</h1>
          <p className="text-sm text-slate-400">Enterprise metrics · STPI Intelligent Monitoring</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ChartRangeFilter value={range} onChange={setRange} />
          <ConnectionStatus status={connectionStatus} isLive={isLive} />
        </div>
      </div>

      <ErrorBoundary name="KPI Stats">
        {loading ? (
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-slate-800/60 animate-pulse shimmer-border" />
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
            <AnimatedStatCard label="Alerts" value={k.alertCount} accent="rose" icon={Bell} live={isLive} />
            <AnimatedStatCard label="Packet Activity" value={k.packetTraffic} icon={Radio} accent="violet" live={isLive} />
            <AnimatedStatCard label="Cloud Health" value={k.deviceHealthPercent} suffix="%" accent="emerald" live={isLive} />
          </div>
        )}
      </ErrorBoundary>

      <ErrorBoundary name="AI Insights">
        <Card title="STPI AI Smart Insights" className="bg-white/5! border-white/10!">
          <AIInsightsPanel
            insights={Array.isArray(insights?.insights) ? insights.insights : []}
            recommendations={Array.isArray(insights?.recommendations) ? insights.recommendations : []}
            loading={loading}
          />
        </Card>
      </ErrorBoundary>

      <div className="grid gap-6 lg:grid-cols-2">
        <ErrorBoundary name="Bandwidth Chart">
          <Card title="Bandwidth Usage (Mbps)" subtitle={`Timeframe: ${range}`} className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <BandwidthLineChart data={Array.isArray(data?.bandwidth) ? data.bandwidth : []} />}
          </Card>
        </ErrorBoundary>

        <ErrorBoundary name="Traffic Analysis">
          <Card title="Network Traffic Intensity" className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <TrafficAreaChart data={Array.isArray(data?.traffic) ? data.traffic : []} />}
          </Card>
        </ErrorBoundary>

        <ErrorBoundary name="User Distribution">
          <Card title="Floor-wise Occupancy" className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <FloorUsersBarChart data={Array.isArray(data?.floorUsers) ? data.floorUsers : []} />}
          </Card>
        </ErrorBoundary>

        <ErrorBoundary name="Category Distribution">
          <Card title="IoT Device Segmentation" className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <DeviceCategoryPieChart data={Array.isArray(data?.deviceCategories) ? data.deviceCategories : []} />}
          </Card>
        </ErrorBoundary>

        <ErrorBoundary name="Radar Metrics">
          <Card title="Multi-vector System Health" className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <HealthRadarChart data={Array.isArray(data?.networkHealthRadar) ? data.networkHealthRadar : []} />}
          </Card>
        </ErrorBoundary>

        <ErrorBoundary name="Heatmap Utilization">
          <Card title="Historical Utilization Heatmap" className="bg-white/5! border-white/10!">
            {loading ? <ChartSkeleton /> : <HeatmapGrid data={Array.isArray(data?.heatmap) ? data.heatmap : []} />}
          </Card>
        </ErrorBoundary>
      </div>
    </div>
  );
};

