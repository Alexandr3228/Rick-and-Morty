import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [],
};

export const characterItem = {
  id: null,
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
  episode: [],
  location: {
    name: "",
    url: "",
  },
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacters(state, action) {
      state.characters = action.payload;
    },
    setSpecies(state, action) {
      state.species = action.payload;
      console.log(state.species);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
  },
});

export const { setCharacters, setSpecies, setStatus, setGender } =
  characterSlice.actions;

export default characterSlice.reducer;
