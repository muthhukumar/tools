import { json } from "@remix-run/server-runtime";
import { faker } from "@faker-js/faker";

import { Button, Heading } from "~/components";
import { Form, useLoaderData } from "@remix-run/react";

export function loader() {
  return json({ name: faker.name.fullName() });
}

export default function GenerateName() {
  const { name } = useLoaderData<typeof loader>();
  return (
    <div>
      <Heading className="mb-8">Random Name Generator</Heading>
      {name && <div className="rounded-md border p-3">{name}</div>}
      <Form method="get" className="mt-4 flex justify-center">
        <Button>Generate</Button>
      </Form>
    </div>
  );
}
