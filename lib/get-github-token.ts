import { VercelRequest } from "@vercel/node";

export function getTokenFromRequest(request: VercelRequest) {
  const cookies = request.headers.cookie;

  return cookies
    ?.split("; ")
    .find((cookie) => cookie.startsWith("github-token="))
    ?.split("=")[1];
}
