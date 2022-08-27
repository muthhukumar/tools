import type { LoaderArgs } from "@remix-run/server-runtime";

import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import copyToClipboard from "copy-to-clipboard";
import { toast } from "react-hot-toast";

import { Button, Heading } from "~/components";
import { capitalize, generateRandom, options } from "~/utils";

export function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  const generate = (url.searchParams.get("generate") ??
    "name") as keyof typeof generateRandom;

  return json({ data: generateRandom(generate) });
}

export default function Generators() {
  const { data } = useLoaderData();
  const [searchParams] = useSearchParams();

  const submit = useSubmit();

  const handleCopyToClipboard = () => {
    copyToClipboard(data);
    toast.success("Copied!", { duration: 2000 });
  };

  return (
    <div>
      <Heading className="mb-4">Generators</Heading>
      <Form
        method="get"
        action=""
        className="mt-4"
        onChange={(event) =>
          submit(event.currentTarget, { method: "get", action: "" })
        }
      >
        <label className="block">
          <span className="text-gray-700">Generate</span>
          <select
            className="mt-4 block w-full rounded-md"
            name="generate"
            defaultValue={searchParams.get("generate") ?? ""}
          >
            {Object.keys(options).map((generate) => (
              <option key={generate} value={generate}>
                {capitalize(generate)}
              </option>
            ))}
          </select>
        </label>
        {data && <div className="mt-4 rounded-md border py-2 px-3">{data}</div>}
        <div className="mt-6 flex justify-center">
          <Button type="submit" className="mr-2">
            Generate
          </Button>
          <Button
            type="button"
            className="text-amber-400"
            onClick={handleCopyToClipboard}
          >
            Copy
          </Button>
        </div>
      </Form>
    </div>
  );
}
