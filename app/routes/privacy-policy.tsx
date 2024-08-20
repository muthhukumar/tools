import { MetaFunction } from "@remix-run/node";
import { Heading } from "~/components";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Privacy policy",
    },
  ];
};

export default function PrivacyPolicy() {
  return (
    <div>
      <Heading>Privacy</Heading>
      <p>Working on it.</p>
    </div>
  );
}
