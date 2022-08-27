import { Link } from "@remix-run/react";

export default function Calculators() {
  return (
    <div>
      <Link to="age" className="text-blue-500"> 1. Age Calculator</Link>
    </div>
  );
}
