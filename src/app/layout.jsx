import { Theme } from '@radix-ui/themes';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import ReactQueryProviders from './providers/reactQueryProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'FeedbackNet',
  description: 'Sistema de PQR/S',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProviders>
          <Toaster position="top-center" duration={5000} richColors />
          <Theme accentColor="blue">{children}</Theme>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
