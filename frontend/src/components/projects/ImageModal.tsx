// src/components/projects/ImageModal.tsx
"use client";

import { useCallback, useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-7xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-[85vh]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            priority
          />
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};