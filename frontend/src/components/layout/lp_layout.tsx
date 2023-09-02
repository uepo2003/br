import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { DialogMessage } from "@/components/dialog_message";

export function LpLayout(): JSX.Element {
  return (
    <>
      <Header
        sx={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          backgroundColor: "transparent",
        }}
      />
      <DialogMessage />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
