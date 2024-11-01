import './globals.css';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/context/themeContext';

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
  const initialTheme = typeof window !== 'undefined' && localStorage.getItem('theme')
  ? localStorage.getItem('theme') || 'light'
  : 'light';

  return (
    <ThemeProvider>
      <html lang="en" className="!scroll-smooth transition">
        <head>
          <script src="./utils/getSouthParkEpisode.js"></script>
          <link href='./app/globals.css' rel='stylesheet'></link>
        </head>
        <body className={`${inter.className}pt-20 ${initialTheme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}