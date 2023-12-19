// store.ts
import { create } from "zustand";
import { produce } from "immer";
import { AppState } from "@/interfaces";

const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) =>
    set((state) =>
      produce(state, (draft) => {
        draft.user = user;
      })
    ),
}));

export default useStore;
