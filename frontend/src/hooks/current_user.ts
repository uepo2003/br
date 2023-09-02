import { useContext } from "react";
import { CurrentUserContext } from "@/providers/auth";
import { User } from "@/types";

export const useCurrentUser = (): User | null => {
  return useContext(CurrentUserContext);
};
