import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import CharacterItem from "../components/CharacterItem";

function EpisodePage() {
  const [episode, setEpisode] = React.useState([]);
  const [characterData, setCharacterData] = React.useState([]);
  const [characterUrls, setCharacterUrls] = React.useState([]);
  const { id } = useParams();
  const episodeUrl = `https://rickandmortyapi.com/api/episode/` + id;

  React.useEffect(() => {
    //Fetch character
    const getCharacter = async () => {
      try {
        const response = await axios.get(episodeUrl);
        setEpisode(response.data);
        // const test = response.data.characters;
        setCharacterUrls(response.data.characters);
        console.log(test, "test");
      } catch (error) {
        console.log(error);
      }
    };
    getCharacter();
  }, [episodeUrl]);

  React.useEffect(() => {
    if (characterUrls.length > 0) {
      const getCharacterData = async () => {
        try {
          const character = await Promise.all(
            characterUrls.map((url) => axios.get(url))
          );
          setCharacterData(character.map((res) => res.data));
        } catch (error) {
          console.log(error);
        }
      };
      getCharacterData();
    }
  }, [characterUrls]);

  // console.log(characterData, "char");

  return (
    <section className="episodePage">
      <div className="container">
        <Link to={"/episodes"} className="btn__back-link">
          <button className="episodePage--btn btn__back">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
                fill="black"
              />
            </svg>
            <p>Go back</p>
          </button>
        </Link>
        <div className="episodePage--info">
          <h2>{episode.name}</h2>
          <div className="episodePage--subInfo">
            <div className="episodePage--subInfo--item">
              <p>Episode</p>
              <span>{episode.episode}</span>
            </div>
            <div className="episodePage--subInfo--item">
              <p>Date</p>
              <span>{episode.air_date}</span>
            </div>
          </div>
        </div>
        <div className="episodePage--cast">
          <h3 className="episodePage--cast--title">Cast</h3>
          <ul className="episodePage--cast--list">
            {characterData.map((character) => (
              <CharacterItem key={character.id} {...character} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default EpisodePage;
