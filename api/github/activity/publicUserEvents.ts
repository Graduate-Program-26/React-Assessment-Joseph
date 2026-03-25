import { VercelRequest, VercelResponse } from "@vercel/node";

import { octokit } from "../../../lib/octokit-client";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const { username } = request.query;

  if (!username) {
    return response.status(400).json({ error: " Username is required" });
  }
  try {
    const eventsResponse = await octokit.rest.activity.listPublicEventsForUser({
      username: String(username),
    });

    return response.status(200).json(eventsResponse.data);
  } catch (error) {
    const err = error as { status?: number; message?: string };

    return response.status(err.status || 500).json({ message: err.message });
  }
}
