import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSet, LegoSet } from "~/api";

type LoaderData = {
  set: LegoSet;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const setNum = params.setNum;

  if (typeof setNum === "undefined") {
    throw new Error("unknow set number");
  }

  const data = await getSet(setNum);

  return json({ set: data });
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
    </div>
  );
}
