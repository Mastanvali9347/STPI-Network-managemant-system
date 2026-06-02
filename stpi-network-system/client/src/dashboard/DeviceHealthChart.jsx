import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const DeviceHealthChart = ({ data }) => {
  const chartData = (data || []).map((item) => ({
    name: item.name,
    Online: item.online,
    Offline: item.total - item.online,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
        <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            background: '#1a2332',
            border: '1px solid #334155',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Bar dataKey="Online" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Offline" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
