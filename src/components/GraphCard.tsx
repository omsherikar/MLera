"use client";

import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Scatter } from "recharts";

interface DataPoint {
  x: number;
  y: number;
}

interface GraphCardProps {
  title: string;
  data: DataPoint[];
  slope?: number;
  intercept?: number;
  showBestFit?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export default function GraphCard({
  title,
  data,
  slope = 1,
  intercept = 0,
  showBestFit = true,
  xAxisLabel = "X",
  yAxisLabel = "Y",
}: GraphCardProps) {
  const minX = Math.min(...data.map(d => d.x));
  const maxX = Math.max(...data.map(d => d.x));
  
  // Create combined data with both scatter and line values
  const chartData = data.map((point) => ({
    x: point.x,
    y: point.y,
    lineY: slope * point.x + intercept,
  }));

  // Generate additional points for smooth line
  const linePoints = [];
  for (let x = minX; x <= maxX; x += 0.1) {
    linePoints.push({
      x: x,
      y: null,
      lineY: slope * x + intercept,
    });
  }

  // Combine all data
  const allData = [...chartData, ...linePoints];

  // Calculate Y-axis domain based on data
  const minY = Math.min(...data.map(d => d.y));
  const maxY = Math.max(...data.map(d => d.y));
  const yMin = Math.floor(minY / 5) * 5; // Round down to nearest 5
  const yMax = Math.ceil(maxY / 5) * 5; // Round up to nearest 5

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="rounded-xl bg-gray-50 dark:bg-[#3A1B5B] transition-colors duration-150 border-2 border-purple-200 dark:border-purple-400/60 shadow-xl dark:shadow-purple-900/30 ring-2 ring-purple-100 dark:ring-purple-800/30 p-6">
      <div className="rounded-t-lg overflow-hidden bg-gradient-to-r from-accent-pink to-accent-purple p-4">
        <h3 className="text-white font-semibold text-center text-sm">{title}</h3>
      </div>
      <div className="rounded-b-lg p-4 bg-[#2B0B4B] dark:bg-[#2B0B4B]">
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={allData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A2B6B" strokeOpacity={0.6} />
            <XAxis
              dataKey="x"
              type="number"
              label={{ value: xAxisLabel, position: "insideBottom", offset: -5, style: { fill: "#E9C3FF", fontSize: "14px" } }}
              stroke="#E9C3FF"
              tick={{ fill: "#E9C3FF", fontSize: 12 }}
              domain={[minX - 0.5, maxX + 0.5]}
              ticks={Array.from({ length: maxX - minX + 1 }, (_, i) => minX + i)}
            />
            <YAxis
              type="number"
              label={{ value: yAxisLabel, angle: -90, position: "insideLeft", style: { fill: "#E9C3FF", fontSize: "14px" } }}
              stroke="#E9C3FF"
              tick={{ fill: "#E9C3FF", fontSize: 12 }}
              domain={[yMin, yMax]}
              ticks={Array.from({ length: (yMax - yMin) / 5 + 1 }, (_, i) => yMin + i * 5)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(42, 11, 75, 0.95)",
                border: "1px solid #A66BFF",
                borderRadius: "8px",
                color: "#E9C3FF",
              }}
              labelStyle={{ color: "#E9C3FF" }}
            />
            <Legend 
              wrapperStyle={{ color: "#E9C3FF", paddingTop: "10px" }}
              iconType="square"
              align="center"
              verticalAlign="top"
            />
            <Scatter
              data={chartData}
              dataKey="y"
              fill="#4169E1"
              name="Student Data"
              shape="circle"
            />
            {showBestFit && (
              <Line
                type="linear"
                dataKey="lineY"
                stroke="#FF8FB0"
                strokeWidth={2}
                dot={false}
                name="Best Fit Line"
                legendType="line"
                connectNulls={true}
                activeDot={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
}

