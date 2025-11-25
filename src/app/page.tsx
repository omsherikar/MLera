"use client";

import Navbar from "@/components/Navbar";
import StreakDisplay from "@/components/StreakDisplay";
import HomeFeatureCard from "@/components/HomeFeatureCard";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BrainCircuit, Trophy, FlaskConical, Target, Database } from "lucide-react";
import { DATASETS } from "@/constants/datasets";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#16002C] to-[#30004A] dark:from-[#16002C] dark:to-[#30004A] transition-colors duration-300">
      <Navbar />
      <div className="max-w-[1200px] mx-auto px-6 pt-[80px] pb-20">
        {/* Hero */}
        <div className="text-center py-20 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[600px] bg-purple-700/30 blur-[140px] rounded-full opacity-40" />
            <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[400px] h-[400px] bg-pink-600/20 blur-[120px] rounded-full opacity-30" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Welcome to MLera
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your comprehensive learning platform for machine learning and data science
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Link
              href="/learning-path"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Start Learning
            </Link>
            <Link
              href="/courses"
              className="px-8 py-3 rounded-full border-2 border-gray-400 text-gray-300 font-semibold hover:border-accent-pink transition-colors"
            >
              My Courses
            </Link>
          </div>
          
          {/* Streak Display */}
          <div className="max-w-4xl mx-auto">
            <StreakDisplay />
          </div>
        </div>

        {/* Features Grid */}
        <section className="mt-4">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Platform Pillars</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HomeFeatureCard
              title="Interactive Model Builder"
              description="Tune hyperparameters, watch gradient descent unfold, and understand learning dynamics in real-time."
              href="/learning-path/build-model"
              icon={<FlaskConical className="w-7 h-7" />}
            />
            <HomeFeatureCard
              title="Structured Learning Path"
              description="Follow a guided progression from linear regression fundamentals to hands-on implementation."
              href="/learning-path"
              icon={<BrainCircuit className="w-7 h-7" />}
            />
            <HomeFeatureCard
              title="Achievements & Milestones"
              description="Stay motivated with streak goals, milestone celebrations, and progression tracking."
              href="/achievements"
              icon={<Trophy className="w-7 h-7" />}
            />
            <HomeFeatureCard
              title="Daily Challenges"
              description="Apply concepts through bite-sized tasks to reinforce retention and mastery."
              href="/challenges"
              icon={<Target className="w-7 h-7" />}
            />
            <HomeFeatureCard
              title="Realistic Datasets"
              description="Experiment with curated datasets featuring natural variance for authentic training dynamics."
              href="/datasets"
              icon={<Database className="w-7 h-7" />}
            />
            <HomeFeatureCard
              title="Concept Lexicon"
              description="Quickly reference ML terminology as you learn and build models."
              href="/lexicon"
              icon={<BrainCircuit className="w-7 h-7" />}
            />
          </div>
        </section>

        {/* Dataset Preview */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Available Datasets</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {DATASETS.map(ds => (
              <div key={ds.name} className="rounded-xl border border-purple-500/30 bg-[#2A0F4A]/50 p-5 backdrop-blur-sm hover:border-pink-400/40 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">{ds.name}</h3>
                <p className="text-xs text-gray-300 mb-4">{ds.description}</p>
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>Points: <span className="text-pink-300 font-semibold">{ds.data.length}</span></span>
                  <span>X Range: <span className="text-pink-300 font-semibold">{ds.xDomain[0]}–{ds.xDomain[1]}</span></span>
                  <span>Y Range: <span className="text-pink-300 font-semibold">{ds.yDomain[0]}–{ds.yDomain[1]}</span></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Learn Theory',
                body: 'Start with core concepts explained visually and interactively.'
              },
              {
                step: '2',
                title: 'Build Models',
                body: 'Experiment with parameters and watch training unfold.'
              },
              {
                step: '3',
                title: 'Track Progress',
                body: 'Maintain streaks and hit milestone achievements.'
              },
              {
                step: '4',
                title: 'Reinforce Skills',
                body: 'Tackle daily challenges and apply learning.'
              }
            ].map(item => (
              <div key={item.step} className="rounded-xl border border-purple-500/30 bg-[#2A0F4A]/40 p-5 backdrop-blur-sm">
                <div className="text-xs font-semibold tracking-wider text-pink-300 mb-2">STEP {item.step}</div>
                <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-xs leading-relaxed text-gray-300">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24 text-center">
          <div className="relative overflow-hidden rounded-3xl border border-purple-600/40 bg-gradient-to-r from-purple-800/70 via-pink-700/60 to-purple-900/70 px-10 py-16">
            <div className="absolute -top-10 -left-10 w-56 h-56 bg-pink-500/30 blur-3xl rounded-full" />
            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-purple-600/30 blur-3xl rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Ready to Start Your ML Journey?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-sm md:text-base">Dive into structured learning, build models the right way, and stay motivated with a system engineered for progress.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learning-path" className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm md:text-base shadow-lg shadow-pink-900/30 hover:opacity-90 transition-opacity">Start Learning</Link>
              <Link href="/learning-path/build-model" className="px-8 py-4 rounded-full bg-[#2A0F4A] border border-pink-400/40 text-pink-200 font-semibold text-sm md:text-base hover:bg-[#3A1B5B] transition-colors">Build a Model</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
