import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type appStore = {
  searchQuery: string;
  isAuthenticated: boolean;
  isAuthLoading: boolean;

  setSearchQuery: (searchQuery: string) => void;
  setAuthenticated: (value: boolean) => void;
};

const storeCreator: StateCreator<
  appStore,
  [["zustand/devtools", never]],
  []
> = (set) => ({
  searchQuery: "",
  isAuthenticated: false,
  isAuthLoading: true,
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
