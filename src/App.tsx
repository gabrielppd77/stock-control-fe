import { Sidebar } from "@components/Sidebar";
import { RouterProvider } from "@providers/RouterProvider";

import { ThemeProvider } from "@providers/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <div className="grid min-h-screen grid-cols-app bg-background">
        <Sidebar />
        <main className="p-8">
          <RouterProvider />
        </main>
      </div>
    </ThemeProvider>
  );
}
