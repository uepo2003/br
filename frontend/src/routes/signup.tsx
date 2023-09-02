import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { signupAction } from "@/features/auth";

const Signup = lazy(() =>
  import("@/features/auth").then((m) => ({ default: m.Signup }))
);

export const SignupRoute: RouteObject = {
  path: ROUTES.SIGNUP,
  element: <Signup />,
  action: signupAction,
};
