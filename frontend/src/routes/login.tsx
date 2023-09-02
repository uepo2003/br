import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { loginWithEmailAndPasswordAction } from "@/features/auth";

const Login = lazy(() =>
  import("@/features/auth").then((m) => ({ default: m.Login }))
);

export const LoginRoute: RouteObject = {
  path: ROUTES.LOGIN,
  element: <Login />,
  action: loginWithEmailAndPasswordAction,
};
