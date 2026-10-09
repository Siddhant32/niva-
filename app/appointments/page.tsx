'use client';

import { useCopilotStore } from '../../lib/store';
import Scene from '../../components/Scene';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

export default function Appointments() {
  const { appointments } = useCopilotStore();

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
          Appointments
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((app, idx) => (
            <motion.div 
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-lg relative overflow-hidden ${app.status === 'upcoming' ? 'ring-2 ring-blue-500' : ''}`}
            >
              {app.status === 'upcoming' && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                  UPCOMING
                </div>
              )}
              
              <div className="flex gap-4 items-start mb-4">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{app.doctorName}</h3>
                  <p className="text-slate-500 dark:text-blue-200">{app.specialty}</p>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Clock size={18} className="text-slate-400" />
                  <span>{format(new Date(app.date), 'MMMM dd, yyyy')} at {app.time}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <MapPin size={18} className="text-slate-400" />
                  <span>{app.location}</span>
                </div>
              </div>

              {app.status === 'upcoming' && (
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition-colors">Reschedule</button>
                  <button className="flex-1 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-white py-2 rounded-xl font-semibold transition-colors">Cancel</button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
