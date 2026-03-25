import { Event } from "@/types/octokit-types";

function eventHeader(event: Event) {
  const user = event.actor.login;
  const repo = event.repo.name;

  switch (event.type) {
    case "PushEvent":
      return (
        <span className="line-clamp-1">
          {`${user} made a Commit in `}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    case "CreateEvent":
      return (
        <span className="line-clamp-1">
          {`${user} created a ${event.payload.ref_type} in `}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    case "IssuesEvent":
      return (
        <span className="line-clamp-1">
          {`${user} ${event.payload.action} a issue in`}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    case "PullRequestReviewEvent":
      return (
        <span className="line-clamp-1">
          {`${user} reviewed a pull request in `}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    default:
      return (
        <span className="line-clamp-1">
          {`${user} did ${event.type} in `}
          <span className="font-semibold">{repo}</span>
        </span>
      );
  }
}
export default function EventItem({ event }: { event: Event }) {
  return <div className="flex flex-col text-left">{eventHeader(event)}</div>;
}
