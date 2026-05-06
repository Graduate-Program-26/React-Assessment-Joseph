import { Button } from "@heroui/button";
import { useLocation } from "react-router-dom";

import { useAppStore } from "@/store/store";

export function LoginButton() {
  const location = useLocation();
  const setIsAuthLoading = useAppStore((store) => store.setIsAuthLoading);

  function handleLogin(pathname: string) {
    setIsAuthLoading(false);
    window.location.href = `/api/auth/login?redirectTo=${encodeURIComponent(pathname)}`;
  }

  return (
    <Button
      className=""
      color="primary"
      onPress={() => handleLogin(location.pathname)}
    >
      Login with github
    </Button>
  );
}
