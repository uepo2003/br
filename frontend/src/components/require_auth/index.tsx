import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/hooks/current_user";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function RequireAuth(): JSX.Element {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      sessionStorage.setItem("dialogMessage", "You must be logged in");
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [currentUser, navigate]);

  return <Outlet />;
}
