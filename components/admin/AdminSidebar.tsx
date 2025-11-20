'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Newspaper,
  GraduationCap,
  Users,
  Images,
  FileText,
  Menu as MenuIcon,
  Settings,
  LogOut,
  UserCheck,
  Award,
  Calendar,
  Bell,
  Mail,
  FolderOpen,
  Palette,
  Wand2,
  Brush,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth/auth-helpers';
import { useRouter } from 'next/navigation';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Page Builder',
    href: '/admin/page-builder',
    icon: Wand2,
  },
  {
    title: 'Themes',
    href: '/admin/themes',
    icon: Palette,
  },
  {
    title: 'Global Styles',
    href: '/admin/styles',
    icon: Brush,
  },
  {
    title: 'Berita',
    href: '/admin/berita',
    icon: Newspaper,
  },
  {
    title: 'Program Keahlian',
    href: '/admin/program',
    icon: GraduationCap,
  },
  {
    title: 'Guru & Staff',
    href: '/admin/guru',
    icon: Users,
  },
  {
    title: 'Galeri',
    href: '/admin/galeri',
    icon: Images,
  },
  {
    title: 'PPDB',
    href: '/admin/ppdb',
    icon: UserCheck,
  },
  {
    title: 'Halaman',
    href: '/admin/halaman',
    icon: FileText,
  },
  {
    title: 'Menu Navigasi',
    href: '/admin/menu',
    icon: MenuIcon,
  },
  {
    title: 'Prestasi',
    href: '/admin/prestasi',
    icon: Award,
  },
  {
    title: 'Events',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    title: 'Pengumuman',
    href: '/admin/pengumuman',
    icon: Bell,
  },
  {
    title: 'Newsletter',
    href: '/admin/newsletter',
    icon: Mail,
  },
  {
    title: 'Dokumen',
    href: '/admin/dokumen',
    icon: FolderOpen,
  },
  {
    title: 'Pengaturan',
    href: '/admin/pengaturan',
    icon: Settings,
  },
];

export function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={cn('pb-12 min-h-screen', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-6 px-4">
            <h2 className="text-2xl font-bold text-teal-600 flex items-center gap-2">
              <GraduationCap className="w-8 h-8" />
              Admin CMS
            </h2>
            <p className="text-sm text-gray-500 mt-1">SMK Mustaqbal</p>
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-teal-50 hover:text-teal-900',
                    isActive
                      ? 'bg-teal-100 text-teal-900'
                      : 'text-gray-700'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-3 py-2 absolute bottom-4 left-0 right-0">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
