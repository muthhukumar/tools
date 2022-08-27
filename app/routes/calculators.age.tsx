import type { LoaderArgs } from "@remix-run/server-runtime";

import { json } from "@remix-run/server-runtime";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";

import { Button, DateInput, Divider, Heading } from "~/components";
import { getDiffBetweenTwoDates, getToday } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const dateOfBirth = url.searchParams.get("dateOfBirth");
  const ageAtTheDateOf = url.searchParams.get("ageAtTheDateOf");

  if (!dateOfBirth || !ageAtTheDateOf) {
    return json({ today: getToday(), ageCalculation: null });
  }

  return json({
    today: getToday(),
    ageCalculation: getDiffBetweenTwoDates({
      fromDate: dateOfBirth,
      toDate: ageAtTheDateOf,
    }),
  });
}

export default function Age() {
  const { ageCalculation, today } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <div>
      <Heading className="mb-8">Age Calculator</Heading>
      <Form
        className="flex flex-col gap-y-4"
        method="get"
        action="/calculators/age"
      >
        <div>
          <label htmlFor="dateOfBirth">Date of birth</label>
          <DateInput
            id="dateOfBirth"
            name="dateOfBirth"
            required
            defaultValue={searchParams.get("dateOfBirth") ?? ""}
          />
        </div>
        <div>
          <label htmlFor="ageAtTheDateOf">Age at the date of</label>
          <DateInput
            id="ageAtTheDateOf"
            name="ageAtTheDateOf"
            required
            defaultValue={searchParams.get("ageAtTheDateOf") ?? today}
          />
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <Button type="submit">Calculate</Button>
          <Button type="reset" className="text-red-400">
            Reset
          </Button>
        </div>
      </Form>
      {ageCalculation && (
        <>
          <Divider className="my-8" />
          <Heading as="h3">Result</Heading>
          <div className="mt-4 flex flex-col gap-y-3">
            <Heading as="h4">Age</Heading>
            <p>{ageCalculation.years} years old</p>
            <p>{ageCalculation.months} months old</p>
            <p>{ageCalculation.weeks} weeks old</p>
            <p>{ageCalculation.days} Days old</p>
            <p>{ageCalculation.seconds} seconds old</p>
          </div>
        </>
      )}
    </div>
  );
}
