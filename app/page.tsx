'use client';

import { useCopilotStore } from '../lib/store';
import Scene from '../components/Scene';
import { motion } from 'framer-motion';
import { HeartPulse, Activity, Flame, Moon, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { patient, wellness } = useCopilotStore();

  const wellnessCards = [
    { title: 'Heart Rate', value: `${wellness.heartRate} bpm`, icon: <HeartPulse className="text-red-500" size={24} />, trend: '+2% from yesterday' },
    { title: 'Daily Steps', value: wellness.steps.toLocaleString(), icon: <Activity className="text-blue-500" size={24} />, trend: 'Goal: 10,000' },
    { title: 'Sleep', value: `${wellness.sleepHours} hrs`, icon: <Moon className="text-indigo-500" size={24} />, trend: 'Restless last night' },
    { title: 'Calories', value: `${wellness.caloriesBurned} kcal`, icon: <Flame className="text-orange-500" size={24} />, trend: 'On track' },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden pt-24 pb-12 px-6">
      <Scene />
      <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-950/40 z-[-1]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {patient.name.split(' ')[0]}</h1>
            <p className="text-slate-600 dark:text-blue-200 mt-2">Here is your wellness overview for today.</p>
          </motion.div>
        </header>

        {/* Wellness Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {wellnessCards.map((card, idx) => (
            <div key={idx} className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-slate-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{card.value}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">{card.trend}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Link href="/niva-ai" className="block p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all group">
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-between">
                Ask Niva AI <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </h3>
              <p className="text-blue-100 opacity-90">Upload reports or prescriptions for instant AI analysis and simple summaries.</p>
            </Link>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Link href="/records" className="block p-8 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                Medical Records <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </h3>
              <p className="text-slate-600 dark:text-slate-400">View your entire health history, timeline, and lab results in one place.</p>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
