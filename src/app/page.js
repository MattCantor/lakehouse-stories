'use-client'

import Link from 'next/link'
import Image from 'next/image'
import Cabin from '@/public/illustrations/lakehouse/Lakehouse1.1.png'

export default function Home() {
  return (
    <section
      className="overflow-hidden"
    >
      <Link href={`/toc`}>
        <Image
              src={Cabin}
              alt="Lakehouse"
              fill={true}
              objectFit='cover'
              // className='relative'
        />
      </Link>
  </section>
  )
}

{/* <div className="absolute top-0 left-0 w-full h-[25%] bg-black opacity-70"></div>
    <div className="absolute bottom-0 left-0 w-full h-[25%] bg-black opacity-70"></div>
    <div className="absolute top-[25%] left-0 w-[25%] h-[50%] bg-black opacity-70"></div>
    <div className="absolute top-[25%] right-0 w-[25%] h-[50%] bg-black opacity-70"></div> */}