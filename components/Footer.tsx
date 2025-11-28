'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase';

interface FooterSettings {
  footer_info?: {
    description: string;
    copyright: string;
  };
  social_media?: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  contact_info?: {
    address: string;
    phone: string;
    email: string;
  };
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<FooterSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', ['footer_info', 'social_media', 'contact_info']);

      if (error) throw error;

      const settingsObj: FooterSettings = {};
      data?.forEach((setting) => {
        settingsObj[setting.key as keyof FooterSettings] = setting.value;
      });

      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching footer settings:', error);
    } finally {
      setLoading(false);
    }
  }

  const footerInfo = settings.footer_info || {
    description:
      'Membentuk generasi yang cerdas, berkarakter, dan siap menghadapi tantangan masa depan melalui pendidikan vokasi berkualitas tinggi.',
    copyright: 'SMK Mustaqbal',
  };

  const socialMedia = settings.social_media || {
    facebook: '#',
    instagram: '#',
    twitter: '#',
    youtube: '#',
  };

  const contactInfo = settings.contact_info || {
    address: 'Jl. Raya Mustaqbal No. 1, Jatiasih, Kota Bekasi, Jawa Barat 17425',
    phone: '(021) 8243 5555',
    email: 'info@smkmustaqbal.sch.id',
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t-4 border-teal-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xl">
                SM
              </div>
              <span className="font-heading font-bold text-2xl text-white">SMK Mustaqbal</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{footerInfo.description}</p>
            <div className="flex gap-4">
              {socialMedia.facebook && socialMedia.facebook !== '#' && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-[18px] h-[18px]" />
                </a>
              )}
              {socialMedia.instagram && socialMedia.instagram !== '#' && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-[18px] h-[18px]" />
                </a>
              )}
              {socialMedia.twitter && socialMedia.twitter !== '#' && (
                <a
                  href={socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-[18px] h-[18px]" />
                </a>
              )}
              {socialMedia.youtube && socialMedia.youtube !== '#' && (
                <a
                  href={socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-[18px] h-[18px]" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-6">Tautan Cepat</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/program" className="hover:text-teal-400 transition-colors">
                  Program Keahlian
                </Link>
              </li>
              <li>
                <Link href="/galeri/foto" className="hover:text-teal-400 transition-colors">
                  Galeri Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-teal-400 transition-colors">
                  Berita & Artikel
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-teal-400 transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-6">Layanan</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/ppdb" className="hover:text-teal-400 transition-colors">
                  Pendaftaran Online (PPDB)
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-teal-400 transition-colors">
                  Portfolio Siswa
                </Link>
              </li>
              <li>
                <Link href="/tentang/profile-guru" className="hover:text-teal-400 transition-colors">
                  Profil Tenaga Pendidik
                </Link>
              </li>
              <li>
                <Link href="/tentang/visi-misi" className="hover:text-teal-400 transition-colors">
                  Visi & Misi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-500 shrink-0" />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-teal-400">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-500 shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-teal-400">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>
            &copy; {currentYear} {footerInfo.copyright}. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
