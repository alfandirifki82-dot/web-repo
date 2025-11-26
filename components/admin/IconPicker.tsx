'use client';

import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
  description?: string;
}

const popularIcons = [
  'GraduationCap',
  'Code',
  'Cpu',
  'Wrench',
  'PenTool',
  'Palette',
  'Camera',
  'Music',
  'Heart',
  'Star',
  'Users',
  'BookOpen',
  'Briefcase',
  'Trophy',
  'Rocket',
  'Zap',
];

export function IconPicker({ value, onChange, label, description }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const allIcons = Object.keys(LucideIcons).filter(
    (key) => key !== 'createLucideIcon' && key !== 'default'
  );

  const filteredIcons = search
    ? allIcons.filter((name) => name.toLowerCase().includes(search.toLowerCase()))
    : allIcons;

  const SelectedIcon = value && (LucideIcons as any)[value];

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      {description && <p className="text-sm text-gray-500">{description}</p>}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" className="w-full justify-start gap-3 h-auto py-3">
            {SelectedIcon ? (
              <>
                <SelectedIcon className="w-5 h-5" />
                <span>{value}</span>
              </>
            ) : (
              <span className="text-gray-500">Pilih Icon</span>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Pilih Icon</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search icons... (e.g. 'code', 'user', 'heart')"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
              {search && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => setSearch('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {!search && (
              <div>
                <p className="text-sm font-medium mb-2 text-gray-700">Popular Icons:</p>
                <div className="grid grid-cols-8 gap-2">
                  {popularIcons.map((iconName) => {
                    const IconComponent = (LucideIcons as any)[iconName];
                    return (
                      <Button
                        key={iconName}
                        type="button"
                        variant={value === iconName ? 'default' : 'outline'}
                        className="h-12 w-12 p-0"
                        onClick={() => {
                          onChange(iconName);
                          setOpen(false);
                        }}
                        title={iconName}
                      >
                        <IconComponent className="h-5 w-5" />
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-medium mb-2 text-gray-700">
                {search ? `Found ${filteredIcons.length} icons` : 'All Icons:'} ({filteredIcons.length})
              </p>
              <ScrollArea className="h-[400px] border rounded-lg p-4">
                <div className="grid grid-cols-8 gap-2">
                  {filteredIcons.slice(0, 200).map((iconName) => {
                    const IconComponent = (LucideIcons as any)[iconName];
                    return (
                      <Button
                        key={iconName}
                        type="button"
                        variant={value === iconName ? 'default' : 'outline'}
                        className="h-12 w-12 p-0"
                        onClick={() => {
                          onChange(iconName);
                          setOpen(false);
                        }}
                        title={iconName}
                      >
                        <IconComponent className="h-5 w-5" />
                      </Button>
                    );
                  })}
                </div>
                {filteredIcons.length > 200 && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Showing first 200 results. Use search to find more.
                  </p>
                )}
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {SelectedIcon && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
          <SelectedIcon className="w-8 h-8 text-teal-600" />
          <div className="flex-1">
            <p className="text-sm font-medium">{value}</p>
            <p className="text-xs text-gray-500">Selected Icon</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange('')}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
