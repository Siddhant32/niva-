'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, FileText, Calendar, BrainCircuit, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCopilotStore } from '../lib/store';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useCopilotStore();
  const [mounted, setMounted] = useState(false);

  // useEffect for theme mounting
  import('react').then(({ useEffect }) => useEffect(() => setMounted(true), []));

  if (!isAuthenticated) return null;

  const links = [
    { name: 'Dashboard', href: '/', icon: <Home size={20} /> },
    { name: 'Profile', href: '/profile', icon: <User size={20} /> },
    { name: 'Medical Records', href: '/records', icon: <FileText size={20} /> },
    { name: 'Appointments', href: '/appointments', icon: <Calendar size={20} /> },
    { name: 'Niva AI Copilot', href: '/niva-ai', icon: <BrainCircuit size={20} className="text-blue-500" /> },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/login');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-40 p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full shadow-xl hover:bg-white/20 transition-all"
      >
        <Menu className="text-slate-900 dark:text-white" size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <BrainCircuit size={20} className="text-white" />
                  </div>
                  <h2 className="font-bold text-xl text-slate-900 dark:text-white">Niva</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 dark:bg-white/5 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' 
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-white/5 flex flex-col gap-4">
                {mounted && (
                  <button 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                      <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                    </div>
                    <div className="w-10 h-6 bg-slate-300 dark:bg-blue-500 rounded-full relative">
                      <motion.div 
                        layout
                        className="absolute w-4 h-4 bg-white rounded-full top-1"
                        initial={false}
                        animate={{ left: theme === 'dark' ? '20px' : '4px' }}
                      />
                    </div>
                  </button>
                )}

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all font-medium"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
