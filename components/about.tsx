import React from 'react';

const questions = [
    {
        question: "How do I skip episodes I've already seen?",
        answer: `Tap "Seen it" and that episode stays out of the rotation. Your seen list is saved in your browser, so it's still there next time. Remove an episode or clear the list whenever you want them back.`,
    },
    {
        question: 'Does it include new episodes?',
        answer: 'Yes. The episode list comes from The Open Movie Database and refreshes every day, so new episodes show up shortly after they air.',
    },
    {
        question: 'Is it free?',
        answer: "Completely. There's no account and nothing to install, and it works on phones, tablets and computers.",
    },
];

// Plain text about the site, rendered on the server so search engines can read it
export default function About() {
    return (
        <section aria-labelledby="about-heading" className="relative z-[2] mx-auto mt-6 w-full max-w-[1160px] px-4 sm:mt-10 sm:px-6">
            <div className="glass flex flex-col gap-6 rounded-[20px] border-[3px] border-edge p-5 shadow-paper-lg sm:rounded-3xl sm:p-[clamp(24px,3vw,40px)]">
                <div className="flex flex-col gap-3">
                    <h2 id="about-heading" className="font-display text-[26px] leading-tight sm:text-[clamp(26px,3vw,34px)]">Can&apos;t decide what to watch?</h2>
                    <p className="max-w-[70ch] text-base leading-relaxed text-ink-soft sm:text-[17px]">
                        South Park Randomizer picks a random South Park episode from every season that has aired, from the 1997 pilot to the latest season.
                        Each roll shows the season and episode number, the original air date and a short plot summary, so you know what you&apos;re getting into.
                    </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
                    {questions.map(({ question, answer }) => (
                        <div key={question} className="flex flex-col gap-1.5">
                            <h3 className="text-[17px] font-bold leading-snug">{question}</h3>
                            <p className="text-[15px] leading-relaxed text-ink-soft">{answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
