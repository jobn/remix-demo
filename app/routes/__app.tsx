import { Link, NavLink, Outlet } from "@remix-run/react";

const navigation = [
  { name: "Sets", href: "/sets" },
  { name: "Collections", href: "/collections" },
];

export default function AppLayout() {
  return (
    <>
      <header className="bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <nav className="mx-auto px-4 sm:px-6" aria-label="Top">
          <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
            <div className="flex items-center">
              <Link to="/">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt=""
                />
              </Link>

              <div className="ml-10 hidden space-x-8 lg:block">
                {navigation.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    className={({ isActive }) =>
                      `text-base font-medium text-white hover:text-indigo-50 ${
                        isActive ? "underline" : ""
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
            {navigation.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `text-base font-medium text-white hover:text-indigo-50 ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <Outlet />
    </>
  );
}
