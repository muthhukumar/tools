import * as React from "react";
import { twMerge } from "tailwind-merge";

interface DisplayContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function DisplayContent(props: DisplayContentProps) {
  return <div {...props} className={twMerge("break-words rounded-md border py-2 px-3", props.className)} />;
}
