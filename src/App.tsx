import { Sidebar } from "./components/Sidebar";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <div className="grid min-h-screen grid-cols-app">
      <Sidebar />
      <main className="px-4 pb-12 pt-8">
        <Home />
      </main>
    </div>
  );
}
