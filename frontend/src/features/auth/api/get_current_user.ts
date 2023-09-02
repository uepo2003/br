import { LoaderFunction } from "react-router-dom";

export const getCurrentUserLoader: LoaderFunction =
  async (): Promise<Response> => {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    });
    if (response.ok) {
      return response;
    }
    throw new Response(null, { status: response.status });
  };
