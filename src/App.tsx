import { Sidebar } from "@components/Sidebar";

import { Home } from "@pages/Home";

import { ThemeProvider } from "@providers/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <div className="grid min-h-screen grid-cols-app bg-background">
        <Sidebar />
        <main className="p-8">
          <Home />
        </main>
      </div>
    </ThemeProvider>
  );
}
