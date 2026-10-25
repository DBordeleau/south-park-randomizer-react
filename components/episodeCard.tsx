import React from 'react'
import type { EpisodeData } from '@/utils/getSouthParkEpisode';
import { DiceIcon, EyeOffIcon } from './icons';

interface EpisodeCardProps {
  episode: EpisodeData | null; // null while the first episode loads
  rolling: boolean;
  notice: string | null;
  allSeen: boolean;
  alreadySeen: boolean; // the episode was opened from the seen list
  onRoll: () => void;
  onMarkSeen: () => void;
  onClearSeen: () => void;
}

// OMDB dates look like "2006-10-04"
function formatAired(released: string) {
  const date = new Date(`${released}T00:00:00`);
  return isNaN(date.getTime()) ? null : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const fade = (rolling: boolean) => `transition-[opacity,transform] duration-200 ${rolling ? 'opacity-40' : 'opacity-100'}`;

// Fades and dips the text while a new episode loads; the art tile itself never moves
const dip = (rolling: boolean) => `${fade(rolling)} ${rolling ? 'translate-y-1.5' : 'translate-y-0'}`;

export const primaryButton = 'press inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-[14px] border-[3px] border-edge bg-accent px-[22px] text-[17px] font-semibold text-white shadow-paper';
export const secondaryButton = 'press inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-[14px] border-[3px] border-edge bg-card px-5 text-[17px] font-semibold text-ink shadow-paper';

function Mountains() {
  return (
    <svg viewBox="0 0 400 120" aria-hidden="true" className="absolute bottom-0 left-0 block h-auto w-full">
      <polygon points="0,120 0,80 70,40 140,85 220,25 300,80 360,50 400,70 400,120" fill="var(--mtn-back)" />
      <polygon points="220,25 200,40 208,37 214,43 222,37 230,43 236,38 242,40" fill="var(--cap)" />
      <polygon points="0,120 0,100 90,70 170,105 260,65 350,108 400,90 400,120" fill="var(--mtn-front)" />
      <polygon points="0,120 0,112 200,106 400,112 400,120" fill="var(--cap)" />
    </svg>
  );
}

function Message({ title, body, action }: { title: string; body: string; action: React.ReactNode }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3.5 px-8 py-16 text-center">
      <h2 className="font-display text-[clamp(26px,3vw,36px)] leading-tight">{title}</h2>
      <p className="max-w-[40ch] text-[17px] leading-normal text-ink-soft">{body}</p>
      <div className="mt-2">{action}</div>
    </div>
  );
}

export default function EpisodeCard({ episode, rolling, notice, allSeen, alreadySeen, onRoll, onMarkSeen, onClearSeen }: EpisodeCardProps) {
  const aired = episode ? formatAired(episode.Released) : null;

  return (
    <section aria-label="Episode" aria-busy={rolling} className="glass min-w-0 flex-[999_1_560px] overflow-hidden rounded-[20px] sm:rounded-3xl border-[3px] border-edge shadow-paper-lg">
      {allSeen ? (
        <Message
          title="You've seen every episode"
          body="Clear your seen list to put them all back in the rotation."
          action={<button type="button" onClick={onClearSeen} className={primaryButton}>Clear seen list</button>}
        />
      ) : notice ? (
        <Message
          title="Something went wrong"
          body={notice}
          action={<button type="button" onClick={onRoll} disabled={rolling} className={primaryButton}><DiceIcon /> Try again</button>}
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]">
          <div className="relative flex min-h-[188px] sm:min-h-[300px] items-center justify-center overflow-hidden bg-tile pb-9 sm:pb-14">
            {episode?.Poster ? (
              // eslint-disable-next-line @next/next/no-img-element -- OMDB posters are already small, so skip the image optimizer
              <img src={episode.Poster} alt="" className={`absolute inset-0 h-full w-full object-cover ${fade(rolling)}`} />
            ) : (
              <>
                {episode && (
                  <div className={`relative z-[1] text-center text-white ${dip(rolling)}`}>
                    <div className="text-xs sm:text-[13px] font-bold uppercase tracking-[.18em]">Season {episode.Season}</div>
                    <div className="mt-1 sm:mt-1.5 font-display text-[64px] sm:text-[clamp(64px,8vw,96px)] leading-none">E{episode.Episode}</div>
                  </div>
                )}
                <Mountains />
              </>
            )}
          </div>

          <div className={`flex flex-col gap-3 sm:gap-4 p-5 sm:p-[clamp(24px,3vw,40px)] ${dip(rolling)}`}>
            {episode ? (
              <>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="rounded-full bg-chip px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-[13px] font-semibold">Season {episode.Season} · Episode {episode.Episode}</span>
                  {aired && <span className="text-[13px] sm:text-sm text-muted">Aired {aired}</span>}
                </div>
                <h2 className="font-display text-[28px] sm:text-[clamp(28px,3.4vw,42px)] leading-[1.08]">{episode.Title}</h2>
                {episode.Plot ? (
                  <p className="max-w-[56ch] text-base sm:text-[17px] leading-relaxed text-ink-soft">{episode.Plot}</p>
                ) : (
                  <p className="max-w-[56ch] text-base sm:text-[17px] leading-relaxed text-muted italic">No description yet. Newer episodes can take a few weeks to get one.</p>
                )}
              </>
            ) : (
              <div className="flex animate-pulse flex-col gap-4" aria-label="Loading episode">
                <div className="h-7 w-44 rounded-full bg-chip" />
                <div className="h-10 w-4/5 rounded-xl bg-track" />
                <div className="h-20 w-full rounded-xl bg-track" />
              </div>
            )}
            {/* On phones these live in the bar pinned to the bottom of the screen */}
            <div className="mt-2 hidden flex-wrap gap-3 sm:flex">
              <button type="button" onClick={onRoll} disabled={rolling} className={primaryButton}>
                <DiceIcon /> {rolling ? 'Rolling…' : 'Roll another'}
              </button>
              <button type="button" onClick={onMarkSeen} disabled={rolling || !episode || alreadySeen} className={secondaryButton}>
                <EyeOffIcon /> {alreadySeen ? 'Already seen' : 'Seen it, skip it'}
              </button>
            </div>
            <p className="hidden text-sm text-muted sm:block">Episodes you mark as seen stay out of the rotation.</p>
          </div>
        </div>
      )}
    </section>
  );
}
