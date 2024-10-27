// src/app/layout.tsx
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/layout/navbar'
import Footer from '../components/layout/footer'  // Make sure to import
import { AuthProvider } from '../lib/auth/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vadim Castro',
  description: 'Personal website and portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-gray-50`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}