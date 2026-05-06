import type { GithubUser } from "@/types/octokit-types";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";

import UserCard from "./UserCard";
import CenteredSpinner from "@/components/CenteredSpinner";

import { searchUsers } from "@/services/github/users";

export default function SearchResultsList() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toString();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const usersPerPage = 12;
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
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

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <CenteredSpinner fullScreen />;
  
  if (!data) return null;

  const users = data.pages.flatMap((page) => page.items);
  const totalCount = data.pages[0].total_count;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-default-500 text-sm">
          Found <span className="text-foreground font-semibold">{totalCount}</span> users
        </p>
      </div>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {users.map((user: GithubUser) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div
          ref={sentinelRef}
          className="h-20 flex justify-center items-center mt-8"
        >
          {isFetchingNextPage && <Spinner size="lg" color="primary" />}
        </div>
      )}
    </section>
  );
}
