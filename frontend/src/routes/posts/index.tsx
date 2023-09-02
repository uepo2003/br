import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { lazy } from "react";
import { EditPostRoute } from "@/routes/posts/edit";
import { PostDetailRoute } from "@/routes/posts/detail";
import { NewPostRoute } from "@/routes/posts/new";
import { getAllPostsLoader } from "@/features/post/api/get_all_posts";

const AllPosts = lazy(() =>
  import("@/features/post/routes/all_posts").then((m) => ({
    default: m.AllPosts,
  }))
);
export const PostsRoute: RouteObject = {
  path: ROUTES.POSTS.INDEX,
  children: [
    {
      index: true,
      element: <AllPosts />,
      loader: getAllPostsLoader,
    },
    NewPostRoute,
    PostDetailRoute,
    EditPostRoute,
  ],
};
