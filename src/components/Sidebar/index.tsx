import { BarChart, Home, SquareStack } from "lucide-react";

import { Logo } from "./Logo";
import { NavItem } from "./NavItem";

import { Divider } from "@components/Divider";

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-6 px-5 py-8 shadow-md">
      <Logo />

      <Divider />

      <nav className="space-y-0.5">
        <NavItem title="Home" icon={Home} />
        <NavItem title="Fornecedores" icon={BarChart} />
        <NavItem title="Categorias" icon={SquareStack} />
      </nav>
    </aside>
  );
}
