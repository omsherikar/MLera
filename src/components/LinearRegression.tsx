"use client";

import SectionCard from "@/components/SectionCard";
import MathCard from "@/components/MathCard";
import GraphCard from "@/components/GraphCard";
import DefinitionBox from "@/components/DefinitionBox";
import InteractiveRegressionCard from "@/components/InteractiveRegressionCard";
import { Lightbulb, AlertTriangle, Check, X, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LinearRegression() {
  const sampleData = [
    { x: 1, y: 2.5 },
    { x: 2, y: 3.8 },
    { x: 3, y: 5.2 },
    { x: 4, y: 6.1 },
    { x: 5, y: 7.5 },
    { x: 6, y: 8.9 },
    { x: 7, y: 10.2 },
  ];

  const studyHoursData = [
    { x: 1, y: 42 },
    { x: 2, y: 50 },
    { x: 3, y: 47 },
    { x: 4, y: 60 },
    { x: 5, y: 70 },
    { x: 6, y: 72 },
    { x: 7, y: 82 },
  ];

  const interactiveData = [
    { x: 0.5, y: 32 },
    { x: 1.5, y: 45 },
    { x: 2.5, y: 50 },
    { x: 3.5, y: 55 },
    { x: 4.5, y: 65 },
    { x: 5.5, y: 72 },
    { x: 6.5, y: 78 },
    { x: 7.5, y: 85 },
    { x: 8.5, y: 90 },
    { x: 9.5, y: 95 },
  ];

  return (
    <div className="pb-20">
      {/* Module 1: What is Linear Regression? */}
      <SectionCard number={1} title="What is Linear Regression?">
        <p>
          Linear Regression is one of the most fundamental and widely used techniques in the field of machine learning and statistics. At its core, it's a method for modeling the relationship between a <span className="text-[#00D9FF] font-semibold">dependent variable</span> (often denoted as Y) and one or more <span className="text-[#00D9FF] font-semibold">independent variables(X)</span> by fitting a linear equation to the observed data.
        </p>
        <DefinitionBox title="Definition:">
          Linear Regression is a <span className="text-[#00D9FF] font-semibold">supervised learning</span> algorithm that predicts a continuous output value based on one or more input <span className="text-[#00D9FF] font-semibold">features</span>, assuming a linear relationship between the inputs and the output.
        </DefinitionBox>
      </SectionCard>

      {/* Module 2: Mathematical Formulation */}
      <SectionCard number={2} title="Mathematical Formulation">
        <p>
          The simplest form of Linear Regression (Simple Linear Regression) can be expressed as:
        </p>
        <MathCard equation="Y = \\beta_0 + \\beta_1 X + \\epsilon" />
        <p className="mt-4">Where:</p>
        <ul className="list-none space-y-2 ml-0">
          <li>
            <strong>→ Y</strong> is the dependent variable (what we're trying to predict)
          </li>
          <li>
            <strong>→ X</strong> is the independent variable (our input feature)
          </li>
          <li>
            <strong>→ β₀</strong> is the y-intercept (the value of Y when X = 0)
          </li>
          <li>
            <strong>→ β₁</strong> is the slope (how much Y changes when X increases by 1 unit)
          </li>
          <li>
            <strong>→ ε (epsilon)</strong> represents the error term (the part of Y that can't be explained by the model)
          </li>
        </ul>
        <div className="mt-6 rounded-xl p-6 bg-gray-50 dark:bg-[#3A1B5B] border-l-4 border-[#FF8B6B] transition-colors duration-150">
          <p>
            The goal of Linear Regression is to find the values of <strong>β₀</strong>, and <strong>β₁</strong>, that minimize the sum of squared differences between the actual <strong>Y</strong> values and the values predicted by our model.
          </p>
        </div>
      </SectionCard>

      {/* Module 3: Intuition behind LR */}
      <SectionCard number={3} title="Intuition behind LR">
        <p>
          Imagine you're trying to understand the relationship between study hours and exam scores. Intuitively, you might expect that more study hours lead to higher scores. Linear Regression formalizes this intuition by finding the straight line that best represents this relationship.
        </p>
        <div className="mt-16">
          <GraphCard
            title="Relationship Between Study Hours and Exam Scores"
            data={studyHoursData}
            slope={6.5}
            intercept={35}
            xAxisLabel="Study Hours"
            yAxisLabel="Exam Score"
          />
        </div>
        <p className="mt-16">
          In the visualization above, each point represents a student's study hours (x-axis) and their exam score (y-axis). The straight line is the <span className="text-[#00D9FF] font-semibold">best fit</span> line determined by Linear Regression, which minimizes the overall distance between the line and all data points.
        </p>
        <p className="mt-4">
          If we know this relationship, we can make predictions. For example, if a student studies for 6 hours, we can use our regression line to predict their likely exam score.
        </p>
        <p className="mt-4">
          Our goal in linear regression is to find the values of <strong>β₀</strong> and <strong>β₁</strong> (or all the <strong>β</strong> coefficients in multiple regression) that <span className="text-[#00D9FF] font-semibold">best fit</span> our data. But what does <span className="text-[#00D9FF] font-semibold">best fit</span> mean mathematically? That's where the cost function comes in.
        </p>
      </SectionCard>

      {/* Module 4: Cost Function (MSE) */}
      <SectionCard number={4} title="Understanding the Cost Function (MSE)">
        <p>
          To find the best-fitting line, we need a way to measure how well any given line fits our data. The cost function quantifies how 'wrong' our model's predictions are compared to the actual values. In linear regression, we typically use the <span className="text-[#00D9FF] font-semibold">Mean Squared Error (MSE)</span> as our cost function.
        </p>
        <p className="mt-4">
          For a dataset with n observations, the MSE is calculated as:
        </p>
        <div className="mt-4">
          <MathCard equation="MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2" />
        </div>
        <p className="mt-4">Where:</p>
        <ul className="list-none space-y-2 ml-0">
          <li>
            <strong>→ n</strong> is the number of observations
          </li>
          <li>
            <strong>→ yᵢ</strong> is the actual value of the dependent variable for observation i
          </li>
          <li>
            <strong>→ ŷᵢ</strong> the predicted value for observation i
          </li>
        </ul>
        <p className="mt-6">
          Substituting our linear regression equation into MSE formula:
        </p>
        <div className="mt-4">
          <MathCard equation="MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - (\\beta_0 + \\beta_1 x_i))^2" />
        </div>
        <p className="mt-6">
          We've defined the cost function (typically Mean Squared Error), the next step in Linear Regression is to minimize this error by finding the optimal values of the parameters:
        </p>
        <ul className="list-none space-y-2 ml-0 mt-4">
          <li>
            <strong>→ β₀</strong> (intercept)
          </li>
          <li>
            <strong>→ β₁</strong> (slope)
          </li>
        </ul>
        <p className="mt-6">
          There are two main techniques used to find these optimal parameters:
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-4 mt-4">
          <li>
            <strong>Ordinary Least Square (OLS)</strong>
          </li>
          <li>Gradient Descent</li>
        </ol>
      </SectionCard>

      {/* Module 5: Ordinary Least Squares (OLS) */}
      <SectionCard number={5} title="Ordinary Least Square (OLS)">
        <p>
          OLS is a <span className="text-[#00D9FF] font-semibold">closed-form analytical solution</span> derived by differentiating the cost function and setting the derivatives to zero. It gives a direct formula to compute the best-fitting line.
        </p>
        <p className="mt-4">
          For a simple linear regression (one feature), the formulas are:
        </p>
        <p className="font-semibold mb-2 mt-4">Slope (β₁):</p>
        <MathCard equation="\\beta_1 = \\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum_{i=1}^{n} (x_i - \\bar{x})^2} = \\frac{Cov(x,y)}{Var(x)}" />
        <div className="mt-4">
          <MathCard equation="\\beta_0 = \\bar{y} - \\beta_1 \\bar{x}" />
        </div>
        <p className="mt-4 mb-20">
          where <strong>x̄</strong> and <strong>ȳ</strong> are the means of the x and y values respectively.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl p-6 bg-gradient-to-r from-green-900/40 via-green-800/20 to-transparent dark:bg-gradient-to-r dark:from-green-900/40 dark:via-green-800/20 dark:to-transparent border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <h4 className="font-semibold text-white text-lg">Pros:</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white text-base">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span>Fast and exact</span>
              </li>
              <li className="flex items-center gap-3 text-white text-base">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span>Best for small to medium datasets</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl p-6 bg-gradient-to-r from-red-900/40 via-red-800/20 to-transparent dark:bg-gradient-to-r dark:from-red-900/40 dark:via-red-800/20 dark:to-transparent border-l-4 border-red-500">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <h4 className="font-semibold text-white text-lg">Cons:</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white text-base">
                <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Not ideal for high-dimensional data</span>
              </li>
              <li className="flex items-center gap-3 text-white text-base">
                <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Becomes computationally expensive when data is very large</span>
              </li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* Module 6: Gradient Descent */}
      <SectionCard number={6} title="Gradient Descent">
        <p>
          Gradient Descent is an <span className="text-[#00D9FF] font-semibold">iterative optimization algorithm</span>. It starts with random initial values for β₀ and β₁, and gradually updates them to minimize the cost.
        </p>
        <p className="font-semibold mb-2 mt-6">The update rules are:</p>
        <div className="mt-4">
          <MathCard equation="\\beta_1 := \\beta_1 - \\alpha \\frac{\\partial J}{\\partial \\beta_1} = \\beta_1 - \\alpha \\frac{1}{m} \\sum_{i=1}^{m} (\\hat{y}_i - y_i) \\cdot x_i" />
        </div>
        <div className="mt-4">
          <MathCard equation="\\beta_0 := \\beta_0 - \\alpha \\frac{\\partial J}{\\partial \\beta_0} = \\beta_0 - \\alpha \\frac{1}{m} \\sum_{i=1}^{m} (\\hat{y}_i - y_i)" />
        </div>
        <p className="mt-6">Where:</p>
        <ul className="list-none space-y-2 ml-0 mt-4">
          <li>
            <strong>→ α</strong> is the learning rate (step size)
          </li>
          <li>
            <strong>→ m</strong> is the number of training examples
          </li>
          <li>
            <strong>→ ŷᵢ</strong> is the predicted value for the i-th example
          </li>
          <li>
            <strong>→ yᵢ</strong> is the actual value for the i-th example
          </li>
          <li>
            <strong>→ xᵢ</strong> is the feature value for the i-th example
          </li>
        </ul>
        <div className="grid md:grid-cols-2 gap-6 mt-8 mb-6">
          <div className="rounded-xl p-6 bg-gradient-to-r from-green-900/40 via-green-800/20 to-transparent dark:bg-gradient-to-r dark:from-green-900/40 dark:via-green-800/20 dark:to-transparent border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <h4 className="font-semibold text-white text-lg">Pros:</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white text-base">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span>Scales well to large datasets and high dimensions</span>
              </li>
              <li className="flex items-center gap-3 text-white text-base">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span>Allows for online learning (data coming in streams)</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl p-6 bg-gradient-to-r from-red-900/40 via-red-800/20 to-transparent dark:bg-gradient-to-r dark:from-red-900/40 dark:via-red-800/20 dark:to-transparent border-l-4 border-red-500">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <h4 className="font-semibold text-white text-lg">Cons:</h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white text-base">
                <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>Requires tuning of learning rate</span>
              </li>
              <li className="flex items-center gap-3 text-white text-base">
                <X className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>May get stuck in local minima (though MSE has a convex surface, so for linear regression, this is less of a problem)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="rounded-xl p-6 bg-gradient-to-r from-yellow-900/40 via-yellow-800/20 to-transparent dark:bg-gradient-to-r dark:from-yellow-900/40 dark:via-yellow-800/20 dark:to-transparent border-l-4 border-yellow-500 mt-6">
          <h4 className="font-semibold text-yellow-400 text-lg mb-4">Intuitive Explanation</h4>
          <p className="text-white text-base mb-4">
            Think of gradient descent as descending a hill to find the lowest point (minimum). At each step:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-white text-base">
            <li>Look around to find the steepest downward direction (gradient)</li>
            <li>Take a step in that direction (parameter update)</li>
            <li>Repeat until you reach the bottom (convergence)</li>
          </ol>
        </div>
      </SectionCard>

      {/* Module 7: Visual Representation */}
      <SectionCard number={7} title="Visual Representation">
        <p>
          Let's explore how changing the intercept and slope affects our regression line:
        </p>
        <div className="mt-6">
          <InteractiveRegressionCard data={interactiveData} />
        </div>
        <p className="mt-8">
          As you adjust the sliders, observe how the regression line changes:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
          <li>The intercept moves the line up or down (where it crosses the y-axis)</li>
          <li>The slope changes how steep the line is (positive slopes go up, negative slopes go down)</li>
        </ul>
        <div className="mt-6 rounded-xl p-6 bg-gray-50 dark:bg-[#3A1B5B] border-l-4 border-[#FF8B6B] transition-colors duration-150">
          <p>
            Notice that some lines fit the data better than others. The best line is the one that minimizes the total error between the line and the actual data points.
          </p>
        </div>
      </SectionCard>

      {/* Coming Up Next */}
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <div className="rounded-xl p-6 bg-[#2B0B4B] dark:bg-[#2B0B4B] border border-purple-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-accent-pink text-sm mb-2">Coming Up Next:</p>
              <h3 className="text-white text-2xl font-bold mb-2">Build a Linear Regression Model</h3>
              <p className="text-white text-base">
                Now that the theory is clear, build an interactive model.
              </p>
            </div>
            <Link href="/learning-path/build-model" className="ml-6 px-6 py-3 bg-[#FF6B4A] hover:bg-[#FF7B5A] text-white font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-md">
              <span>Continue</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

