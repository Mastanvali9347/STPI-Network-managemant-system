import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
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
    backdropFilter: 'blur(8px)',
  },
};

export const BandwidthChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <AreaChart data={data || []}>
      <defs>
        <linearGradient id="inboundG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.5} />
          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="outboundG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
      <YAxis stroke="#64748b" fontSize={11} unit=" Mbps" />
      <Tooltip {...tooltipStyle} />
      <Legend />
      <Area type="monotone" dataKey="inbound" stroke="#22d3ee" fill="url(#inboundG)" name="Inbound" />
      <Area type="monotone" dataKey="outbound" stroke="#8b5cf6" fill="url(#outboundG)" name="Outbound" />
    </AreaChart>
  </ResponsiveContainer>
);

export const UsersChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={240}>
    <LineChart data={data || []}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
      <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
      <Tooltip {...tooltipStyle} />
      <Line
        type="monotone"
        dataKey="users"
        stroke="#10b981"
        strokeWidth={2}
        dot={false}
        name="Connected users"
      />
    </LineChart>
  </ResponsiveContainer>
);

export const TrafficChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={240}>
    <BarChart data={data || []}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
      <YAxis stroke="#64748b" fontSize={11} />
      <Tooltip {...tooltipStyle} />
      <Bar dataKey="traffic" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Traffic (Mbps)" />
    </BarChart>
  </ResponsiveContainer>
);

export const DeviceHealthChart = ({ data }) => {
  const chartData = (data || []).map((item) => ({
    name: item.name,
    Online: item.online,
    Offline: item.total - item.online,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
        <YAxis stroke="#64748b" allowDecimals={false} />
        <Tooltip {...tooltipStyle} />
        <Legend />
        <Bar dataKey="Online" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Offline" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
