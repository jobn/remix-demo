import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getSets } from "~/api";

type LoaderData = {
  sets: { set_num: string; name: string }[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const sets = await getSets();

  return json<LoaderData>({ sets });
};

export default function Posts() {
  const { sets } = useLoaderData<LoaderData>();

  return (
    <>
      <div className="w-64 flex-shrink-0 overflow-y-scroll p-4">
        <ul className="">
          {sets.map((set) => (
            <li key={set.set_num}>
              <NavLink
                to={set.set_num.toString()}
                className={({ isActive }) =>
                  isActive ? "font-bold" : undefined
                }
              >
                {set.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Outlet />
    </>
  );
}
