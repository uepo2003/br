import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { getAllUsersLoader } from "@/features/user/api/get_all_users";

import { UserDetailRoute } from "@/routes/users/detail";
import { UserEditRoute } from "@/routes/users/edit";

const AllUsers = lazy(() =>
  import("@/features/user/routes/all_users").then((m) => ({
    default: m.AllUsers,
  }))
);
export const UsersRoute: RouteObject = {
  path: ROUTES.USERS.INDEX,
  children: [
    {
      index: true,
      element: <AllUsers />,
      loader: getAllUsersLoader,
    },
    UserDetailRoute,
    UserEditRoute,
  ],
};
