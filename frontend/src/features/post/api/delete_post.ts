import { ActionFunction, redirect } from "react-router-dom";

export const deletePostAction: ActionFunction = async ({
  params,
}): Promise<Response> => {
  const response = await fetch(`/api/posts/${params.postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    sessionStorage.setItem("dialogMessage", "Post successfully deleted");
    return redirect(`/posts`);
  }
  if (response.status === 401) {
    sessionStorage.setItem("dialogMessage", "You must be logged in");
    return redirect("/login");
  }
  throw new Response(null, { status: response.status });
};
