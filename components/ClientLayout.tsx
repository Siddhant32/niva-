'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import Navigation from './Navigation';
import { useCopilotStore } from '../lib/store';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useCopilotStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const isAuthRoute = pathname === '/login' || pathname === '/register';
      if (!isAuthenticated && !isAuthRoute) {
        router.push('/login');
      } else if (isAuthenticated && isAuthRoute) {
        router.push('/');
      }
    }
  }, [isAuthenticated, pathname, router, mounted]);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
        <Navigation />
        {children}
      </div>
    </ThemeProvider>
  );
}
