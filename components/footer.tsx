import React from 'react'

export default function Footer() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-[1160px] px-4 pb-28 pt-6 text-center text-[13px] sm:px-6 sm:pb-6 sm:pt-10 sm:text-sm leading-relaxed">
      <p className="glass inline-block rounded-2xl px-3.5 py-2 sm:px-4 text-ink-soft">
        Made by <a href="https://www.dillonbordeleau.dev/" className="underline decoration-2 underline-offset-[3px] hover:text-accent">Dillon Bordeleau</a>
        {' · '}Episode data from <a href="https://www.omdbapi.com/" className="underline decoration-2 underline-offset-[3px] hover:text-accent">The Open Movie Database</a>
      </p>
    </footer>
  )
}
