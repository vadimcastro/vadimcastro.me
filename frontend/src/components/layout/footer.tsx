// src/components/layout/footer.tsx
"use client";
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function Footer() {
  const [isBottom, setIsBottom] = useState(false);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // ... keeping the same scroll and animation logic ...

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t">
      <div className="max-w-[95%] mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Vadim Castro
          </div>
          <div className="space-x-6">
            <motion.a 
              href="/resume.pdf" 
              animate={controls}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume PDF
            </motion.a>
            <a 
              href="https://github.com/vadimcastro" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/vadimcastro" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}