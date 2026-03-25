import type { GithubUser } from "@/types/octokit-types";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";
import { useSearchParams } from "react-router-dom";

import UserCard from "./UserCard";

import { searchUsers } from "@/services/github/users";

export default function SearchResultsList() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toString();

  const usersPerPage = 10;
  const { data, error, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["searchQuery", query],
      queryFn: ({ pageParam }) => searchUsers(query, pageParam, usersPerPage),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage) return undefined;
        const maxPages = Math.ceil(lastPage.total_count / usersPerPage);
        const nextWeight = allPages.length + 1;

        return nextWeight <= maxPages && nextWeight <= 33
          ? nextWeight
          : undefined;
      },
      enabled: !!query,
    });

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );
  if (!data) return;

  const users = data.pages.flatMap((page) => page.items);
  const totalCount = data.pages[0].total_count;

  return (
    <section className="flex  flex-col gap-2">
      <p>Found: {totalCount} users</p>
      <ul className="grid grid-cols-4 gap-4">
        {users.map((user: GithubUser) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </section>
  );
}
