// src/components/projects/ImageModal.tsx
"use client";

import { useCallback, useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [lastTap, setLastTap] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      updateScale(scale * 1.2);
    }
    if (e.key === '-') {
      e.preventDefault();
      updateScale(scale / 1.2);
    }
    if (e.key === '0') {
      e.preventDefault();
      resetZoom();
    }
  }, [onClose, scale, updateScale]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const centerPoint = { x: e.clientX, y: e.clientY };
    updateScale(scale * delta, centerPoint);
  }, [scale, updateScale]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [scale, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      };
      const constrainedPosition = constrainPosition(newPosition, scale);
      setPosition(constrainedPosition);
    }
  }, [isDragging, dragStart, scale, constrainPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const constrainPosition = useCallback((newPosition: { x: number, y: number }, currentScale: number) => {
    if (!imageRef.current || !containerRef.current) return newPosition;
    
    const container = containerRef.current.getBoundingClientRect();
    const image = imageRef.current.getBoundingClientRect();
    
    const scaledWidth = image.width * currentScale;
    const scaledHeight = image.height * currentScale;
    
    const maxX = Math.max(0, (scaledWidth - container.width) / 2);
    const maxY = Math.max(0, (scaledHeight - container.height) / 2);
    
    return {
      x: Math.min(Math.max(newPosition.x, -maxX), maxX),
      y: Math.min(Math.max(newPosition.y, -maxY), maxY)
    };
  }, []);

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const updateScale = useCallback((newScale: number, centerPoint?: { x: number, y: number }) => {
    const clampedScale = Math.min(Math.max(newScale, 0.5), 3);
    
    if (clampedScale === 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(clampedScale);
      
      // If we have a center point (for pinch zoom), adjust position to zoom into that point
      if (centerPoint && imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (centerPoint.x - centerX) * (clampedScale - scale) / clampedScale;
        const deltaY = (centerPoint.y - centerY) * (clampedScale - scale) / clampedScale;
        
        const newPosition = constrainPosition({
          x: position.x + deltaX,
          y: position.y + deltaY
        }, clampedScale);
        
        setPosition(newPosition);
      } else {
        // Constrain current position for new scale
        const constrainedPosition = constrainPosition(position, clampedScale);
        setPosition(constrainedPosition);
      }
    }
  }, [scale, position, constrainPosition]);

  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1) {
      if (scale > 1) {
        setIsDragging(true);
        setDragStart({ 
          x: e.touches[0].clientX - position.x, 
          y: e.touches[0].clientY - position.y 
        });
      }
    }
  }, [scale, position]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      if (lastTouchDistance > 0) {
        const scaleChange = distance / lastTouchDistance;
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const centerPoint = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2
        };
        updateScale(scale * scaleChange, centerPoint);
      }
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      const newPosition = {
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      };
      const constrainedPosition = constrainPosition(newPosition, scale);
      setPosition(constrainedPosition);
    }
  }, [lastTouchDistance, isDragging, dragStart, scale, updateScale, constrainPosition]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 0) {
      setIsDragging(false);
      setLastTouchDistance(0);
      
      const now = Date.now();
      const timeSinceLastTap = now - lastTap;
      
      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
        if (scale === 1) {
          updateScale(1.5);
        } else {
          resetZoom();
        }
      }
      
      setLastTap(now);
    }
  }, [lastTap, scale, updateScale]);

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    const now = Date.now();
    const timeSinceLastTap = now - lastTap;
    
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      if (scale === 1) {
        const centerPoint = { x: e.clientX, y: e.clientY };
        updateScale(1.5, centerPoint);
      } else {
        resetZoom();
      }
    }
    
    setLastTap(now);
  }, [scale, lastTap, updateScale]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        ref={imageRef}
        className="relative max-w-[90vw] max-h-[90vh] transition-transform duration-200 ease-out"
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleImageClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '90vh' }}
          sizes="90vw"
          priority
          quality={95}
        />
        
      </div>
    </div>
  );
};