import axios from "axios";

export const fetchHomeFilter = async () => {
  let allSpecies = new Set();
  let allStatuses = new Set();
  let allGenders = new Set();
  let url = "https://rickandmortyapi.com/api/character";

  try {
    while (url) {
      const response = await axios.get(url);
      const characters = response.data.results;
      characters.forEach((character) => {
        if (character.species || character.status || character.gender) {
          allSpecies.add(
            character.species.charAt(0).toUpperCase() +
              character.species.slice(1).toLowerCase()
          );
          allStatuses.add(
            character.status.charAt(0).toUpperCase() +
              character.status.slice(1).toLowerCase()
          );
          allGenders.add(
            character.gender.charAt(0).toUpperCase() +
              character.gender.slice(1).toLowerCase()
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
    return [];
  }
};
