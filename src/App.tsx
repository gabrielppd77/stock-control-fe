import { ThemeProvider } from "@providers/ThemeProvider";
import { QueryClientProvider } from "@providers/QueryClientProvider";
import { RouterProvider } from "@providers/RouterProvider";
import { ToastProvider } from "@providers/ToastProvider";

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider>
        <ToastProvider>
          <RouterProvider />
        </ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
