import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  paginate: true,
});

export type SearchUsersResponse = ReturnType<typeof octokit.rest.search.users>;

export type GithubUser = Awaited<SearchUsersResponse>["data"]["items"][number];

export default octokit;