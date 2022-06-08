import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import fin from '../fin.png'


const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const headerNavLinks = [
    { href: '/', title: 'Market Diff' },
    { href: '/', title: 'Chart' },
    { href: '/', title: 'Trade' },
  ]

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="md:hidden divide-x-2">
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1 "
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-white dark:text-gray-100 items-center" 
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed  top-0 left-0 z-10 h-full w-full transform bg-[#0C1831] duration-300 ease-in-out dark:bg-gray-800 ${
          navShow ? 'translate-x-5' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between">
        
            <div className='flex justify-center space-x-2 px-12 py-7'>
                <Image
                    src={fin}
                    alt='Picture Luna'
                    width={56}
                    height={48}/>
                <div>
                    <span className='text-white text-2xl'>FINSTABLE</span><br/>
                    <span className='text-blue-400'>Training</span>
                </div>
            </div>
            <button
                type="button"
                className="mt-5 mr-7 h-8 w-8 rounded "
                aria-label="Toggle Menu"
                onClick={onToggleNav}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-white dark:text-gray-100 "
                >
                <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
                </svg>
            </button>
        </div>
        <hr></hr>
        <nav className="fixed mt-4 h-full">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-4 text-4xl font-semibold text-white" onClick={onToggleNav}>
              <Link
                href={link.href}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav