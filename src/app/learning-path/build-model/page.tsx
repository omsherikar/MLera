"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import ContentHeader from "@/components/ContentHeader";
import SectionCard from "@/components/SectionCard";
import { ChevronDown, Target, ChevronLeft, ChevronRight, Play, Pause, Loader2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, Area, AreaChart, ComposedChart } from "recharts";
import { DATASETS, getDatasetByName, DataPoint } from "@/constants/datasets";
import { MODEL_CONFIG, CHART_CONFIG, HYPERPARAMETER_PRESETS } from "@/constants/modelConfig";
import { useLinearRegression, generateRegressionLine } from "@/hooks/useLinearRegression";
import { useStreak } from "@/context/StreakContext";

export default function BuildModelPage() {
  const { theme } = useTheme();
  const { completeModule } = useStreak();
  const [selectedDatasetName, setSelectedDatasetName] = useState(DATASETS[0].name);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHyperparamsDropdownOpen, setIsHyperparamsDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [learningRate, setLearningRate] = useState<number>(MODEL_CONFIG.learningRate.default);
  const [iterations, setIterations] = useState<number>(MODEL_CONFIG.iterations.default);
  const [currentIteration, setCurrentIteration] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modelBuilt, setModelBuilt] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [trainingData, setTrainingData] = useState<DataPoint[]>([]);
  const [trainingLR, setTrainingLR] = useState<number>(MODEL_CONFIG.learningRate.default);
  const [trainingIters, setTrainingIters] = useState<number>(MODEL_CONFIG.iterations.default);
  const [timeSpent, setTimeSpent] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hyperparamsDropdownRef = useRef<HTMLDivElement>(null);

  // Get current dataset
  const selectedDataset = useMemo(() => 
    getDatasetByName(selectedDatasetName) || DATASETS[0], 
    [selectedDatasetName]
  );

  // Train model using real gradient descent
  const { beta0, beta1, cost, history, isTraining } = useLinearRegression(
    trainingData,
    trainingLR,
    trainingIters
  );

  const handleBuildModel = () => {
    setIsBuilding(true);
    setModelBuilt(false);
    setCurrentIteration(1);
    
    // Simulate building delay for better UX
    setTimeout(() => {
      setTrainingData(selectedDataset.data);
      setTrainingLR(learningRate);
      setTrainingIters(iterations);
      setIsBuilding(false);
      setModelBuilt(true);
    }, MODEL_CONFIG.animation.buildDelay);
  };

  const handleReset = () => {
    setLearningRate(MODEL_CONFIG.learningRate.default);
    setIterations(MODEL_CONFIG.iterations.default);
    setSelectedDatasetName(DATASETS[0].name);
    setCurrentIteration(1);
    setIsPlaying(false);
    setModelBuilt(false);
    setIsBuilding(false);
    setTrainingData([]);
  };

  const handlePrevious = () => {
    if (currentIteration > 1) {
      setCurrentIteration(currentIteration - 1);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentIteration < trainingIters) {
      setCurrentIteration(currentIteration + 1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !modelBuilt) return;

    if (currentIteration < trainingIters) {
      const timer = setTimeout(() => {
        setCurrentIteration(prev => prev + 1);
      }, MODEL_CONFIG.animation.playbackSpeed);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, currentIteration, trainingIters, modelBuilt]);

  // Get current iteration data
  const currentIterationData = useMemo(() => {
    if (!modelBuilt || history.length === 0) return null;
    return history[Math.min(currentIteration - 1, history.length - 1)];
  }, [modelBuilt, history, currentIteration]);

  // Generate regression line for current iteration
  const regressionLineData = useMemo(() => {
    if (!currentIterationData) return [];
    return generateRegressionLine(
      selectedDataset.xDomain[0],
      selectedDataset.xDomain[1],
      currentIterationData.beta0,
      currentIterationData.beta1
    );
  }, [currentIterationData, selectedDataset]);

  // Cost history data for chart (iteration vs cost)
  const costChartData = useMemo(() => {
    if (!modelBuilt || history.length === 0) return [];
    return history.slice(0, currentIteration).map(h => ({
      iteration: h.iteration,
      cost: h.cost
    }));
  }, [modelBuilt, history, currentIteration]);

  // Track time spent on page
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      // Complete module when leaving page if model was built and spent >= 5 minutes
      if (modelBuilt && timeSpent >= 300) {
        completeModule(
          "build-linear-regression-model",
          "Build Linear Regression Model",
          timeSpent
        );
      }
    };
  }, [timeSpent, modelBuilt, completeModule]);

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
              <span>{selectedDataset.name}</span>
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {DATASETS.map((dataset, index) => (
                  <div key={dataset.id}>
                    {index > 0 && <hr className="border-gray-200" />}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDatasetName(dataset.name);
                        setIsDropdownOpen(false);
                        setModelBuilt(false);
                        setCurrentIteration(1);
                      }}
                      onMouseEnter={() => setHoveredOption(dataset.name)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className={`w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors ${
                        selectedDatasetName === dataset.name || hoveredOption === dataset.name ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      {dataset.name}
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
              {selectedDataset.description}
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
              }`}>{selectedDataset.name} Dataset</h3>
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
                        {selectedDataset.xLabel}
                      </th>
                      <th className={`px-6 py-4 text-left font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}>
                        {selectedDataset.yLabel}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDataset.data.map((row, index) => (
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
                    {selectedDataset.name} Dataset Preview
                  </h3>
                </div>
                <div className={`rounded-b-lg p-4 transition-colors duration-150 ${
                  theme === "dark" ? "bg-[#2B0B4B]" : "bg-white"
                }`}>
                  <ResponsiveContainer width="100%" height={CHART_CONFIG.scatter.height}>
                    <ScatterChart margin={CHART_CONFIG.scatter.margin}>
                      <CartesianGrid 
                        strokeDasharray={CHART_CONFIG.grid.strokeDasharray}
                        stroke={theme === "dark" ? "#4A2B6B" : "#E0E0E0"} 
                        strokeOpacity={CHART_CONFIG.grid.strokeOpacity}
                      />
                      <XAxis
                        type="number"
                        dataKey="x"
                        label={{ 
                          value: selectedDataset.xLabel, 
                          position: "insideBottom", 
                          offset: CHART_CONFIG.axis.labelOffset, 
                          style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.labelFontSize } 
                        }}
                        stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                        tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.fontSize }}
                        domain={selectedDataset.xDomain}
                        ticks={selectedDataset.xTicks}
                      />
                      <YAxis
                        type="number"
                        dataKey="y"
                        label={{ 
                          value: selectedDataset.yLabel, 
                          angle: -90, 
                          position: "insideLeft", 
                          style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.labelFontSize } 
                        }}
                        stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                        tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.fontSize }}
                        domain={selectedDataset.yDomain}
                        ticks={selectedDataset.yTicks}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme === "dark" ? "rgba(42, 11, 75, 0.95)" : "rgba(255, 255, 255, 0.95)",
                          border: theme === "dark" ? "1px solid #A66BFF" : "1px solid #A66BFF",
                          borderRadius: CHART_CONFIG.tooltip.borderRadius,
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
                        data={selectedDataset.data}
                        dataKey="y"
                        fill={CHART_CONFIG.scatter.dataPointColor}
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
                {HYPERPARAMETER_PRESETS.map((preset, index) => (
                  <tr key={index} className={`border-t ${
                    theme === "dark" ? "border-white/10" : "border-gray-200"
                  } ${
                    theme === "dark" 
                      ? index % 2 === 0 ? "bg-[#3A1B5B]" : "bg-[#2B0B4B]"
                      : index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}>
                    <td className={`px-6 py-4 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}>{preset.learningRate}</td>
                    <td className={`px-6 py-4 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}>{preset.iterations}</td>
                    <td className={`px-6 py-4 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}>{preset.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={`mb-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            <strong>Tip:</strong> If the cost function plot oscillates or increases, try reducing the learning rate.
          </p>

          {/* Interactive Controls */}
          <div className="flex items-end gap-4 flex-wrap mb-6">
            {/* Dataset Dropdown for Training */}
            <div className="flex-1 min-w-[200px] relative z-10">
              <label className={`block mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                Dataset for Training:
              </label>
              <div className="relative w-full" ref={hyperparamsDropdownRef}>
                <button
                  type="button"
                  onClick={() => !isBuilding && setIsHyperparamsDropdownOpen(!isHyperparamsDropdownOpen)}
                  disabled={isBuilding}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-between transition-colors ${
                    isBuilding 
                      ? 'bg-gray-200 cursor-not-allowed border-gray-300' 
                      : 'bg-white hover:border-purple-400 border-purple-300'
                  }`}
                >
                  <span className="text-gray-900">{selectedDataset.name}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isHyperparamsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isHyperparamsDropdownOpen && !isBuilding && (
                  <div className="absolute z-[100] w-full mt-1 bg-white border-2 border-purple-500 rounded-lg shadow-lg overflow-hidden">
                    {DATASETS.map((dataset, index) => (
                      <div key={dataset.id}>
                        {index > 0 && <hr className="border-gray-200" />}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDatasetName(dataset.name);
                            setIsHyperparamsDropdownOpen(false);
                            setModelBuilt(false);
                            setCurrentIteration(1);
                          }}
                          onMouseEnter={() => setHoveredOption(dataset.name)}
                          onMouseLeave={() => setHoveredOption(null)}
                          className={`w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-100 transition-colors ${
                            selectedDatasetName === dataset.name || hoveredOption === dataset.name ? 'bg-gray-100' : 'bg-white'
                          }`}
                        >
                          {dataset.name}
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
                {MODEL_CONFIG.learningRate.label}: {learningRate.toFixed(3)}
              </label>
              <input
                type="range"
                min={MODEL_CONFIG.learningRate.min}
                max={MODEL_CONFIG.learningRate.max}
                step={MODEL_CONFIG.learningRate.step}
                value={learningRate}
                onChange={(e) => setLearningRate(Number(e.target.value))}
                disabled={isBuilding}
                className="slider-blue w-full"
                style={{
                  '--progress': `${((learningRate - MODEL_CONFIG.learningRate.min) / (MODEL_CONFIG.learningRate.max - MODEL_CONFIG.learningRate.min)) * 100}%`
                } as React.CSSProperties}
              />
            </div>

            {/* Iterations Slider */}
            <div className="flex-1 min-w-[200px]">
              <label className={`block mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                {MODEL_CONFIG.iterations.label}: {iterations}
              </label>
              <input
                type="range"
                min={MODEL_CONFIG.iterations.min}
                max={MODEL_CONFIG.iterations.max}
                step={MODEL_CONFIG.iterations.step}
                value={iterations}
                onChange={(e) => setIterations(Number(e.target.value))}
                disabled={isBuilding}
                className="slider-blue w-full"
                style={{
                  '--progress': `${((iterations - MODEL_CONFIG.iterations.min) / (MODEL_CONFIG.iterations.max - MODEL_CONFIG.iterations.min)) * 100}%`
                } as React.CSSProperties}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleBuildModel}
                disabled={isBuilding}
                className="px-8 py-3 bg-[#FF6B4A] hover:bg-[#FF7B5A] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-md whitespace-nowrap flex items-center gap-2"
              >
                {isBuilding ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Building...
                  </>
                ) : (
                  'Build Model'
                )}
              </button>
              <button
                onClick={handleReset}
                disabled={isBuilding}
                className="px-8 py-3 bg-[#FF6B4A] hover:bg-[#FF7B5A] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-md whitespace-nowrap"
              >
                Reset
              </button>
            </div>
          </div>
          
          {/* Spacer for dropdown visibility */}
          <div className="h-40"></div>
        </SectionCard>

        <SectionCard number={4} title="Model's Growth">
          <p className={`mb-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            {isBuilding ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Training model with gradient descent...
              </span>
            ) : modelBuilt ? (
              <>
                Model trained successfully! Navigate through {trainingIters} iterations to see how parameters converge.
                <br />
                <span className="text-sm opacity-80">
                  β₀ = {currentIterationData?.beta0.toFixed(4)}, β₁ = {currentIterationData?.beta1.toFixed(4)}, Cost = {currentIterationData?.cost.toFixed(4)}
                </span>
              </>
            ) : (
              "Select a dataset and parameters, then click 'Build Model'."
            )}
          </p>

          {/* Navigation Controls - Only show when model is built */}
          {modelBuilt && !isBuilding && (
            <div className="flex items-center gap-4 mb-8 flex-wrap">
            <button
              onClick={handlePrevious}
              disabled={currentIteration === 1}
              className="px-4 py-2 bg-[#FF6B4A] hover:bg-[#FF7B5A] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <div className="flex-1 min-w-[200px]">
              <input
                type="range"
                min="1"
                max={trainingIters}
                value={currentIteration}
                onChange={(e) => {
                  setCurrentIteration(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className="slider-blue w-full"
                style={{
                  '--progress': `${((currentIteration - 1) / (trainingIters - 1)) * 100}%`
                } as React.CSSProperties}
              />
            </div>

            <button
              onClick={handleNext}
              disabled={currentIteration === trainingIters}
              className="px-4 py-2 bg-[#FF6B4A] hover:bg-[#FF7B5A] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>

            <span className={`px-4 py-2 ${theme === "dark" ? "text-white" : "text-gray-800"} whitespace-nowrap`}>
              Iteration: {currentIteration}/{trainingIters}
            </span>

            <button
              onClick={handlePlayPause}
              className="px-4 py-2 bg-[#FF6B4A] hover:bg-[#FF7B5A] text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Play
                </>
              )}
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
                {modelBuilt && currentIterationData ? (
                <ResponsiveContainer width="100%" height={CHART_CONFIG.scatter.height}>
                  <ComposedChart margin={CHART_CONFIG.scatter.margin}>
                    <CartesianGrid 
                      strokeDasharray={CHART_CONFIG.grid.strokeDasharray}
                      stroke={theme === "dark" ? "#4A2B6B" : "#E0E0E0"} 
                      strokeOpacity={CHART_CONFIG.grid.strokeOpacity}
                    />
                    <XAxis
                      type="number"
                      dataKey="x"
                      label={{ 
                        value: selectedDataset.xLabel, 
                        position: "insideBottom", 
                        offset: CHART_CONFIG.axis.labelOffset, 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.labelFontSize } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.fontSize }}
                      domain={selectedDataset.xDomain}
                      ticks={selectedDataset.xTicks}
                    />
                    <YAxis
                      type="number"
                      label={{ 
                        value: selectedDataset.yLabel, 
                        angle: -90, 
                        position: "insideLeft", 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.labelFontSize } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.fontSize }}
                      domain={selectedDataset.yDomain}
                      ticks={selectedDataset.yTicks}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "rgba(42, 11, 75, 0.95)" : "rgba(255, 255, 255, 0.95)",
                        border: theme === "dark" ? "1px solid #A66BFF" : "1px solid #A66BFF",
                        borderRadius: CHART_CONFIG.tooltip.borderRadius,
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
                      data={selectedDataset.data}
                      dataKey="y"
                      fill={CHART_CONFIG.scatter.dataPointColor}
                      name="Data Points"
                      shape="circle"
                    />
                    <Line
                      type="linear"
                      dataKey="y"
                      data={regressionLineData}
                      stroke={CHART_CONFIG.line.regressionLineColor}
                      strokeWidth={CHART_CONFIG.line.strokeWidth}
                      dot={false}
                      name="Regression Line"
                      legendType="line"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                ) : (
                <ResponsiveContainer width="100%" height={CHART_CONFIG.scatter.height}>
                  <ComposedChart margin={CHART_CONFIG.scatter.margin} data={[{ x: 0, y: 0 }]}>
                    <CartesianGrid 
                      strokeDasharray={CHART_CONFIG.grid.strokeDasharray}
                      stroke={theme === "dark" ? "#4A2B6B" : "#E0E0E0"} 
                      strokeOpacity={CHART_CONFIG.grid.strokeOpacity}
                    />
                    <XAxis
                      type="number"
                      dataKey="x"
                      label={{ 
                        value: "X Values", 
                        position: "insideBottom", 
                        offset: CHART_CONFIG.axis.labelOffset, 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.labelFontSize } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.fontSize }}
                      domain={[0, 1.0]}
                      ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      label={{ 
                        value: "Y Values", 
                        angle: -90, 
                        position: "insideLeft", 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.labelFontSize } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.fontSize }}
                      domain={[0, 1.0]}
                      ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Right Chart: Cost vs Iteration */}
            <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-[#3A1B5B] transition-colors duration-150 border-2 border-purple-200 dark:border-purple-400/60 shadow-xl dark:shadow-purple-900/30 ring-2 ring-purple-100 dark:ring-purple-800/30 p-6">
              <div className="rounded-lg overflow-hidden bg-gradient-to-r from-accent-pink to-accent-purple p-4 mb-4">
                <h3 className="text-white font-semibold text-center text-sm">
                  {modelBuilt ? `Cost Function Over Time (Iteration ${currentIteration})` : "Cost Function - Build a model to see results"}
                </h3>
              </div>
              <div className={`rounded-b-lg p-4 transition-colors duration-150 ${
                theme === "dark" ? "bg-[#2B0B4B]" : "bg-white"
              }`}>
                {modelBuilt && costChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={CHART_CONFIG.scatter.height}>
                  <AreaChart margin={CHART_CONFIG.scatter.margin} data={costChartData}>
                    <CartesianGrid 
                      strokeDasharray={CHART_CONFIG.grid.strokeDasharray}
                      stroke={theme === "dark" ? "#4A2B6B" : "#E0E0E0"} 
                      strokeOpacity={CHART_CONFIG.grid.strokeOpacity}
                    />
                    <XAxis
                      dataKey="iteration"
                      label={{ 
                        value: "Iteration", 
                        position: "insideBottom", 
                        offset: CHART_CONFIG.axis.labelOffset, 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.labelFontSize } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.fontSize }}
                    />
                    <YAxis
                      label={{ 
                        value: "Cost (MSE)", 
                        angle: -90, 
                        position: "insideLeft", 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.labelFontSize } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.fontSize }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "rgba(42, 11, 75, 0.95)" : "rgba(255, 255, 255, 0.95)",
                        border: theme === "dark" ? "1px solid #A66BFF" : "1px solid #A66BFF",
                        borderRadius: CHART_CONFIG.tooltip.borderRadius,
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
                      stroke={CHART_CONFIG.line.costLineColor}
                      fill={CHART_CONFIG.line.costLineColor}
                      fillOpacity={0.3}
                      name="Cost"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                ) : (
                <ResponsiveContainer width="100%" height={CHART_CONFIG.scatter.height}>
                  <AreaChart margin={CHART_CONFIG.scatter.margin} data={[{ iteration: 0, cost: 0 }]}>
                    <CartesianGrid 
                      strokeDasharray={CHART_CONFIG.grid.strokeDasharray}
                      stroke={theme === "dark" ? "#4A2B6B" : "#E0E0E0"} 
                      strokeOpacity={CHART_CONFIG.grid.strokeOpacity}
                    />
                    <XAxis
                      dataKey="iteration"
                      label={{ 
                        value: "Iteration", 
                        position: "insideBottom", 
                        offset: CHART_CONFIG.axis.labelOffset, 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.labelFontSize } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.fontSize }}
                      domain={[0, 100]}
                    />
                    <YAxis
                      dataKey="cost"
                      label={{ 
                        value: "Cost (MSE)", 
                        angle: -90, 
                        position: "insideLeft", 
                        style: { fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.labelFontSize } 
                      }}
                      stroke={theme === "dark" ? "#E9C3FF" : "#4A3566"}
                      tick={{ fill: theme === "dark" ? "#E9C3FF" : "#4A3566", fontSize: CHART_CONFIG.axis.fontSize }}
                      domain={[0, 1.0]}
                      ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
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

