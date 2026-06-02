import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const BandwidthChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="inbound" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="outbound" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
      <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
      <YAxis stroke="#94a3b8" fontSize={12} unit=" Mbps" />
      <Tooltip
        contentStyle={{
          background: '#1a2332',
          border: '1px solid #334155',
          borderRadius: '8px',
        }}
      />
      <Legend />
      <Area
        type="monotone"
        dataKey="inbound"
        stroke="#22d3ee"
        fill="url(#inbound)"
        name="Inbound"
      />
      <Area
        type="monotone"
        dataKey="outbound"
        stroke="#3b82f6"
        fill="url(#outbound)"
        name="Outbound"
      />
    </AreaChart>
  </ResponsiveContainer>
);
