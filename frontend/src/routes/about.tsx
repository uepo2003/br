import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { lazy } from "react";

const About = lazy(() =>
  import("@/features/home/routes/about").then((m) => ({ default: m.About }))
);

export const AboutRoute: RouteObject = {
  path: ROUTES.ABOUT,
  element: <About />,
};
