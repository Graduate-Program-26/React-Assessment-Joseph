import type { RepoList } from "@/types/octokit-types";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Link, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

import { getUserRepos } from "@/services/github/repos";

interface props {
  username: string;
}

function RepoListSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-full border border-divider p-4 rounded-xl flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-1/3 rounded-lg" />
            <Skeleton className="h-4 w-20 rounded-lg" />
          </div>
          <Skeleton className="h-3 w-full rounded-lg" />
          <Skeleton className="h-2 w-1/4 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export default function RepoList(props: props) {
  const { username } = props;

  const { data, isLoading, isError } = useQuery<RepoList, Boolean>({
    queryKey: ["userRepos", username],
    queryFn: () => getUserRepos(username),
    enabled: !!username,
  });

  if (isLoading) return <RepoListSkeleton />;
  if (isError) return <p className="text-danger text-center p-4">Error loading repositories.</p>;
  if (!data?.length) return <p className="text-default-500 text-center p-4">No repositories found</p>;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <h3 className="font-semibold mb-2 shrink-0">Repositories</h3>
      <div className="flex-1 border border-divider p-4 rounded-xl bg-content1/30 overflow-y-auto scrollbar-hide">
        <Accordion variant="splitted" className="px-0">
          {data.map((repo) => (
            <AccordionItem 
              key={repo.id} 
              title={
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-sm">{repo.name}</span>
                  <Link
                    isExternal
                    showAnchorIcon
                    className="text-xs text-primary"
                    href={repo.html_url}
                  >
                    View on GitHub
                  </Link>
                </div>
              }
            >
              <div className="flex flex-col gap-3">
                <p className="text-sm text-default-600">{repo.description || "No description provided."}</p>
                <div className="flex justify-between items-center w-full text-default-400">
                  <div className="flex gap-4">
                    <span className="text-xs flex items-center gap-1">
                      <span className="font-bold text-foreground">{repo.forks}</span> Forks
                    </span>
                    <span className="text-xs flex items-center gap-1">
                      <span className="font-bold text-foreground">{repo.stargazers_count}</span> Stars
                    </span>
                    {repo.language && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-default-100 text-default-700">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] italic">
                    Updated {formatDistanceToNow(new Date(repo.updated_at!), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
