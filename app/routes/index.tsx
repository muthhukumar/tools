import { Link } from "@remix-run/react";

const links = [
  {
    to: "/calculators",
    title: "Calculators",
  },
  {
    to: "/generators",
    title: "Random Generator",
  },
  {
    to: "/generators/password",
    title: "Password Generator",
  },
];

export default function Index() {
  return (
    <main>
      <div className="flex flex-col gap-y-3">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="text-blue-500">
            {link.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
