import { GithubUser } from "@/types/octokit-types";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type appStore = {
  searchQuery: string;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  loggedInUser: GithubUser | null;

  setSearchQuery: (searchQuery: string) => void;
  setAuthenticated: (value: boolean) => void;
  setLoggedInUser: (user: GithubUser | null) => void;
  logout: () => void;
};

const storeCreator: StateCreator<
  appStore,
  [["zustand/devtools", never]],
  []
> = (set) => ({
  searchQuery: "",
  isAuthenticated: false,
  isAuthLoading: true,
  loggedInUser: null,
  setSearchQuery: (Query) => {
    set(
      () => ({
        searchQuery: Query,
      }),
      false,
      "setSearchQuery",
    );
  },
  setAuthenticated: (value) => {
    set(
      () => ({ isAuthenticated: value, isAuthLoading: false }),
      false,
      "setAuthenticated",
    );
  },
  setLoggedInUser: (user) => {
    set(() => ({ loggedInUser: user }), false, "setLoggedInUser");
  },
  logout: () => {
    set(
      () => ({ loggedInUser: null, isAuthenticated: false }),
      false,
      "logout",
    );
  },
});

export const useAppStore = create<appStore>()(
  process.env.NODE_ENV === "development"
    ? devtools(storeCreator)
    : (storeCreator as StateCreator<
        appStore,
        [],
        [["zustand/devtools", never]]
      >),
);
