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
      console.log("setCharacters", action);
    },
  },
});

export const { setCharacters } = characterSlice.actions;

export default characterSlice.reducer;
