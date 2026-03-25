import { Octokit } from "@octokit/rest";

export type SearchUsersResponse = ReturnType<
  Octokit["rest"]["search"]["users"]
>;

export type GithubUser = Awaited<SearchUsersResponse>["data"]["items"][number];
