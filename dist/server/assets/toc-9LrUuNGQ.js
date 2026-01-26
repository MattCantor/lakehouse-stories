import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { R as Route } from "./router-FoPlhYPP.js";
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
function TOC() {
  const {
    titles
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("section", { className: "container border-solid border-gray-200 shadow-page mt-6 mx-auto mb-0 pt-14 px-12 pb-12 max-w-2xl bg-white max-h-[90vh] overflow-y-auto text-slate-800", children: /* @__PURE__ */ jsx("ul", { children: titles.map((item, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("div", { className: "pb-3", children: /* @__PURE__ */ jsxs(Link, { to: "/chapter/$slug", params: {
    slug: item.path
  }, className: "block", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold", children: item.title }),
      /* @__PURE__ */ jsx("h2", { className: "ms-auto", children: index + 1 })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "italic", children: item.synopsis })
  ] }) }) }, index)) }) }) });
}
export {
  TOC as component
};
