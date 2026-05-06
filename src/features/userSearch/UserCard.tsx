import { Card, CardBody, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { GithubUser } from "@/types/octokit-types";

interface UserCardProps {
  user: GithubUser;
}
export default function UserCard(props: UserCardProps) {
  const { user } = props;
  const navigate = useNavigate();

  return (
    <Card 
      isPressable 
      className="bg-content1/50 backdrop-blur-md border border-divider hover:scale-[1.02] transition-transform"
      onClick={() => navigate(`/user/${user.login}`)}
    >
      <CardBody className="flex flex-col items-center gap-4 p-4">
        <Image 
          alt={user.login} 
          className="w-24 h-24 aspect-square object-cover border-2 border-divider bg-content1"
          radius="full"
          src={user.avatar_url} 
        />
        <div className="text-center">
          <h3 className="font-bold text-lg leading-tight truncate w-full">
            {user.login}
          </h3>
          <p className="text-xs text-default-500 uppercase tracking-wider font-medium">
            User
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
