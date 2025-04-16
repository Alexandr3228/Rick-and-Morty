import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  location?: Location;
}

export interface CharacterListState {
  characters: CharacterItemType[];
  character: CharacterItemType | null;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CharacterListState = {
  characters: [],
  character: null,
  currentPage: 0,
  totalPages: 0,
  isLoading: false,
  error: null,
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<CharacterItemType[]>) {
      state.characters = action.payload;
    },
    setCharacter(state, action: PayloadAction<CharacterItemType>) {
      state.character = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setCharacters } = characterSlice.actions;

export default characterSlice.reducer;
