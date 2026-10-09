'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCopilotStore } from '../../lib/store';
import { Calendar, Clock, MapPin, Video, Building2, XCircle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function Appointments() {
  const { appointments, cancelAppointment } = useCopilotStore();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcoming = appointments.filter((a) => a.status === 'upcoming');
  const past = appointments.filter((a) => a.status === 'completed' || a.status === 'cancelled');
  const displayed = tab === 'upcoming' ? upcoming : past;

  return (
    <main className="min-h-screen py-10 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold gradient-heading">
            Appointments
          </motion.h1>
          <span className="text-sm font-semibold px-3 py-1 bg-teal-100 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300 rounded-full">
            {appointments.length} total
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 glass-panel rounded-xl p-1 w-fit">
          {(['upcoming', 'past'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
              {t === 'upcoming' ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
            </button>
          ))}
        </div>

        <motion.div initial="hidden" animate="show" variants={stagger} className="grid md:grid-cols-2 gap-6" key={tab}>
          {displayed.map((app, i) => (
            <motion.div key={app.id} variants={fadeUp}
              className={`glass-panel glass-panel-glow rounded-3xl p-6 relative overflow-hidden ${app.status === 'upcoming' ? 'ring-2 ring-teal-500/50' : ''}`}>
              {app.status === 'upcoming' && (
                <div className="absolute top-0 right-0 bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Upcoming</div>
              )}
              {app.status === 'cancelled' && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Cancelled</div>
              )}

              <div className="flex gap-4 items-start mb-4">
                <div className="w-13 h-13 bg-teal-100 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center shrink-0 p-3">
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{app.doctorName}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{app.specialty}</p>
                </div>
              </div>

              <div className="space-y-2.5 mt-4">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Clock size={16} className="text-slate-400 shrink-0" />
                  <span>{format(new Date(app.date), 'MMMM dd, yyyy')} at {app.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <MapPin size={16} className="text-slate-400 shrink-0" />
                  <span>{app.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {app.type === 'Video Call' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold">
                      <Video size={12} /> Video Call
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                      <Building2 size={12} /> In-person
                    </span>
                  )}
                  {app.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-semibold"><CheckCircle2 size={12} /> Completed</span>
                  )}
                </div>
              </div>

              {app.status === 'upcoming' && (
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-teal-500/15 hover:shadow-teal-500/30 transition-all hover:scale-[1.02]">Reschedule</button>
                  <button onClick={() => cancelAppointment(app.id)}
                    className="flex-1 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2">
                    <XCircle size={16} /> Cancel
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {displayed.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <Calendar size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No {tab} appointments</p>
          </div>
        )}
      </div>
    </main>
  );
}
