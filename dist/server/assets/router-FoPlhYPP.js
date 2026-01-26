import { Link, createRootRoute, HeadContent, ScrollRestoration, Scripts, createFileRoute, lazyRouteComponent, createRouter as createRouter$1 } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
const appCss = "/assets/globals-CZBtno82.css";
const navigation = [
  { name: "Table of Contents", href: "/toc", isRoute: true },
  { name: "Characters", href: "#", isRoute: false },
  { name: "Mr. Finnigan's Diary", href: "#", isRoute: false }
];
function Navbar() {
  return /* @__PURE__ */ jsx("header", { className: "bg-black", children: /* @__PURE__ */ jsxs(
    "nav",
    {
      className: "mx-auto flex items-center justify-between p-4 lg:px-8",
      "aria-label": "Global",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex lg:flex-1", children: /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: "text-sm font-semibold leading-6 text-slate-200",
            children: "The Lakehouse Stories"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex lg:gap-x-12", children: navigation.map(
          (item) => item.isRoute ? /* @__PURE__ */ jsx(
            Link,
            {
              to: item.href,
              className: "text-sm font-semibold leading-6 text-slate-200",
              children: item.name
            },
            item.name
          ) : /* @__PURE__ */ jsx(
            "a",
            {
              href: item.href,
              className: "text-sm font-semibold leading-6 text-slate-200",
              children: item.name
            },
            item.name
          )
        ) })
      ]
    }
  ) });
}
const Route$3 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "The Lakehouse Stories"
      },
      {
        name: "description",
        content: "A digital children's book about the animals who live in the forest around the lakehouse"
      }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "font-sans bg-center bg-no-repeat bg-cover bg-[url('/illustrations/lakehouse/Lakehouse1.1.png')] min-h-screen", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const $$splitComponentImporter$2 = () => import("./toc-9LrUuNGQ.js");
const getTitleArray = createServerFn({
  method: "GET"
}).handler(createSsrRpc("2395578522a5af6a5670bb84157fad05b8069edd232b507a6c884274898f2193"));
const Route$2 = createFileRoute("/toc")({
  loader: async () => {
    const titles = await getTitleArray();
    return {
      titles
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-193SsjUY.js");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./_slug-5IbCa5VT.js");
const getChapter = createServerFn({
  method: "GET"
}).inputValidator((slug) => slug).handler(createSsrRpc("fec5c81ea9499f60a4f3879c20582379d0efb5e6aaeb4b04a29fa26c35904824"));
const Route = createFileRoute("/chapter/$slug")({
  loader: ({
    params
  }) => getChapter({
    data: params.slug
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TocRoute = Route$2.update({
  id: "/toc",
  path: "/toc",
  getParentRoute: () => Route$3
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const ChapterSlugRoute = Route.update({
  id: "/chapter/$slug",
  path: "/chapter/$slug",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  TocRoute,
  ChapterSlugRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
function createRouter() {
  const router2 = createRouter$1({
    routeTree,
    scrollRestoration: true
  });
  return router2;
}
const getRouter = createRouter;
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRouter,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$2 as R,
  Route as a,
  router as r
};
