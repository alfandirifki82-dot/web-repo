'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus } from 'lucide-react';

export default function GuruPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Guru & Staff</h2>
          <p className="text-gray-500 mt-1">Kelola data guru dan staff</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Guru
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Data Guru & Staff
          </CardTitle>
          <CardDescription>
            Halaman manajemen guru (template - implementasi lengkap seperti halaman Berita)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Halaman ini akan berisi daftar guru dan staff dengan fitur CRUD lengkap.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
