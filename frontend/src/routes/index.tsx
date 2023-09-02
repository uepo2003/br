import { MainLayout, LpLayout } from "@/components/layout";
import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { RequireAuth } from "@/components/require_auth";
import { RequireAnonymous } from "@/components/require_anonymous";
import { Error404 } from "@/routes/error_404";
import { logoutAction, getCurrentUserLoader } from "@/features/auth";
import { CurrentUserProvider } from "@/providers/auth";
import { lazy } from "react";
import { AboutRoute } from "@/routes/about";
import { LoginRoute } from "@/routes/login";
import { SignupRoute } from "@/routes/signup";
import { UsersRoute } from "@/routes/users";
import { PostsRoute } from "./posts";
const Top = lazy(() =>
  import("@/features/home/routes/top").then((m) => ({ default: m.Top }))
);

export const AppRoutes: RouteObject[] = [
  {
    path: ROUTES.ROOT,
    element: <CurrentUserProvider />,
    loader: getCurrentUserLoader,
    children: [
      {
        element: <LpLayout />,
        children: [{ index: true, element: <Top /> }, AboutRoute],
      },
      {
        element: <MainLayout />,
        children: [
          {
            element: <RequireAnonymous />,
            children: [LoginRoute, SignupRoute],
          },
          {
            element: <RequireAuth />,
            children: [
              {
                path: ROUTES.LOGOUT,
                action: logoutAction,
              },
              PostsRoute,
              UsersRoute,
            ],
          },
        ],
      },
      { path: "*", element: <Error404 /> },
    ],
  },
];
