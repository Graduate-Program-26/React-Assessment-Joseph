import { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Divider,
  Link,
  Chip,
  Button,
} from "@heroui/react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "@heroui/use-theme";

import UserEvents from "@/features/activity/UserEvents";
import ListUserRepos from "@/features/repos/ListUserRepos";
import { useAppStore } from "@/store/store";

export default function Dashboard() {
  const user = useAppStore((store) => store.loggedInUser);
  const theme = useTheme();
  let statsTheme = "";

  if (theme.theme == "light") {
    statsTheme = "default";
  } else {
    statsTheme = "dark";
  }

  const [activeTab, setActiveTab] = useState<"overview" | "repos" | "activity">(
    "overview",
  );

  if (!user) return null;

  const blogUrl = user.blog?.startsWith("http")
    ? user.blog
    : `https://${user.blog}`;

  return (
    <div className="max-w-full h-[85dvh] ">
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="flex flex-col gap-4">
            <Image
              alt={user.name || user.login}
              className="w-full aspect-square object-cover border-2 border-divider bg-content1"
              radius="full"
              src={user.avatar_url}
            />

            <div className="px-1">
              <h1 className="text-2xl font-semibold leading-tight">
                {user.name}
              </h1>
              <p className="text-xl font-light text-default-500">
                {user.login}
              </p>
            </div>

            <p className="text-sm px-1 py-2">{user.bio}</p>

            <div className="flex flex-col gap-2 text-sm text-default-600 px-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  {user.followers}
                </span>{" "}
                followers
                <span>•</span>
                <span className="font-semibold text-foreground">
                  {user.following}
                </span>{" "}
                following
              </div>

              {user.location && (
                <div className="flex items-center gap-2 mt-2 text-default-500">
                  <span className="text-xs uppercase tracking-wider">
                    Location:
                  </span>{" "}
                  {user.location}
                </div>
              )}

              {user.blog && (
                <Link
                  isExternal
                  showAnchorIcon
                  className="text-primary text-sm"
                  href={blogUrl}
                >
                  {user.blog}
                </Link>
              )}
            </div>

            <Divider className="my-2" />

            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-medium">Public Repositories</span>
              <Chip size="sm" variant="flat">
                {user.public_repos}
              </Chip>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 h-[95dvh] overflow-clip">
          <div className="flex flex-col gap-8">
            <Card className="bg-content1/50 backdrop-blur-md " shadow="sm">
              <CardBody className="p-6">
                <h3 className="text-sm font-medium mb-4 text-default-500">
                  Contributions
                </h3>
                <div className="overflow-x-auto py-2">
                  <GitHubCalendar
                    blockMargin={4}
                    blockSize={12}
                    fontSize={12}
                    username={user.login}
                  />
                </div>
              </CardBody>
            </Card>

            <section className="flex flex-col gap-4 h-full">
              <div className="border-b border-divider flex gap-4 pb-2">
                <Button
                  className={`text-sm font-semibold pb-2 px-1 ${activeTab === "overview" ? "border-b-2 border-primary" : "text-default-500 hover:text-foreground transition-colors"}`}
                  onPress={() => setActiveTab("overview")}
                >
                  Overview
                </Button>
                <Button
                  className={`text-sm font-medium pb-2 px-1 ${activeTab === "repos" ? "border-b-2 border-primary" : "text-default-500 hover:text-foreground transition-colors"}`}
                  onPress={() => setActiveTab("repos")}
                >
                  Repositories
                </Button>
                <Button
                  className={`text-sm font-medium pb-2 px-1 ${activeTab === "activity" ? "border-b-2 border-primary" : "text-default-500 hover:text-foreground transition-colors"}`}
                  onPress={() => setActiveTab("activity")}
                >
                  Activity
                </Button>
              </div>

              <div className="h-[1400px] overflow-auto lg:pr-50">
                {activeTab === "overview" && (
                  <div className="grid grid-cols-2 gap-2">
                    <Image
                      alt="stats"
                      src={`http://github-profile-summary-cards.vercel.app/api/cards/stats?username=${user.login}&theme=${statsTheme}`}
                      width="100%"
                    />
                    <Image
                      alt="top languages"
                      src={`http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${user.login}&theme=${statsTheme}`}
                      width="100%"
                    />
                    <div className="col-span-2">
                      <Image
                        alt="GitHub Streak"
                        height="25%"
                        src={`https://streak-stats.demolab.com?user=${user.login}&theme=${statsTheme}&hide_border=true`}
                        width="100%"
                      />
                    </div>
                  </div>
                )}
                {activeTab === "repos" && (
                  <ListUserRepos username={user.login} />
                )}
                {activeTab === "activity" && (
                  <UserEvents username={user.login} />
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
