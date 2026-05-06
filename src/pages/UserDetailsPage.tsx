import { useParams } from "react-router-dom";
import { GitHubCalendar } from "react-github-calendar";
import { useQuery } from "@tanstack/react-query";
import { Image, Card, CardBody, Divider, Link, Chip } from "@heroui/react";

import UserEvents from "../features/activity/UserEvents";
import ListUserRepos from "@/features/repos/ListUserRepos";
import CenteredSpinner from "@/components/CenteredSpinner";

import { getUser } from "@/services/github/users";
import { GithubUser } from "@/types/octokit-types";

export default function UserDetailsPage() {
  const params = useParams();
  const username = params.username;

  const { data: user, isLoading: userLoading } = useQuery<GithubUser, Boolean>({
    queryKey: ["githubUser", username],
    queryFn: () => getUser(username!),
    enabled: !!username,
  });

  if (userLoading) return <CenteredSpinner fullScreen />;
  if (!user) return <div className="text-center p-12 text-danger">User not found</div>;

  const blogUrl = user.blog?.startsWith("http")
    ? user.blog
    : `https://${user.blog}`;

  return (
    <div className="max-w-full pb-4 h-[calc(100vh-140px)] overflow-hidden animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="flex flex-col gap-6">
            <Image
              alt={user.login}
              className="w-full aspect-square object-cover border-4 border-divider bg-content1 shadow-xl"
              radius="full"
              src={user.avatar_url}
            />
            
            <div className="px-1">
              <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-xl text-default-500 font-light">{user.login}</p>
            </div>

            {user.bio && <p className="text-sm px-1 leading-relaxed text-default-700">{user.bio}</p>}

            <div className="flex flex-col gap-3 text-sm text-default-600 px-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">{user.followers}</span> followers
                <span className="text-default-300">•</span>
                <span className="font-bold text-foreground">{user.following}</span> following
              </div>

              {user.location && (
                <div className="flex items-center gap-2 mt-1 text-default-500">
                  <span className="text-xs font-black uppercase tracking-tighter opacity-50">Location</span>
                  <span className="font-medium">{user.location}</span>
                </div>
              )}

              {user.blog && (
                <Link isExternal showAnchorIcon className="text-primary text-sm font-medium mt-1" href={blogUrl}>
                  {user.blog}
                </Link>
              )}
            </div>

            <Divider className="my-2" />

            <div className="flex justify-between items-center px-1 bg-default-100/50 p-3 rounded-xl border border-divider">
              <span className="text-sm font-semibold">Public Repositories</span>
              <Chip size="sm" variant="shadow" color="primary" className="font-bold">{user.public_repos}</Chip>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col gap-6 h-full overflow-hidden">
          <div className="flex flex-col gap-6 h-full overflow-hidden">
             <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                <UserEvents username={username!} />
             </div>
             <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                <ListUserRepos username={username!} />
             </div>
          </div>

          <Card className="bg-content1/50 backdrop-blur-md border border-divider shadow-md shrink-0" shadow="none">
            <CardBody className="p-4">
              <h3 className="text-xs font-black uppercase tracking-widest mb-2 text-default-400">Contributions</h3>
              <div className="overflow-x-auto py-1 scrollbar-hide">
                <GitHubCalendar username={user.login} />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
