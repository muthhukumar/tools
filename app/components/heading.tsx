import * as React from "react";
import { twMerge } from "tailwind-merge";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function Heading({ as, ...props }: HeadingProps) {
  const HeadingType = as ?? "h2";
  return (
    <HeadingType {...props} className={twMerge("text-xl font-bold", props.className)} />
  );
}
