import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const tooltipStyle = {
  contentStyle: {
    background: 'rgba(15, 23, 42, 0.95)',
    border: '1px solid rgba(51, 65, 85, 0.8)',
    borderRadius: '8px',
  },
};

const COLORS = ['#22d3ee', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e'];

export const BandwidthLineChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <LineChart data={Array.isArray(data) ? data : []}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="time" stroke="#64748b" fontSize={10} hide={!data?.length} />
      <YAxis stroke="#64748b" fontSize={10} unit=" Mbps" />
      <Tooltip {...tooltipStyle} />
      <Legend />
      <Line type="monotone" dataKey="inbound" stroke="#22d3ee" strokeWidth={2} dot={false} name="Inbound" isAnimationActive={false} />
      <Line type="monotone" dataKey="outbound" stroke="#a78bfa" strokeWidth={2} dot={false} name="Outbound" isAnimationActive={false} />
    </LineChart>
  </ResponsiveContainer>
);

export const TrafficAreaChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <AreaChart data={Array.isArray(data) ? data : []}>
      <defs>
        <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="time" stroke="#64748b" fontSize={10} hide={!data?.length} />
      <YAxis stroke="#64748b" fontSize={10} />
      <Tooltip {...tooltipStyle} />
      <Area type="monotone" dataKey="traffic" stroke="#3b82f6" fill="url(#trafficFill)" name="Traffic Mbps" isAnimationActive={false} />
    </AreaChart>
  </ResponsiveContainer>
);

export const FloorUsersBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <BarChart data={Array.isArray(data) ? data : []}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="floor" stroke="#64748b" fontSize={10} />
      <YAxis stroke="#64748b" fontSize={10} allowDecimals={false} />
      <Tooltip {...tooltipStyle} />
      <Bar dataKey="users" fill="#22d3ee" radius={[6, 6, 0, 0]} name="Users" isAnimationActive={false} />
    </BarChart>
  </ResponsiveContainer>
);

export const DeviceCategoryPieChart = ({ data }) => {
  const chartData = Array.isArray(data) ? data : [];
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={true}
          labelLine={false}
          isAnimationActive={false}
        >
          {chartData.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const HealthRadarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <RadarChart data={Array.isArray(data) ? data : []}>
      <PolarGrid stroke="#334155" />
      <PolarAngleAxis dataKey="metric" stroke="#94a3b8" fontSize={10} />
      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" fontSize={9} />
      <Radar name="Score" dataKey="score" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.35} isAnimationActive={false} />
      <Tooltip {...tooltipStyle} />
    </RadarChart>
  </ResponsiveContainer>
);
