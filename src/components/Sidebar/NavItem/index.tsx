import { ElementType } from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  title: string;
  path: string;
  icon: ElementType;
}
export function NavItem(props: NavItemProps) {
  const { title, path, icon: Icon } = props;

  return (
    <Link
      to={path}
      // className="group flex items-center gap-3 rounded px-3 py-2 hover:bg-violet-50"
    >
      TESTE
      {/* <Icon className="h-5 w-5 text-zinc-500" />
      <span className="font-medium text-zinc-700 group-hover:text-violet-500">
        {title}
      </span> */}
    </Link>
  );
}
