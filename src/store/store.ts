import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type appStore = {
  searchQuery: string;

  setSearchQuery: (searchQuery: string) => void;
};

const storeCreator: StateCreator<
  appStore,
  [["zustand/devtools", never]],
  []
> = (set) => ({
  searchQuery: "",
  setSearchQuery: (Query) => {
    set(
      () => ({
        searchQuery: Query,
      }),
      false,
      "setSearchQuery",
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
