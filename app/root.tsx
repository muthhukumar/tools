import type { LinksFunction, MetaFunction } from "@remix-run/node";

import * as React from "react";
import { Toaster } from "react-hot-toast";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { BreadCrumb, Footer } from "./components";
import { GTAG_ID } from "./utils/gtags";

import * as gtag from "~/utils/gtags";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Utilities and Calculators",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const location = useLocation();

  React.useEffect(() => {
    if (GTAG_ID) {
      gtag.pageview(location.pathname, GTAG_ID);
    }
  }, [location]);
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {process.env.NODE_ENV === "development" || !GTAG_ID ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GTAG_ID}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
        <div className="mx-auto min-h-[100vh] max-w-2xl px-4 py-8">
          <BreadCrumb className="mb-8" />
          <Outlet />
        </div>
        <div className="px-4">
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
