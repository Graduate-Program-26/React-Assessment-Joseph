import { useParams } from "react-router-dom";
import { GitHubCalendar } from "react-github-calendar";
import { useQuery } from "@tanstack/react-query";
import { Image, Card, CardBody } from "@heroui/react";

import UserEvents from "../features/activity/UserEvents";

import { getUser } from "@/services/github/users";
import { GithubUser } from "@/types/octokit-types";
import ListUserRepos from "@/features/repos/ListUserRepos";

export default function UserDetailsPage() {
  const params = useParams();
  const username = params.username;

  const { data: user, isLoading: userLoading } = useQuery<GithubUser, Boolean>({
    queryKey: ["githubUser", username],
    queryFn: () => getUser(username!),
    enabled: !!username,
  });

  if (userLoading || !user) return <p>Loading</p>;

  if (username)
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[85dvh] overflow-hidden pb-5">
        <Card className="border col-span-1 p-4 md:h-full ">
          <CardBody>
            <Image
              alt={user.login}
              className="rounded-2xl"
              src={user.avatar_url}
            />
            <h2 className="mt-2 text-2xl font-bold">{user.name}</h2>
            <p className="">{user.login}</p>
            <p className="mt-2 line-clamp-2 ">{user.bio}</p>
            <p className="">{user.location}</p>
            <p className="">{`Followers: ${user.followers}  Following: ${user.following}`}</p>
            {user.blog ? (
              <a
                href={`https://${user.blog}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                website: {user.blog}
              </a>
            ) : (
              ""
            )}
          </CardBody>
        </Card>
        <div className="col-span-2 flex flex-col gap-4 overflow-scroll">
          <UserEvents username={username} />
          <ListUserRepos username={username} />
          <div>
            <h3 className="font-semibold mb-2">Contributions</h3>
            <GitHubCalendar username={user.login} />
          </div>
        </div>
      </div>
    );
}
