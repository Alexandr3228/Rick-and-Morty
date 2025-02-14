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
  // const [characters, setCharacters] = React.useState([]); //Characters
  // const [pageCount, setPageCount] = React.useState("");
  // const [currentPage, setCurrentPage] = React.useState("");
  const [filterData, setFilterData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false); //Check loading page
  // const search = searchValue ? `?name=${searchValue}` : "";
  const [searchValue, setSearchValue] = React.useState("");
  const [speciesFilter, setSpeciesFilter] = React.useState("");
  const [genderFilter, setGenderFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [nextUrl, setNextUrl] = React.useState(null); // URL next page

  const dispatch = useDispatch();
  const characters = useSelector((state) => state.character.characters);

  // console.log(character);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const searchParams = new URLSearchParams();
      if (searchValue) searchParams.append("name", searchValue);
      if (speciesFilter) searchParams.append("species", speciesFilter);
      if (genderFilter) searchParams.append("gender", genderFilter);
      if (statusFilter) searchParams.append("status", statusFilter);

      const searchQuery = searchParams.toString();
      setUrl(`https://rickandmortyapi.com/api/character?${searchQuery}`);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, speciesFilter, genderFilter, statusFilter]);

  // // const url = `https://rickandmortyapi.com/api/character`;
  // const [url, setUrl] = React.useState(
  //   `https://rickandmortyapi.com/api/character/?status=dead&name=rick` // URL ""?name=rick""        _______//filter_fix//________
  // );

  React.useEffect(() => {
    const getData = async () => {
      if (!url) return; // Prevent 2nd request
      setIsLoading(true); // Loading flag

      try {
        const response = await axios.get(url); // Character request
        const charactersList = response.data.results;
        // charactersList.map((characters) => {
        //   dispatch(setCharacters(characters));
        // });
        dispatch(setCharacters(charactersList)); // Добавляем новых персонажей к уже загруженным
        // setPageCount(response.data.info.pages);
        setNextUrl(response.data.info.next); // Устанавливаем URL следующей страницы
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setIsLoading(false); // Сбрасываем флаг загрузки
      }
    };

    // dispatch(setCharacters([]));
    getData();
  }, [url]); // useEffect срабатывает только при изменении url

  // Функция для загрузки следующей страницы
  const handleLoadMore = async () => {
    if (!nextUrl) return;

    try {
      setIsLoading(true);
      const response = await axios.get(nextUrl);
      dispatch(
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...response.data.results,
        ])
      );
      setNextUrl(response.data.info.next);
    } catch (error) {
      console.error("Error loading more characters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useState(() => {
    const getFilter = async () => {
      const responseFilterData = await fetchHomeFilter();
      setFilterData(responseFilterData);
    };

    getFilter();
  }, [filterData]);
  // const characterItem = characters.map((character) => {
  //   console.log(character);
  // });
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
            popupIsActive={popupIsActive}
            setPopupIsActive={setPopupIsActive}
            setSpeciesFilter={setSpeciesFilter}
            setGenderFilter={setGenderFilter}
            setStatusFilter={setStatusFilter}
            // species={species}
            // status={status}
            // gender={gender}
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
        <button onClick={handleLoadMore} className="btn__load">
          {nextUrl && !isLoading ? <p>Load more</p> : <p>Loading...</p>}
        </button>
        {/* <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onChangePage={onChangePage}
        /> */}
      </div>
    </section>
  );
}

export default Home;
