import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { DialogMessage } from "@/components/dialog_message";

export function MainLayout(): JSX.Element {
  return (
    <>
      <Header />
      <DialogMessage />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
