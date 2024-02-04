import { ThemeProvider } from "@providers/ThemeProvider";
import { QueryClientProvider } from "@providers/QueryClientProvider";
import { RouterProvider } from "@providers/RouterProvider";

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider>
        <RouterProvider />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
