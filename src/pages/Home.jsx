/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";

import Search from "../components/Search";
import HomeFilter from "../components/HomeFilter";
import CharacterItem from "../components/CharacterItem";
import Pagination from "../components/Pagination";

function Home() {
  const [popupIsActive, setPopupIsActive] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(""); //Search for url
  const [characters, setCharacters] = React.useState([]); //Characters
  const [pageCount, setPageCount] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState("");
  // // const [species, setSpecies] = React.useState([]); //Specie state
  const [isLoading, setIsLoading] = React.useState(false); //Check loading page
  const search = searchValue ? `?name=${searchValue}` : "";
  // // const url = `https://rickandmortyapi.com/api/character`;
  const [url, setUrl] = React.useState(
    `https://rickandmortyapi.com/api/character/${search}` // URL ""?name=rick""        _______//filter_fix//________
  );
  const [nextUrl, setNextUrl] = React.useState(null); // URL next page

  React.useEffect(() => {
    const getData = async () => {
      if (!url) return; // Prevent 2nd request
      setIsLoading(true); // Loading flag

      try {
        const response = await axios.get(url); // Character request
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...response.data.results, // Добавляем новых персонажей к уже загруженным
        ]);
        setPageCount(response.data.info.pages);
        // console.log(response.data.info.pages);
        setNextUrl(response.data.info.next); // Устанавливаем URL следующей страницы
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setIsLoading(false); // Сбрасываем флаг загрузки
      }
    };
    // console.log(pageCount);
    getData();
  }, [url, searchValue]); // useEffect срабатывает только при изменении url
  // console.log(searchValue, "search");
  // Функция для загрузки следующей страницы
  const handleLoadMore = () => {
    if (nextUrl) {
      setUrl(nextUrl); // Устанавливаем URL для следующей страницы
    }
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  // console.log(pageCount);

  return (
    <section className="main">
      <div className="container">
        <img
          className="main__img"
          src="./img/rickandmorty.png"
          alt="Rick and Morty"
        />
        <div className="filter__bar">
          <Search searchValue={searchValue} />

          <HomeFilter
            popupIsActive={popupIsActive}
            setPopupIsActive={setPopupIsActive}
            // species={species}
            // setSpecies={setSpecies}
          />
        </div>
        <section className="characters">
          <ul className="characters__list">
            {characters.map((character) => (
              <CharacterItem key={character.id} {...character} />
            ))}
          </ul>
        </section>
        <button onClick={handleLoadMore} className="btn__load">
          {nextUrl && !isLoading ? <p>Load more</p> : <p>Loading...</p>}
        </button>
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onChangePage={onChangePage}
        />
      </div>
    </section>
  );
}

export default Home;
