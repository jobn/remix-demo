import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { LegoSet, getSet } from "~/api";

type LoaderData = {
  set: LegoSet;
};

export const loader: LoaderFunction = async ({ params }) => {
  const set = await getSet(params.setNum);

  if (!set) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json({ set });
};

export default function SetView() {
  const { set } = useLoaderData<LoaderData>();

  return (
    <>
      <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
        <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
          <div className="sm:col-span-8 lg:col-span-7">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
              <img
                src={set.set_img_url}
                alt={set.name}
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="sm:col-span-4 lg:col-span-5">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
              {set.name}
            </h2>

            <section className="mt-3">
              <p className="text-2xl text-gray-900">{set.set_num}</p>
              <p className="mt-6 text-sm text-gray-700">Year: {set.year}</p>
              <p className="mt-4 text-sm text-gray-700">
                Number of parts: {set.num_parts}
              </p>
            </section>

            <section className="mt-3">
              <Link
                to="parts"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                View Parts
              </Link>
            </section>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}
