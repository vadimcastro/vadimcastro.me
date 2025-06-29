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
    <footer className="bg-white/60 md:bg-white/80 backdrop-blur-sm border-t border-gray-50 md:border-gray-200">
      <div className="w-full px-2 md:px-4 py-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div className="flex justify-between md:justify-start gap-4 md:gap-6 text-xs md:text-sm order-1 w-full md:w-auto px-6 md:px-0 md:ml-4">
            <motion.a 
              href="/resume.pdf" 
              animate={controls}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="md:hidden">Resume</span>
              <span className="hidden md:inline">View Resume PDF</span>
            </motion.a>
            <a 
              href="https://github.com/vadimcastro" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/vadimcastro" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              LinkedIn
            </a>
          </div>
          <div className="text-xs text-gray-400 text-center md:text-right order-2 md:mr-4">
            © {new Date().getFullYear()} Vadim Castro
          </div>
        </div>
      </div>
    </footer>
  );
}