'use client';

import { useCopilotStore } from '../../lib/store';
import { motion } from 'framer-motion';
import { HeartPulse, Footprints, Moon, Flame, Activity, Wind, Droplets, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function Dashboard() {
  const { patient, wellness } = useCopilotStore();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const dateStr = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const stepsPercent = Math.round((wellness.steps / wellness.stepGoal) * 100);

  const cards = [
    { title: 'Heart Rate', value: `${wellness.heartRate}`, unit: 'bpm', icon: <HeartPulse size={22} />, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-500/15' },
    { title: 'Daily Steps', value: wellness.steps.toLocaleString(), unit: `/ ${wellness.stepGoal.toLocaleString()}`, icon: <Footprints size={22} />, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/15', progress: stepsPercent },
    { title: 'Sleep Score', value: `${wellness.sleepScore}`, unit: `/ 100 · ${wellness.sleepHours}h`, icon: <Moon size={22} />, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-500/15' },
    { title: 'Calories', value: wellness.caloriesBurned.toLocaleString(), unit: 'kcal', icon: <Flame size={22} />, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-500/15' },
    { title: 'Blood Pressure', value: `${wellness.bloodPressureSys}/${wellness.bloodPressureDia}`, unit: 'mmHg', icon: <Activity size={22} />, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-500/15' },
    { title: 'SpO₂', value: `${wellness.oxygenSaturation}`, unit: '%', icon: <Wind size={22} />, color: 'text-cyan-500', bg: 'bg-cyan-100 dark:bg-cyan-500/15' },
    { title: 'Water Intake', value: `${(wellness.waterIntakeMl / 1000).toFixed(1)}`, unit: 'litres', icon: <Droplets size={22} />, color: 'text-sky-500', bg: 'bg-sky-100 dark:bg-sky-500/15' },
    { title: 'Resting HR', value: `${wellness.restingHeartRate}`, unit: 'bpm', icon: <Heart size={22} />, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-500/15' },
  ];

  const quickLinks = [
    { title: 'Ask Niva AI', description: 'Upload reports for AI analysis and chat with your health copilot.', href: '/niva-ai', gradient: 'from-teal-500 to-blue-600', textColor: 'text-white' },
    { title: 'Medical Records', description: 'Browse your health timeline, lab results, and prescriptions.', href: '/records', gradient: '', textColor: '' },
    { title: 'Appointments', description: 'View upcoming and past doctor visits.', href: '/appointments', gradient: '', textColor: '' },
  ];

  return (
    <main className="min-h-screen py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="mb-10">
          <motion.p variants={fadeUp} className="text-sm text-slate-500 dark:text-slate-400 mb-1">{dateStr}</motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight">
            {greeting}, <span className="gradient-teal">{patient.name.split(' ')[0]}</span>
          </motion.h1>
        </motion.div>

        {/* Wellness Grid */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {cards.map((c, i) => (
            <motion.div key={i} variants={fadeUp} className="glass-panel glass-panel-glow rounded-2xl p-5 cursor-default">
              <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center mb-3 ${c.color}`}>
                {c.icon}
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{c.title}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold">{c.value}</span>
                <span className="text-xs text-slate-500 dark:text-slate-500">{c.unit}</span>
              </div>
              {c.progress !== undefined && (
                <div className="mt-3 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all" style={{ width: `${Math.min(c.progress, 100)}%` }} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Links */}
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-xl font-bold mb-5">Quick Actions</motion.h2>
          <div className="grid md:grid-cols-3 gap-5">
            {quickLinks.map((q, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link href={q.href} className={`group block p-7 rounded-3xl transition-all hover:scale-[1.02] ${
                  q.gradient
                    ? `bg-gradient-to-br ${q.gradient} ${q.textColor} shadow-xl shadow-teal-500/20 hover:shadow-teal-500/30`
                    : 'glass-panel glass-panel-glow'
                }`}>
                  <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
                    {q.title} <ArrowRight size={18} className="opacity-60 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                  </h3>
                  <p className={q.gradient ? 'opacity-90 text-sm' : 'text-sm text-slate-600 dark:text-slate-400'}>{q.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
