import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getParts, LegoPart } from "~/api";

type LoaderData = {
  parts: LegoPart[];
  total: number;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.setNum) {
    throw new Error("Not Found");
  }

  const parts = await getParts(params.setNum);

  if (!parts || parts.length === 0) {
    throw new Error("Not Found");
  }

  const total = parts.reduce((acc, cur) => acc + cur.quantity, 0);

  return json<LoaderData>({ parts, total });
};

export default function PartsView() {
  const { parts, total } = useLoaderData<LoaderData>();

  return (
    <div>
      Total number of elements: {total}
      <ul>
        {parts.map((part) => (
          <li key={part.id}>{part.part.name}</li>
        ))}
      </ul>
    </div>
  );
}
