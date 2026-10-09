'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import Navigation from './Navigation';
import { useCopilotStore } from '../lib/store';

const PUBLIC_ROUTES = ['/', '/login', '/register'];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useCopilotStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const isPublic = PUBLIC_ROUTES.includes(pathname);
    const isAuthPage = pathname === '/login' || pathname === '/register';

    if (!isAuthenticated && !isPublic) {
      router.push('/login');
    } else if (isAuthenticated && isAuthPage) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, pathname, router, mounted]);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#080d14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navigation />
        <div className={isAuthenticated && !PUBLIC_ROUTES.includes(pathname) ? 'pt-16' : ''}>
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
