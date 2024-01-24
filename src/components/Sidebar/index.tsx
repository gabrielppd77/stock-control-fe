import { BarChart, Home, SquareStack } from "lucide-react";

import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { NavItem } from "./NavItem";

import { Divider } from "@components/Divider";
import { TextField } from "@components/TextField";

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-6 border-r border-zinc-200 px-5 py-8">
      <Logo />

      <TextField />

      <nav className="space-y-0.5">
        <NavItem title="Home" icon={Home} />
        <NavItem title="Fornecedores" icon={BarChart} />
        <NavItem title="Categorias" icon={SquareStack} />
      </nav>

      <div className="mt-auto flex  flex-col gap-6">
        <Divider />
        <Profile />
      </div>
    </aside>
  );
}
