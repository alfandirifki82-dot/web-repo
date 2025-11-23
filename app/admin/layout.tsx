'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/auth-helpers';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    try {
      const currentUser = await getCurrentUser();

      if (!currentUser || !currentUser.adminUser) {
        console.log('No user or admin user found, redirecting to login');
        router.push('/admin/login');
        return;
      }

      console.log('User authenticated:', currentUser.adminUser.email);
      setUser(currentUser);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }

  // Show login page without layout
  if (pathname === '/admin/login') {
    return children;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
        <AdminSidebar />
      </aside>
      <main className="flex-1 ml-64">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-sm text-gray-500">Selamat datang, {user.adminUser.full_name || user.user.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.adminUser.full_name || 'Admin'}</p>
                <p className="text-xs text-gray-500 capitalize">{user.adminUser.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
                {(user.adminUser.full_name || user.user.email || 'A')[0].toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
