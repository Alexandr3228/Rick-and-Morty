import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

const characterItem = {
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
    setCharacter(state, action) {
      state.character = action.payload;
    },
  },
});

export const { setCharacter } = characterSlice.actions;

export default characterSlice.reducer;
