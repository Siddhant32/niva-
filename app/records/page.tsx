'use client';

import { useCopilotStore } from '../../lib/store';
import Scene from '../../components/Scene';
import RecordCard from '../../components/RecordCard';
import { motion } from 'framer-motion';

export default function Records() {
  const { records } = useCopilotStore();

  return (
    <main className="min-h-screen relative pt-24 pb-12 px-6">
      <Scene />
      <div className="absolute inset-0 bg-slate-50/90 dark:bg-slate-950/60 z-[-1]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold"
          >
            Medical Records
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-white/10 px-4 py-2 rounded-full"
          >
            {records.length} records found
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-300 dark:before:via-slate-700 before:to-transparent"
        >
          {records.map((record) => (
            <div key={record.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 dark:border-slate-900 bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                <RecordCard record={record} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
