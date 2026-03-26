import { getUserRepos } from "@/services/github/repos";
import type { RepoList } from "@/types/octokit-types";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

interface props {
  username: string;
}
export default function RepoList(props: props) {
  const { username } = props;

  const { data, isLoading, isError } = useQuery<RepoList, Boolean>({
    queryKey: ["userRepos", username],
    queryFn: () => getUserRepos(username),
    enabled: !!username,
  });

  if (isLoading) return <p>Loading Repos...</p>;
  if (isError) return <p>Error loading Repos.</p>;
  if (!data?.length) return <p>No repositories found</p>;

  return (
    <>
      <h3 className="font-semibold">Repositories</h3>
      <div className="border p-4 rounded-xl h-[50dvh] md:h-1/3 overflow-auto">
        <Accordion variant="splitted">
          {data.map((repo) => (
            <AccordionItem key={repo.id} title={repo.name}>
              <p>{repo.description}</p>
              <div className="flex justify-between w-full text-secondary-600">
                <div className="flex gap-4">
                  <span className="text-xs">Forks: {repo.forks} </span>
                  <span className="text-xs">
                    Stars: {repo.stargazers_count}
                  </span>
                  <span className="text-xs">Language: {repo.language} </span>
                </div>
                <span className="text-xs ">
                  Last updated:{" "}
                  {formatDistanceToNow(new Date(repo.updated_at!), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
