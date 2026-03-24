import { VercelRequest, VercelResponse } from "@vercel/node";

import { octokit } from "../../../lib/octokit-client";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const { query, page, per_page } = request.query;

  if (!query) {
    return response.status(400).json({ error: " Query term is required" });
  }
  try {
    const searchResponse = await octokit.rest.search.users({
      q: String(query),
      page: Number(page),
      per_page: Number(per_page),
    });

    return response.status(200).json(searchResponse.data);
  } catch (error) {
    const err = error as { status?: number; message?: string };

    return response.status(err.status || 500).json({ message: err.message });
  }
}
