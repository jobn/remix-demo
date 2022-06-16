import { Collection } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

type LoaderData = {
  collection: Collection;
};

export const loader: LoaderFunction = async ({ params }) => {
  const collection = await db.collection.findFirst({
    where: { id: params.id },
  });

  if (!collection) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return { collection };
};

export default function CollectionsIndex() {
  const { collection } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1 className="text-2xl font-bold">{collection.name}</h1>
    </div>
  );
}
