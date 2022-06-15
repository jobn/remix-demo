import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { Collection, getCollections } from "~/models/collections";

type LoaderData = {
  collections: Collection[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const collections = await getCollections();

  return json<LoaderData>({ collections });
};

export default function Posts() {
  const { collections } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-grow overflow-hidden">
      <div className="w-64 flex-shrink-0 overflow-y-scroll p-4">
        <ul className="divide-y divide-gray-200">
          {collections.map((collection) => (
            <li
              key={collection.id}
              className="relative bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
            >
              <NavLink
                to={collection.id.toString()}
                className={({ isActive }) =>
                  `block py-5 px-4 ${isActive ? "font-bold" : ""}`
                }
              >
                {collection.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-grow overflow-y-auto bg-slate-200 p-10">
        <Outlet />
      </div>
    </div>
  );
}
