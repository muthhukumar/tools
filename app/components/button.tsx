import * as React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function Button(props: ButtonProps) {
  return <button {...props} className={twMerge("border border-current rounded-md py-2 px-5", props.className)} />;
}
