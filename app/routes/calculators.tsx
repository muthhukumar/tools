import type { MetaFunction } from "@remix-run/server-runtime";

import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {

  return {
    title: "Calculators",
  };
};

export default function Calculators() {
  return (
    <div>
      <Link to="age" className="text-blue-500"> 1. Age Calculator</Link>
    </div>
  );
}
