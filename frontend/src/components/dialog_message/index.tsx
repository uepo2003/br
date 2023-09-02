import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

export function DialogMessage(): JSX.Element | null {
  const [dialogMessage, setDialogMessage] = useState<string>();
  const navigation = useNavigation();
  useEffect(() => {
    const storage = sessionStorage.getItem("dialogMessage");
    if (storage) {
      setDialogMessage(storage);
      sessionStorage.removeItem("dialogMessage");
    }
    if (dialogMessage) {
      const timer = setTimeout(() => {
        setDialogMessage(undefined);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dialogMessage, navigation]);

  return dialogMessage ? (
    <div className="dialog" data-test="dialog">
      {dialogMessage}
    </div>
  ) : null;
}
