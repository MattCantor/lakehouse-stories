import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../../tina/__generated__/client";
import Illustration from "../../components/illustration";
import { useState, useRef, useEffect, useCallback } from "react";

interface ChapterData {
  post: {
    title: string;
    synopsis: string;
    body: any;
  };
  prev: string;
  next: string;
}

const getChapter = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<ChapterData> => {
    const post = await client.queries.chapter({ relativePath: `${slug}.mdx` });

    const data = await client.queries.chapterConnection();
    const pathArray =
      data.data.chapterConnection.edges?.map(
        (edge) => edge?.node?._sys.filename
      ) || [];

    const currentIndex = pathArray.findIndex((path) => path === slug);
    const prev =
      currentIndex === 0
        ? pathArray[pathArray.length - 1]
        : pathArray[currentIndex - 1];
    const next =
      currentIndex === pathArray.length - 1
        ? pathArray[0]
        : pathArray[currentIndex + 1];

    return {
      post: {
        title: post.data.chapter.title,
        synopsis: post.data.chapter.synopsis || "",
        body: post.data.chapter.body,
      },
      prev: prev || "",
      next: next || "",
    };
  });

const components = {
  p: (props: { children: React.ReactNode }) => {
    return (
      <p className="indent-8 py-1 leading-relaxed first-of-type:first-letter:text-5xl first-of-type:first-letter:font-serif first-of-type:first-letter:font-bold first-of-type:first-letter:float-left first-of-type:first-letter:mr-2 first-of-type:first-letter:mt-1 first-of-type:first-letter:leading-none">
        {props.children}
      </p>
    );
  },
  Illustration: Illustration,
};

export const Route = createFileRoute("/chapter/$slug")({
  loader: ({ params }) => getChapter({ data: params.slug }),
  component: ChapterPage,
});

function ChapterPage() {
  const { post, prev, next } = Route.useLoaderData();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageHeight, setPageHeight] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate dimensions and pages
  const calculateLayout = useCallback(() => {
    if (measureRef.current && containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const scrollHeight = measureRef.current.scrollHeight;

      setPageHeight(containerHeight);

      // Total pages = title page (1) + content pages
      const contentPages = Math.max(1, Math.ceil(scrollHeight / containerHeight));
      setTotalPages(1 + contentPages); // +1 for title page

      // Adjust current page if needed
      if (currentPage >= 1 + contentPages) {
        setCurrentPage(Math.max(0, contentPages));
      }
    }
  }, [currentPage]);

  useEffect(() => {
    const timer = setTimeout(calculateLayout, 150);
    window.addEventListener("resize", calculateLayout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateLayout);
    };
  }, [calculateLayout, post]);

  // Recalculate after images load
  useEffect(() => {
    const images = measureRef.current?.querySelectorAll("img");
    images?.forEach((img) => {
      img.addEventListener("load", calculateLayout);
    });
    return () => {
      images?.forEach((img) => {
        img.removeEventListener("load", calculateLayout);
      });
    };
  }, [calculateLayout, post]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  const isTitlePage = currentPage === 0;

  // Content page index (0 = first content page, which is overall page 1)
  const contentPageIndex = currentPage - 1;

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-60px)] p-4">
      {/* Hidden measurement container - always rendered */}
      <div
        ref={containerRef}
        className="absolute opacity-0 pointer-events-none"
        style={{ height: "70vh", width: "672px", padding: "32px 48px" }}
        aria-hidden="true"
      >
        <div ref={measureRef} className="font-serif text-stone-800 leading-relaxed text-[16px]">
          <TinaMarkdown content={post.body} components={components} />
        </div>
      </div>

      {/* Book container */}
      <div className="relative max-w-2xl w-full">
        <div className="bg-stone-50 shadow-[0_0_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
          {/* Single page */}
          <div className="relative" style={{ height: "70vh" }}>
            {/* Title page */}
            {isTitlePage ? (
              <div className="h-full px-12 py-12 flex flex-col justify-center items-center text-center">
                <h1 className="font-serif tracking-wide font-bold text-4xl text-stone-800 mb-4">
                  {post.title}
                </h1>
                <div className="h-px bg-stone-300 w-20 mb-4" />
                <h2 className="font-serif italic text-stone-500 text-lg max-w-sm mb-8">
                  {post.synopsis}
                </h2>
                {/* Placeholder for illustration */}
                <div className="w-48 h-48 border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center text-stone-400 text-sm">
                  Illustration
                </div>
              </div>
            ) : (
              /* Content pages */
              <div className="h-full px-12 py-8 overflow-hidden">
                <div className="font-serif text-stone-800 leading-relaxed text-[16px] h-full overflow-hidden">
                  <div
                    style={{
                      transform: `translateY(-${contentPageIndex * pageHeight}px)`,
                    }}
                  >
                    <TinaMarkdown content={post.body} components={components} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Page number */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-stone-400 text-sm font-serif">
            {currentPage + 1}
          </div>

          {/* Navigation footer */}
          <div className="border-t border-stone-200 px-8 py-3">
            <div className="flex justify-between items-center font-serif text-sm text-stone-600">
              <button
                onClick={() => {
                  if (!isFirstPage) {
                    goToPage(currentPage - 1);
                  } else {
                    window.location.href = `/chapter/${prev}`;
                  }
                }}
                className="hover:text-stone-900 transition-colors"
              >
                ← Previous
              </button>
              <a href="/toc" className="hover:text-stone-900 transition-colors">
                Lakehouse Stories
              </a>
              <button
                onClick={() => {
                  if (!isLastPage) {
                    goToPage(currentPage + 1);
                  } else {
                    window.location.href = `/chapter/${next}`;
                  }
                }}
                className="hover:text-stone-900 transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
