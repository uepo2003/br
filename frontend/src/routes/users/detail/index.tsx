import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { getUserLoader } from "@/features/user/api/get_user";

import { getUserPostsLoader } from "@/features/user/api/get_user_posts";
import { UserDetailLikesRoute } from "@/routes/users/detail/likes";

const UserPosts = lazy(() =>
  import("@/features/user/routes/user_posts").then((m) => ({
    default: m.UserPosts,
  }))
);
const UserDetail = lazy(() =>
  import("@/features/user/components/user_detail").then((m) => ({
    default: m.UserDetail,
  }))
);
export const UserDetailRoute: RouteObject = {
  path: ":userId",
  element: <UserDetail />,
  children: [
    {
      path: ROUTES.USERS.SHOW,
      element: <UserPosts />,
      loader: getUserPostsLoader,
    },
    UserDetailLikesRoute,
  ],
  loader: getUserLoader,
};
