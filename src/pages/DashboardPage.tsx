import { useAppStore } from "@/store/store";

export default function Dashboard() {
  const user = useAppStore((store) => store.loggedInUser);

  return <>{user?.login}`s dashboard</>;
}
