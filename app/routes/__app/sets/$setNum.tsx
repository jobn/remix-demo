import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { LegoSet, getSet } from "~/api";

type LoaderData = {
  set: LegoSet;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.setNum) {
    throw new Error("Not Found");
  }

  const set = await getSet(params.setNum);

  if (!set) {
    throw new Error("Not Found");
  }

  return json({ set });
};

export default function SetView() {
  const { set } = useLoaderData<LoaderData>();

  return (
    <div>
      <h3>{set.name}</h3>
      <img
        src={set.set_img_url}
        className="h-auto max-w-full"
        alt={`lego set ${set.name}`}
      />

      <Link to="parts">Parts</Link>
      <Outlet />
    </div>
  );
}
