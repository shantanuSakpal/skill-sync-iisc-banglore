'use client'
import { useState, useEffect } from 'react'
import { UserAuth } from '@/context/AuthContext'
import Link from 'next/link'
import Logo from './logo'
import Dropdown from '@/components/utils/dropdown'
import MobileMenu from './mobile-menu'

export default function Header () {
  const [top, setTop] = useState<boolean>(true)
  const [loading, setLoading] = useState(true)
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const { user, logOut } = UserAuth()

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }

  const handleLogOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    checkAuthentication();
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top, currentUrl, user])

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? 'bg-white backdrop-blur-sm shadow-lg' : ''
      }`}
    >
      <div className='w-full mx-auto px-1 sm:px-6'>
        <div className='flex items-center justify-between h-16 '>
          {/* Site branding */}
          <div className='shrink-0 mr-4'>
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className='hidden md:flex md:grow'>
            {/* Desktop sign in links */}
            {loading ? null : user ? (
              <>
                <ul className='flex grow justify-end flex-wrap items-center'>
                  <li>
                    <Link
                      href='/career-compass'
                      className={`text-lg text-gray-500 font-bold hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                        currentUrl === 'career-compass' && 'text-gray-900'
                      }`}
                      onClick={() => setCurrentUrl('career-compass')}
                    >
                      Career Compass
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/solver-space'
                      className={`text-lg text-gray-500 font-bold hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                        currentUrl === 'solver-space' && 'text-gray-900'
                      }`}
                      onClick={() => setCurrentUrl('solver-space')}
                    >
                      Solver Space
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/interview-ace'
                      className={`text-lg text-gray-500 font-bold hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out ${
                        currentUrl === 'interview-ace' && 'text-gray-900'
                      }`}
                      onClick={() => setCurrentUrl('interview-ace')}
                    >
                      Interview Ace
                    </Link>
                  </li>
                </ul>
                <ul className='flex grow justify-end flex-wrap items-center'>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className='font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out'
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <ul className='flex grow justify-end flex-wrap items-center'>
                <li>
                  <Link
                    href='/signin'
                    className='font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out'
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href='/signup'
                    className='btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3'
                  >
                    <span>Sign up</span>
                    <svg
                      className='w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1'
                      viewBox='0 0 12 12'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z'
                        fillRule='nonzero'
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            )}
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
