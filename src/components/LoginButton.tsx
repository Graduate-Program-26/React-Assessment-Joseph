import { Button } from "@heroui/button";
import { useLocation } from "react-router-dom";

export function LoginButton() {
  const location = useLocation();

  function handleLogin(pathname: string) {
    window.location.href = `api/auth/login?redirectTo=${encodeURIComponent(pathname)}`;
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
