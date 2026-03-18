import type { QueryFunctionContext } from "@tanstack/react-query";

import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export async function searchUsers(queryKey = "", pageParam = 1, per_page = 10) {


  try {
    const response = await octokit.rest.search.users({
      q: queryKey,
      page: pageParam,
      per_page: per_page,
    });

    console.log(`Found ${response.data.total_count} users.`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
