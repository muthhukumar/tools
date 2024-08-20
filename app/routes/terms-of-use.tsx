import { MetaFunction } from "@remix-run/node";
import { Heading } from "~/components";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Terms of use",
    },
  ];
};

export default function TermsOfUse() {
  return (
    <div>
      <Heading>Terms of use</Heading>
      <p>Working on it.</p>
    </div>
  );
}
