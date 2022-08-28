import type { LoaderArgs, MetaFunction } from "@remix-run/server-runtime";

import { json } from "@remix-run/server-runtime";
import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { Button, DisplayContent, Divider, Heading } from "~/components";
import { removeWhiteSpaces } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Remove spaces",
  };
};

export function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const data = String(url.searchParams.get("data") ?? "");

  if (!data) {
    return json({ result: null });
  }

  return json({ result: removeWhiteSpaces(data) });
}

export default function RemoveSpaces() {
  const { result } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  return (
    <div>
      <Heading className="mb-8">Remove white spaces</Heading>
      <Form method="get" action="/remove-spaces">
        <label className="block">
          <span>Enter your text here</span>
          <textarea
            rows={6}
            name="data"
            defaultValue={searchParams.get("data") ?? ""}
            className="w-full rounded-md"
            required
          ></textarea>
        </label>
        <div className="mt-4 flex items-center justify-start gap-x-3">
          <Button type="submit">Remove spaces</Button>
          <Button
            className="text-red-400"
            type="reset"
            onClick={() =>
              submit({ data: "" }, { method: "get", action: "/remove-spaces" })
            }
          >
            Clear
          </Button>
        </div>
      </Form>
      {result && (
        <>
          <Divider className="my-8" />
          <Heading as="h3">Result</Heading>
          <DisplayContent className="">{result}</DisplayContent>
        </>
      )}
    </div>
  );
}
