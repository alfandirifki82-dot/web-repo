'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Award, ChevronUp, ChevronDown } from 'lucide-react';

interface CertificationManagerProps {
  certifications: string[];
  onChange: (certifications: string[]) => void;
  label?: string;
  description?: string;
}

export function CertificationManager({
  certifications,
  onChange,
  label = 'Certifications',
  description,
}: CertificationManagerProps) {
  const [newCert, setNewCert] = useState('');

  const handleAdd = () => {
    if (newCert.trim()) {
      onChange([...certifications, newCert.trim()]);
      setNewCert('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newCerts = [...certifications];
      [newCerts[index - 1], newCerts[index]] = [newCerts[index], newCerts[index - 1]];
      onChange(newCerts);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < certifications.length - 1) {
      const newCerts = [...certifications];
      [newCerts[index], newCerts[index + 1]] = [newCerts[index + 1], newCerts[index]];
      onChange(newCerts);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      {description && <p className="text-sm text-gray-500">{description}</p>}

      <div className="flex gap-2">
        <Input
          placeholder="Masukkan sertifikat atau penghargaan..."
          value={newCert}
          onChange={(e) => setNewCert(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button type="button" onClick={handleAdd} disabled={!newCert.trim()}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah
        </Button>
      </div>

      {certifications.length > 0 ? (
        <div className="space-y-2">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-gray-50 border rounded-lg group hover:bg-gray-100 transition-colors"
            >
              <Award className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <p className="flex-1 text-sm">{cert}</p>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="h-8 w-8 p-0"
                  title="Move up"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === certifications.length - 1}
                  className="h-8 w-8 p-0"
                  title="Move down"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(index)}
                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                  title="Remove"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500 mb-1">Belum ada sertifikat</p>
          <p className="text-xs text-gray-400">Tambahkan sertifikat atau penghargaan di atas</p>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
          <Award className="w-4 h-4" />
          <span>{certifications.length} sertifikat</span>
          <span className="text-gray-300">•</span>
          <span>Hover untuk reorder atau hapus</span>
        </div>
      )}
    </div>
  );
}
