import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { NestedTheme } from "~/api";
import { getThemes } from "~/api";
import Header from "~/components/Header";

type LoaderData = {
  themes: NestedTheme[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const themes = await getThemes();

  return json<LoaderData>({
    themes: themes.sort((a, b) => (a.name > b.name ? 1 : -1)),
  });
};

export default function Posts() {
  const { themes } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col">
      <Header title="All themes" />

      <div className="w-64 flex-shrink-0 p-4">
        <ul className="overflow-y-scroll">
          {themes.map((theme) => (
            <li key={theme.id}>
              <Link to={`/themes/${theme.id.toString()}`}>{theme.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
