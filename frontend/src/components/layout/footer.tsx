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
    <footer className="bg-white/60 md:bg-white/80 backdrop-blur-sm border-t border-gray-50">
      <div className="max-w-[95%] mx-auto px-2 md:px-4 py-2">
        <div className="flex flex-col gap-1">
          <div className="w-full max-w-xs md:max-w-none mx-auto md:mx-0 md:ml-auto flex justify-between md:justify-end md:gap-6 text-sm md:text-base">
            <motion.a 
              href="/resume.pdf" 
              animate={controls}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2 font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="md:hidden">Resume</span>
              <span className="hidden md:inline">View Resume PDF</span>
            </motion.a>
            <a 
              href="https://github.com/vadimcastro" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2 font-semibold"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/vadimcastro" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2 font-semibold"
            >
              LinkedIn
            </a>
          </div>
          <div className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Vadim Castro
          </div>
        </div>
      </div>
    </footer>
  );
}