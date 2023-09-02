import { PostList } from "@/components/post_list";
import { PostUser } from "@/types";
import { useLoaderData } from "react-router-dom";

export function UserLikes(): JSX.Element {
  const { posts } = useLoaderData() as { posts: PostUser[] };
  return <PostList posts={posts} />;
}
