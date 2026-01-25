import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../../tina/__generated__/client";
import Paginate from "../../components/paginate";
import Illustration from "../../components/illustration";

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
      <p className="indent-6 text-justify p-2 first-of-type:first-letter:text-3xl first-of-type:first-letter:font-bold first-of-type:first-letter:uppercase last-of-type:pb-8">
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

  return (
    <main>
      <section className="container border-solid border-gray-200 shadow-page mt-5 mx-auto mb-0 pt-10 px-12 pb-12 max-w-2xl bg-white max-h-[90vh] overflow-y-auto text-slate-800">
        <Paginate next={next} prev={prev} />
        <h1 className="tracking-wide uppercase text-center font-bold text-xl pt-6">
          {post.title}
        </h1>
        <h2 className="text-center italic pb-2">{post.synopsis}</h2>
        <TinaMarkdown content={post.body} components={components} />
        <Paginate next={next} prev={prev} />
      </section>
    </main>
  );
}
