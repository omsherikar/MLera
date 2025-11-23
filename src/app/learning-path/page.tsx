"use client";

import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import ContentHeader from "@/components/ContentHeader";
import LinearRegression from "@/components/LinearRegression";

export default function LearningPathPage() {
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

