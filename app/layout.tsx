'use client';

import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from '@/components/ui/sonner';
import { Toaster as SonnerToaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-slate-50 text-slate-800 antialiased`}>
        {!isAdminRoute && <Header />}
        <main className="min-h-screen">{children}</main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <WhatsAppButton />}
        <Toaster position="top-right" />
        <SonnerToaster position="top-right" richColors />
      </body>
    </html>
  );
}
