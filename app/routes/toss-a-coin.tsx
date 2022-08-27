import type { MetaFunction } from "@remix-run/server-runtime";

import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";

import { Button, DisplayContent, Heading } from "~/components";
import { tossCoin } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Toss a Coin",
  };
};

export function loader() {
  return json({ tossResult: tossCoin() });
}

export default function TossACoin() {
  const { tossResult } = useLoaderData<typeof loader>();
  return (
    <div>
      <Heading className="mb-8">Toss a coin</Heading>
      {/* <div className="flex justify-center">
        <img src="/coin.svg" className="h-20 w-20" alt="Coin" />
      </div> */}
      <DisplayContent className="mt-4">
        Its <strong>{tossResult}</strong>
      </DisplayContent>
      <Form
        method="get"
        action="/toss-a-coin"
        className="mt-4 flex justify-center"
      >
        <Button>Flip</Button>
      </Form>
    </div>
  );
}
