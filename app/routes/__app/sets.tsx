import { LoaderArgs } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getSets } from "~/api.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const sets = await getSets();

  return { sets };
};

export default function Sets() {
  const { sets } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-grow overflow-hidden">
      <div className="w-64 flex-shrink-0 overflow-y-scroll p-4">
        <ul className="divide-y divide-gray-200">
          {sets.map((set) => (
            <li
              key={set.set_num}
              className="relative bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
            >
              <NavLink
                to={set.set_num.toString()}
                className={({ isActive }) =>
                  `block py-5 px-4 ${isActive ? "font-bold" : ""}`
                }
              >
                {set.name}
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
