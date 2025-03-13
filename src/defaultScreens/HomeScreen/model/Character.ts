export interface Character {
  characters: {
    results: {
      id: number;
      name: string;
      status: string;
      species: string;
      image: string;
    }[];
  };
}
