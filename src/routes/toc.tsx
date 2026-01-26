import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { client } from "../../tina/__generated__/client";

interface TitleItem {
  title: string;
  path: string;
  synopsis: string;
}

const getTitleArray = createServerFn({ method: "GET" }).handler(
  async (): Promise<TitleItem[]> => {
    const data = await client.queries.chapterConnection();
    const titlesArray = data.data.chapterConnection.edges?.map(
      (edge) => edge?.node
    );

    return (
      titlesArray?.map((node) => ({
        title: node?.title || "",
        path:
          node?.id
            .split("/")
            .pop()
            ?.replace(/\.mdx$/, "") || "",
        synopsis: node?.synopsis || "",
      })) || []
    );
  }
);

export const Route = createFileRoute("/toc")({
  loader: async () => {
    const titles = await getTitleArray();
    return { titles };
  },
  component: TOC,
});

function TOC() {
  const { titles } = Route.useLoaderData();

  return (
    <main>
      <section className="container border-solid border-gray-200 shadow-page mt-6 mx-auto mb-0 pt-14 px-12 pb-12 max-w-2xl bg-white max-h-[90vh] overflow-y-auto text-slate-800">
        <ul>
          {titles.map((item, index) => (
            <li key={item.path}>
              <div className="pb-3">
                <Link
                  to="/chapter/$slug"
                  params={{ slug: item.path }}
                  className="block"
                >
                  <div className="flex">
                    <h2 className="font-bold">{item.title}</h2>
                    <h2 className="ms-auto">{index + 1}</h2>
                  </div>
                  <h2 className="italic">{item.synopsis}</h2>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
