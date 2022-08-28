import * as React from "react";
import { twMerge } from "tailwind-merge";

interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Center(props: CenterProps) {
  return (
    <div
      {...props}
      className={twMerge("w-full flex items-center justify-center", props.className)}
    />
  );
}
