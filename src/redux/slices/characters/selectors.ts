import { RootState } from "../../store";

export const charactersSelector = (state: RootState) =>
  state.character.characters;
