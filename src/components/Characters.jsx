import React from "react";
import axios from "axios";

function Characters() {
  const CharacterList = () => {
    const [characters, setCharacters] = React.useState([]);
  };
  const [characters, setCharacters] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const url = "https://rickandmortyapi.com/api/character";

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setCharacters(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <section className="characters">
      <ul className="characters__list">
        {characters.map((character) => (
          <li key={character.id} className="characters__item">
            <img
              className="characters__img"
              src={character.image}
              alt="Character img"
            />
            <div className="characters__info">
              <p className="characters__title">{character.name}</p>
              <p className="characters__subtitle">{character.species}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Characters;
