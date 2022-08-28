import * as React from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export default function TextInput(props: TextInputProps) {
  return (
    <input
      type={"text"}
      {...props}
      className={twMerge("rounded-md", props.className)}
    />
  );
}
