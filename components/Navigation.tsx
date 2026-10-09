'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, User, FileText, Calendar, BrainCircuit, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCopilotStore } from '../lib/store';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, patient } = useCopilotStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!isAuthenticated) return null;
  // Don't show nav on public landing page
  if (pathname === '/' || pathname === '/login' || pathname === '/register') return null;

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Profile', href: '/profile', icon: <User size={20} /> },
    { name: 'Medical Records', href: '/records', icon: <FileText size={20} /> },
    { name: 'Appointments', href: '/appointments', icon: <Calendar size={20} /> },
    { name: 'Niva AI', href: '/niva-ai', icon: <BrainCircuit size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/login');
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Fixed top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-16 px-4 flex items-center justify-between glass-panel">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
            <BrainCircuit size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Niva</span>
        </div>

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {patient.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-white/10 shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 flex justify-between items-center border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <BrainCircuit size={22} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg leading-tight">Niva</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Health Copilot</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">Navigation</p>
                <div className="flex flex-col gap-1">
                  {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className={isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}>{link.icon}</span>
                        {link.name}
                        {link.name === 'Niva AI' && (
                          <span className="ml-auto text-[10px] bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full font-bold">AI</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Bottom */}
              <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-2">
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-sm"
                  >
                    <div className="flex items-center gap-3">
                      {resolvedTheme === 'dark' ? <Moon size={18} className="text-indigo-400" /> : <Sun size={18} className="text-amber-500" />}
                      <span className="font-medium">{resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                    </div>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${resolvedTheme === 'dark' ? 'bg-indigo-500' : 'bg-amber-400'}`}>
                      <motion.div
                        layout
                        className="absolute w-4 h-4 bg-white rounded-full top-1 shadow"
                        animate={{ left: resolvedTheme === 'dark' ? '20px' : '4px' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                    </div>
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors text-sm font-medium"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
