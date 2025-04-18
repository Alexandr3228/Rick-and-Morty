import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Search from "../components/Search/index.tsx";
import Filter from "../components/Filter/index.tsx";
import CharacterItem from "../components/CharacterItem.tsx";

import { setCharacters } from "../redux/slices/characters/characterSlice.ts";
import { fetchHomeFilter } from "../utils/fetchHomeFilter.ts";
import { charactersSelector } from "../redux/slices/characters/selectors.ts";

export type FilterType = {
  species: string;
  gender: string;
  status: string;
};

export type FilterOptionsType = {
  species: string[];
  gender: string[];
  status: string[];
};

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [nextUrl, setNextUrl] = React.useState(null);
  const [url, setUrl] = React.useState(
    "https://rickandmortyapi.com/api/character"
  );

  const scrollPositionRef = React.useRef(0);
  const dispatch = useDispatch();
  const characters = useSelector(charactersSelector);

  // Состояния для фильтрации
  const [searchValue, setSearchValue] = React.useState("");
  const [filters, setFilters] = React.useState<FilterType>({
    species: "",
    status: "",
    gender: "",
  });

  // Данные для фильтров
  const [filterOptions, setFilterOptions] = React.useState<FilterOptionsType>({
    species: [],
    status: [],
    gender: [],
  });

  // Загрузка данных для фильтров
  React.useEffect(() => {
    const loadFilterData = async () => {
      try {
        const [species, status, gender] = await fetchHomeFilter();
        setFilterOptions({ species, status, gender });
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
      if (filters.species) params.append("species", filters.species);
      if (filters.status) params.append("status", filters.status);
      if (filters.gender) params.append("gender", filters.gender);

      setUrl(`https://rickandmortyapi.com/api/character?${params.toString()}`);
    }, 400);

    return () => {
      clearTimeout(timer);
      scrollPositionRef.current = 0;
      window.scrollTo(0, 0);
    };
  }, [searchValue, filters]);

  React.useEffect(() => {
    const loadCharacters = async () => {
      if (!url) return; // Не делать 2ой запрос

      setIsLoading(true);
      try {
        const response = await axios.get(url); // Получаем персонажей
        dispatch(setCharacters(response.data.results)); // Добавляем новых персонажей к уже загруженным
        setNextUrl(response.data.info.next); // Устанавливаем URL следующей страницы
      } catch (error) {
        console.error("Error fetching characters:", error);
        dispatch(setCharacters([]));
      } finally {
        setIsLoading(false);
      }
    };

    dispatch(setCharacters([]));
    loadCharacters();
  }, [url, dispatch]);

  // Функция для загрузки следующей страницы
  const handleLoadMore = async () => {
    if (!nextUrl) return;

    scrollPositionRef.current =
      window.pageYOffset || document.documentElement.scrollTop;

    try {
      setIsLoading(true);
      const response = await axios.get(nextUrl);
      dispatch(setCharacters([...characters, ...response.data.results]));
      setNextUrl(response.data.info.next);
    } catch (error) {
      console.error("Error loading more characters:", error);
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
  }, [characters, isLoading]);

  return (
    <section className="main">
      <div className="container">
        <img
          className="main__img"
          src="./img/rickandmorty.png"
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
                key: "species",
                label: "Species",
                options: filterOptions.species,
                onChange: (val) => handleFilterChange("species", val),
              },
              {
                key: "gender",
                label: "Gender",
                options: filterOptions.gender,
                onChange: (val) => handleFilterChange("gender", val),
              },
              {
                key: "status",
                label: "Status",
                options: filterOptions.status,
                onChange: (val) => handleFilterChange("status", val),
              },
            ]}
          />
        </div>
        <section className="characters">
          <ul className="characters__list">
            {!isLoading && characters.length > 0 ? (
              characters.map((character) => (
                <CharacterItem key={character.id} {...character} />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </section>
        <button
          onClick={handleLoadMore}
          className="btn__load"
          disabled={!nextUrl}
        >
          {nextUrl && !isLoading ? <p>Load more</p> : <p>Loading...</p>}
        </button>
      </div>
    </section>
  );
};

export default Home;
