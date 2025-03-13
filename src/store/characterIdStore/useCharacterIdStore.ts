import { create } from "zustand";
import { createCharacterIdSlice } from "./slices/characterIdSlice";
import { StoreState } from "./types/StoreTypes";

export const useCharacterIdStore = create<StoreState>()((...attributes) => ({
  ...createCharacterIdSlice(...attributes),
}));
