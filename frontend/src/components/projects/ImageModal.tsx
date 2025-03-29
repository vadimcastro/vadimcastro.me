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
        className="relative max-w-7xl w-full max-h-[90vh] rounded-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-center h-[85vh]">
          <div className="relative w-full h-full">
            <Image
              src={src}
              alt={alt}
              fill
              style={{ objectFit: 'scale-down' }}
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        </div>
        
        {/* Repositioned close button - now fully inside the modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-8 text-white hover:text-gray-200 bg-black/50 rounded-full p-2 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};