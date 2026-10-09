'use client';

import { useCopilotStore } from '../../lib/store';
import { motion } from 'framer-motion';
import { User, Fingerprint, Languages, Droplet, Activity, Ruler } from 'lucide-react';
import Scene from '../../components/Scene';

export default function Profile() {
  const { patient, setLanguage } = useCopilotStore();

  return (
    <main className="min-h-screen relative pt-24 pb-12 px-6">
      <Scene />
      <div className="absolute inset-0 bg-slate-50/90 dark:bg-slate-950/60 z-[-1]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Patient Profile
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl"
          >
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-4xl font-bold">
                {patient.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{patient.name}</h2>
                <p className="text-slate-500 dark:text-slate-400">{patient.age} years old • {patient.gender}</p>
                
                <div className="mt-3 inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                  <Fingerprint size={16} /> ABHA: {patient.abhaId}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1"><Droplet size={16}/> Blood Group</div>
                <div className="font-bold text-lg">{patient.bloodGroup}</div>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1"><Ruler size={16}/> Height</div>
                <div className="font-bold text-lg">{patient.height}</div>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1"><Activity size={16}/> Weight</div>
                <div className="font-bold text-lg">{patient.weight}</div>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1"><User size={16}/> Allergies</div>
                <div className="font-bold text-lg text-red-500">{patient.allergies.join(', ') || 'None'}</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl flex flex-col"
          >
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Languages className="text-blue-500" /> Preferences
            </h3>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Summary Language
              </label>
              <select 
                value={patient.preferredLanguage}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 p-3 rounded-xl outline-none"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
              <p className="text-xs text-slate-500 mt-2">
                Niva AI will generate health summaries in this language.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
