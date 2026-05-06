import { useQuery } from "@tanstack/react-query";
import { Accordion, AccordionItem, Skeleton } from "@heroui/react";
import { formatDistanceToNow } from "date-fns";

import EventItem from "./EventItem";
import { getPublicUserEvents } from "@/services/github/events";
import { Events } from "@/types/octokit-types";

interface props {
  username: string;
}

function UserEventsSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-full border border-divider p-4 rounded-xl flex flex-col gap-2">
          <Skeleton className="h-4 w-3/4 rounded-lg" />
          <Skeleton className="h-3 w-1/4 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export default function UserEvents(props: props) {
  const { username } = props;
  const { data, isLoading, isError } = useQuery<Events, Boolean>({
    queryKey: ["userEvents", username],
    queryFn: () => getPublicUserEvents(username!),
    enabled: !!username,
    staleTime: 1000 * 60,
  });

  if (isLoading) return <UserEventsSkeleton />;
  if (isError) return <h2 className="text-danger text-center p-4">Failed to load activity</h2>;
  if (!data?.length) return <p className="text-default-500 text-center p-4">No recent activity</p>;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <h3 className="font-semibold mb-2 shrink-0">Recent Activity</h3>
      <div className="flex-1 border border-divider p-4 rounded-2xl bg-content1/30 overflow-y-auto scrollbar-hide">
        <Accordion variant="splitted" className="px-0">
          {data.map((event) => {
            const date = formatDistanceToNow(new Date(event.created_at!), {
              addSuffix: true,
            });

            return (
              <AccordionItem 
                key={event.id} 
                title={<EventItem event={event} />}
                subtitle={<span className="text-[10px] text-default-400">{date}</span>}
                className="group"
              >
                <div className="pl-2 border-l-2 border-divider ml-1 py-1">
                   <p className="text-xs text-default-500">
                    Repo: <span className="text-foreground font-medium">{event.repo.name}</span>
                   </p>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
