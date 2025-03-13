import { StateCreator } from "zustand";
import { CharacterIdSlice, StoreState } from "../types/StoreTypes";

export const createCharacterIdSlice: StateCreator<
  StoreState,
  [],
  [],
  CharacterIdSlice
> = (set, get) => ({
  id: "",
  setID: (id) => {
    set({ id });
  },
});
