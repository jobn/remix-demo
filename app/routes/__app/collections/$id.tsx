import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export const loader = async ({ params }: LoaderArgs) => {
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
  const { collection } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-2xl font-bold">{collection.name}</h1>
    </div>
  );
}
