import { useState, useEffect } from 'react';
import { DataPoint } from '@/constants/datasets';

export interface TrainingIteration {
  iteration: number;
  beta0: number;
  beta1: number;
  cost: number;
}

export interface LinearRegressionResult {
  beta0: number;
  beta1: number;
  cost: number;
  history: TrainingIteration[];
  isTraining: boolean;
}

/**
 * Custom hook that implements gradient descent for linear regression
 * @param data - Array of data points {x, y}
 * @param learningRate - Learning rate (alpha) for gradient descent
 * @param maxIterations - Maximum number of iterations to train
 * @returns Training results including parameters and history
 */
export function useLinearRegression(
  data: DataPoint[],
  learningRate: number,
  maxIterations: number
): LinearRegressionResult {
  const [beta0, setBeta0] = useState(0);
  const [beta1, setBeta1] = useState(0);
  const [cost, setCost] = useState(0);
  const [history, setHistory] = useState<TrainingIteration[]>([]);
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    if (data.length === 0) return;

    setIsTraining(true);

    // Perform gradient descent
    const trainModel = () => {
      // Initialize with better starting values (use mean)
      const meanX = data.reduce((sum, point) => sum + point.x, 0) / data.length;
      const meanY = data.reduce((sum, point) => sum + point.y, 0) / data.length;
      
      // Start with reasonable initial guess
      let currentBeta0 = meanY;
      let currentBeta1 = 0;
      
      const trainingHistory: TrainingIteration[] = [];
      const n = data.length;

      // Store initial state
      const initialPredictions = data.map(point => currentBeta0 + currentBeta1 * point.x);
      const initialErrors = data.map((point, i) => initialPredictions[i] - point.y);
      const initialCost = initialErrors.reduce((sum, error) => sum + error * error, 0) / (2 * n);
      
      trainingHistory.push({
        iteration: 0,
        beta0: currentBeta0,
        beta1: currentBeta1,
        cost: initialCost
      });

      for (let iter = 0; iter < maxIterations; iter++) {
        // Calculate predictions
        const predictions = data.map(point => currentBeta0 + currentBeta1 * point.x);

        // Calculate cost (MSE)
        const errors = data.map((point, i) => predictions[i] - point.y);
        const currentCost = errors.reduce((sum, error) => sum + error * error, 0) / (2 * n);

        // Store iteration data
        trainingHistory.push({
          iteration: iter + 1,
          beta0: currentBeta0,
          beta1: currentBeta1,
          cost: currentCost
        });

        // Calculate gradients
        const gradient0 = errors.reduce((sum, error) => sum + error, 0) / n;
        const gradient1 = errors.reduce((sum, error, i) => sum + error * data[i].x, 0) / n;

        // Update parameters
        currentBeta0 = currentBeta0 - learningRate * gradient0;
        currentBeta1 = currentBeta1 - learningRate * gradient1;
      }

      // Set final values
      setBeta0(currentBeta0);
      setBeta1(currentBeta1);
      setCost(trainingHistory[trainingHistory.length - 1]?.cost || 0);
      setHistory(trainingHistory);
      setIsTraining(false);
    };

    // Run training asynchronously to not block UI
    const timer = setTimeout(trainModel, 0);

    return () => clearTimeout(timer);
  }, [data, learningRate, maxIterations]);

  return { beta0, beta1, cost, history, isTraining };
}

/**
 * Calculate predictions for a given dataset using trained parameters
 */
export function predictValues(
  data: DataPoint[],
  beta0: number,
  beta1: number
): number[] {
  return data.map(point => beta0 + beta1 * point.x);
}

/**
 * Calculate Mean Squared Error
 */
export function calculateMSE(
  actual: number[],
  predicted: number[]
): number {
  if (actual.length !== predicted.length) return 0;
  
  const errors = actual.map((val, i) => val - predicted[i]);
  const squaredErrors = errors.map(e => e * e);
  return squaredErrors.reduce((sum, e) => sum + e, 0) / actual.length;
}

/**
 * Generate line points for visualization
 */
export function generateRegressionLine(
  xMin: number,
  xMax: number,
  beta0: number,
  beta1: number,
  numPoints: number = 100
): DataPoint[] {
  const points: DataPoint[] = [];
  const step = (xMax - xMin) / (numPoints - 1);

  for (let i = 0; i < numPoints; i++) {
    const x = xMin + step * i;
    const y = beta0 + beta1 * x;
    points.push({ x, y });
  }

  return points;
}
