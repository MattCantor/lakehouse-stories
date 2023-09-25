import Image from 'next/image'
import Cabin from '@/public/illustrations/lakehouse/Lakehouse1.1.png'

export default function ChapterLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <main>
        <section className="container border-solid border-gray-200 shadow-page mt-6 mx-auto mb-0 pt-14 px-12 pb-12 max-w-2xl bg-white overflow-hidden">
          {/* <Image
            src={Cabin}
            alt="Lakehouse"
            fill={true}
            objectFit='cover'
            className='relative z-[-1]'
          /> */}
          {children}
        </section>
      </main>
    )
  }