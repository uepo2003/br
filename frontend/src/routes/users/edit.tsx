import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { getUserLoader } from "@/features/user/api/get_user";
import { updateUserAction } from "@/features/user/api/update_user";

const EditUser = lazy(() =>
  import("@/features/user/routes/edit_user").then((m) => ({
    default: m.EditUser,
  }))
);
export const UserEditRoute: RouteObject = {
  path: ROUTES.USERS.EDIT,
  element: <EditUser />,
  loader: getUserLoader,
  action: updateUserAction,
};
