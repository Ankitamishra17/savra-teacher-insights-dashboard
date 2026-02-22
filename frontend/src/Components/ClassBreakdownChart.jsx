import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ClassBreakdownChart = ({ data }) => {
  return (
    <div className="w-full h-80 bg-[#14141a] rounded-2xl p-6 border border-red-900/20 shadow-lg">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 0, 80, 0.1)"
          />

          {/* X Axis */}
          <XAxis
            dataKey="grade"
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af" }}
          />

          {/* Y Axis */}
          <YAxis
            allowDecimals={false}
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af" }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a22",
              border: "1px solid rgba(255,0,80,0.2)",
              borderRadius: "12px",
              color: "#ffffff",
            }}
            labelStyle={{ color: "#f87171" }}
            itemStyle={{ color: "#ffffff" }}
          />

          {/* Bars */}
          <Bar
            dataKey="total"
            fill="#ef4444"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClassBreakdownChart;