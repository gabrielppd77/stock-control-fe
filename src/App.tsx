import { Sidebar } from "@components/Sidebar";
// import { Home } from "@pages/Home";

export default function App() {
  return (
    <div className="grid-cols-app grid min-h-screen">
      <Sidebar />
      {/* <main className="px-8 pb-12 pt-8">
        <Home />
      </main> */}
    </div>
  );
}
