import React from 'react';
import { CloseIcon } from './icons';

interface SeenListProps {
    seenEpisodes: string[]; // entries look like "S1E2: Title"
    totalEpisodes: number | null; // null until the season list loads
    headingId: string;
    onRemove: (entry: string) => void;
    onClear: () => void;
    onClose?: () => void; // only the bottom sheet can be closed
}

export default function SeenList({ seenEpisodes, totalEpisodes, headingId, onRemove, onClear, onClose }: SeenListProps) {
    const count = seenEpisodes.length;
    const percent = totalEpisodes ? Math.min(100, count / totalEpisodes * 100) : 0;

    return (
        <>
            <div className="flex items-center justify-between gap-3">
                <h2 id={headingId} className="font-display text-2xl">Seen list</h2>
                {onClose && (
                    <button type="button" onClick={onClose} aria-label="Close seen list" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-track text-ink">
                        <CloseIcon />
                    </button>
                )}
            </div>

            <div>
                <div className="flex justify-between gap-2 text-sm font-semibold">
                    <span>{count} seen</span>
                    {totalEpisodes && <span className="text-muted">of {totalEpisodes} episodes</span>}
                </div>
                <div className="mt-2 h-3.5 overflow-hidden rounded-full border-2 border-edge bg-track" role="progressbar" aria-label="Episodes seen" aria-valuenow={count} aria-valuemin={0} aria-valuemax={totalEpisodes ?? undefined}>
                    <div className="h-full bg-accent2 transition-[width] duration-300" style={{ width: `${percent}%` }} />
                </div>
            </div>

            {count > 0 ? (
                <>
                    <ul className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto wide:max-h-[340px] wide:flex-none">
                        {/* Newest first */}
                        {seenEpisodes.slice().reverse().map(entry => {
                            const split = entry.indexOf(': ');
                            const id = split === -1 ? entry : entry.slice(0, split);
                            const title = split === -1 ? '' : entry.slice(split + 2);
                            return (
                                <li key={entry} className="flex items-center gap-3 rounded-xl bg-chip py-1 pl-2.5 pr-1 wide:py-1.5 wide:pr-1.5">
                                    <span className="flex-none rounded-lg border-2 border-edge bg-card px-2 py-1 text-xs font-bold tracking-[.04em]">{id}</span>
                                    <span className="min-w-0 flex-1 text-[15px] font-medium leading-snug">{title}</span>
                                    <button type="button" onClick={() => onRemove(entry)} aria-label={`Remove ${title || id} from seen list`} className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full text-muted hover:bg-track">
                                        <CloseIcon size={18} />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <button type="button" onClick={onClear} className="press min-h-[52px] flex-none rounded-[14px] border-[3px] border-edge bg-card px-4 font-semibold text-ink shadow-paper wide:min-h-11 wide:self-start wide:rounded-xl wide:text-[15px] wide:shadow-paper-sm">
                        Clear seen list
                    </button>
                </>
            ) : (
                <p className="rounded-[14px] border-2 border-dashed border-edge p-5 text-center text-[15px] leading-normal text-muted">
                    Nothing here yet. Mark an episode as seen and it won&apos;t come up again.
                </p>
            )}
        </>
    );
}
