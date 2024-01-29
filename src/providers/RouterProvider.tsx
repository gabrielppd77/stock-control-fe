import {
  createBrowserRouter,
  RouterProvider as RouterProviderLib,
} from "react-router-dom";
import { routes } from "@routes/routes";

export function RouterProvider() {
  const browserRouter = createBrowserRouter(routes);
  return <RouterProviderLib router={browserRouter} />;
}
