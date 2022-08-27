import * as React from "react";
import { twMerge } from "tailwind-merge";

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function DateInput(props: DateInputProps) {
  return (
    <input
      type="date"
      {...props}
      className={twMerge(
        "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
        props.className
      )}
    />
  );
}
