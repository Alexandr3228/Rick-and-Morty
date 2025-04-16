import React from "react";
import axios from "axios";

import EpisodeItem from "../components/EpisodeItem.tsx";
import Search from "../components/Search/index.tsx";

export type EpisodeItemType = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
};

const Episodes: React.FC = () => {
  const [episodes, setEpisodes] = React.useState<EpisodeItemType[]>([]);
  const [nextUrl, setNextUrl] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const searchParams = new URLSearchParams();
      if (
        /^s\d{2}e\d{2}$/i.test(searchValue) ||
        /^s\d{2}$/i.test(searchValue) ||
        /^e\d{2}$/i.test(searchValue)
      ) {
        searchParams.append("episode", searchValue);
      } else {
        searchParams.append("name", searchValue);
      }
      const searchQuery = searchParams.toString();
      setUrl(`https://rickandmortyapi.com/api/episode?${searchQuery}`);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [url, searchValue]);

  React.useEffect(() => {
    const getEpisodes = async () => {
      if (!url) return;
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setEpisodes(response.data.results);
        setNextUrl(response.data.info.next);
      } catch (error) {
        console.error("Error to fetch episodes", error);
      } finally {
        setIsLoading(false);
      }
    };
    getEpisodes();
    setEpisodes([]);
  }, [url]);

  const handleLoadMoreEpisodes = async () => {
    if (!nextUrl) return;

    try {
      setIsLoading(true);
      const response = await axios.get(nextUrl);
      setEpisodes((prevEpisodes) => [
        ...prevEpisodes,
        ...response.data.results,
      ]);
      setNextUrl(response.data.info.next);
    } catch {
      console.error("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="episodes">
      <div className="container">
        <img
          className="episodes--img"
          src="./img/episodes.png"
          alt="Rick and Morty"
        />
        <div className="episodes--search">
          <Search
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder="Filter by name or episode (ex. S01 or S01E02)"
          />
        </div>
        {episodes.length > 0 && (
          <ul className="episodes--list">
            {episodes.map((ep) => (
              <EpisodeItem key={ep.id} {...ep} />
            ))}
          </ul>
        )}
        <button onClick={handleLoadMoreEpisodes} className="btn__load">
          {nextUrl && !isLoading ? <p>Load more</p> : <p>Loading...</p>}
        </button>
      </div>
    </section>
  );
};

export default Episodes;
