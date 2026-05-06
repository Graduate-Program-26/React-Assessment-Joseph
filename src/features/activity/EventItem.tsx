import { Event } from "@/types/octokit-types";

function eventHeader(event: Event) {
  const user = event.actor.login;
  const repo = event.repo.name;

  switch (event.type) {
    case "PushEvent":
      return (
        <span className="line-clamp-1">
          <span className="font-bold text-primary">{user}</span> pushed to{" "}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    case "CreateEvent":
      return (
        <span className="line-clamp-1">
          <span className="font-bold text-primary">{user}</span> created a{" "}
          <span className="italic">{(event.payload as { ref_type: string }).ref_type}</span> in{" "}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    case "IssuesEvent":
      return (
        <span className="line-clamp-1">
          <span className="font-bold text-primary">{user}</span>{" "}
          {event.payload.action} an issue in{" "}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    case "PullRequestEvent":
      return (
        <span className="line-clamp-1">
          <span className="font-bold text-primary">{user}</span>{" "}
          {event.payload.action} a pull request in{" "}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    case "PullRequestReviewEvent":
      return (
        <span className="line-clamp-1">
          <span className="font-bold text-primary">{user}</span> reviewed a pull request in{" "}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    case "WatchEvent":
      return (
        <span className="line-clamp-1">
          <span className="font-bold text-primary">{user}</span> starred{" "}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    case "ForkEvent":
      return (
        <span className="line-clamp-1">
          <span className="font-bold text-primary">{user}</span> forked{" "}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    case "ReleaseEvent":
      return (
        <span className="line-clamp-1">
          <span className="font-bold text-primary">{user}</span> released{" "}
          <span className="font-semibold">{(event.payload as { release: { tag_name: string } }).release.tag_name}</span> in{" "}
          <span className="font-semibold">{repo}</span>
        </span>
      );
    default:
      return (
        <span className="line-clamp-1 text-primary">
          <span className="font-bold">{user}</span> performed a{" "}
          <span className="italic">{event.type}</span> in{" "}
          <span className="font-semibold">{repo}</span>
        </span>
      );
  }
}
export default function EventItem({ event }: { event: Event }) {
  return <div className="flex flex-col text-left text-sm">{eventHeader(event)}</div>;
}
