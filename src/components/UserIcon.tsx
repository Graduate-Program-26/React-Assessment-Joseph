import { User } from "@heroui/react";

import { useAppStore } from "@/store/store";

export default function UserIcon() {
  const user = useAppStore((store) => store.loggedInUser);

  if (user) {
    return (
      <User
        avatarProps={{
          src: user.avatar_url,
        }}
        description={user.bio?.slice(0, 10)}
        name={user.login}
      />
    );
  } else return null;
}
