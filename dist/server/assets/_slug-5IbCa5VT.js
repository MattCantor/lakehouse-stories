import { jsxs, jsx } from "react/jsx-runtime";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Link } from "@tanstack/react-router";
import { a as Route } from "./router-FoPlhYPP.js";
import "../server.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
function Paginate({ next, prev }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between space-x-3 font-light text-xs", children: [
    /* @__PURE__ */ jsx(Link, { to: "/chapter/$slug", params: { slug: prev }, children: "Previous" }),
    /* @__PURE__ */ jsx(Link, { to: "/toc", children: "Lakehouse Stories" }),
    /* @__PURE__ */ jsx(Link, { to: "/chapter/$slug", params: { slug: next }, children: "Next" })
  ] });
}
function Illustration({
  src,
  alt,
  float = "left"
}) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      alt,
      width: 130,
      height: 130,
      className: `${float === "left" ? "float-left" : "float-right"} mx-2 rounded-md border border-gray-300 shadow-md opacity-80 transform rotate-[-0.5deg]`
    }
  );
}
const components = {
  p: (props) => {
    return /* @__PURE__ */ jsx("p", { className: "indent-6 text-justify p-2 first-of-type:first-letter:text-3xl first-of-type:first-letter:font-bold first-of-type:first-letter:uppercase last-of-type:pb-8", children: props.children });
  },
  Illustration
};
function ChapterPage() {
  const {
    post,
    prev,
    next
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs("section", { className: "container border-solid border-gray-200 shadow-page mt-5 mx-auto mb-0 pt-10 px-12 pb-12 max-w-2xl bg-white max-h-[90vh] overflow-y-auto text-slate-800", children: [
    /* @__PURE__ */ jsx(Paginate, { next, prev }),
    /* @__PURE__ */ jsx("h1", { className: "tracking-wide uppercase text-center font-bold text-xl pt-6", children: post.title }),
    /* @__PURE__ */ jsx("h2", { className: "text-center italic pb-2", children: post.synopsis }),
    /* @__PURE__ */ jsx(TinaMarkdown, { content: post.body, components }),
    /* @__PURE__ */ jsx(Paginate, { next, prev })
  ] }) });
}
export {
  ChapterPage as component
};
