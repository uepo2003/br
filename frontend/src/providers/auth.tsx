import { User } from "@/types";
import { createContext } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

export const CurrentUserContext = createContext<User | null>(null);

export function CurrentUserProvider(): JSX.Element {
  const { user: currentUser } = useLoaderData() as { user: User | null };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Outlet />
    </CurrentUserContext.Provider>
  );
}
