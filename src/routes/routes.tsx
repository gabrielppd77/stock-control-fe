import { ElementType, ReactNode } from "react";

import { Home as HomeIcon, BarChart, SquareStack } from "lucide-react";

import { RouteObject } from "react-router-dom";

import { MainLayout } from "@layouts/Main";

import { Home } from "@pages/Home";
import { Supplier } from "@pages/Supplier";
import { Category } from "@pages/Category";

interface RouteMenu {
  title: string;
  path: string;
  element: ReactNode;
  icon: ElementType;
}

export const routesMenu: RouteMenu[] = [
  {
    title: "Início",
    path: "/",
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

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: routesMenu,
  },
];
