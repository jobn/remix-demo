import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { NestedTheme, Theme, LegoSet } from "~/api";
import { getSets, getTheme, getThemes } from "~/api";
import Header from "~/components/Header";

type LoaderData = {
  theme: Theme;
  subThemes: NestedTheme[];
  sets: LegoSet[];
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) {
    throw new Error("not found");
  }

  const id = parseInt(params.id);

  if (isNaN(id)) {
    throw new Error("Invalid id");
  }

  const [theme, subThemes, sets] = await Promise.all([
    getTheme(id),
    getThemes(id),
    getSets(id),
  ]);

  return json({ theme, subThemes, sets });
};

export default function ThemeView() {
  const { theme, subThemes, sets } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col">
      <Header
        title={theme.name}
        parentPath={theme.parent_id ? `/themes/${theme.parent_id}` : "/themes"}
      />

      <div className="flex">
        {subThemes.length > 0 ? (
          <div className="w-64 flex-shrink-0 p-4">
            <h2 className="text-xl font-bold">Subthemes</h2>
            <ul>
              {subThemes.map((theme) => (
                <li key={theme.id}>
                  <Link to={`/themes/${theme.id.toString()}`}>
                    {theme.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {sets.length > 0 ? (
          <div className="min-w-64 flex-shrink-0 p-4">
            <h2 className="text-xl font-bold">Sets</h2>
            <ul className="overflow-y-scroll">
              {sets.map((set) => (
                <li key={set.set_num}>
                  <Link to={set.set_num}>{set.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
