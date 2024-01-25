import { Sidebar } from "@components/Sidebar";

import { Home } from "@pages/Home";

export default function App() {
  return (
    <div className="bg-background grid min-h-screen grid-cols-app">
      <Sidebar />
      <main className="p-8">
        <Home />
      </main>
    </div>
  );
}
