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
const getTitleArray_createServerFn_handler = createServerRpc({
  id: "2395578522a5af6a5670bb84157fad05b8069edd232b507a6c884274898f2193",
  name: "getTitleArray",
  filename: "src/routes/toc.tsx"
}, (opts, signal) => getTitleArray.__executeServer(opts, signal));
const getTitleArray = createServerFn({
  method: "GET"
}).handler(getTitleArray_createServerFn_handler, async () => {
  const data = await client.queries.chapterConnection();
  const titlesArray = data.data.chapterConnection.edges?.map((edge) => edge?.node);
  return titlesArray?.map((node) => ({
    title: node?.title || "",
    path: node?.id.split("/").pop()?.replace(/\.mdx$/, "") || "",
    synopsis: node?.synopsis || ""
  })) || [];
});
export {
  getTitleArray_createServerFn_handler
};
