import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const { state } = request.query;

  let redirectTo = "/";

  response.setHeader(
    "Set-Cookie",
    "github-token=; path=/; httpOnly; Secure; SameSite=Lax; Max-Age=0",
  );

  if (state) {
    try {
      const parsed = JSON.parse(decodeURIComponent(state as string));

      redirectTo = parsed.redirecTo || "/";
      if (!redirectTo.startsWith("/")) {
        redirectTo = "/";
      }
    } catch {}
  }

  return response.redirect(redirectTo);
}
