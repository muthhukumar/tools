import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main>
      <div className="flex flex-col gap-y-3">
        <Link to="/calculators" className="text-blue-500">
          1. Calculators
        </Link>
        <Link to="/generators" className="text-blue-500">
          2. Generators
        </Link>
      </div>
    </main>
  );
}
