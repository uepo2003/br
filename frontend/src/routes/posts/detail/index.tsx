import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { PostDetailLikesRoute } from "@/routes/posts/detail/likes";

import { deletePostAction } from "@/features/post/api/delete_post";
import { getPostLoader } from "@/features/post/api/get_post";

const ShowPost = lazy(() =>
  import("@/features/post/routes/show_post").then((m) => ({
    default: m.ShowPost,
  }))
);
export const PostDetailRoute: RouteObject = {
  path: ROUTES.POSTS.SHOW,
  element: <ShowPost />,
  loader: getPostLoader,
  action: deletePostAction,
  children: [PostDetailLikesRoute],
};
