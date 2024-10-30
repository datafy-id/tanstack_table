import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../router";

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function Index() {
    return (
      <div className="p-2">
        <h3>This is about page!</h3>
      </div>
    );
  },
});
