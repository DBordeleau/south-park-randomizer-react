import React from 'react'

export default function Footer() {
    const date = new Date();
    const currentYear = date.getFullYear();
  return (
    <footer className='fixed bottom-0 w-full bg-white bg-opacity-20 shadow-lg backdrop-blur-[0.5rem] flex flex-col font-semibold justify-center text-center mt-2 mb-0 px-4 text-black dark:text-white dark:bg-black dark:bg-opacity-20'>
       <small className='block text-xs'>Created by <a href="https://www.dillonbordeleau.dev/" className='text-xs font-bold underline text-blue-600 dark:text-blue-500'>Dillon Bordeleau</a> using <a href='https://www.omdbapi.com/' className='text-xs font-bold underline text-blue-600 dark:text-blue-500'>The Open Movie Database API</a></small>
    </footer>
  )
}