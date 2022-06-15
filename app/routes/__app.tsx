import { NavLink, Outlet } from "@remix-run/react";

export default function AppLayout() {
  return (
    <div className="flex h-full w-full">
      <div className="flex w-32 flex-shrink-0 flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-orange-400 p-2">
          <div className="text-2xl font-bold">Bricks</div>

          <NavLink to="/themes">Themes</NavLink>
          <NavLink to="/collection">My Collection</NavLink>
        </div>
      </div>

      <div className="flex-grow overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}
