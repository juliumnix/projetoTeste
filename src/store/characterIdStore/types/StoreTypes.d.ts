export interface CharacterIdSlice {
  id: string;
  setID: (id: string) => void;
}

export type StoreState = CharacterIdSlice;
