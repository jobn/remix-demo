import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  NavLink,
  Outlet,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { db } from "~/db.server";

export const loader = async () => {
  const collections = await db.collection.findMany();

  return json({ collections });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");

  if (typeof name !== "string" || name.length === 0) {
    return { error: "Set a name" };
  }

  await db.collection.create({ data: { name } });

  return json({}, 201);
};

export default function Collections() {
  const { collections } = useLoaderData<typeof loader>();
  const action = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isSubmitting && formRef.current) {
      formRef.current.reset();
    }
  }, [isSubmitting]);

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

        <div className="mt-3">
          <Form method="post" ref={formRef}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Add new collection
            </label>
            <div className="my-1">
              <input
                type="string"
                name="name"
                id="name"
                className="block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {action?.error ? <p>{action.error}</p> : null}

            <button
              type="submit"
              className="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </Form>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto bg-slate-200 p-10">
        <Outlet />
      </div>
    </div>
  );
}
