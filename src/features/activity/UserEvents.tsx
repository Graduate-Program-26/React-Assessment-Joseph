import { useQuery } from "@tanstack/react-query";
import { Spinner, Accordion, AccordionItem } from "@heroui/react";

import EventItem from "./EventItem";

import { getPublicUserEvents } from "@/services/github/events";
import { Events } from "@/types/octokit-types";

interface props {
  username: string;
}

export default function UserEvents(props: props) {
  const { username } = props;
  const { data, isLoading, isError } = useQuery<Events, Boolean>({
    queryKey: ["userEvents", username],
    queryFn: () => getPublicUserEvents(username!),
    enabled: !!username,
    staleTime: 1000 * 60,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h2>Failed to load activity</h2>;
  if (!data?.length) return <p>No recent avtivity</p>;

  return (
    <>
      <h3 className="font-semibold">Recent Activity</h3>
      <div className="border p-4 h-[50dvh] md:h-1/3 overflow-y-auto rounded-2xl">
        <Accordion className="" variant="splitted">
          {data.map((event) => {
            const date = new Date(event.created_at!).toLocaleString();

            return (
              <AccordionItem key={event.id} title={<EventItem event={event} />}>
                <span className="text-xs text-secondary-600">{date}</span>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </>
  );
}
