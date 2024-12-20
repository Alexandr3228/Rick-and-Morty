import React from "react";
import axios from "axios";

import EpisodeItem from "../components/EpisodeItem";
import Search from "../components/Search";
// import FilterBar from "../components/HomeFilter";

function Episodes() {
  const url = `https://rickandmortyapi.com/api/episode`;

  const [episodesData, setEpisodesData] = React.useState([]);

  React.useEffect(() => {
    const getEpisodes = async () => {
      try {
        const response = await axios.get(url);
        setEpisodesData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getEpisodes();
  }, [url]);

  console.log(episodesData);

  return (
    <section className="episodes">
      <div className="container">
        <img
          className="episodes--img"
          src="./img/episodes.png"
          alt="Rick and Morty"
        />
        <div className="episodes--search">
          <Search />
        </div>
        <ul className="episodes--list">
          {episodesData.map((ep) => (
            <EpisodeItem key={ep.id} {...ep} />
          ))}
        </ul>
        <button className="btn__load">
          <p>Load more</p>
        </button>
      </div>
    </section>
  );
}

export default Episodes;
