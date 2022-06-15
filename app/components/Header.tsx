import { Link } from "@remix-run/react";

type HeaderProps = {
  title: string;
  parentPath?: string;
};

const Header: React.FC<HeaderProps> = ({ title, parentPath }) => (
  <div className="flex  h-12 w-full items-center bg-blue-200 pl-4">
    {parentPath ? (
      <Link to={parentPath} className="pr-4 text-xl">
        👈
      </Link>
    ) : null}
    <h1 className="text-2xl font-bold">{title}</h1>
  </div>
);

export default Header;
