import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
  useParams,
} from "@tanstack/react-router";
import { lazy } from "react";

import { indexRoute } from "./pages/index";
import { aboutRoute } from "./pages/about";
import { TableBasic } from "./pages/table-basic";
import { HeaderGroup01, HeaderGroup02 } from "./pages/table-header-grouping";
import { ColumnFilter } from "./pages/table-column-filter";

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
          ["Table Basic", "/table/basic"],
          ["Header Group 01", "/table/header-group-01"],
          ["Header Group 02", "/table/header-group-02"],
          ["Colum Filter", "/table/column-filter"],
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

const tableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/table/$path",
  component: () => {
    const { path } = useParams({ strict: false });
    switch (path) {
      case "basic":
        return <TableBasic />;
      case "header-group-01":
        return <HeaderGroup01 />;
      case "header-group-02":
        return <HeaderGroup02 />;
      case "column-filter":
        return <ColumnFilter />;
      default:
        return <TableBasic />;
    }
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, tableRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
