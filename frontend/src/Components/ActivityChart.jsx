import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ActivityChart = ({ data }) => {
  return (
    <div className="bg-[#14141a] rounded-2xl shadow-lg border border-red-900/20 p-8">
      <h3 className="text-xl font-semibold mb-6 text-red-400">
        Weekly Activity Trend
      </h3>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 0, 80, 0.1)"
            />

            {/* X Axis */}
            <XAxis
              dataKey="date"
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

            {/* Line */}
            <Line
              type="monotone"
              dataKey="total"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#ef4444", strokeWidth: 2 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;