export interface DataPoint {
  x: number;
  y: number;
}

export interface Dataset {
  id: string;
  name: string;
  xLabel: string;
  yLabel: string;
  data: DataPoint[];
  description: string;
  xDomain: [number, number];
  yDomain: [number, number];
  xTicks: number[];
  yTicks: number[];
}

export const DATASETS: Dataset[] = [
  {
    id: 'sales',
    name: 'Sales Revenue',
    xLabel: 'Marketing Budget (thousands $)',
    yLabel: 'Sales Revenue (thousands $)',
    description: 'Sales Revenue Dataset\nThis dataset shows the relationship between marketing budget (in thousands of dollars) and sales revenue (in thousands of dollars). It demonstrates how increased marketing investment typically leads to higher sales revenue, making it ideal for understanding positive linear correlation in business contexts.',
    xDomain: [20, 65],
    yDomain: [110, 270],
    xTicks: [20, 30, 40, 50, 60],
    yTicks: [120, 160, 200, 240],
    data: [
      { x: 23.1, y: 142.5 },
      { x: 26.4, y: 151.2 },
      { x: 30.2, y: 168.3 },
      { x: 32.8, y: 175.8 },
      { x: 35.5, y: 181.4 },
      { x: 39.1, y: 195.7 },
      { x: 41.6, y: 203.9 },
      { x: 44.3, y: 212.6 },
      { x: 47.9, y: 224.1 },
      { x: 51.2, y: 232.8 },
      { x: 54.8, y: 241.5 },
      { x: 57.5, y: 252.3 },
      { x: 60.9, y: 263.8 }
    ]
  },
  {
    id: 'housing',
    name: 'Housing Prices',
    xLabel: 'House Size (square meters)',
    yLabel: 'Price (thousands $)',
    description: 'Housing Prices Dataset\nThis dataset contains information about house sizes (in square meters) and their corresponding prices (in thousands of dollars). It\'s perfect for understanding how property size affects market value and demonstrates real estate pricing patterns through linear regression.',
    xDomain: [45, 125],
    yDomain: [140, 360],
    xTicks: [50, 70, 90, 110],
    yTicks: [150, 200, 250, 300, 350],
    data: [
      { x: 52.3, y: 165.8 },
      { x: 58.7, y: 182.4 },
      { x: 64.2, y: 198.5 },
      { x: 71.5, y: 219.3 },
      { x: 78.9, y: 238.7 },
      { x: 85.4, y: 256.2 },
      { x: 92.1, y: 274.9 },
      { x: 98.6, y: 291.5 },
      { x: 105.3, y: 310.8 },
      { x: 112.8, y: 331.2 },
      { x: 119.4, y: 349.6 }
    ]
  },
  {
    id: 'salary',
    name: 'Salary vs Experience',
    xLabel: 'Years of Experience',
    yLabel: 'Annual Salary ($)',
    description: 'Salary vs Experience Dataset\nThis dataset illustrates the relationship between years of professional experience and annual salary (in dollars). It shows how career progression and accumulated experience typically result in higher compensation, making it excellent for understanding career growth patterns.',
    xDomain: [0, 12],
    yDomain: [38000, 82000],
    xTicks: [1, 3, 5, 7, 9, 11],
    yTicks: [40000, 50000, 60000, 70000, 80000],
    data: [
      { x: 1.2, y: 41200 },
      { x: 2.1, y: 44800 },
      { x: 2.9, y: 48500 },
      { x: 3.8, y: 52300 },
      { x: 4.5, y: 55900 },
      { x: 5.3, y: 59100 },
      { x: 6.2, y: 62800 },
      { x: 7.1, y: 66400 },
      { x: 8.0, y: 70200 },
      { x: 8.9, y: 73500 },
      { x: 9.7, y: 76900 },
      { x: 10.6, y: 80300 }
    ]
  }
];

export const getDatasetById = (id: string): Dataset | undefined => {
  return DATASETS.find(dataset => dataset.id === id);
};

export const getDatasetByName = (name: string): Dataset | undefined => {
  return DATASETS.find(dataset => dataset.name === name);
};
