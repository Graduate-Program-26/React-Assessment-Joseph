import { Octokit } from "@octokit/rest";

export type SearchUsersResponse = ReturnType<
  Octokit["rest"]["search"]["users"]
>;

export type GithubUser = Awaited<SearchUsersResponse>["data"]["items"][number];

export type GetEventsResponse = ReturnType<
  Octokit["rest"]["activity"]["listPublicEventsForUser"]
>;

export type Events = Awaited<GetEventsResponse>["data"];

export type Event = Events[number]
