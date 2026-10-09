'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HealthRecord } from '../lib/types';
import { useCopilotStore } from '../lib/store';
import { FileText, Activity, HeartPulse, Pill, ChevronDown, ChevronUp, Stethoscope, Lightbulb, ScanLine } from 'lucide-react';
import { format } from 'date-fns';

const fadeUp = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

export default function RecordCard({ record }: { record: HealthRecord }) {
  const language = useCopilotStore((s) => s.patient.preferredLanguage);
  const summary = record.summary[language] || record.summary.en;
  const [showOcr, setShowOcr] = useState(false);

  const typeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
    prescription: { icon: <Pill size={18} />, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/15', label: 'Prescription' },
    lab_report: { icon: <Activity size={18} />, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-500/15', label: 'Lab Report' },
    discharge_summary: { icon: <HeartPulse size={18} />, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-500/15', label: 'Discharge' },
    diagnostic: { icon: <Stethoscope size={18} />, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-100 dark:bg-teal-500/15', label: 'Diagnostic' },
  };

  const cfg = typeConfig[record.type] || typeConfig.diagnostic;

  return (
    <motion.div variants={fadeUp} className="glass-panel glass-panel-glow rounded-3xl p-6 md:p-7 w-full">
      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-5">
        <div className="flex gap-3 items-start min-w-0">
          <div className={`w-11 h-11 ${cfg.bg} ${cfg.color} rounded-xl flex items-center justify-center shrink-0`}>{cfg.icon}</div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-tight truncate">{record.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{record.provider} · {format(new Date(record.date), 'MMM dd, yyyy')}</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
      </div>

      {/* Diagnoses */}
      {record.diagnoses && record.diagnoses.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {record.diagnoses.map((d, i) => (
            <span key={i} className="text-[11px] font-semibold px-2.5 py-1 bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 rounded-full">{d}</span>
          ))}
        </div>
      )}

      {/* AI Summary */}
      <div className="bg-teal-50 dark:bg-teal-500/8 border border-teal-200 dark:border-teal-500/20 p-4 rounded-2xl mb-4">
        <h4 className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" /> AI Summary
        </h4>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{summary}</p>
      </div>

      {/* Observations */}
      {record.observations && record.observations.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Observations</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {record.observations.map((obs, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-sm">
                <div>
                  <span className="text-slate-700 dark:text-slate-300">{obs.testName}</span>
                  {obs.interpretation && <p className="text-[10px] text-slate-400 mt-0.5">{obs.interpretation}</p>}
                </div>
                <div className="text-right">
                  <span className={`font-bold ${obs.status === 'high' || obs.status === 'low' ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
                    {obs.value} {obs.unit}
                  </span>
                  <p className="text-[10px] text-slate-400">Ref: {obs.referenceRange}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medicines */}
      {record.medicines && record.medicines.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Medicines</h4>
          <div className="space-y-2">
            {record.medicines.map((med, i) => (
              <div key={i} className="p-3 bg-blue-50 dark:bg-blue-500/8 border border-blue-200 dark:border-blue-500/15 rounded-xl text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Pill size={14} className="text-blue-500 shrink-0" />
                  <span className="font-semibold">{med.name}</span>
                  <span className="text-xs text-slate-500 ml-auto">{med.dosage} · {med.frequency}</span>
                </div>
                {med.instructions && <p className="text-xs text-slate-500 dark:text-slate-400 pl-5">{med.instructions}</p>}
                <p className="text-[10px] text-blue-600 dark:text-blue-400 pl-5 mt-1">Duration: {med.duration}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {record.recommendations && record.recommendations.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5"><Lightbulb size={12} /> Recommendations</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
            {record.recommendations.map((r, i) => <li key={i}>{r}</li>)}
          </ol>
        </div>
      )}

      {/* OCR Collapsible */}
      {record.rawOcrText && (
        <div>
          <button onClick={() => setShowOcr(!showOcr)} className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
            <ScanLine size={14} /> Raw OCR Text {showOcr ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <AnimatePresence>
            {showOcr && (
              <motion.pre initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="mt-2 p-3 bg-slate-900 text-green-400 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                {record.rawOcrText}
              </motion.pre>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
