import Image from 'next/image'

export default function TOCLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <main>
        <section className="container border-solid border-gray-200 shadow-page mt-6 mx-auto mb-0 pt-14 px-12 pb-12 max-w-2xl bg-white max-h-[90vh] overflow-y-auto text-slate-800">
          {children}
        </section>
      </main>
    )
  }