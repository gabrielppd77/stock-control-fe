import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import { Separator } from "@components/ui/separator";

import { routesMenu } from "@routes/routes";

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-6 px-5 py-8 shadow-md">
      <Logo />

      <Separator />

      <nav className="space-y-0.5">
        {routesMenu.map((d) => (
          <NavItem key={d.title} title={d.title} path={d.path} icon={d.icon} />
        ))}
      </nav>
    </aside>
  );
}
