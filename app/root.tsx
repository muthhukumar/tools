import type { LinksFunction, MetaFunction } from "@remix-run/node";

import { Toaster } from "react-hot-toast";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { BreadCrumb } from "./components";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Utilities and Calculators",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="mx-auto h-full max-w-2xl px-4 py-8">
          <BreadCrumb className="mb-8" />
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
