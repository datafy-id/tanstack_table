import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { lazy } from "react";

import { indexRoute } from "./pages/index";
import { aboutRoute } from "./pages/about";
import { TableBasic } from "./pages/table-basic";
import { HeaderGroup01, HeaderGroup02 } from "./pages/table-header-grouping";

// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    );

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-4">
        {[
          ["Home", "/"],
          ["About", "/about"],
          ["Table Basic", "/table-basic"],
          ["Header Group 01", "/header-group-01"],
          ["Header Group 02", "/header-group-02"],
        ].map(([name, path]) => (
          <Link key={path} to={path} className="[&.active]:font-bold">
            {name}
          </Link>
        ))}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const headerGroup01Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/header-group-01",
  component: HeaderGroup01,
});

const headerGroup02Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/header-group-02",
  component: HeaderGroup02,
});

const tableBasicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/table-basic",
  component: TableBasic,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  tableBasicRoute,
  headerGroup01Route,
  headerGroup02Route,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
