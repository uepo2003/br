import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/hooks/current_user";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function RequireAnonymous(): JSX.Element {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem("dialogMessage", "You are already logged in");
      navigate(ROUTES.POSTS.INDEX, { replace: true });
    }
  }, [currentUser, navigate]);

  return <Outlet />;
}
