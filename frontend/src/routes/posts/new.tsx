import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { createPostAction } from "@/features/post/api/create_post";

const NewPost = lazy(() =>
  import("@/features/post/routes/new_post").then((m) => ({
    default: m.NewPost,
  }))
);
export const NewPostRoute: RouteObject = {
  path: ROUTES.POSTS.NEW,
  element: <NewPost />,
  action: createPostAction,
};
