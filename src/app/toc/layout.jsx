export default function TOCLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <main className="container">
        <div className="row mx-auto">
            <div className="col col-span-8">
                <div className="mx-auto max-w-md">
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
      </main>
    )
  }