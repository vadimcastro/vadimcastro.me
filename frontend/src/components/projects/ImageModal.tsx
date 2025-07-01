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


  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const updateScale = useCallback((newScale: number) => {
    // Safety check for invalid scale values
    if (!isFinite(newScale) || isNaN(newScale) || newScale <= 0) {
      console.warn('Invalid scale value:', newScale);
      return;
    }
    
    const clampedScale = Math.min(Math.max(newScale, 1), 3);
    
    if (clampedScale === 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(clampedScale);
      // Also reset position if it gets too extreme
      setPosition(prev => ({
        x: Math.min(Math.max(prev.x, -200), 200),
        y: Math.min(Math.max(prev.y, -200), 200)
      }));
    }
  }, []);

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
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Much less sensitive zooming
    const delta = e.deltaY > 0 ? 0.98 : 1.02;
    updateScale(scale * delta);
  }, [scale, updateScale]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [scale, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDragging && scale > 1) {
      const newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      };
      // Add bounds checking for mouse movement too
      const maxOffset = 150; // pixels - much more restrictive
      const boundedPosition = {
        x: Math.min(Math.max(newPosition.x, -maxOffset), maxOffset),
        y: Math.min(Math.max(newPosition.y, -maxOffset), maxOffset)
      };
      setPosition(boundedPosition);
    }
  }, [isDragging, dragStart, scale]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    const distance = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
    // Ensure we never return 0 or very small values that could cause issues
    return Math.max(distance, 10);
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    e.stopPropagation();
    
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      if (lastTouchDistance > 0 && distance > 0) {
        const scaleChange = distance / lastTouchDistance;
        // Much more conservative clamping and sensitivity
        const clampedScaleChange = Math.min(Math.max(scaleChange, 0.9), 1.1);
        // Additional damping for smoother zoom
        const dampedScaleChange = 1 + (clampedScaleChange - 1) * 0.5;
        updateScale(scale * dampedScaleChange);
      }
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      const newPosition = {
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      };
      // Add bounds checking to prevent image from going too far off screen
      const maxOffset = 150; // pixels - much more restrictive
      const boundedPosition = {
        x: Math.min(Math.max(newPosition.x, -maxOffset), maxOffset),
        y: Math.min(Math.max(newPosition.y, -maxOffset), maxOffset)
      };
      setPosition(boundedPosition);
    }
  }, [lastTouchDistance, isDragging, dragStart, scale, updateScale]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
        updateScale(1.5);
      } else {
        resetZoom();
      }
    }
    
    setLastTap(now);
  }, [scale, lastTap, updateScale]);

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50"
      style={{ 
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
      onClick={onClose}
    >
      <div 
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          overflow: 'hidden',
          touchAction: 'none'
        }}
      >
        <div 
          ref={imageRef}
          className="select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center center',
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
            touchAction: 'none',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
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
            style={{ 
              width: 'auto', 
              height: 'auto', 
              maxWidth: '90vw', 
              maxHeight: '90vh',
              display: 'block',
              userSelect: 'none'
            }}
            sizes="90vw"
            priority
            quality={95}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};