import './globals.css'
import { Inter } from 'next/font/google'
// import Image from 'next/image'
// import Cabin from '@/public/illustrations/lakehouse/Lakehouse1.1.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Lakehouse Stories',
  description: 'A digital children\'s book about the animals who live in the forest around the lakehouse',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}
