import { PostList } from "@/components/post_list";
import { PostUser } from "@/types";
import { useLoaderData } from "react-router-dom";

export function AllPosts(): JSX.Element {
  const { posts } = useLoaderData() as { posts: PostUser[] };
  return (
    <>
      <div className="main posts-index">
        <div className="container">
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}
