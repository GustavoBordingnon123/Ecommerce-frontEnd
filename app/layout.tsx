import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ModalProvider from '@/providers/modalProvider';
import ToastProvider from '@/providers/toastProvider';
import { SearchProvider } from '@/providers/SearchContext';

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BookStore',
  description: 'Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <SearchProvider>
          <Navbar />

          <main className='pt-12'>
            {children}
          </main>
        </SearchProvider>
       
      
        <Footer />
      </body>
    </html>
  )
}
