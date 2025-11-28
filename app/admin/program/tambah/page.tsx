'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { IconPicker } from '@/components/admin/IconPicker';
import { FileUploader } from '@/components/admin/FileUploader';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function TambahProgramPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    icon: 'GraduationCap',
    image_url: '',
    color_theme: 'blue',
    facilities: [] as string[],
    career_prospects: [] as string[],
    is_active: true,
    order_position: 0,
  });

  const [newFacility, setNewFacility] = useState('');
  const [newCareer, setNewCareer] = useState('');

  const colorThemes = [
    { value: 'blue', label: 'Biru', color: 'bg-blue-500' },
    { value: 'teal', label: 'Teal', color: 'bg-teal-500' },
    { value: 'green', label: 'Hijau', color: 'bg-green-500' },
    { value: 'purple', label: 'Ungu', color: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
    { value: 'red', label: 'Merah', color: 'bg-red-500' },
  ];

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: generateSlug(value),
    });
  };

  const addFacility = () => {
    if (newFacility.trim()) {
      setFormData({
        ...formData,
        facilities: [...formData.facilities, newFacility.trim()],
      });
      setNewFacility('');
    }
  };

  const removeFacility = (index: number) => {
    setFormData({
      ...formData,
      facilities: formData.facilities.filter((_, i) => i !== index),
    });
  };

  const addCareer = () => {
    if (newCareer.trim()) {
      setFormData({
        ...formData,
        career_prospects: [...formData.career_prospects, newCareer.trim()],
      });
      setNewCareer('');
    }
  };

  const removeCareer = (index: number) => {
    setFormData({
      ...formData,
      career_prospects: formData.career_prospects.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error('Judul dan deskripsi harus diisi');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('programs')
        .insert([
          {
            title: formData.title,
            slug: formData.slug,
            description: formData.description,
            icon: formData.icon,
            image_url: formData.image_url,
            color_theme: formData.color_theme,
            facilities: formData.facilities,
            career_prospects: formData.career_prospects,
            is_active: formData.is_active,
            order_position: formData.order_position,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success('Program berhasil ditambahkan!');
      router.push('/admin/program');
    } catch (error: any) {
      console.error('Error creating program:', error);
      toast.error(error.message || 'Gagal menambahkan program');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tambah Program Keahlian</h2>
          <p className="text-gray-500 mt-1">Buat program keahlian baru</p>
        </div>
        <Link href="/admin/program">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Program</CardTitle>
              <CardDescription>Detail program keahlian</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Nama Program *</Label>
                <Input
                  id="title"
                  placeholder="Contoh: Teknik Komputer dan Jaringan"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL</Label>
                <Input
                  id="slug"
                  placeholder="teknik-komputer-jaringan"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
                <p className="text-xs text-gray-500">
                  URL: /program/{formData.slug || 'slug-url'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Program *</Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan program keahlian ini..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Color Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorThemes.map((theme) => (
                      <button
                        key={theme.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color_theme: theme.value })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.color_theme === theme.value
                            ? 'border-teal-600 scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-8 rounded ${theme.color}`}></div>
                        <p className="text-xs mt-2 text-center">{theme.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Urutan Tampilan</Label>
                  <Input
                    id="order"
                    type="number"
                    placeholder="0"
                    value={formData.order_position}
                    onChange={(e) =>
                      setFormData({ ...formData, order_position: parseInt(e.target.value) || 0 })
                    }
                  />
                  <p className="text-xs text-gray-500">Angka lebih kecil = lebih dulu muncul</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icon & Banner</CardTitle>
              <CardDescription>Pilih icon dan upload banner program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <IconPicker
                value={formData.icon}
                onChange={(icon) => setFormData({ ...formData, icon })}
                label="Icon Program"
                description="Pilih icon yang merepresentasikan program"
              />

              <FileUploader
                bucket="program-icons"
                accept="image/*"
                maxSize={2097152}
                onUploadComplete={(url) => setFormData({ ...formData, image_url: url })}
                label="Banner Program"
                description="Rekomendasi: 800x400px, maksimal 2MB"
              />

              {formData.image_url && (
                <div className="mt-4">
                  <Label>Preview Banner:</Label>
                  <img
                    src={formData.image_url}
                    alt="Banner preview"
                    className="mt-2 rounded-lg border max-w-md"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fasilitas Program</CardTitle>
              <CardDescription>Tambahkan fasilitas yang tersedia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Contoh: Lab Komputer dengan 40 PC"
                  value={newFacility}
                  onChange={(e) => setNewFacility(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFacility())}
                />
                <Button type="button" onClick={addFacility}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.facilities.length > 0 && (
                <div className="space-y-2">
                  {formData.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1">{facility}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFacility(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prospek Karir</CardTitle>
              <CardDescription>Tambahkan prospek karir lulusan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Contoh: Network Administrator"
                  value={newCareer}
                  onChange={(e) => setNewCareer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCareer())}
                />
                <Button type="button" onClick={addCareer}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.career_prospects.length > 0 && (
                <div className="space-y-2">
                  {formData.career_prospects.map((career, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className="flex-1">{career}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCareer(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Program</CardTitle>
              <CardDescription>Atur status aktif program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="active">Program Aktif</Label>
                  <p className="text-sm text-gray-500">Program akan ditampilkan di website</p>
                </div>
                <Switch
                  id="active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700">
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Menyimpan...' : 'Simpan Program'}
            </Button>
            <Link href="/admin/program">
              <Button type="button" variant="outline" disabled={loading}>
                Batal
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
