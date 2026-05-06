import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const { code, state } = request.query;
  let redirectTo = "/";

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.GITHUB_CLIENT_ID!,
          client_secret: process.env.GITHUB_CLIENT_SECRET!,
          code: code as string,
        }),
      },
    );
    const data = await tokenResponse.json();

    const accessToken = data.access_token;

    response.setHeader(
      "set-cookie",
      `github-token=${accessToken}; Path=/; httpOnly; Secure; SameSite=Lax`,
    );

    if (state) {
      try {
        const rawState = Array.isArray(state) ? state[0] : state;
        const parsed = JSON.parse(decodeURIComponent(rawState as string));

        redirectTo = parsed.redirectTo || "/";
        if (!redirectTo.startsWith("/")) {
          redirectTo = "/";
        }
      } catch {}
    }

    return response.redirect(redirectTo);
  } catch (error) {
    const err = error as { status?: number; message?: string };

    return response.status(err.status || 500).json({ message: err.message });
  }
}
