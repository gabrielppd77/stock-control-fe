import { Outlet } from "react-router-dom";

import { Sidebar } from "@components/Sidebar";

export function MainLayout() {
  return (
    <div className="grid min-h-screen grid-cols-app bg-background">
      <Sidebar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
