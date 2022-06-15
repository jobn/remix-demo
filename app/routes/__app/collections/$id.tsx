import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Collection,
  getCollection,
  getCollections,
} from "~/models/collections";

type LoaderData = {
  collection: Collection;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) {
    throw new Error("Invalid id");
  }

  const id = parseInt(params.id);

  if (isNaN(id)) {
    throw new Error("Invalid id");
  }

  const collection = await getCollection(id);

  if (!collection) {
    throw new Error("Collection not found");
  }

  return json<LoaderData>({ collection });
};

export default function CollectionsIndex() {
  const { collection } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1 className="text-2xl font-bold">{collection.name}</h1>
    </div>
  );
}
