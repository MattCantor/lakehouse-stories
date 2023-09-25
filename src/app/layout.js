import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Lakehouse Stories',
  description: 'A digital children\'s book about the animals who live in the forest around the lakehouse',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-center bg-no-repeat bg-cover bg-[url('/illustrations/lakehouse/Lakehouse1.1.png')] min-h-screen`}>
          <Navbar/>
          {children}
      </body>
    </html>
  )
}
