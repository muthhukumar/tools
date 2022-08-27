import type { LoaderArgs } from "@remix-run/server-runtime";

import { json } from "@remix-run/server-runtime";
import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";

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

  const submit = useSubmit();

  return (
    <div>
      <Heading className="mb-8">Age Calculator</Heading>
      <Form
        className="flex flex-col gap-y-4"
        method="get"
        action="/calculators/age"
        onReset={() =>
          submit(null, { method: "get", action: "/calculators/age" })
        }
      >
        <label htmlFor="dateOfBirth">
          <span>Date of birth</span>
          <DateInput
            id="dateOfBirth"
            name="dateOfBirth"
            required
            defaultValue={searchParams.get("dateOfBirth") ?? ""}
          />
        </label>
        <label htmlFor="ageAtTheDateOf">
          <span>Age at the date of</span>
          <DateInput
            id="ageAtTheDateOf"
            name="ageAtTheDateOf"
            required
            defaultValue={searchParams.get("ageAtTheDateOf") ?? today}
          />
        </label>
        <div className="mx-auto flex w-full items-center justify-center gap-x-2 sm:w-2/3 md:w-1/3">
          <Button type="submit" className="w-full">
            Calculate
          </Button>
          <Button type="reset" className="w-full text-red-400">
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
            <p>{ageCalculation.days} days old</p>
            <p>{ageCalculation.hours} hours old</p>
            <p>{ageCalculation.minutes} minutes old</p>
            <p>{ageCalculation.seconds} seconds old</p>
          </div>
        </>
      )}
    </div>
  );
}
