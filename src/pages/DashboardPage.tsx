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
    <div className="max-w-full pb-4 h-[calc(100vh-140px)] overflow-hidden animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="flex flex-col gap-6">
            <div className="relative group">
              <Image
                alt={user.name || user.login}
                className="w-full aspect-square object-cover border-4 border-divider bg-content1 shadow-xl"
                radius="full"
                src={user.avatar_url}
              />
            </div>

            <div className="px-1">
              <h1 className="text-3xl font-bold tracking-tight">
                {user.name}
              </h1>
              <p className="text-xl text-default-500 font-light">
                {user.login}
              </p>
            </div>

            <p className="text-sm px-1 leading-relaxed text-default-700">{user.bio}</p>

            <div className="flex flex-col gap-3 text-sm text-default-600 px-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">
                  {user.followers}
                </span>{" "}
                followers
                <span className="text-default-300">•</span>
                <span className="font-bold text-foreground">
                  {user.following}
                </span>{" "}
                following
              </div>

              {user.location && (
                <div className="flex items-center gap-2 mt-1 text-default-500">
                  <span className="text-xs font-black uppercase tracking-tighter opacity-50">
                    Location
                  </span>{" "}
                  <span className="font-medium">{user.location}</span>
                </div>
              )}

              {user.blog && (
                <Link
                  isExternal
                  showAnchorIcon
                  className="text-primary text-sm font-medium mt-1"
                  href={blogUrl}
                >
                  {user.blog}
                </Link>
              )}
            </div>

            <Divider className="my-2" />

            <div className="flex justify-between items-center px-1 bg-default-100/50 p-3 rounded-xl border border-divider">
              <span className="text-sm font-semibold">Public Repositories</span>
              <Chip size="sm" variant="shadow" color="primary" className="font-bold">
                {user.public_repos}
              </Chip>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 flex flex-col gap-6 h-full overflow-hidden">
          <Card className="bg-content1/50 backdrop-blur-md border border-divider shadow-md shrink-0" shadow="none">
            <CardBody className="p-4">
              <h3 className="text-xs font-black uppercase tracking-widest mb-2 text-default-400">
                Contributions
              </h3>
              <div className="overflow-x-auto py-1 scrollbar-hide">
                <GitHubCalendar
                  blockMargin={4}
                  blockSize={12}
                  fontSize={12}
                  username={user.login}
                />
              </div>
            </CardBody>
          </Card>

          <section className="flex-1 flex flex-col gap-6 overflow-hidden">
            <div className="border-b border-divider flex gap-6 pb-0 shrink-0">
              <Button
                variant="light"
                className={`text-sm font-bold rounded-none h-12 px-2 min-w-0 ${activeTab === "overview" ? "border-b-2 border-primary text-primary" : "text-default-500 hover:text-foreground"}`}
                onPress={() => setActiveTab("overview")}
              >
                Overview
              </Button>
              <Button
                variant="light"
                className={`text-sm font-bold rounded-none h-12 px-2 min-w-0 ${activeTab === "repos" ? "border-b-2 border-primary text-primary" : "text-default-500 hover:text-foreground"}`}
                onPress={() => setActiveTab("repos")}
              >
                Repositories
              </Button>
              <Button
                variant="light"
                className={`text-sm font-bold rounded-none h-12 px-2 min-w-0 ${activeTab === "activity" ? "border-b-2 border-primary text-primary" : "text-default-500 hover:text-foreground"}`}
                onPress={() => setActiveTab("activity")}
              >
                Activity
              </Button>
            </div>

            <div className="flex-1 overflow-hidden">
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full overflow-y-auto pr-2 scrollbar-hide animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Card className="p-2 border border-divider bg-content1/30 h-fit">
                    <Image
                      alt="stats"
                      src={`http://github-profile-summary-cards.vercel.app/api/cards/stats?username=${user.login}&theme=${statsTheme}`}
                      width="100%"
                    />
                  </Card>
                  <Card className="p-2 border border-divider bg-content1/30 h-fit">
                    <Image
                      alt="top languages"
                      src={`http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${user.login}&theme=${statsTheme}`}
                      width="100%"
                    />
                  </Card>
                  <Card className="lg:col-span-2 p-2 border border-divider bg-content1/30 h-fit">
                    <Image
                      alt="GitHub Streak"
                      src={`https://streak-stats.demolab.com?user=${user.login}&theme=${statsTheme}&hide_border=true`}
                      width="100%"
                    />
                  </Card>
                </div>
              )}
              {activeTab === "repos" && (
                <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ListUserRepos username={user.login} />
                </div>
              )}
              {activeTab === "activity" && (
                <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <UserEvents username={user.login} />
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
