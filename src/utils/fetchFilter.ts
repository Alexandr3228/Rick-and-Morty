import axios from "axios";

export const fetchUniqueFilters = async (
  url: string,
  fields: string[]
): Promise<string[][]> => {
  const sets: Record<string, Set<string>> = {};

  // Инициализация Set для каждого поля
  fields.forEach((field) => {
    sets[field] = new Set<string>();
  });

  try {
    while (url) {
      const response = await axios.get(url);
      const results = response.data.results;

      results.forEach((item: Record<string, any>) => {
        fields.forEach((field) => {
          const value = item[field];
          if (typeof value === "string" && value.trim()) {
            const formatted =
              value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            sets[field].add(formatted);
          }
        });
      });

      url = response.data.info.next;
    }

    return fields.map((field) => Array.from(sets[field]));
  } catch (error) {
    console.error("Error fetching filters:", error);
    return fields.map(() => []);
  }
};
