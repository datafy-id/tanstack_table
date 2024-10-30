import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../router";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome home!</h3>
      </div>
    );
  },
});
