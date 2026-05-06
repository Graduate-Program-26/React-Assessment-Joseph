import { Button } from "@heroui/button";

import { useAppStore } from "@/store/store";

export default function LogoutButton() {
  const logout = useAppStore((store) => store.logout);

  async function handleLogout() {
    logout();
    await fetch("/api/auth/logout", { method: "POST" });
  }

  return (
    <Button className="" color="danger" onPress={() => handleLogout()}>
      Logout
    </Button>
  );
}
