import "./css/style.css";
// import "regenerator-runtime/runtime";
import { Inter } from "next/font/google";

import Header from '@/components/ui/header'
import { AuthContextProvider } from '../context/AuthContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'Skill Sync',
  description: 'Syncing Your Academic Pursuits with Career Success.'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}
      >
        <AuthContextProvider>
          <div className='flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip'>
            <Header />
            <div className='py-20'>{children}</div>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}
