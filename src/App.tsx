import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <div className="grid-cols-app grid min-h-screen">
      <Sidebar />
      <main className="px-4 pb-12 pt-8">
        <h1 className="bg-primary text-3xl font-bold underline">
          Hello world!
        </h1>
        <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
          ...
        </button>
      </main>
    </div>
  );
}
