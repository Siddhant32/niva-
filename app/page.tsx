'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, ScanLine, Clock, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const InteractiveDNA = dynamic(() => import('../components/InteractiveDNA'), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
};

const features = [
  {
    icon: <ScanLine size={28} />,
    title: 'AI Medical OCR',
    description: 'Drop prescriptions, lab reports, or scans — our AI extracts medicines, test values, and diagnoses automatically.',
    accent: 'from-teal-500 to-emerald-500',
  },
  {
    icon: <Clock size={28} />,
    title: 'Unified Health Timeline',
    description: 'All your records organized chronologically in one place with structured observations and AI summaries.',
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    icon: <Globe size={28} />,
    title: 'Multi-Language Support',
    description: 'Get health summaries in English, Hindi, Telugu, or Tamil. Because health should not have a language barrier.',
    accent: 'from-purple-500 to-pink-500',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'ABDM / ABHA Ready',
    description: 'FHIR R4 aligned data models with mock ABHA ID support. Built for India\'s digital health ecosystem.',
    accent: 'from-amber-500 to-orange-500',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 px-6 md:px-12 flex items-center justify-between glass-panel">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center">
            <BrainCircuit size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Niva</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all hover:scale-105">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12">
        {/* Background blobs */}
        <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-teal-500/15 dark:bg-teal-500/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-8%] w-[45%] h-[45%] bg-blue-500/15 dark:bg-blue-500/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-4">
              AI-Powered Health Intelligence
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] gradient-heading mb-6">
              Your Health,{' '}
              <span className="gradient-teal">Simplified</span>{' '}
              by AI.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mb-10">
              Niva reads your prescriptions, lab reports, and medical records — then explains everything in plain language you can actually understand.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/register" className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-2xl shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all hover:scale-105 text-base">
                Get Started Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 font-semibold rounded-2xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all text-base">
                Sign In
              </Link>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <InteractiveDNA heightClass="h-[350px] md:h-[480px]" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-3">Features</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold gradient-heading">
              Everything you need for
              <br />smarter healthcare.
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="glass-panel glass-panel-glow rounded-3xl p-8 group cursor-default">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.accent} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold gradient-heading mb-6">
              Ready to take control of your health?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Join thousands who trust Niva to understand their medical records, track medications, and stay on top of their wellness.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/register" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-2xl shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all hover:scale-105 text-lg">
                Create Free Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
              <BrainCircuit size={14} className="text-white" />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Niva Health</span>
          </div>
          <p>Built with ❤️ for healthier lives · ABDM Ready · FHIR R4 Compatible</p>
        </div>
      </footer>
    </div>
  );
}
