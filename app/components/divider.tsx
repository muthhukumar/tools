import * as React from "react";
import { twMerge } from "tailwind-merge";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Divider(props: DividerProps) {
  return (
    <div
      {...props}
      className={twMerge("my-4 h-[0.5px] w-full bg-gray-300", props.className)}
    ></div>
  );
}
