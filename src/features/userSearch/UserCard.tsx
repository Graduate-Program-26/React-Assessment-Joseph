import { Card, CardBody, Image } from "@heroui/react";

import { GithubUser } from "@/lib/octokit";

interface UserCardProps {
  key: number | string;
  user: GithubUser;
}
export default function UserCard(props: UserCardProps) {
  const { key, user } = props;

  return (
    <Card key={key}>
      <CardBody className="">
        <Image alt={user.name?.toString()} src={user.avatar_url} />
        <div className="p-4">
          <h3 className="font-bold">{user.name ? user.name : user.login}</h3>
        </div>
      </CardBody>
    </Card>
  );
}
