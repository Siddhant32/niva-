'use client';

import { useCopilotStore } from '../../lib/store';
import { motion } from 'framer-motion';
import { User, Fingerprint, Languages, Droplet, Activity, Ruler, Mail, Phone, AlertTriangle, Stethoscope } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function Profile() {
  const { patient, setLanguage } = useCopilotStore();

  const details = [
    { label: 'Blood Group', value: patient.bloodGroup, icon: <Droplet size={16} /> },
    { label: 'Height', value: patient.height, icon: <Ruler size={16} /> },
    { label: 'Weight', value: patient.weight, icon: <Activity size={16} /> },
    { label: 'Email', value: patient.email, icon: <Mail size={16} /> },
    { label: 'Phone', value: patient.phone, icon: <Phone size={16} /> },
  ];

  return (
    <main className="min-h-screen py-10 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-8 gradient-heading">
          Patient Profile
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info */}
          <motion.div initial="hidden" animate="show" variants={stagger} className="md:col-span-2 glass-panel rounded-3xl p-8">
            <motion.div variants={fadeUp} className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shrink-0 shadow-lg shadow-teal-500/20">
                {patient.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{patient.name}</h2>
                <p className="text-slate-500 dark:text-slate-400">{patient.age} years old · {patient.gender}</p>
                <div className="mt-3 inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full text-sm font-semibold">
                  <Fingerprint size={16} /> ABHA: {patient.abhaId}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {details.map((d, i) => (
                <div key={i} className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">{d.icon} {d.label}</div>
                  <div className="font-semibold text-sm">{d.value}</div>
                </div>
              ))}
            </motion.div>

            {/* Allergies */}
            <motion.div variants={fadeUp} className="mb-5">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2"><AlertTriangle size={14} className="text-red-500" /> Allergies</h3>
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((a, i) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-300 rounded-full">{a}</span>
                ))}
              </div>
            </motion.div>

            {/* Chronic Conditions */}
            <motion.div variants={fadeUp}>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2"><Stethoscope size={14} className="text-amber-500" /> Chronic Conditions</h3>
              <div className="flex flex-wrap gap-2">
                {patient.chronicConditions.map((c, i) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 rounded-full">{c}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Settings */}
          <motion.div initial="hidden" animate="show" variants={stagger} className="glass-panel rounded-3xl p-8 flex flex-col">
            <motion.h3 variants={fadeUp} className="font-bold text-lg mb-6 flex items-center gap-2">
              <Languages className="text-teal-500" size={20} /> Preferences
            </motion.h3>
            <motion.div variants={fadeUp} className="flex-1">
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Summary Language</label>
              <select
                value={patient.preferredLanguage}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 p-3 rounded-xl outline-none focus:ring-2 focus:ring-teal-500/40 transition-all"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
              <p className="text-xs text-slate-500 mt-2">Niva AI summaries will be displayed in this language.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
