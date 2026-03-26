import { VercelRequest, VercelResponse } from "@vercel/node";

import { getTokenFromRequest } from "../../lib/get-github-token";
import { createOctokit } from "../../lib/octokit-client.ts";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const githubToken = getTokenFromRequest(request);

  if (!githubToken) {
    return response.status(401).json({ authenticated: false });
  }
  const octokit = createOctokit(githubToken);

  try {
    const { data: user } = await octokit.rest.users.getAuthenticated();

    return response.status(200).json({ authenticated: true, user: user });
  } catch (error) {
    const err = error as { status?: number; message?: string };

    return response.status(err.status || 500).json({ message: err.message });
  }
}
