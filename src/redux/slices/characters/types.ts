export type LocationType = {
  name: string;
  url: string;
};

export interface CharacterItemType {
  id: number;
  name: string;
  species: string;
  image: string;
  status?: string;
  gender?: string;
  type?: string;
  episode?: string[];
  origin?: {
    name: string;
    url: string;
  };
  location?: LocationType;
  url?: string;
}

export interface CharacterListState {
  characters: CharacterItemType[];
  character: CharacterItemType | null;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}
