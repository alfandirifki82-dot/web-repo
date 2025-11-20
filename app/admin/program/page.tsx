'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus } from 'lucide-react';

export default function ProgramPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Program Keahlian</h2>
          <p className="text-gray-500 mt-1">Kelola program keahlian sekolah</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Program
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Program Keahlian
          </CardTitle>
          <CardDescription>
            Halaman manajemen program (template - implementasi lengkap seperti halaman Berita)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Halaman ini akan berisi daftar program keahlian dengan fitur CRUD lengkap.
            Implementasi sama seperti halaman Berita yang sudah dibuat.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
