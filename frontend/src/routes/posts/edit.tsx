import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { getPostLoader } from "@/features/post/api/get_post";
import { updatePostAction } from "@/features/post/api/update_post";

const EditPost = lazy(() =>
  import("@/features/post/routes/edit_post").then((m) => ({
    default: m.EditPost,
  }))
);
export const EditPostRoute: RouteObject = {
  path: ROUTES.POSTS.EDIT,
  element: <EditPost />,
  loader: getPostLoader,
  action: updatePostAction,
};
