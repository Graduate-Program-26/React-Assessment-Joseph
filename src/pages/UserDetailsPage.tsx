import { GithubUser } from "@/types/octokit-types";

import { useParams } from "react-router-dom";
import { GitHubCalendar } from "react-github-calendar";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/github/users";
import { Image, Card, CardBody } from "@heroui/react";

export default function UserDetailsPage() {
  const params = useParams();
  const username = params.username;

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["githubUser", username],
    queryFn: () => getUser(username!),
  });

  if (userLoading || !user) return <p>Loading</p>;

  if (username)
    return (
      <div className="grid grid-cols-3 gap-4 h-screen overflow-hidden pb-5">
        <Card className="border col-span-1 p-4  ">
          <CardBody>
            <Image
              alt={user.login}
              className="w-full rounded-full"
              src={user.avatar_url}
            />
            <h2 className="mt-2 text-2xl font-bold">{user.name}</h2>
            <p className="">{user.login}</p>
            <p className="mt-2 line-clamp-2 ">{user.bio}</p>
          </CardBody>
        </Card>
        <div className="col-span-2 flex flex-col gap-4 overflow-scroll">
          <GitHubCalendar username={username} />
        </div>
      </div>
    );
}
