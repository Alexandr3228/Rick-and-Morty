import React from "react";
import axios from "axios";

import LocationItem from "../components/LocationItem.jsx";
import Search from "../components/Search/index.tsx";
import Filter from "../components/Filter/index.tsx";
import { fetchLocationsFilter } from "../utils/fetchLocationsFilter.ts";

function Locations() {
  const [url, setUrl] = React.useState(
    `https://rickandmortyapi.com/api/location`
  );

  const [locations, setLocations] = React.useState<Location[]>([]);
  const [nextUrl, setNextUrl] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollPositionRef = React.useRef(0);
  // Состояния для фильтрации
  const [searchValue, setSearchValue] = React.useState("");
  const [filters, setFilters] = React.useState({
    type: "",
    dimension: "",
  });

  type Location = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    // и другие поля, которые могут быть у локации
  };

  // Данные для фильтров
  const [filterOptions, setFilterOptions] = React.useState<{
    type: string[];
    dimension: string[];
  }>({
    type: [],
    dimension: [],
  });

  // Загрузка данных для фильтров
  React.useEffect(() => {
    const loadFilterData = async () => {
      try {
        const [type, dimension] = await fetchLocationsFilter();
        setFilterOptions({ type, dimension });
      } catch (error) {
        console.error("Error loading filter data:", error);
      }
    };
    loadFilterData();
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchValue) params.append("name", searchValue);
      if (filters.type) params.append("type", filters.type);
      if (filters.dimension) params.append("dimension", filters.dimension);

      setUrl(`https://rickandmortyapi.com/api/location?${params.toString()}`);
    }, 400);

    return () => {
      clearTimeout(timer);
      scrollPositionRef.current = 0;
      window.scrollTo(0, 0);
    };
  }, [searchValue, filters]);

  React.useEffect(() => {
    const getLocations = async () => {
      if (!url) return; // Prevent 2nd request
      setIsLoading(true); // Loading flag
      try {
        const response = await axios.get(url);
        setLocations(response.data.results);
        setNextUrl(response.data.info.next);
      } catch (error) {
        console.error("Error to fetch locations", error);
      } finally {
        setIsLoading(false);
      }
    };

    setLocations([]);
    getLocations();
  }, [url]);

  const handleLoadMoreLocations = async () => {
    if (!nextUrl) return;

    scrollPositionRef.current =
      window.pageYOffset || document.documentElement.scrollTop;

    try {
      setIsLoading(true);
      const response = await axios.get(nextUrl);
      setLocations((prevLocations) => [
        ...prevLocations,
        ...response.data.results,
      ]);
      setNextUrl(response.data.info.next);
    } catch (error) {
      console.error("Error to fetch more locations", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));

    scrollPositionRef.current = 0;
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (!isLoading) {
      window.requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo(0, scrollPositionRef.current);
        }, 0);
      });
    }
  }, [locations, isLoading]);

  return (
    <section className="locations">
      <div className="container">
        <img
          className="locations--img"
          src="./img/locations.png"
          alt="Rick and Morty"
        />
        <div className="filter__bar">
          <Search
            placeholder="Filter by name..."
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <Filter
            filters={[
              {
                key: "type",
                label: "Type",
                options: filterOptions.type,
                onChange: (val) => handleFilterChange("type", val),
              },
              {
                key: "dimension",
                label: "Dimension",
                options: filterOptions.dimension,
                onChange: (val) => handleFilterChange("dimension", val),
              },
            ]}
          />
        </div>
        <ul className="locations--list">
          {locations.map((location) => (
            <LocationItem key={location.id} {...location} />
          ))}
        </ul>
        <button onClick={handleLoadMoreLocations} className="btn__load">
          {nextUrl && !isLoading ? <p>Load more</p> : <p>Loading...</p>}
        </button>
      </div>
    </section>
  );
}

export default Locations;
