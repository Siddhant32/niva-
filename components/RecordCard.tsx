'use client';

import { motion } from 'framer-motion';
import { HealthRecord } from '../lib/types';
import { useCopilotStore } from '../lib/store';
import { FileText, Activity, HeartPulse, ChevronRight, Pill } from 'lucide-react';
import { format } from 'date-fns';

export default function RecordCard({ record }: { record: HealthRecord }) {
  const language = useCopilotStore((state) => state.patient.preferredLanguage);
  const summaryText = record.summary[language] || record.summary.en;

  const getIcon = () => {
    switch (record.type) {
      case 'prescription': return <Pill className="text-blue-400" size={24} />;
      case 'lab_report': return <Activity className="text-purple-400" size={24} />;
      case 'discharge_summary': return <HeartPulse className="text-red-400" size={24} />;
      default: return <FileText className="text-gray-400" size={24} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all w-full mb-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-white/10 rounded-xl">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{record.title}</h3>
            <p className="text-blue-200 text-sm">
              {record.provider} • {format(new Date(record.date), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>
        <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold text-white uppercase tracking-wider">
          {record.type.replace('_', ' ')}
        </div>
      </div>

      <div className="mt-4 bg-black/30 p-4 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-blue-300 mb-2 uppercase tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          AI Summary
        </h4>
        <p className="text-gray-200 leading-relaxed text-sm md:text-base">
          {summaryText}
        </p>
      </div>

      {record.observations && record.observations.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {record.observations.map((obs, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <span className="text-gray-300">{obs.testName}</span>
              <span className={`font-bold ${obs.status === 'high' || obs.status === 'low' ? 'text-red-400' : 'text-green-400'}`}>
                {obs.value} {obs.unit}
              </span>
            </div>
          ))}
        </div>
      )}

      {record.medicines && record.medicines.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase">Prescribed Medicines</h4>
          <div className="flex flex-wrap gap-2">
            {record.medicines.map((med, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-blue-500/20 text-blue-200 rounded-lg text-sm border border-blue-500/30 flex items-center gap-2">
                <Pill size={14} /> {med.name} - {med.dosage}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
