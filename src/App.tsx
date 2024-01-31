import { RouterProvider } from "@providers/RouterProvider";
import { ThemeProvider } from "@providers/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider />
    </ThemeProvider>
  );
}
