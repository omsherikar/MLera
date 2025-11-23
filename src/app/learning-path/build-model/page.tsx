"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import ContentHeader from "@/components/ContentHeader";
import SectionCard from "@/components/SectionCard";
import { ChevronDown, Target, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, Area, AreaChart, ComposedChart } from "recharts";

interface DatasetRow {
  x: number;
  y: number;
}

export default function BuildModelPage() {
  const { theme } = useTheme();
  const [selectedDataset, setSelectedDataset] = useState("Sales Revenue");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHyperparamsDropdownOpen, setIsHyperparamsDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [learningRate, setLearningRate] = useState(0.05);
  const [iterations, setIterations] = useState(100);
  const [currentIteration, setCurrentIteration] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modelBuilt, setModelBuilt] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hyperparamsDropdownRef = useRef<HTMLDivElement>(null);

  const handleBuildModel = () => {
    setModelBuilt(true);
    setCurrentIteration(10);
    console.log("Building model with:", { selectedDataset, learningRate, iterations });
  };

  const handleReset = () => {
    setLearningRate(0.05);
    setIterations(100);
    setSelectedDataset("Sales Revenue");
    setCurrentIteration(10);
    setIsPlaying(false);
    setModelBuilt(false);
  };

  const handlePrevious = () => {
    if (currentIteration > 1) {
      setCurrentIteration(currentIteration - 1);
    }
  };

  const handleNext = () => {
    if (currentIteration < iterations) {
      setCurrentIteration(currentIteration + 1);
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Generate cost data for the cost chart
  const costData = Array.from({ length: 10 }, (_, i) => {
    const theta = 0.050 + i * 0.035;
    const cost = 0.55 - (i * 0.04);
    return { theta: theta.toFixed(3), cost: cost.toFixed(2) };
  });

  const datasets = ["Sales Revenue", "Housing Prices", "Salary vs Experience"];

  const datasetDescriptions: Record<string, string> = {
    "Sales Revenue": "Sales Revenue Dataset\nThis dataset shows the relationship between marketing budget (in thousands of dollars) and sales revenue (in thousands of dollars). It demonstrates how increased marketing investment typically leads to higher sales revenue, making it ideal for understanding positive linear correlation in business contexts.",
    "Housing Prices": "Housing Prices Dataset\nThis dataset contains information about house sizes (in square meters) and their corresponding prices (in thousands of dollars). It's perfect for understanding how property size affects market value and demonstrates real estate pricing patterns through linear regression.",
    "Salary vs Experience": "Salary vs Experience Dataset\nThis dataset illustrates the relationship between years of professional experience and annual salary (in dollars). It shows how career progression and accumulated experience typically result in higher compensation, making it excellent for understanding career growth patterns.",
  };

  const datasetData: Record<string, { headers: [string, string], rows: DatasetRow[] }> = {
    "Sales Revenue": {
      headers: ["Marketing Budget (thousands $)", "Sales Revenue (thousands $)"],
      rows: [
        { x: 25, y: 120 },
        { x: 28, y: 130 },
        { x: 30, y: 145 },
        { x: 33, y: 157 },
        { x: 35, y: 160 },
        { x: 40, y: 180 },
        { x: 42, y: 185 },
        { x: 45, y: 195 },
        { x: 47, y: 205 },
        { x: 50, y: 210 },
        { x: 55, y: 230 },
        { x: 60, y: 250 },
      ],
    },
    "Housing Prices": {
      headers: ["House Size (square meters)", "Price (thousands $)"],
      rows: [
        { x: 50, y: 150 },
        { x: 60, y: 180 },
        { x: 70, y: 210 },
        { x: 80, y: 240 },
        { x: 90, y: 270 },
        { x: 100, y: 300 },
        { x: 110, y: 330 },
      ],
    },
    "Salary vs Experience": {
      headers: ["Years of Experience", "Annual Salary ($)"],
      rows: [
        { x: 1, y: 45000 },
        { x: 2, y: 50000 },
        { x: 3, y: 55000 },
        { x: 4, y: 60000 },
        { x: 5, y: 65000 },
        { x: 6, y: 70000 },
        { x: 7, y: 75000 },
      ],
    },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (hyperparamsDropdownRef.current && !hyperparamsDropdownRef.current.contains(event.target as Node)) {
        setIsHyperparamsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-gradient-to-b dark:from-[#16002C] dark:to-[#30004A] transition-colors duration-150">
      <Navbar />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Learning Path", href: "/learning-path" },
          { label: "...", href: "/" },
          { label: "Build Linear Regression" },
        ]}
      />
      <ContentHeader
        title="Build A Linear Regression Model"
        currentModule={3}
        totalModules={5}
        onPrevious={() => window.history.back()}
      />
      <div className="pb-32">
        <SectionCard number={1} title="Lets Build The Model">
          <p>
            In this interactive module, you'll build a linear regression model using different datasets. Select a dataset, adjust the learning rate and number of iterations, then click "Build" to train your model. Watch how the model converges as you navigate through the training process.
          </p>
        </SectionCard>

        <SectionCard number={2} title="Visualizing the Relationship">
          <p className={`mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Select a Dataset:</p>
          <div className="relative w-full max-w-6xl mb-6" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-between"
            >
              <span>{selectedDataset}</span>
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {datasets.map((dataset, index) => (
                  <div key={dataset}>
                    {index > 0 && <hr className="border-gray-200" />}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDataset(dataset);
                        setIsDropdownOpen(false);
                      }}
                      onMouseEnter={() => setHoveredOption(dataset)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className={`w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors ${
                        selectedDataset === dataset || hoveredOption === dataset ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      {dataset}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <p className={`mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Dataset Description</p>
          <div className={`rounded-xl p-6 border-l-4 border-purple-500 transition-colors duration-150 mb-6 ${
            theme === "dark" ? "bg-[#3A1B5B]" : "bg-gray-100"
          }`}>
            <p className={`whitespace-pre-line leading-relaxed ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}>
              {datasetDescriptions[selectedDataset]}
            </p>
          </div>
          
          <p className={`mb-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            Choose a dataset to see its scatter plot. This will help you understand the relationship between variables before building the model.
          </p>
          
          <div className="mt-8">
            <button 
              onClick={() => setShowTable(!showTable)}
              className="w-full px-8 py-3 bg-[#FF6B4A] hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
              {showTable ? "Hide Dataset Table" : "View Dataset Table"}
            </button>
          </div>

          {showTable && (
            <div className="mt-8">
              <h3 className={`text-2xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}>{selectedDataset} Dataset</h3>
              <div className={`rounded-xl overflow-hidden border transition-colors duration-150 ${
                theme === "dark" 
                  ? "bg-[#2B0B4B] border-purple-500/30" 
                  : "bg-white border-gray-300"
              }`}>
                <table className="w-full">
                  <thead>
                    <tr className={theme === "dark" ? "bg-purple-600/50" : "bg-purple-200"}>
                      <th className={`px-6 py-4 text-left font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}>
                        {datasetData[selectedDataset].headers[0]}
                      </th>
                      <th className={`px-6 py-4 text-left font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}>
                        {datasetData[selectedDataset].headers[1]}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {datasetData[selectedDataset].rows.map((row, index) => (
                      <tr
                        key={index}
                        className={
                          theme === "dark"
                            ? index % 2 === 0 ? "bg-[#3A1B5B]" : "bg-[#2B0B4B]"
                            : index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }
                      >
                        <td className={`px-6 py-4 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}>{row.x}</td>
                        <td className={`px-6 py-4 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}>{row.y.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Scatter Plot */}
          <div className="mt-8 mb-8">
            <div className="max-w-5xl mx-auto p-4">
              <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-[#3A1B5B] transition-colors duration-150 border-2 border-purple-200 dark:border-purple-400/60 shadow-xl dark:shadow-purple-900/30 ring-2 ring-purple-100 dark:ring-purple-800/30 p-6">
                <div className="rounded-lg overflow-hidden bg-gradient-to-r from-accent-pink to-accent-purple p-4">
                  <h3 className="text-white font-semibold text-center text-sm">
                    {selectedDataset === "Sales Revenue" ? "Market Dataset Preview" : `${selectedDataset} Dataset Preview`}
                  </h3>
                </div>
                <div className={`rounded-b-lg p-4 transition-colors duration-150 ${
                  theme === "dark" ? "bg-[#2B0B4B]" : "bg-white"
                }`}>
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={theme === "dark" ? "#4A2B6B" : "#E0E0E0"} 
                        strokeOpacity={0.6} 
                      />
                      <XAxis
                        type="number"
                        dataKey="x"
                        label={{ 
                          value: datasetData[selectedDataset].headers[0], 
                          position: "insideBottom", 
                          offset: -5, 
                          style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: "14px" } 
                        }}
                        stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                        tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: 12 }}
                        domain={selectedDataset === "Sales Revenue" ? [25, 60] : ['dataMin - 5', 'dataMax + 5']}
                        ticks={selectedDataset === "Sales Revenue" ? [25, 30, 35, 40, 45, 50, 55, 60] : undefined}
                      />
                      <YAxis
                        type="number"
                        dataKey="y"
                        label={{ 
                          value: datasetData[selectedDataset].headers[1], 
                          angle: -90, 
                          position: "insideLeft", 
                          style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: "14px" } 
                        }}
                        stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                        tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: 12 }}
                        domain={selectedDataset === "Sales Revenue" ? [120, 260] : ['dataMin - 10', 'dataMax + 10']}
                        ticks={selectedDataset === "Sales Revenue" ? [120, 140, 160, 180, 200, 220, 240, 260] : undefined}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme === "dark" ? "rgba(42, 11, 75, 0.95)" : "rgba(255, 255, 255, 0.95)",
                          border: theme === "dark" ? "1px solid #A66BFF" : "1px solid #A66BFF",
                          borderRadius: "8px",
                          color: theme === "dark" ? "#E9C3FF" : "#4A3566",
                        }}
                        labelStyle={{ color: theme === "dark" ? "#E9C3FF" : "#4A3566" }}
                      />
                      <Legend 
                        wrapperStyle={{ color: theme === "dark" ? "#E9C3FF" : "#4A3566", paddingTop: "10px" }}
                        iconType="square"
                        align="center"
                        verticalAlign="top"
                      />
                      <Scatter
                        data={datasetData[selectedDataset].rows}
                        dataKey="y"
                        fill="#4169E1"
                        name="Data Points"
                        shape="circle"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard number={3} title="Choose the Hyperparameters">
          <div className="flex items-center justify-between mb-6">
            <p className={`${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Experiment with different hyperparameter combinations to see how they affect model training:
            </p>
            <Target className="w-6 h-6 text-accent-pink flex-shrink-0 ml-4" />
          </div>
          
          {/* Hyperparameters Table */}
          <div className={`rounded-xl overflow-hidden border transition-colors duration-150 mb-6 ${
            theme === "dark" 
              ? "bg-[#2B0B4B] border-purple-500/30" 
              : "bg-white border-gray-300"
          }`}>
            <table className="w-full">
              <thead>
                <tr className={theme === "dark" ? "bg-purple-600" : "bg-purple-200"}>
                  <th className={`px-6 py-4 text-left font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>
                    Learning Rate (α)
                  </th>
                  <th className={`px-6 py-4 text-left font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>
                    Iterations
                  </th>
                  <th className={`px-6 py-4 text-left font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>
                    Effect
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-t ${
                  theme === "dark" ? "border-white/10" : "border-gray-200"
                } ${
                  theme === "dark" ? "bg-[#3A1B5B]" : "bg-white"
                }`}>
                  <td className={`px-6 py-4 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>0.001 - 0.005</td>
                  <td className={`px-6 py-4 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>300 - 500</td>
                  <td className={`px-6 py-4 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>Slow, stable convergence (good for complex datasets)</td>
                </tr>
                <tr className={`border-t ${
                  theme === "dark" ? "border-white/10" : "border-gray-200"
                } ${
                  theme === "dark" ? "bg-[#2B0B4B]" : "bg-gray-50"
                }`}>
                  <td className={`px-6 py-4 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>0.01 - 0.05</td>
                  <td className={`px-6 py-4 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>100 - 300</td>
                  <td className={`px-6 py-4 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>Balanced convergence (recommended starting point)</td>
                </tr>
                <tr className={`border-t ${
                  theme === "dark" ? "border-white/10" : "border-gray-200"
                } ${
                  theme === "dark" ? "bg-[#3A1B5B]" : "bg-white"
                }`}>
                  <td className={`px-6 py-4 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>0.05 - 0.1</td>
                  <td className={`px-6 py-4 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>50 - 100</td>
                  <td className={`px-6 py-4 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}>Fast convergence, potential instability (for simple datasets)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={`mb-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            <strong>Tip:</strong> If the cost function plot oscillates or increases, try reducing the learning rate.
          </p>

          {/* Interactive Controls */}
          <div className="flex items-end gap-4 flex-wrap mb-20">
            {/* Dataset Selection */}
            <div className="flex-1 min-w-[200px]">
              <label className={`block mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                Dataset for Model:
              </label>
              <div className="relative w-full" ref={hyperparamsDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsHyperparamsDropdownOpen(!isHyperparamsDropdownOpen)}
                  className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg border-2 border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-between transition-colors"
                >
                  <span>{selectedDataset}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isHyperparamsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isHyperparamsDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border-2 border-purple-500 rounded-lg shadow-lg">
                    {datasets.map((dataset, index) => (
                      <div key={dataset}>
                        {index > 0 && <hr className="border-gray-200" />}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDataset(dataset);
                            setIsHyperparamsDropdownOpen(false);
                          }}
                          onMouseEnter={() => setHoveredOption(dataset)}
                          onMouseLeave={() => setHoveredOption(null)}
                          className={`w-full px-4 py-3 text-left text-gray-900 transition-colors ${
                            selectedDataset === dataset || hoveredOption === dataset
                              ? "bg-gray-100"
                              : "bg-white"
                          }`}
                        >
                          {dataset}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Learning Rate Slider */}
            <div className="flex-1 min-w-[200px]">
              <label className={`block mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                Learning Rate (α): {learningRate.toFixed(3)}
              </label>
              <input
                type="range"
                min="0.001"
                max="0.1"
                step="0.001"
                value={learningRate}
                onChange={(e) => setLearningRate(Number(e.target.value))}
                className="slider-blue w-full"
                style={{
                  '--progress': `${((learningRate - 0.001) / (0.1 - 0.001)) * 100}%`
                } as React.CSSProperties}
              />
            </div>

            {/* Iterations Slider */}
            <div className="flex-1 min-w-[200px]">
              <label className={`block mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                Iterations: {iterations}
              </label>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={iterations}
                onChange={(e) => setIterations(Number(e.target.value))}
                className="slider-blue w-full"
                style={{
                  '--progress': `${((iterations - 50) / (500 - 50)) * 100}%`
                } as React.CSSProperties}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleBuildModel}
                className="px-8 py-3 bg-[#FF6B4A] hover:bg-[#FF7B5A] text-white font-semibold rounded-lg transition-colors shadow-md whitespace-nowrap"
              >
                Build Model
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-[#FF6B4A] hover:bg-[#FF7B5A] text-white font-semibold rounded-lg transition-colors shadow-md whitespace-nowrap"
              >
                Reset
              </button>
            </div>
          </div>
        </SectionCard>

        <SectionCard number={4} title="Model's Growth">
          <p className={`mb-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            {modelBuilt 
              ? `Model built successfully. Use the controls to navigate through ${iterations} steps of training.`
              : "Select a dataset and parameters, then click 'Build Model'."
            }
          </p>

          {/* Navigation Controls - Only show when model is built */}
          {modelBuilt && (
            <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handlePrevious}
              disabled={currentIteration === 1}
              className="px-4 py-2 bg-[#FF6B4A] hover:bg-[#FF7B5A] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <div className="flex-1">
              <input
                type="range"
                min="1"
                max={iterations}
                value={currentIteration}
                onChange={(e) => setCurrentIteration(Number(e.target.value))}
                className="slider-blue w-full"
                style={{
                  '--progress': `${((currentIteration - 1) / (iterations - 1)) * 100}%`
                } as React.CSSProperties}
              />
            </div>

            <button
              onClick={handleNext}
              disabled={currentIteration === iterations}
              className="px-4 py-2 bg-[#FF6B4A] hover:bg-[#FF7B5A] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>

            <span className={`px-4 py-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Iteration: {currentIteration}/{iterations}
            </span>

            <button
              onClick={handlePlay}
              className="px-4 py-2 bg-[#FF6B4A] hover:bg-[#FF7B5A] text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Play
            </button>
          </div>
          )}

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Chart: Linear Regression Model */}
            <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-[#3A1B5B] transition-colors duration-150 border-2 border-purple-200 dark:border-purple-400/60 shadow-xl dark:shadow-purple-900/30 ring-2 ring-purple-100 dark:ring-purple-800/30 p-6">
              <div className="rounded-lg overflow-hidden bg-gradient-to-r from-accent-pink to-accent-purple p-4 mb-4">
                <h3 className="text-white font-semibold text-center text-sm">
                  {modelBuilt ? `Linear Regression Model (Iteration ${currentIteration})` : "Linear Regression Model - Build a model to see results"}
                </h3>
              </div>
              <div className={`rounded-b-lg p-4 transition-colors duration-150 ${
                theme === "dark" ? "bg-[#2B0B4B]" : "bg-white"
              }`}>
                {modelBuilt ? (
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={theme === "dark" ? "#4A2B6B" : "#E0E0E0"} 
                      strokeOpacity={0.6} 
                    />
                    <XAxis
                      type="number"
                      dataKey="x"
                      label={{ 
                        value: datasetData[selectedDataset].headers[0], 
                        position: "insideBottom", 
                        offset: -5, 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: "14px" } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: 12 }}
                      domain={selectedDataset === "Sales Revenue" ? [25, 60] : ['dataMin - 5', 'dataMax + 5']}
                      ticks={selectedDataset === "Sales Revenue" ? [25, 30, 35, 40, 45, 50, 55, 60] : undefined}
                    />
                    <YAxis
                      type="number"
                      label={{ 
                        value: datasetData[selectedDataset].headers[1], 
                        angle: -90, 
                        position: "insideLeft", 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: "14px" } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: 12 }}
                      domain={selectedDataset === "Sales Revenue" ? [120, 260] : ['dataMin - 10', 'dataMax + 10']}
                      ticks={selectedDataset === "Sales Revenue" ? [120, 140, 160, 180, 200, 220, 240, 260] : undefined}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "rgba(42, 11, 75, 0.95)" : "rgba(255, 255, 255, 0.95)",
                        border: theme === "dark" ? "1px solid #A66BFF" : "1px solid #A66BFF",
                        borderRadius: "8px",
                        color: theme === "dark" ? "#E9C3FF" : "#4A3566",
                      }}
                      labelStyle={{ color: theme === "dark" ? "#E9C3FF" : "#4A3566" }}
                    />
                    <Legend 
                      wrapperStyle={{ color: theme === "dark" ? "#E9C3FF" : "#4A3566", paddingTop: "10px" }}
                      iconType="square"
                      align="center"
                      verticalAlign="top"
                    />
                    <Scatter
                      data={datasetData[selectedDataset].rows}
                      dataKey="y"
                      fill="#4169E1"
                      name="Data Points"
                      shape="circle"
                    />
                    <Line
                      type="linear"
                      dataKey="y"
                      data={(() => {
                        const minX = Math.min(...datasetData[selectedDataset].rows.map(p => p.x));
                        const maxX = Math.max(...datasetData[selectedDataset].rows.map(p => p.x));
                        const minY = Math.min(...datasetData[selectedDataset].rows.map(p => p.y));
                        const maxY = Math.max(...datasetData[selectedDataset].rows.map(p => p.y));
                        const slope = (maxY - minY) / (maxX - minX);
                        const intercept = minY - slope * minX;
                        return Array.from({ length: 100 }, (_, i) => {
                          const x = minX + (maxX - minX) * (i / 99);
                          return { x, y: slope * x + intercept };
                        });
                      })()}
                      stroke="#FF0000"
                      strokeWidth={2}
                      dot={false}
                      name="Best Fit Line"
                      legendType="line"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                ) : (
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} data={[{ x: 0, y: 0 }]}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={theme === "dark" ? "#4A2B6B" : "#E0E0E0"} 
                      strokeOpacity={0.6} 
                    />
                    <XAxis
                      type="number"
                      dataKey="x"
                      label={{ 
                        value: "X Values", 
                        position: "insideBottom", 
                        offset: -5, 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: "14px" } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: 12 }}
                      domain={[0, 1.0]}
                      ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      label={{ 
                        value: "Y Values", 
                        angle: -90, 
                        position: "insideLeft", 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: "14px" } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: 12 }}
                      domain={[0, 1.0]}
                      ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Right Chart: Parameter vs Cost */}
            <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-[#3A1B5B] transition-colors duration-150 border-2 border-purple-200 dark:border-purple-400/60 shadow-xl dark:shadow-purple-900/30 ring-2 ring-purple-100 dark:ring-purple-800/30 p-6">
              <div className="rounded-lg overflow-hidden bg-gradient-to-r from-accent-pink to-accent-purple p-4 mb-4">
                <h3 className="text-white font-semibold text-center text-sm">
                  {modelBuilt ? `Parameter (θ) vs Cost (Iteration ${currentIteration})` : "Parameter vs Cost - Build a model to see results"}
                </h3>
              </div>
              <div className={`rounded-b-lg p-4 transition-colors duration-150 ${
                theme === "dark" ? "bg-[#2B0B4B]" : "bg-white"
              }`}>
                {modelBuilt ? (
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} data={costData}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={theme === "dark" ? "#4A2B6B" : "#E0E0E0"} 
                      strokeOpacity={0.6} 
                    />
                    <XAxis
                      dataKey="theta"
                      label={{ 
                        value: "Parameter (θ)", 
                        position: "insideBottom", 
                        offset: -5, 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: "14px" } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: 12 }}
                    />
                    <YAxis
                      label={{ 
                        value: "Cost", 
                        angle: -90, 
                        position: "insideLeft", 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: "14px" } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: 12 }}
                      domain={[0.15, 0.55]}
                      ticks={[0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50, 0.55]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "rgba(42, 11, 75, 0.95)" : "rgba(255, 255, 255, 0.95)",
                        border: theme === "dark" ? "1px solid #A66BFF" : "1px solid #A66BFF",
                        borderRadius: "8px",
                        color: theme === "dark" ? "#E9C3FF" : "#4A3566",
                      }}
                      labelStyle={{ color: theme === "dark" ? "#E9C3FF" : "#4A3566" }}
                    />
                    <Legend 
                      wrapperStyle={{ color: theme === "dark" ? "#E9C3FF" : "#4A3566", paddingTop: "10px" }}
                      iconType="square"
                      align="center"
                      verticalAlign="top"
                    />
                    <Area
                      type="monotone"
                      dataKey="cost"
                      stroke="#00D9FF"
                      fill="#00D9FF"
                      fillOpacity={0.3}
                      name="Cost"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                ) : (
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} data={[{ theta: "0", cost: 0 }]}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={theme === "dark" ? "#4A2B6B" : "#E0E0E0"} 
                      strokeOpacity={0.6} 
                    />
                    <XAxis
                      dataKey="theta"
                      label={{ 
                        value: "Parameter (θ)", 
                        position: "insideBottom", 
                        offset: -5, 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: "14px" } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: 12 }}
                      domain={[0, 1]}
                    />
                    <YAxis
                      dataKey="cost"
                      label={{ 
                        value: "Cost", 
                        angle: -90, 
                        position: "insideLeft", 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: "14px" } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: 12 }}
                      domain={[0, 1.0]}
                      ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

