import { PostUser } from "@/types";
import { LoaderFunction, redirect } from "react-router-dom";

export const getUserLikesLoader: LoaderFunction = async ({
  params,
}): Promise<Response> => {
  const response = await fetch(`/api/users/${params.userId}/likes`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = (await response.json()) as { posts: PostUser[] };
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  }
  if (response.status === 401) {
    sessionStorage.setItem("dialogMessage", "You must be logged in");
    return redirect("/login");
  }
  throw new Response(null, { status: response.status });
};
