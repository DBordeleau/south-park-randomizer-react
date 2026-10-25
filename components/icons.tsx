import React from 'react';

type IconProps = { size?: number };

// Stroke icons shared across the page; all are decorative, so buttons carry their own labels
function Icon({ size = 20, children }: IconProps & { children: React.ReactNode }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {children}
        </svg>
    );
}

export function ListIcon(props: IconProps) {
    return <Icon {...props}><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" /></Icon>;
}

export function MoonIcon(props: IconProps) {
    return <Icon {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></Icon>;
}

export function SunIcon(props: IconProps) {
    return <Icon {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Icon>;
}

export function DiceIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <circle cx="8.5" cy="8.5" r="1.3" fill="currentColor" />
            <circle cx="12" cy="12" r="1.3" fill="currentColor" />
            <circle cx="15.5" cy="15.5" r="1.3" fill="currentColor" />
        </Icon>
    );
}

export function EyeOffIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M3 3l18 18" />
            <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c5 0 9 4.5 10 7a13.4 13.4 0 0 1-2.7 3.9" />
            <path d="M6.6 6.6C4.4 8 2.8 10.1 2 12c1 2.5 5 7 10 7a10.7 10.7 0 0 0 5.4-1.5" />
            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </Icon>
    );
}

export function CloseIcon(props: IconProps) {
    return <Icon {...props}><path d="M6 6l12 12M18 6L6 18" /></Icon>;
}

export function SignIcon({ size = 36 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true">
            <rect x="19" y="24" width="6" height="18" rx="1" fill="#7A5232" stroke="var(--edge)" strokeWidth={2.5} />
            <rect x="3" y="4" width="38" height="24" rx="4" fill="#A8754A" stroke="var(--edge)" strokeWidth={2.5} />
            <path d="M9 12h26M9 20h18" fill="none" stroke="#5E3E24" strokeWidth={3} strokeLinecap="round" />
        </svg>
    );
}
