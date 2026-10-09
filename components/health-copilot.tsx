'use client'

import { useState } from 'react'
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  FileCheck2,
  FileText,
  HeartPulse,
  Languages,
  LayoutDashboard,
  Link2,
  LockKeyhole,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Pill,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Upload,
  UserRound,
  X,
} from 'lucide-react'

const records = [
  { type: 'Lab report', title: 'Complete Blood Count', date: '12 Sep 2024', status: '2 values to review', icon: Activity, tone: 'rose' },
  { type: 'Prescription', title: 'Dr. A. Mehta · General medicine', date: '04 Sep 2024', status: '3 medicines extracted', icon: Pill, tone: 'blue' },
  { type: 'Discharge summary', title: 'Apollo Hospitals · Cardiology', date: '28 Aug 2024', status: 'Ready to review', icon: ClipboardList, tone: 'amber' },
]

const timeline = [
  { date: '12 Sep', title: 'Blood test completed', desc: 'Complete Blood Count · CityCare Diagnostics', icon: Activity, color: 'bg-rose-100 text-rose-600' },
  { date: '04 Sep', title: 'Prescription added', desc: 'General medicine · Dr. A. Mehta', icon: Pill, color: 'bg-blue-100 text-blue-600' },
  { date: '28 Aug', title: 'Discharge summary uploaded', desc: 'Apollo Hospitals · Cardiology', icon: ClipboardList, color: 'bg-amber-100 text-amber-600' },
]

export function HealthCopilot() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [language, setLanguage] = useState('English')
  const [showUpload, setShowUpload] = useState(false)
  const [showAssistant, setShowAssistant] = useState(false)
  const [toast, setToast] = useState('')

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  return (
    <main className="min-h-screen bg-[#f6f8f7] text-[#172221]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[248px] border-r border-[#dfe8e3] bg-white lg:flex lg:flex-col">
        <div className="flex h-[84px] items-center gap-3 border-b border-[#edf1ef] px-7">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#0d625c] text-white"><HeartPulse /></div>
          <div><p className="text-[17px] font-bold tracking-tight">Swasthya</p><p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#6b7d78]">Health copilot</p></div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-4 py-7" aria-label="Main navigation">
          <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aaba5]">Workspace</p>
          {[['Overview', LayoutDashboard], ['My records', FileText], ['Medicines', Pill], ['Health timeline', CalendarDays]].map(([label, Icon]) => (
            <button key={label as string} onClick={() => setActiveNav(label as string)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold transition ${activeNav === label ? 'bg-[#e8f3ef] text-[#0b645c]' : 'text-[#6c7d78] hover:bg-[#f4f7f5]'}`}><Icon className="size-[17px]" />{label as string}{label === 'My records' && <span className="ml-auto rounded-full bg-[#dcebe6] px-2 py-0.5 text-[10px] text-[#2d6d64]">12</span>}</button>
          ))}
          <p className="px-3 pb-3 pt-8 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aaba5]">Support</p>
          {[['ABHA & sharing', Link2], ['Settings', Settings2]].map(([label, Icon]) => <button key={label as string} onClick={() => notify(`${label} is ready for backend wiring`)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold text-[#6c7d78] hover:bg-[#f4f7f5]"><Icon className="size-[17px]" />{label as string}</button>)}
        </nav>
        <div className="m-4 rounded-2xl bg-[#f1f7f4] p-4"><div className="mb-3 flex items-center gap-2 text-[#0d625c]"><ShieldCheck className="size-4" /><span className="text-xs font-bold">Your data is private</span></div><p className="text-[11px] leading-5 text-[#71827d]">Prototype mode · connect your secure storage when you're ready.</p></div>
        <div className="flex items-center gap-3 border-t border-[#edf1ef] px-6 py-5"><div className="flex size-9 items-center justify-center rounded-full bg-[#d7e7e0] text-xs font-bold text-[#226258]">AS</div><div className="flex-1"><p className="text-xs font-bold">Aarav Sharma</p><p className="text-[10px] text-[#7c8b87]">Personal account</p></div><MoreHorizontal className="size-4 text-[#8ca09a]" /></div>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="flex h-[84px] items-center justify-between border-b border-[#e3ebe7] bg-white/90 px-5 backdrop-blur md:px-10"><div className="flex items-center gap-3"><button className="lg:hidden" aria-label="Open menu"><Menu /></button><div><p className="text-xs font-medium text-[#84948f]">Thursday, 19 September 2024</p><h1 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">Good morning, Aarav <span aria-hidden>✦</span></h1></div></div><div className="flex items-center gap-2 md:gap-4"><button onClick={() => setLanguage(language === 'English' ? 'हिंदी' : 'English')} className="hidden items-center gap-2 rounded-xl border border-[#dfe8e3] px-3 py-2 text-xs font-bold text-[#50645e] md:flex"><Languages className="size-4" />{language}<ChevronDown className="size-3" /></button><button onClick={() => notify('You have no new notifications')} className="relative rounded-xl p-2.5 text-[#6e807a] hover:bg-[#f2f6f4]" aria-label="Notifications"><Bell className="size-[18px]" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#d96b62]" /></button><button onClick={() => notify('Profile menu is ready for backend wiring')} className="flex size-9 items-center justify-center rounded-full bg-[#d7e7e0] text-xs font-bold text-[#226258] md:hidden">AS</button></div></header>

        <div className="mx-auto max-w-[1440px] px-5 py-7 md:px-10 md:py-9">
          <section className="relative overflow-hidden rounded-[22px] bg-[#0d625c] p-6 text-white shadow-[0_16px_40px_rgba(13,98,92,0.14)] md:p-8"><div className="relative z-10 max-w-[580px]"><div className="mb-4 flex items-center gap-2 text-[#a9e4d0]"><Sparkles className="size-4" /><span className="text-xs font-bold uppercase tracking-[0.15em]">Your health, made simple</span></div><h2 className="max-w-[550px] text-[27px] font-bold leading-[1.14] tracking-tight md:text-[34px]">Understand your health.<br />One record at a time.</h2><p className="mt-4 max-w-[470px] text-sm leading-6 text-[#c9e5dc]">Upload a medical document and Swasthya will organize the details, explain what they mean, and help you spot what needs attention.</p><div className="mt-6 flex flex-wrap gap-3"><button onClick={() => setShowUpload(true)} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-bold text-[#0d625c] shadow-sm hover:bg-[#edf8f4]"><Upload className="size-4" />Upload a record</button><button onClick={() => setShowAssistant(true)} className="flex items-center gap-2 rounded-xl border border-white/25 px-4 py-3 text-xs font-bold text-white hover:bg-white/10"><MessageCircle className="size-4" />Ask your copilot</button></div></div><div className="absolute -right-8 -top-20 size-72 rounded-full border-[28px] border-white/5 md:size-96" /><div className="absolute -bottom-32 right-20 size-72 rounded-full border-[18px] border-[#62b9a2]/10" /><Activity className="absolute bottom-8 right-12 size-20 text-white/10 md:right-28 md:size-28" /></section>

          <div className="mt-7 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
            <section className="rounded-[20px] border border-[#e3ebe7] bg-white p-5 md:p-6"><div className="flex items-start justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#91a19c]">Health at a glance</p><h3 className="mt-1 text-lg font-bold">Your latest insights</h3></div><button className="text-xs font-bold text-[#0d746a] hover:underline">View health profile <ArrowRight className="ml-1 inline size-3" /></button></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-[#f1f8f4] p-4"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#6e807a]">Records</span><FileCheck2 className="size-4 text-[#3c9c80]" /></div><p className="mt-3 text-2xl font-bold">12</p><p className="mt-1 text-[10px] text-[#71837c]">+3 this month</p></div><div className="rounded-2xl bg-[#fff8ee] p-4"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#6e807a]">Medicines</span><Pill className="size-4 text-[#d5953a]" /></div><p className="mt-3 text-2xl font-bold">04</p><p className="mt-1 text-[10px] text-[#71837c]">1 refill due soon</p></div><div className="rounded-2xl bg-[#fff2f1] p-4"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#6e807a]">To review</span><AlertCircle className="size-4 text-[#d96b62]" /></div><p className="mt-3 text-2xl font-bold">02</p><p className="mt-1 text-[10px] text-[#71837c]">From latest report</p></div></div><div className="mt-6 rounded-2xl border border-[#dcece5] bg-[#f6fbf8] p-4"><div className="flex items-start gap-3"><div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#d8eee5] text-[#18806c]"><Sparkles className="size-4" /></div><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-bold">Copilot's latest note</p><span className="rounded-full bg-[#dff2e9] px-2 py-0.5 text-[9px] font-bold text-[#2c896f]">AI SUMMARY</span></div><p className="mt-1.5 text-xs leading-5 text-[#526760]">Your CBC report looks mostly healthy. Hemoglobin is slightly below the usual range — this can sometimes be linked to iron levels. Consider discussing it at your next visit.</p><button onClick={() => setShowAssistant(true)} className="mt-3 text-[11px] font-bold text-[#0d746a]">Read full explanation <ArrowRight className="ml-1 inline size-3" /></button></div></div></div></section>

            <section className="rounded-[20px] border border-[#e3ebe7] bg-white p-5 md:p-6"><div className="flex items-start justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#91a19c]">Your care journey</p><h3 className="mt-1 text-lg font-bold">Recent activity</h3></div><button onClick={() => setActiveNav('Health timeline')} className="text-xs font-bold text-[#0d746a]">See all</button></div><div className="mt-5 flex flex-col gap-5">{timeline.map((item) => { const Icon = item.icon; return <div className="flex gap-3" key={item.date}><div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${item.color}`}><Icon className="size-4" /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><p className="truncate text-xs font-bold">{item.title}</p><span className="shrink-0 text-[10px] font-medium text-[#98a7a2]">{item.date}</span></div><p className="mt-1 truncate text-[11px] text-[#778781]">{item.desc}</p></div></div> })}</div><div className="mt-6 border-t border-[#edf1ef] pt-4"><button onClick={() => setShowUpload(true)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#b8d5c9] py-3 text-xs font-bold text-[#3c8173] hover:bg-[#f5faf7]"><Plus className="size-4" />Add to timeline</button></div></section>
          </div>

          <section className="mt-5 rounded-[20px] border border-[#e3ebe7] bg-white p-5 md:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#91a19c]">Medical record intelligence</p><h3 className="mt-1 text-lg font-bold">Your records</h3></div><div className="flex items-center gap-2"><div className="flex items-center gap-2 rounded-xl border border-[#dfe8e3] px-3 py-2 text-xs text-[#84948f]"><Search className="size-3.5" />Search records</div><button onClick={() => setShowUpload(true)} className="flex items-center gap-2 rounded-xl bg-[#0d625c] px-3 py-2 text-xs font-bold text-white hover:bg-[#09534e]"><Plus className="size-4" />Add record</button></div></div><div className="mt-5 grid gap-3 lg:grid-cols-3">{records.map((record) => { const Icon = record.icon; return <button key={record.title} onClick={() => notify(`${record.title} opened in preview mode`)} className="group flex items-start gap-3 rounded-2xl border border-[#e6eeea] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#a9cfc1] hover:shadow-sm"><div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${record.tone === 'rose' ? 'bg-rose-50 text-rose-600' : record.tone === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}><Icon className="size-5" /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><p className="truncate text-xs font-bold">{record.title}</p><MoreHorizontal className="size-4 shrink-0 text-[#a7b3ae]" /></div><p className="mt-1 text-[10px] text-[#87958f]">{record.type} · {record.date}</p><p className="mt-3 text-[10px] font-bold text-[#4e8577]">{record.status} <ArrowRight className="ml-1 inline size-3 transition group-hover:translate-x-0.5" /></p></div></button> })}</div></section>

          <footer className="mt-7 flex flex-col items-start justify-between gap-3 border-t border-[#e3ebe7] pt-5 text-[10px] text-[#91a19c] md:flex-row md:items-center"><p className="flex items-center gap-2"><LockKeyhole className="size-3" />Prototype UI · Your health data stays private</p><p>Built for a simpler healthcare journey · <button onClick={() => notify('ABHA integration is ready for your backend')} className="font-bold text-[#52887b]">ABHA-ready data model</button></p></footer>
        </div>
      </div>

      {showUpload && <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#10221f]/35 p-5" role="dialog" aria-modal="true" aria-label="Upload medical record"><div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><h2 className="text-lg font-bold">Add a medical record</h2><p className="mt-1 text-xs text-[#778781]">Mock upload for your prototype</p></div><button onClick={() => setShowUpload(false)} aria-label="Close upload"><X className="size-5 text-[#84948f]" /></button></div><div className="mt-6 flex flex-col items-center rounded-2xl border-2 border-dashed border-[#c8ded5] bg-[#f7fbf9] px-6 py-9 text-center"><div className="flex size-12 items-center justify-center rounded-2xl bg-[#dcefe7] text-[#0d746a]"><Upload /></div><p className="mt-4 text-sm font-bold">Drop a file here</p><p className="mt-1 text-xs text-[#82928c]">PDF, JPG, PNG up to 10 MB</p><button onClick={() => { setShowUpload(false); notify('Mock record added to your timeline') }} className="mt-5 rounded-xl bg-[#0d625c] px-4 py-2.5 text-xs font-bold text-white">Choose file</button></div><p className="mt-4 text-center text-[10px] text-[#91a19c]">OCR will extract medicines, values, diagnoses, and dates.</p></div></div>}
      {showAssistant && <div className="fixed bottom-5 right-5 z-30 w-[calc(100%-40px)] max-w-sm overflow-hidden rounded-3xl border border-[#cfe3da] bg-white shadow-2xl"><div className="flex items-center justify-between bg-[#0d625c] px-5 py-4 text-white"><div className="flex items-center gap-3"><div className="flex size-8 items-center justify-center rounded-xl bg-white/15"><Sparkles className="size-4" /></div><div><p className="text-xs font-bold">Swasthya Copilot</p><p className="text-[10px] text-[#bfe2d7]">Explaining your records simply</p></div></div><button onClick={() => setShowAssistant(false)} aria-label="Close assistant"><X className="size-4" /></button></div><div className="p-5"><div className="rounded-2xl rounded-tl-sm bg-[#f1f7f4] p-4 text-xs leading-5 text-[#50645e]">Hi Aarav. I can explain your latest CBC report, help you understand your medicines, or find a record in your timeline. What would you like to know?</div><div className="mt-4 flex gap-2"><button onClick={() => notify('Mock response: your CBC is mostly healthy')} className="rounded-xl border border-[#dfe8e3] px-3 py-2 text-[10px] font-bold text-[#4e746b]">Explain my CBC</button><button onClick={() => notify('Mock response: no urgent medicine reminders')} className="rounded-xl border border-[#dfe8e3] px-3 py-2 text-[10px] font-bold text-[#4e746b]">My medicines</button></div></div></div>}
      {toast && <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#172d29] px-4 py-3 text-xs font-semibold text-white shadow-lg"><Check className="size-4 text-[#8bd4bd]" />{toast}</div>}
    </main>
  )
}

export default HealthCopilot
