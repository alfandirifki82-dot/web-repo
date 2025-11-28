'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import * as LucideIcons from 'lucide-react';

interface MenuItem {
  id: string;
  title: string;
  url: string | null;
  icon: string | null;
  order_position: number;
  parent_id: string | null;
  submenu?: MenuItem[];
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [navigation, setNavigation] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  async function fetchMenuItems() {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_active', true)
        .order('order_position');

      if (error) throw error;

      const menuTree = buildMenuTree(data || []);
      setNavigation(menuTree);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  }

  function buildMenuTree(items: any[]): MenuItem[] {
    const itemMap: { [key: string]: MenuItem } = {};
    const rootItems: MenuItem[] = [];

    items.forEach((item) => {
      itemMap[item.id] = { ...item, submenu: [] };
    });

    items.forEach((item) => {
      if (item.parent_id && itemMap[item.parent_id]) {
        itemMap[item.parent_id].submenu!.push(itemMap[item.id]);
      } else if (!item.parent_id) {
        rootItems.push(itemMap[item.id]);
      }
    });

    return rootItems;
  }

  function getIcon(iconName: string | null) {
    if (!iconName) return null;
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? Icon : LucideIcons.Circle;
  }

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg py-3">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xl">
              SM
            </div>
            <div className="flex flex-col text-slate-800">
              <span className="font-heading font-bold text-lg leading-tight tracking-tight">SMK Mustaqbal</span>
              <span className="text-xs font-medium opacity-80">School of Future</span>
            </div>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group relative z-50">
          <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xl">
            SM
          </div>
          <div className={`flex flex-col transition-colors ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
            <span className="font-heading font-bold text-lg leading-tight tracking-tight">SMK Mustaqbal</span>
            <span className="text-xs font-medium opacity-80">School of Future</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-6 items-center">
            {navigation.map((item) => {
              const Icon = getIcon(item.icon);
              const hasSubmenu = item.submenu && item.submenu.length > 0;

              return (
                <li key={item.id} className="relative group">
                  {hasSubmenu ? (
                    <>
                      <button
                        className={`flex items-center gap-2 text-sm font-medium transition-colors py-2 ${
                          isScrolled ? 'text-slate-700 hover:text-teal-600' : 'text-white/90 hover:text-white'
                        }`}
                      >
                        {Icon && <Icon className="w-[18px] h-[18px]" />}
                        {item.title}
                        <ChevronDown className="w-[14px] h-[14px] transition-transform duration-300 group-hover:rotate-180" />
                      </button>
                      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-64">
                        <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden ring-1 ring-black/5 p-1">
                          {item.submenu!.map((subitem) => (
                            <Link
                              key={subitem.id}
                              href={subitem.url || '#'}
                              className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
                            >
                              {subitem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.url || '#'}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors py-2 ${
                        isScrolled ? 'text-slate-700 hover:text-teal-600' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {Icon && <Icon className="w-[18px] h-[18px]" />}
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href="/ppdb"
            className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all transform hover:-translate-y-0.5 shadow-lg bg-white text-teal-700 hover:bg-slate-50"
          >
            Daftar PPDB
          </Link>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-md transition-colors relative z-50 ${
            isScrolled ? 'text-slate-800' : 'text-white'
          }`}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 lg:hidden pt-24 px-4 pb-10 overflow-y-auto"
          >
            <div className="container mx-auto flex flex-col gap-2">
              {navigation.map((item) => {
                const Icon = getIcon(item.icon);
                const hasSubmenu = item.submenu && item.submenu.length > 0;

                return (
                  <div key={item.id} className="border-b border-slate-100">
                    {hasSubmenu ? (
                      <>
                        <button
                          onClick={() => setOpenSubmenu(openSubmenu === item.id ? null : item.id)}
                          className="w-full text-slate-700 font-medium py-4 text-lg flex items-center justify-between"
                        >
                          <span className="flex items-center gap-3">
                            {Icon && <Icon className="w-[18px] h-[18px] text-teal-500" />}
                            {item.title}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${
                              openSubmenu === item.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openSubmenu === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="bg-slate-50 rounded-lg overflow-hidden"
                            >
                              {item.submenu!.map((subitem) => (
                                <Link
                                  key={subitem.id}
                                  href={subitem.url || '#'}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block px-6 py-3 text-slate-500 hover:text-teal-600 text-sm hover:bg-slate-100 pl-12"
                                >
                                  {subitem.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.url || '#'}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-slate-700 font-medium py-4 block text-lg flex items-center gap-3"
                      >
                        {Icon && <Icon className="w-[18px] h-[18px] text-teal-500" />}
                        {item.title}
                      </Link>
                    )}
                  </div>
                );
              })}
              <div className="mt-6">
                <Link
                  href="/ppdb"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-600/20"
                >
                  Daftar PPDB Sekarang
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
