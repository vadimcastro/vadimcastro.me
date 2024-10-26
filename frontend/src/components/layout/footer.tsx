// src/components/layout/footer.tsx
"use client";
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function Footer() {
  const [isBottom, setIsBottom] = useState(false);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;
      setIsBottom(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isBottom && !hasAnimated) {
      const animate = async () => {
        for (let i = 0; i < 4; i++) { // Reduced to 4 flashes
          await controls.start({
            boxShadow: [
              '0 0 0 0 rgba(0, 131, 77, 0)',
              '0 0 0 4px rgba(0, 131, 77, 0.3)',
              '0 0 0 0 rgba(0, 131, 77, 0)',
            ],
            transition: {
              duration: 1.5,
              ease: "easeInOut"
            }
          });
        }
        setHasAnimated(true);
      };
      animate();
    }
  }, [isBottom, controls, hasAnimated]);

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Vadim Castro. All rights reserved.
          </div>
          <div className="space-x-6">
            <motion.a 
              href="/resume.pdf" 
              animate={controls}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-md px-3 py-1"
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