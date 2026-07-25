// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://vadimcastro.com'),
  title: {
    default: 'Vadim Castro — Software Engineer | Platform & Data',
    template: '%s | Vadim Castro'
  },
  description: 'Senior Software Engineer specializing in distributed data pipelines, cloud infrastructure, AI platform engineering, and high-performance web applications.',
  keywords: ['Vadim Castro', 'Software Engineer', 'Platform Engineer', 'Data Engineer', 'React', 'FastAPI', 'Next.js', 'Python', 'PostgreSQL'],
  authors: [{ name: 'Vadim Castro' }],
  openGraph: {
    title: 'Vadim Castro — Software Engineer | Platform & Data',
    description: 'Senior Software Engineer specializing in distributed data pipelines, cloud infrastructure, AI platform engineering, and high-performance web applications.',
    url: 'https://vadimcastro.com',
    siteName: 'Vadim Castro Portfolio',
    images: [
      {
        url: '/images/portfolio_pic.png',
        width: 1200,
        height: 630,
        alt: 'Vadim Castro Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vadim Castro — Software Engineer | Platform & Data',
    description: 'Senior Software Engineer specializing in distributed data pipelines, cloud infrastructure, AI platform engineering, and high-performance web applications.',
    images: ['/images/portfolio_pic.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable}`}>
        <Providers>
          <div className="flex flex-col min-h-screen bg-background font-sans antialiased">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}