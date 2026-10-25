import './globals.css';
import { Bowlby_One, Rubik } from 'next/font/google';
import type { Metadata } from 'next';
import ThemeProvider from '@/context/themeContext';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/utils/site';

const display = Bowlby_One({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const body = Rubik({ subsets: ['latin'], variable: '--font-body' });

// The share image comes from opengraph-image.tsx
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Apply the dark class before first paint so the browser only downloads the background for the active theme
  const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

  return (
    <ThemeProvider>
      <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body className="font-sans text-ink antialiased">
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
