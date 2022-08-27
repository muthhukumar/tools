import { Link, useLocation } from "@remix-run/react";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { v4 as uuidV4 } from "uuid";
import { capitalCase } from "change-case";

import { capitalize } from "~/utils";

interface BreadCrumbProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {}

function getLocationsFromPathname(pathname: string) {
  if (pathname === "/") {
    return [{ name: "Home", path: "/", id: uuidV4() }];
  }

  const items = pathname.split("/");

  return items.reduce((previous, current, index) => {
    const name = current === "" && index === 0 ? "Home" : current;
    const path = `${previous[index - 1]?.path ?? ""}${current}`;

    if (current === "" && index > 1) {
      return previous;
    }

    return previous.concat({
      name: capitalize(name),
      path: index + 1 < items.length ? `${path}/` : path,
      id: uuidV4(),
    });
  }, [] as Array<{ name: string; path: string; id: string }>);
}

export default function BreadCrumb(props: BreadCrumbProps) {
  const location = useLocation();
  const locations = getLocationsFromPathname(location.pathname);

  return (
    <div
      {...props}
      className={twMerge(
        "flex items-center gap-x-2 border-b pb-3 font-semibold",
        props.className
      )}
    >
      {locations.map((currentLocation, index) => (
        <React.Fragment key={currentLocation.id}>
          <Link
            to={currentLocation.path}
            className="text-sm active:text-blue-600"
          >
            {capitalCase(currentLocation.name)}
          </Link>
          {index + 1 < locations.length && <span className="text-xs">/</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
