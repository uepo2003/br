import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { createLikeAction } from "@/features/post/api/create_like";
import { deleteLikeAction } from "@/features/post/api/delete_like";

export const PostDetailLikesRoute: RouteObject = {
  path: ROUTES.POSTS.LIKES,
  action: ({ request, params }) => {
    switch (request.method) {
      case "POST": {
        return createLikeAction({ request, params });
      }
      case "DELETE": {
        return deleteLikeAction({ request, params });
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  },
};
