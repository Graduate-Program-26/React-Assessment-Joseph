import { useAppStore } from "@/store/store";
import { Button } from "@heroui/button";

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
