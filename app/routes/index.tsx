import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main>
      <Link to="/calculators" className="text-blue-500">1. Calculators</Link>
    </main>
  );
}
