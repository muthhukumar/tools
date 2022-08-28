import type { LoaderArgs } from "@remix-run/server-runtime";

import { json } from "@remix-run/server-runtime";
import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { Button, DisplayContent, Divider, Heading } from "~/components";
import {
  base64ToString,
  capitalize,
  encodeOptions,
  stringToBase64,
} from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const data = url.searchParams.get("data") ?? "";
  const action = url.searchParams.get("action") ?? "encode";
  const encodeOption =
    url.searchParams.get("encodeOption") ?? encodeOptions.base64;

  if (!data) {
    return json({ result: null });
  }

  const result =
    action === "encode"
      ? stringToBase64(data, encodeOption as keyof typeof encodeOptions)
      : base64ToString(data, encodeOption as keyof typeof encodeOptions);

  return json({ result });
}

export default function Base64() {
  const { result } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action") ?? "encode";
  const encodeOption = searchParams.get("encodeOption") ?? encodeOptions.base64;

  const submit = useSubmit();

  const heading =
    action === "encode" ? `${capitalize(action)} to ${encodeOption}` : `Decode`;

  return (
    <div>
      <Heading className="mb-8">Base 64</Heading>
      <Heading as="h3">{heading}</Heading>
      <Form method="get" action="">
        <label className="mt-4 block">
          <span>Action</span>
          <select
            className="block w-full rounded-md"
            name="action"
            onChange={(event) =>
              submit(
                { action: event.target.value, encodeOption, data: "" },
                { method: "get", action: "/base64" }
              )
            }
            defaultValue={action}
          >
            <option value="encode">Encode</option>
            <option value="decode">Decode</option>
          </select>
        </label>
        <label className={`mt-4 block`}>
          <label>
            {action === "decode" ? "Encoded format" : "Output option"}
          </label>
          <select
            onChange={(event) =>
              submit(
                { action: action, encodeOption: event.target.value, data: "" },
                { method: "get", action: "/base64" }
              )
            }
            className={`block w-full rounded-md`}
            name="encodeOption"
            defaultValue={encodeOption}
          >
            {Object.keys(encodeOptions).map((outputOption) => {
              return (
                <option value={outputOption} key={outputOption}>
                  {outputOption}
                </option>
              );
            })}
          </select>
        </label>
        <label className="my-4 block">
          <span>Enter your data here</span>
          <textarea
            name="data"
            title="data"
            className="w-full rounded-md"
            defaultValue={searchParams.get("data") ?? ""}
            required
            rows={4}
          ></textarea>
        </label>
        <Button>{capitalize(action)}</Button>
      </Form>
      {result && (
        <>
          <Divider className="my-8" />
          <Heading as="h3" className="mb-4">
            Result
          </Heading>
          <DisplayContent>{result}</DisplayContent>
        </>
      )}
    </div>
  );
}
