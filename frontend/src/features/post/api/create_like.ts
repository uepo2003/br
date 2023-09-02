import { ActionFunction, redirect } from "react-router-dom";

export const createLikeAction: ActionFunction = async ({
  params,
}): Promise<Response> => {
  const response = await fetch(`/api/posts/${params.postId}/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    return redirect(`/posts/${params.postId}`);
  }
  throw new Response(null, { status: response.status });
};
