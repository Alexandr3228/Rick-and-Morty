/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Search from "../components/Search";
import HomeFilter from "../components/HomeFilter";
import CharacterItem from "../components/CharacterItem";
import Pagination from "../components/Pagination";

import { setCharacters } from "../redux/slices/characterSlice";
import { characterItem } from "../redux/slices/characterSlice";
import { fetchHomeFilter } from "../utils/fetchHomeFilter";

function Home() {
  const [popupIsActive, setPopupIsActive] = React.useState(false);
  const [filterData, setFilterData] = React.useState([]);
  const [species, setSpecies] = React.useState([]);
  const [gender, setGender] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [nextUrl, setNextUrl] = React.useState(null);
  const [url, setUrl] = React.useState(
    "https://rickandmortyapi.com/api/character"
  );

  const dispatch = useDispatch();
  const characters = useSelector((state) => state.character.characters);

  // console.log(characters);

  // Состояния для фильтрации
  const [searchValue, setSearchValue] = React.useState("");
  const [filters, setFilters] = React.useState({
    species: "",
    status: "",
    gender: "",
  });

  // Данные для фильтров
  const [filterOptions, setFilterOptions] = React.useState({
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

      const searchQuery = params.toString();
      setUrl(`https://rickandmortyapi.com/api/character?${params.toString()}`);
    }, 400);

    return () => {
      clearTimeout(timer);
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

    const scrollPosition =
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

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <section className="main">
      <div className="container">
        <img
          className="main__img"
          src="./img/rickandmorty.png"
          alt="Rick and Morty"
        />
        <div className="filter__bar">
          <div className="main--search">
            <Search
              placeholder="Filter by name..."
              setSearchValue={setSearchValue}
            />
          </div>
          <HomeFilter
            species={filterOptions.species}
            status={filterOptions.status}
            gender={filterOptions.gender}
            onSpeciesChange={(value) => handleFilterChange("species", value)}
            onGenderChange={(value) => handleFilterChange("gender", value)}
            onStatusChange={(value) => handleFilterChange("status", value)}
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
}

export default Home;
