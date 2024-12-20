import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CharacterPage() {
  const [character, setCharacter] = React.useState([]);
  const [characterData, setCharacterData] = React.useState([]);
  const [episodeData, setEpisodeData] = React.useState([]);
  const [episodeUrls, setEpisodeUrls] = React.useState([]);

  const { id } = useParams();
  const characterUrl = `https://rickandmortyapi.com/api/character/` + id;

  React.useEffect(() => {
    //Fetch character
    const getCharacter = async () => {
      try {
        const response = await axios.get(characterUrl);
        setCharacter(response.data);
        setEpisodeUrls(response.data.episode);
      } catch (error) {
        console.log(error);
      }
    };
    getCharacter();
  }, [characterUrl]);

  React.useEffect(() => {
    if (episodeUrls.length > 0) {
      const getEpisodeData = async () => {
        try {
          const episodes = await Promise.all(
            episodeUrls.map((url) => axios.get(url))
          );
          setEpisodeData(episodes.map((res) => res.data));
        } catch (error) {
          console.log(error);
        }
      };
      getEpisodeData();
    }
  }, [episodeUrls]);

  const characterInformationData = {
    Gender: character.gender,
    Status: character.status,
    Specie: character.specie,
    Origin: character.origin?.name,
    Type: character.type,
    Location: character.location?.name,
  };

  if (!characterData) {
    <div className="">...Loading</div>;
  }

  return (
    <section className="characterPage">
      <div className="container">
        <Link to={"/"} className="btn__back-link">
          <button className="characterPage--btn btn__back">
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
        <div className="characterPage--content-top">
          <img
            className="characterPage--img"
            src={character.image}
            alt={character.name}
          />
          <h2>{character.name}</h2>
        </div>
        <div className="characterPage--info">
          <div className="characterPage--info--block">
            <h3 className="characterPage--info--title">Informations</h3>
            <ul className="characterPage--info--list">
              {Object.entries(characterInformationData).map(([key, value]) => (
                <li key={key} className="characterPage--info--item">
                  <h4>{key}</h4>
                  <p>{value || "Unknown"}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="characterPage--info--block">
            <h3 className="characterPage--info--title">Episodes</h3>
            <ul className="characterPage--info--list">
              {episodeData.map((episode) => (
                <li key={episode.id} className="characterPage--info--item">
                  <h4>{episode.episode}</h4>
                  <p>{episode.name}</p>
                  <span>{episode.air_date}</span>
                  <p>{episode.id}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CharacterPage;