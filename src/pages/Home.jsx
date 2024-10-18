import React from "react";
import axios from "axios";

import Search from "../components/Search";
import FilterBar from "../components/FilterBar";
import CharacterItem from "../components/CharacterItem";

function Home() {
  const [popupIsActive, setPopupIsActive] = React.useState(false);
  const CharacterList = () => {
    const [characters, setCharacters] = React.useState([]);
  };
  const [searchValue, setSearchValue] = React.useState("");
  const [characters, setCharacters] = React.useState([]);
  const [species, setSpecies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const search = searchValue ? `?name=${searchValue}` : "";
  const url = `https://rickandmortyapi.com/api/character/${search}`;

  React.useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setCharacters(response.data.results);
        setSpecies(response.data.results.map((character) => character.species));
        setIsLoading(false);
      } catch (error) {
        console.log("error character");
      }
    };
    getData();
  }, [searchValue, url]);

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
            species={species}
            setSpecies={setSpecies}
          />
        </div>
        <section className="characters">
          <ul className="characters__list">
            {characters.map((character) => (
              <CharacterItem key={character.id} {...character} />
            ))}
          </ul>
        </section>
        <button className="btn__load">
          <p>Load more</p>
        </button>
      </div>
    </section>
  );
}

export default Home;
