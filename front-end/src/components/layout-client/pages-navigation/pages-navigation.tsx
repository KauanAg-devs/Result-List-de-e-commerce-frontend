import { PagesNavigationProps } from '@/types/pages-navigation'
import Link from 'next/link'
import Image from "next/image"
import React from 'react'

export default function PagesNavigation({ title, pages, setPages }: PagesNavigationProps) {
  return (
    <nav id='nav' className='bg-[url(/navigation.svg)] bg-black/30 drop-shadow-lg relative h-42 md:h-96 sm:h-22 justify-center items-center flex flex-col w-full p-4 md:p-6 lg:p-8'>
      <p className='cursor-pointer z-10 text-2xl text-zinc-100 md:text-3xl lg:text-4xl font-medium mb-4 lg:mb-8'>
        {title}
      </p>
      <div className='z-10 flex items-center justify-center text-zinc-100'>
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            <Link
              href={page.link}
              className='cursor-pointer w-full text-lg text-center text-zinc-100 md:text-xl font-light hover:text-zinc-300 transition-colors duration-300'
            >
              {page.title}
            </Link>
            {index < pages.length - 1 && (
              <Image
                src='/arrow-down.svg'
                width={70}
                height={70}
                alt="Arrow icon"
                className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 mx-2'
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  )
}
