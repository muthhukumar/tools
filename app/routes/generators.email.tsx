import { json } from "@remix-run/server-runtime";
import { faker } from "@faker-js/faker";

import { Button, Heading } from "~/components";
import { Form, useLoaderData } from "@remix-run/react";

export function loader() {
  return json({ email: faker.internet.email() });
}

export default function GenerateEmail() {
  const { email } = useLoaderData<typeof loader>();
  return (
    <div>
      <Heading className="mb-8">Random Email Generator</Heading>
      {email && <div className="rounded-md border p-3">{email}</div>}
      <Form method="get" className="mt-4 flex justify-center">
        <Button>Generate</Button>
      </Form>
    </div>
  );
}
