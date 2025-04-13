import axios from "axios";

export const fetchLocationsFilter = async () => {
  let allTypes = new Set();
  let allDimensions = new Set();
  let url = "https://rickandmortyapi.com/api/location";

  try {
    while (url) {
      const response = await axios.get(url);
      const locations = response.data.results;
      locations.forEach((location) => {
        if (location.type || location.dimension) {
          allTypes.add(
            location.type.charAt(0).toUpperCase() +
              location.type.slice(1).toLowerCase()
          );
          allDimensions.add(
            location.dimension.charAt(0).toUpperCase() +
              location.dimension.slice(1).toLowerCase()
          );
        }
      });

      url = response.data.info.next;
    }
    return [Array.from(allTypes), Array.from(allDimensions)];
  } catch (error) {
    console.error("Error fetching:", error);
    return [];
  }
};
