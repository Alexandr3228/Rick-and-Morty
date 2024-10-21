/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";

import Search from "../components/Search";
import FilterBar from "../components/FilterBar";
import CharacterItem from "../components/CharacterItem";

function Home() {
  const [popupIsActive, setPopupIsActive] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(""); //Для поиска персонажей
  const [characters, setCharacters] = React.useState([]); //Для вывода персонажей
  // // const [species, setSpecies] = React.useState([]); //Для вывода спецификации в фильтр
  const [isLoading, setIsLoading] = React.useState(false); //Для загрузки страницы
  const search = searchValue ? `?name=${searchValue.value}` : ""; //Сокращение для "url"
  // // const url = `https://rickandmortyapi.com/api/character`; //"url" //${search}//
  const [url, setUrl] = React.useState(
    `https://rickandmortyapi.com/api/character/${search}` //?name=rick
  ); //Для загрузки следующей страницы персонажей
  const [nextUrl, setNextUrl] = React.useState(null); // URL для следующей страницы

  React.useEffect(() => {
    const getData = async () => {
      if (!url) return; // Предотвращаем повторный запрос
      setIsLoading(true); // Устанавливаем флаг загрузки

      try {
        const response = await axios.get(url); // Делаем запрос
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...response.data.results, // Добавляем новых персонажей к уже загруженным
        ]);
        // console.log(response.data.results.id);
        setNextUrl(response.data.info.next); // Устанавливаем URL следующей страницы
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setIsLoading(false); // Сбрасываем флаг загрузки
      }
    };

    getData();
  }, [url, searchValue]); // useEffect срабатывает только при изменении url

  // Функция для загрузки следующей страницы
  const handleLoadMore = () => {
    if (nextUrl) {
      setUrl(nextUrl); // Устанавливаем URL для следующей страницы
    }
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
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          <FilterBar
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
      </div>
    </section>
  );
}

export default Home;
