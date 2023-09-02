import { PostUser } from "@/types";

export type PostDetail = {
  post: PostUser;
  likeCount: number;
  hasLiked: boolean;
};
