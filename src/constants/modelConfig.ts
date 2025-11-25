export const MODEL_CONFIG = {
  learningRate: {
    min: 0.0001,
    max: 0.01,
    default: 0.001,
    step: 0.0001,
    label: 'Learning Rate (α)'
  },
  iterations: {
    min: 50,
    max: 500,
    default: 200,
    step: 10,
    label: 'Iterations'
  },
  animation: {
    playbackSpeed: 50, // ms per iteration (faster playback)
    buildDelay: 1500 // ms for model building animation
  }
} as const;

export const CHART_CONFIG = {
  scatter: {
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    height: 350,
    dataPointColor: '#4169E1',
    dataPointRadius: 6
  },
  line: {
    strokeWidth: 2,
    regressionLineColor: '#FF0000',
    costLineColor: '#00D9FF'
  },
  grid: {
    strokeDasharray: '3 3',
    strokeOpacity: 0.6
  },
  axis: {
    fontSize: 12,
    labelFontSize: 14,
    labelOffset: -5
  },
  tooltip: {
    borderRadius: '8px'
  }
} as const;

export const HYPERPARAMETER_PRESETS = [
  {
    learningRate: '0.0001 - 0.0005',
    iterations: '300 - 500',
    effect: 'Very slow, stable convergence (best for large-scale data)'
  },
  {
    learningRate: '0.0005 - 0.002',
    iterations: '150 - 300',
    effect: 'Balanced convergence (recommended starting point)'
  },
  {
    learningRate: '0.002 - 0.01',
    iterations: '50 - 150',
    effect: 'Fast convergence (may need tuning for optimal results)'
  }
] as const;
