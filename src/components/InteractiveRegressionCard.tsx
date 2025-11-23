"use client";

import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DataPoint {
  x: number;
  y: number;
}

interface InteractiveRegressionCardProps {
  data: DataPoint[];
}

export default function InteractiveRegressionCard({ data }: InteractiveRegressionCardProps) {
  const [intercept, setIntercept] = useState(20);
  const [slope, setSlope] = useState(3);

  // Calculate predicted values for the regression line
  const minX = 0;
  const maxX = 10;
  
  // Scatter data - only depends on input data, not slope/intercept
  const scatterData = useMemo(() => {
    return data.map(point => ({
      x: point.x,
      y: point.y,
    }));
  }, [data]);

  // Generate line points for smooth line - only recalculates when slope/intercept changes
  const linePoints = useMemo(() => {
    const points = [];
    for (let x = minX; x <= maxX; x += 0.1) {
      points.push({
        x: x,
        predicted: slope * x + intercept,
      });
    }
    return points;
  }, [slope, intercept]);

  // Calculate MSE
  const calculateMSE = () => {
    let sum = 0;
    data.forEach(point => {
      const predicted = slope * point.x + intercept;
      sum += Math.pow(point.y - predicted, 2);
    });
    return (sum / data.length).toFixed(2);
  };

  const mse = calculateMSE();

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="rounded-xl bg-gray-50 dark:bg-[#3A1B5B] transition-colors duration-150 border-2 border-purple-200 dark:border-purple-400/60 shadow-xl dark:shadow-purple-900/30 ring-2 ring-purple-100 dark:ring-purple-800/30 p-6">
        <div className="rounded-lg overflow-hidden bg-gradient-to-r from-accent-pink to-accent-purple p-4">
          <h3 className="text-white font-semibold text-center text-sm">Adjust the Intercept and Slope to Fit the Data</h3>
        </div>
        <div className="rounded-b-lg p-4 bg-[#2B0B4B] dark:bg-[#2B0B4B]">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A2B6B" strokeOpacity={0.6} />
              <XAxis
                type="number"
                dataKey="x"
                label={{ value: "Study Hours", position: "insideBottom", offset: -5, style: { fill: "#E9C3FF", fontSize: "14px" } }}
                stroke="#E9C3FF"
                tick={{ fill: "#E9C3FF", fontSize: 12 }}
                domain={[0, 10]}
                ticks={Array.from({ length: 11 }, (_, i) => i)}
              />
              <YAxis
                type="number"
                label={{ value: "Exam Score", angle: -90, position: "insideLeft", style: { fill: "#E9C3FF", fontSize: "14px" } }}
                stroke="#E9C3FF"
                tick={{ fill: "#E9C3FF", fontSize: 12 }}
                domain={[0, 100]}
                ticks={Array.from({ length: 11 }, (_, i) => i * 10)}
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
              <Line
                type="monotone"
                data={scatterData}
                dataKey="y"
                stroke="#4169E1"
                strokeWidth={0}
                dot={{ fill: "#4169E1", r: 6 }}
                name="Student Scores"
                legendType="square"
                isAnimationActive={false}
              />
              <Line
                type="linear"
                data={linePoints}
                dataKey="predicted"
                stroke="#FF8FB0"
                strokeWidth={2}
                dot={false}
                name="Your Regression Line"
                legendType="line"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Controls */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {/* Intercept Control */}
          <div className="rounded-xl p-4 bg-[#2B0B4B] dark:bg-[#2B0B4B] border border-purple-500/30">
            <label className="text-white text-sm mb-2 block">Intercept (β₀): {intercept}</label>
            <input
              type="range"
              min="0"
              max="50"
              value={intercept}
              onChange={(e) => setIntercept(Number(e.target.value))}
              className="w-full h-2 bg-purple-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
          
          {/* Slope Control */}
          <div className="rounded-xl p-4 bg-[#2B0B4B] dark:bg-[#2B0B4B] border border-purple-500/30">
            <label className="text-white text-sm mb-2 block">Slope (β₁): {slope}</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={slope}
              onChange={(e) => setSlope(Number(e.target.value))}
              className="w-full h-2 bg-purple-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
          
          {/* MSE Display */}
          <div className="rounded-xl p-4 bg-[#2B0B4B] dark:bg-[#2B0B4B] border border-purple-500/30">
            <label className="text-white text-sm mb-2 block">Mean Squared Error:</label>
            <div className="text-yellow-400 text-2xl font-bold">{mse}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

