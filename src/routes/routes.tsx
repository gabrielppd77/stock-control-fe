import { ElementType, ReactNode } from "react";

import { Home } from "@pages/Home";
import { Supplier } from "@pages/Supplier";
import { Category } from "@pages/Category";

import { Home as HomeIcon, BarChart, SquareStack } from "lucide-react";

interface RouteObject {
  title: string;
  path: string;
  element: ReactNode;
  icon: ElementType;
}

export const routes: RouteObject[] = [
  {
    title: "Início",
    path: "/home",
    element: <Home />,
    icon: HomeIcon,
  },
  {
    title: "Fornecedores",
    path: "/supplier",
    element: <Supplier />,
    icon: BarChart,
  },
  {
    title: "Categorias",
    path: "/category",
    element: <Category />,
    icon: SquareStack,
  },
];
