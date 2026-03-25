import { Card, CardBody, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { GithubUser } from "@/lib/octokit";

interface UserCardProps {
  key: number | string;
  user: GithubUser;
}
export default function UserCard(props: UserCardProps) {
  const { key, user } = props;
  const navigate = useNavigate();

  return (
    <Card
      key={key}
      isPressable={true}
      onClick={() => navigate(`/user/${user.login}`)}
    >
      <CardBody className=" ">
        <Image alt={user.name?.toString()} src={user.avatar_url} />
        <div className="p-2">
          <h3 className="font-bold text-md">
            {user.name ? user.name.toUpperCase() : user.login.toUpperCase()}
          </h3>
        </div>
      </CardBody>
    </Card>
  );
}
