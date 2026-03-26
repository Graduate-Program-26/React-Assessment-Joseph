import { useEffect } from "react";
import { useAppStore } from "@/store/store";
import { GithubUser } from "@/types/octokit-types";
import { useLocation } from "react-router-dom";

interface authResponse {
  authenticated: boolean;
  user?: GithubUser;
}

export function useAuth() {
  const setAuthenticated = useAppStore((store) => store.setAuthenticated);
  const setLoggedInUser = useAppStore((store) => store.setLoggedInUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me?");

        if (!response.ok) throw new Error("Not authenticated");
        const data = (await response.json()) as authResponse;

        setAuthenticated(true);
        setLoggedInUser(data.user || null);
      } catch {
        setAuthenticated(false);
        setLoggedInUser(null);
      }
    };

    fetchUser();
  }, []);
}
