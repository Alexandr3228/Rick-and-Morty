import axios, { AxiosResponse } from "axios";
import { CharacterItemType } from "../redux/slices/characterSlice";

export const fetchHomeFilter = async (): Promise<
  [string[], string[], string[]]
> => {
  let allSpecies = new Set<string>();
  let allStatuses = new Set<string>();
  let allGenders = new Set<string>();
  let url: string | null = "https://rickandmortyapi.com/api/character";

  try {
    while (url) {
      const response: AxiosResponse = await axios.get(url);
      const characters: CharacterItemType[] = response.data.results;
      characters.forEach((character) => {
        if (character.species) {
          allSpecies.add(
            character.species.charAt(0).toUpperCase() +
              character.species.slice(1).toLowerCase()
          );
        }
        if (character.status) {
          allStatuses.add(
            character?.status.charAt(0).toUpperCase() +
              character?.status.slice(1).toLowerCase()
          );
        }
        if (character.gender) {
          allGenders.add(
            character?.gender.charAt(0).toUpperCase() +
              character?.gender.slice(1).toLowerCase()
          );
        }
      });

      url = response.data.info.next;
    }
    return [
      Array.from(allSpecies),
      Array.from(allStatuses),
      Array.from(allGenders),
    ];
  } catch (error) {
    console.error("Error fetching species:", error);
    return [[], [], []];
  }
};
