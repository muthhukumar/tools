import type { MetaFunction } from "@remix-run/server-runtime";

import { Heading } from "~/components";

export const meta: MetaFunction = () => {
  return {
    title: "Privacy policy",
  };
};

export default function PrivacyPolicy() {
  return (
    <div>
      <Heading>Privacy</Heading>
      <p>Working on it.</p>
    </div>
  );
}
