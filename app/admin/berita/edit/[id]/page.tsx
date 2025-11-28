'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { FileUploader } from '@/components/admin/FileUploader';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function EditBeritaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Umum',
    author: '',
    cover_url: '',
    tags: '',
    is_published: true,
    is_featured: false,
  });

  const categories = [
    'Umum',
    'Akademik',
    'Prestasi',
    'Kegiatan',
    'PPDB',
    'Pengumuman',
    'Event',
  ];

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          category: data.category || 'Umum',
          author: data.author || '',
          cover_url: data.cover_url || '',
          tags: data.tags ? data.tags.join(', ') : '',
          is_published: data.is_published || false,
          is_featured: data.is_featured || false,
        });
      }
    } catch (error: any) {
      console.error('Error fetching article:', error);
      toast.error('Gagal memuat data berita');
      router.push('/admin/berita');
    } finally {
      setFetching(false);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error('Judul dan konten harus diisi');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const tagsArray = formData.tags
        ? formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : [];

      const { error } = await supabase
        .from('news_articles')
        .update({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt || formData.content.substring(0, 200),
          content: formData.content,
          category: formData.category,
          author: formData.author || 'Admin',
          cover_url: formData.cover_url,
          tags: tagsArray,
          is_published: formData.is_published,
          is_featured: formData.is_featured,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Berita berhasil diperbarui!');
      router.push('/admin/berita');
    } catch (error: any) {
      console.error('Error updating article:', error);
      toast.error(error.message || 'Gagal memperbarui berita');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Berita</h2>
          <p className="text-gray-500 mt-1">Perbarui artikel berita atau pengumuman</p>
        </div>
        <Link href="/admin/berita">
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
              <CardTitle>Informasi Berita</CardTitle>
              <CardDescription>Edit detail berita atau pengumuman</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Berita *</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul berita"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL</Label>
                <Input
                  id="slug"
                  placeholder="judul-berita-otomatis"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
                <p className="text-xs text-gray-500">
                  URL: /berita/{formData.slug || 'slug-url'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Penulis</Label>
                  <Input
                    id="author"
                    placeholder="Nama penulis"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Ringkasan (Opsional)</Label>
                <Input
                  id="excerpt"
                  placeholder="Ringkasan singkat berita"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="prestasi, siswa, kompetisi (pisahkan dengan koma)"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Konten Berita</CardTitle>
              <CardDescription>Edit isi berita lengkap</CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                label="Konten *"
                placeholder="Mulai menulis berita..."
                minHeight="400px"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gambar Cover</CardTitle>
              <CardDescription>Update gambar cover berita (maksimal 5MB)</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader
                bucket="news-covers"
                accept="image/*"
                maxSize={5242880}
                onUploadComplete={(url) => setFormData({ ...formData, cover_url: url })}
                label="Cover Image"
                description="Upload gambar baru untuk mengganti cover"
              />
              {formData.cover_url && (
                <div className="mt-4">
                  <Label>Current/Preview Cover:</Label>
                  <img
                    src={formData.cover_url}
                    alt="Cover preview"
                    className="mt-2 rounded-lg border max-w-md"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Publikasi</CardTitle>
              <CardDescription>Atur status dan tampilan berita</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="publish">Publikasikan Berita</Label>
                  <p className="text-sm text-gray-500">Berita akan muncul di website</p>
                </div>
                <Switch
                  id="publish"
                  checked={formData.is_published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_published: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="featured">Berita Unggulan</Label>
                  <p className="text-sm text-gray-500">Tampilkan di section featured</p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_featured: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700">
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
            <Link href="/admin/berita">
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
