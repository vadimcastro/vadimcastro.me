// src/components/layout/footer.tsx
"use client";
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Mail, Github, Linkedin, Phone } from 'lucide-react';

export default function Footer() {
  const [isBottom, setIsBottom] = useState(false);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // ... keeping the same scroll and animation logic ...

  return (
    <footer className="bg-white/60 md:bg-white/80 backdrop-blur-sm border-t border-gray-50 md:border-gray-200">
      <div className="w-full px-2 md:px-4 py-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div className="flex justify-center md:justify-start order-1 w-full md:w-auto px-4 md:px-0 md:ml-4">
            <div className="grid grid-cols-4 gap-2">
              <a
                href="tel:914-222-0975"
                className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                title="Call"
              >
                <Phone className="w-4 h-4 text-gray-600 hover:text-gray-900" />
              </a>
              <motion.a
                href="mailto:vadimcastro1@gmail.com?subject=Hey%20Vadim!"
                animate={controls}
                className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                title="Send Email"
              >
                <Mail className="w-4 h-4 text-gray-600 hover:text-gray-900" />
              </motion.a>
              <a
                href="https://www.linkedin.com/in/vadimcastro"
                className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-gray-600 hover:text-gray-900" />
              </a>
              <a
                href="https://github.com/vadimcastro"
                className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <Github className="w-4 h-4 text-gray-600 hover:text-gray-900" />
              </a>
            </div>
          </div>
          <div className="text-xs text-gray-400 text-center md:text-right order-2 md:mr-4">
            © {new Date().getFullYear()} Vadim Castro
          </div>
        </div>
      </div>
    </footer>
  );
}