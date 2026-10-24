import './globals.css';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/context/themeContext';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'South Park Randomizer',
  description: 'Generates random South Park episodes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Determine the initial theme, ensuring it defaults to 'light' if null
  const initialTheme = typeof window !== 'undefined' && window?.localStorage?.getItem('theme')
  ? localStorage.getItem('theme') || 'light'
  : 'light';

  // Apply the dark class before first paint so the browser only downloads the background for the active theme
  const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

  return (
    <ThemeProvider>
      <html lang="en" className="!scroll-smooth transition" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body className={`relative ${inter.className}${initialTheme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
          {children}
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}