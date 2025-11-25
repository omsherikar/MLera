"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import ContentHeader from "@/components/ContentHeader";
import LinearRegression from "@/components/LinearRegression";
import { useStreak } from "@/context/StreakContext";

export default function LearningPathPage() {
  const [timeSpent, setTimeSpent] = useState(0);
  const { completeModule } = useStreak();

  // Track time spent on page
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      // Complete module when leaving page if spent >= 5 minutes
      if (timeSpent >= 300) {
        completeModule(
          "linear-regression-theory",
          "Linear Regression Theory",
          timeSpent
        );
      }
    };
  }, [timeSpent, completeModule]);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-gradient-to-b dark:from-[#16002C] dark:to-[#30004A] transition-colors duration-150">
      <Navbar />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Learning Path", href: "/learning-path" },
          { label: "...", href: "/" },
          { label: "Content" },
        ]}
      />
      <ContentHeader
        title="Introduction to Linear Regression"
        currentModule={2}
        totalModules={5}
        onPrevious={() => {}}
      />
      <LinearRegression />
    </div>
  );
}

