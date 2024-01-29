import { RouterProvider as RouterProviderLib } from "react-router-dom";
import { routes } from "@lib/routes/routes";

export function RouterProvider() {
  return <RouterProviderLib router={routes} />;
}
