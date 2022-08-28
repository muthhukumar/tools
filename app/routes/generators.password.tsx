import type { LoaderArgs, MetaFunction } from "@remix-run/server-runtime";

import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { toast } from "react-hot-toast";
import { json } from "@remix-run/server-runtime";
import copyToClipboard from "copy-to-clipboard";

import { Button, DisplayContent, Divider, Heading } from "~/components";
import { generatePassword, stringToBoolean } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Password generator",
  };
};

export function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const length = url.searchParams.get("length") ?? 5;
  let upperCaseAlphabets = stringToBoolean(
    url.searchParams.get("upperCaseAlphabets") ?? "false"
  );
  const lowerCaseAlphabets = stringToBoolean(
    url.searchParams.get("lowerCaseAlphabets") ?? "false"
  );
  const numbers = stringToBoolean(url.searchParams.get("numbers") ?? "false");
  const specialCharacters = stringToBoolean(
    url.searchParams.get("specialCharacters") ?? "false"
  );

  if (
    !upperCaseAlphabets &&
    !lowerCaseAlphabets &&
    !numbers &&
    !specialCharacters
  ) {
    upperCaseAlphabets = true;
  }

  const password = generatePassword({
    length: Number(length),
    lowerCaseAlphabets: lowerCaseAlphabets,
    numbers: numbers,
    specialCharacters: specialCharacters,
    upperCaseAlphabets: upperCaseAlphabets,
  });

  return json({
    length,
    upperCaseAlphabets,
    lowerCaseAlphabets,
    numbers,
    specialCharacters,
    password,
  });
}

export default function PasswordGenerator() {
  const {
    password,
    specialCharacters,
    length,
    upperCaseAlphabets,
    lowerCaseAlphabets,
    numbers,
  } = useLoaderData<typeof loader>();

  const submit = useSubmit();

  const handleCopyToClipboard = () => {
    copyToClipboard(password);
    toast.success("Copied!", { duration: 2000 });
  };

  return (
    <div className="">
      <Heading className="mb-8">Password Generator</Heading>
      <DisplayContent>{password}</DisplayContent>
      <Form
        method="get"
        action="/generators/password"
        onChange={(event) =>
          submit(event.currentTarget, {
            method: "get",
            action: "/generators/password",
          })
        }
      >
        <div className="mx-auto mt-6 flex w-full items-center justify-center gap-x-2 sm:w-2/3 md:w-1/3">
          <Button type="submit" className="w-full">
            Generate
          </Button>
          <Button
            type="button"
            className="w-full text-amber-400"
            onClick={handleCopyToClipboard}
          >
            Copy
          </Button>
        </div>
        <Divider className="my-10" />
        <Heading as="h3">Options</Heading>
        <label className="mt-6 flex items-center justify-between gap-x-3">
          <div className="flex gap-x-3">
            <span>length</span>
            <span>{length}</span>
          </div>
          <input
            type="range"
            min={5}
            max={128}
            defaultValue={length}
            name="length"
          />
        </label>
        <label className="mt-4 flex items-center justify-between gap-x-3">
          <span>A-Z</span>
          <input
            readOnly
            type="checkbox"
            checked={upperCaseAlphabets}
            value="true"
            name="upperCaseAlphabets"
          />
        </label>
        <label className="mt-4 flex items-center justify-between gap-x-3">
          <span>a-z</span>
          <input
            readOnly
            type="checkbox"
            value="true"
            checked={lowerCaseAlphabets}
            name="lowerCaseAlphabets"
          />
        </label>
        <label className="mt-4 flex items-center justify-between gap-x-3">
          <span>0-9</span>
          <input
            readOnly
            type="checkbox"
            value="true"
            checked={numbers}
            name="numbers"
          />
        </label>
        <label className="mt-4 flex items-center justify-between gap-x-3">
          <span>!@#$%^&*</span>
          <input
            readOnly
            type="checkbox"
            value="true"
            checked={specialCharacters}
            name="specialCharacters"
          />
        </label>
      </Form>
    </div>
  );
}
