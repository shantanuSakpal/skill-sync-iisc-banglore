"use client"
import Link from 'next/link'
import { useRef } from 'react'
import { UserAuth } from '@/context/AuthContext'

export default function SignIn() {
  const { signIn, user } = UserAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const handleSignIn = async () => {
    try {
      if (emailRef.current.value !== '' || passwordRef.current.value !== '') {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        await signIn(email, password);
        // reroute to '/' url
        window.location.href = '/'
      } else {
        alert('Please fill out all fields.')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <section className='bg-gradient-to-b from-gray-100 to-white'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className=' '>
          {/* Page header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
            <h1 className='h1'>
              Welcome back to Skill Sync. <br /> Please login to continue.
            </h1>
          </div>

          {/* Form */}
          <div className='max-w-sm mx-auto'>
            <div>
              <div className='flex flex-wrap -mx-3 mb-4'>
                <div className='w-full px-3'>
                  <label
                    className='block text-gray-800 text-sm font-medium mb-1'
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    id='email'
                    type='email'
                    className='form-input w-full text-gray-800'
                    placeholder='Enter your email address'
                    ref={emailRef}
                    required
                  />
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-4'>
                <div className='w-full px-3'>
                  <div className='flex justify-between'>
                    <label
                      className='block text-gray-800 text-sm font-medium mb-1'
                      htmlFor='password'
                    >
                      Password
                    </label>
                    {/* <Link
                      href='/reset-password'
                      className='text-sm font-medium text-blue-600 hover:underline'
                    >
                      Having trouble signing in?
                    </Link> */}
                  </div>
                  <input
                    id='password'
                    type='password'
                    className='form-input w-full text-gray-800'
                    placeholder='Enter your password'
                    ref={passwordRef}
                    required
                  />
                </div>
              </div>
              {/* <div className='flex flex-wrap -mx-3 mb-4'>
                <div className='w-full px-3'>
                  <div className='flex justify-between'>
                    <label className='flex items-center'>
                      <input type='checkbox' className='form-checkbox' />
                      <span className='text-gray-600 ml-2'>
                        Keep me signed in
                      </span>
                    </label>
                  </div>
                </div>
              </div> */}
              <div className='flex flex-wrap -mx-3 mt-6'>
                <div className='w-full px-3'>
                  <button
                    className='btn text-white bg-blue-600 hover:bg-blue-700 w-full'
                    onClick={handleSignIn}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
            <div className='flex items-center my-6'>
              <div
                className='border-t border-gray-300 grow mr-3'
                aria-hidden='true'
              ></div>
              <div
                className='border-t border-gray-300 grow ml-3'
                aria-hidden='true'
              ></div>
            </div>
            <div className='text-gray-600 text-center mt-6'>
              Don't you have an account?{' '}
              <Link
                href='/signup'
                className='text-blue-600 hover:underline transition duration-150 ease-in-out'
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
