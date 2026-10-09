'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCopilotStore } from '../../lib/store';
import RecordCard from '../../components/RecordCard';
import { RecordType } from '../../lib/types';

const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function Records() {
  const { records } = useCopilotStore();
  const [filter, setFilter] = useState<RecordType | 'all'>('all');

  const filtered = filter === 'all' ? records : records.filter((r) => r.type === filter);

  const filters: { value: RecordType | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'lab_report', label: 'Lab Reports' },
    { value: 'prescription', label: 'Prescriptions' },
    { value: 'diagnostic', label: 'Diagnostics' },
    { value: 'discharge_summary', label: 'Discharge' },
  ];

  return (
    <main className="min-h-screen py-10 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold gradient-heading">
            Medical Records
          </motion.h1>
          <span className="text-sm font-semibold px-3 py-1 bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 rounded-full">
            {records.length} records
          </span>
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2 mb-8 overflow-x-auto pb-2 glass-panel rounded-xl p-1 w-fit">
          {filters.map((f) => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                filter === f.value
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}>
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Records */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-5" key={filter}>
          {filtered.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <p className="font-medium">No records found for this filter.</p>
          </div>
        )}
      </div>
    </main>
  );
}
