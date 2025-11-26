'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, File, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploaderProps {
  bucket: string;
  accept?: string;
  maxSize?: number;
  onUploadComplete: (url: string) => void;
  onUploadError?: (error: string) => void;
  label?: string;
  description?: string;
}

export function FileUploader({
  bucket,
  accept = 'image/*',
  maxSize = 5242880,
  onUploadComplete,
  onUploadError,
  label = 'Upload File',
  description,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size exceeds ${(maxSize / 1024 / 1024).toFixed(1)}MB limit`;
    }

    if (accept && accept !== '*/*') {
      const acceptedTypes = accept.split(',').map((t) => t.trim());
      const fileType = file.type;
      const isAccepted = acceptedTypes.some((type) => {
        if (type.endsWith('/*')) {
          return fileType.startsWith(type.replace('/*', ''));
        }
        return fileType === type;
      });

      if (!isAccepted) {
        return `File type not accepted. Allowed: ${accept}`;
      }
    }

    return null;
  };

  const uploadFile = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      if (onUploadError) onUploadError(error);
      setUploadStatus('error');
      return;
    }

    setUploading(true);
    setProgress(0);
    setSelectedFile(file);
    setUploadStatus('idle');

    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      setProgress(30);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      setProgress(70);

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(filePath);

      setProgress(100);
      setUploadStatus('success');
      toast.success('File uploaded successfully!');
      onUploadComplete(publicUrl);

      setTimeout(() => {
        setSelectedFile(null);
        setProgress(0);
        setUploadStatus('idle');
      }, 2000);
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMsg = error.message || 'Upload failed';
      toast.error(errorMsg);
      if (onUploadError) onUploadError(errorMsg);
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      {description && <p className="text-sm text-gray-500">{description}</p>}

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-teal-500 bg-teal-50'
            : uploadStatus === 'error'
            ? 'border-red-300 bg-red-50'
            : uploadStatus === 'success'
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleChange}
          accept={accept}
          disabled={uploading}
        />

        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          {uploading ? (
            <div className="w-full space-y-3">
              <div className="flex items-center justify-center">
                <Upload className="w-8 h-8 text-teal-600 animate-bounce" />
              </div>
              <p className="text-sm font-medium text-center">Uploading...</p>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-center text-gray-500">{progress}%</p>
            </div>
          ) : uploadStatus === 'success' ? (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
              <p className="text-sm font-medium text-green-700">Upload Successful!</p>
              {selectedFile && <p className="text-xs text-gray-500">{selectedFile.name}</p>}
            </div>
          ) : uploadStatus === 'error' ? (
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="w-12 h-12 text-red-600" />
              <p className="text-sm font-medium text-red-700">Upload Failed</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setUploadStatus('idle')}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-700 mb-1">
                Drag & drop file here, or click to select
              </p>
              <p className="text-xs text-gray-500">
                Max size: {(maxSize / 1024 / 1024).toFixed(1)}MB
              </p>
              {accept && <p className="text-xs text-gray-500 mt-1">Accepted: {accept}</p>}
            </>
          )}
        </label>
      </div>

      {selectedFile && !uploading && uploadStatus === 'idle' && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
          <File className="w-5 h-5 text-gray-600" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{selectedFile.name}</p>
            <p className="text-xs text-gray-500">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setSelectedFile(null)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
