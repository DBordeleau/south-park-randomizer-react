import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/utils/site';

// The preview card shown when the site is shared on social media and in chat apps.
// It's rendered once at build time, so the fonts are only fetched then
export const alt = `${SITE_NAME}: roll a random South Park episode`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The image renderer can't read woff2, and Google Fonts serves TTF when the request has no browser user agent
async function loadGoogleFont(family: string, weight: number, text: string) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Couldn't find a TTF for ${family}`);
  return (await fetch(url)).arrayBuffer();
}

const title = 'South Park';
const subtitle = 'RANDOMIZER';
const tagline = 'Roll a random episode from any season';

export default async function Image() {
  const [display, body] = await Promise.all([
    loadGoogleFont('Bowlby+One', 400, title),
    loadGoogleFont('Rubik', 700, subtitle + tagline),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#86CFE8', position: 'relative' }}>
        {/* Same mountains as the episode card, with literal colors since there's no stylesheet here */}
        <svg viewBox="0 0 400 120" width={1200} height={360} style={{ position: 'absolute', left: 0, bottom: 0 }}>
          <polygon points="0,120 0,80 70,40 140,85 220,25 300,80 360,50 400,70 400,120" fill="#2F8A5E" />
          <polygon points="220,25 200,40 208,37 214,43 222,37 230,43 236,38 242,40" fill="#FFFFFF" />
          <polygon points="0,120 0,100 90,70 170,105 260,65 350,108 400,90 400,120" fill="#1E6B47" />
          <polygon points="0,120 0,112 200,106 400,112 400,120" fill="#FFFFFF" />
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, marginTop: -60, padding: '44px 64px', background: '#FFFFFF', border: '8px solid #16181D', borderRadius: 40, boxShadow: '0 14px 0 #16181D' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <svg width={150} height={150} viewBox="0 0 44 44">
              <rect x="19" y="24" width="6" height="18" rx="1" fill="#7A5232" stroke="#16181D" strokeWidth={2.5} />
              <rect x="3" y="4" width="38" height="24" rx="4" fill="#A8754A" stroke="#16181D" strokeWidth={2.5} />
              <path d="M9 12h26M9 20h18" fill="none" stroke="#5E3E24" strokeWidth={3} strokeLinecap="round" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', color: '#16181D' }}>
              <div style={{ fontFamily: 'Bowlby One', fontSize: 108, lineHeight: 1 }}>{title}</div>
              <div style={{ fontFamily: 'Rubik', fontSize: 34, letterSpacing: 13, marginTop: 10 }}>{subtitle}</div>
            </div>
          </div>
          <div style={{ fontFamily: 'Rubik', fontSize: 36, color: '#363C48' }}>{tagline}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Bowlby One', data: display, weight: 400 },
        { name: 'Rubik', data: body, weight: 700 },
      ],
    }
  );
}
