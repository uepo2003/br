import { PostUser } from "@/types";
import { User } from "@/types";

export type UserDetailLikes = User & {
  likes: Array<{
    post: PostUser;
  }>;
};
