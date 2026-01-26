import { c as createServerRpc, a as client } from "./client-BVF-ZY06.js";
import { c as createServerFn } from "../server.js";
import "tinacms/dist/client";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const getChapter_createServerFn_handler = createServerRpc({
  id: "fec5c81ea9499f60a4f3879c20582379d0efb5e6aaeb4b04a29fa26c35904824",
  name: "getChapter",
  filename: "src/routes/chapter/$slug.tsx"
}, (opts, signal) => getChapter.__executeServer(opts, signal));
const getChapter = createServerFn({
  method: "GET"
}).inputValidator((slug) => slug).handler(getChapter_createServerFn_handler, async ({
  data: slug
}) => {
  const post = await client.queries.chapter({
    relativePath: `${slug}.mdx`
  });
  const data = await client.queries.chapterConnection();
  const pathArray = data.data.chapterConnection.edges?.map((edge) => edge?.node?._sys.filename) || [];
  const currentIndex = pathArray.findIndex((path) => path === slug);
  const prev = currentIndex === 0 ? pathArray[pathArray.length - 1] : pathArray[currentIndex - 1];
  const next = currentIndex === pathArray.length - 1 ? pathArray[0] : pathArray[currentIndex + 1];
  return {
    post: {
      title: post.data.chapter.title,
      synopsis: post.data.chapter.synopsis || "",
      body: post.data.chapter.body
    },
    prev: prev || "",
    next: next || ""
  };
});
export {
  getChapter_createServerFn_handler
};
