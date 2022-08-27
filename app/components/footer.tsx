import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="mx-auto py-6 max-w-2xl border-t text-sm">
      <div className="flex flex-col items-start md:flex-row justify-between">
        <p className="font-semibold">Calculators, Generators and others.</p>
        <div className="mt-4 md:mt-0 flex flex-col  gap-y-2 text-xs">
          <a
            href="https://github.com/muthhukumar/tools"
            target="_blank"
            rel="noreferrer"
          >
            Source code
          </a>
          <a
            href="https://github.com/muthhukumar"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href="https://twitter.com/am_muthukumar"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
      <p className="mt-4 text-xs">
        © 2022-present Muthukumar. All Rights Reserved.
      </p>
    </footer>
  );
}
