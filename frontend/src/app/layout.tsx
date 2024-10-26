// src/app/layout.tsx
import { Zilla_Slab } from 'next/font/google';
import { AuthProvider } from '../lib/auth/AuthContext';
import '../styles/globals.css';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import { Toaster } from '../components/ui/toaster';

const zillaSlabFont = Zilla_Slab({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-zilla-slab'
});

// src/app/layout.tsx - Add favicon metadata
export const metadata = {
    title: 'Vadim Castro',
    description: 'Personal workspace and project catalog',
    icons: {
      icon: [
        {
          url: '/favicon.ico',
          sizes: '32x32',
        },
        {
          url: '/icon.png',
          sizes: '192x192',
        },
      ],
    },
  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${zillaSlabFont.variable} font-zilla`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-mint-50 to-mint-100">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}