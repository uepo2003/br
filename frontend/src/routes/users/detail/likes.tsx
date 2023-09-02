import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { getUserLikesLoader } from "@/features/user/api/get_user_likes";

const UserLikes = lazy(() =>
  import("@/features/user/routes/user_likes").then((m) => ({
    default: m.UserLikes,
  }))
);
export const UserDetailLikesRoute: RouteObject = {
  path: ROUTES.USERS.LIKES,
  element: <UserLikes />,
  loader: getUserLikesLoader,
};
