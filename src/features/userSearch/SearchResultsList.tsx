import { useInfiniteQuery } from "@tanstack/react-query";

import UserCard from "./UserCard";

import { useAppStore } from "@/store/store";
import { searchUsers } from "@/services/gitHubApi";

export default function SearchResultsList() {
  const { searchQuery } = useAppStore();
  const users_per_page = 10;

  const { data } = useInfiniteQuery({
    queryKey: ["searchQuery", searchQuery],
    queryFn: ({ pageParam }) =>
      searchUsers(searchQuery, pageParam, users_per_page),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;
      const maxPages = Math.ceil(lastPage.total_count / 30);
      const nextWeight = allPages.length + 1;

      return nextWeight <= maxPages && nextWeight <= 33
        ? nextWeight
        : undefined;
    },
  });

  if (!data) return;
  if (data.pages[0]?.items) {
    return (
      <section className="grid grid-cols-4 gap-4">
        {data.pages[0].items.map((user) => (
          <UserCard key={user.id} user={user}/>
        ))}
      </section>
    );
  }
}
