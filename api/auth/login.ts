import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const { redirectTo } = request.query;
  const state = encodeURIComponent(
    JSON.stringify({
      redirectTo: redirectTo || "/",
    }),
  );

  const redirect = `https://github.com/login/oauth/authorize?client_id=${client_id}&state=${state}&scope=read:user`;

  response.redirect(redirect);
}
