/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import appCss from "../styles/globals.css?url";
import Navbar from "../components/navbar";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "The Lakehouse Stories",
      },
      {
        name: "description",
        content:
          "A digital children's book about the animals who live in the forest around the lakehouse",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans bg-center bg-no-repeat bg-cover bg-[url('/illustrations/lakehouse/Lakehouse1.1.png')] min-h-screen">
        <Navbar />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
