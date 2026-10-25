import './globals.css';
import { Bowlby_One, Rubik } from 'next/font/google';
import ThemeProvider from '@/context/themeContext';

const display = Bowlby_One({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const body = Rubik({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'South Park Randomizer',
  description: 'Generates random South Park episodes.',
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
