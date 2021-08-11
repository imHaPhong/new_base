import { lazy } from "react";

import { loadable } from "src/components";
import { routeCalculator, routeQuote, routeTodoList } from "./constants/routes";

export const routesConfig = [
  {
    path: routeCalculator,
    exact: true,
    component: loadable(lazy(() => import("./pages/calculator"))),
  },
  {
    path: routeTodoList,
    exact: true,
    component: loadable(lazy(() => import("./pages/todolist"))),
  },
  {
    path: routeQuote,
    exact: true,
    component: loadable(lazy(() => import("./pages/quotes"))),
  },
];
