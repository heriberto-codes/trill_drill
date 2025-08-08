import {
  ResponsiveContainer,
  LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  BarChart, Bar, YAxis as YAxisRight
} from "recharts";

function formatTimeLabel(ts) {
  // show HH:MM from "YYYY-MM-DD HH:MM:SS"
  return ts.slice(11, 16);
}

export default function StockChart({ data }) {
  if (!data?.length) return null;

  // A simple price line chart + a small volume bar chart
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* Price line */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={formatTimeLabel} minTickGap={30} />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip labelFormatter={(v) => v} />
            <Legend />
            <Line type="monotone" dataKey="close" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volume bars */}
      <div style={{ width: "100%", height: 160 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={formatTimeLabel} minTickGap={30} />
            <YAxisRight yAxisId="right" />
            <Tooltip labelFormatter={(v) => v} />
            <Bar dataKey="volume" yAxisId="right" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}