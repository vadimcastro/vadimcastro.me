// src/components/layout/footer.tsx
"use client";

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';
import { trackInteraction } from '../../lib/api/analytics';

export default function Footer() {
  const [isBottom, setIsBottom] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (windowHeight + scrollTop >= documentHeight - 100) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isBottom) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
      });
    } else {
      controls.start({
        opacity: 0,
        y: 20,
        transition: { duration: 0.3, ease: 'easeIn' }
      });
    }
  }, [isBottom, controls]);

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="w-full bg-white/80 backdrop-blur-md border-t border-gray-200/80 py-4"
    >
      <div className="w-full max-w-[92%] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <a
            href="tel:914-222-0975"
            className="hover:text-emerald-600 transition-colors"
            title="Call"
            onClick={() => trackInteraction('social_click', 'phone', { location: 'footer' })}
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href="mailto:vadimcastro1@gmail.com?subject=Hey%20Vadim!"
            className="hover:text-emerald-600 transition-colors"
            title="Send Email"
            onClick={() => trackInteraction('social_click', 'email', { location: 'footer' })}
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/vadimcastro"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 transition-colors"
            title="LinkedIn"
            onClick={() => trackInteraction('social_click', 'linkedin', { location: 'footer' })}
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/vadimcastro"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 transition-colors"
            title="GitHub"
            onClick={() => trackInteraction('social_click', 'github', { location: 'footer' })}
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
        <p className="font-medium text-center sm:text-right">
          © {new Date().getFullYear()} Vadim Castro. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}