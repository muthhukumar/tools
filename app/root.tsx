import * as React from "react"
import {Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation} from "@remix-run/react"
import "./tailwind.css"
import {GTAG_ID} from "./utils/gtags"

import * as gtag from "~/utils/gtags"
import {MetaFunction} from "@remix-run/node"

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Utilities and Calculators",
    viewport: "width=device-width,initial-scale=1",
  },
]

export function Layout({children}: {children: React.ReactNode}) {
  const location = useLocation()

  React.useEffect(() => {
    if (GTAG_ID) {
      gtag.pageview(location.pathname, GTAG_ID)
    }
  }, [location])

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} />
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
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
