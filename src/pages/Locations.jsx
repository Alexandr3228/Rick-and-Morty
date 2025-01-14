import React from "react";
import axios from "axios";

import LocationItem from "../components/LocationItem";
import Search from "../components/Search";
import { useParams } from "react-router-dom";
// import FilterBar from "../components/HomeFilter";

function Locations() {
  // const { id } = useParams();
  const url = `https://rickandmortyapi.com/api/location`;

  const [locations, setLocations] = React.useState([]);
  const [nextUrl, setNextUrl] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getLocations = async () => {
      if (!url) return; // Prevent 2nd request
      setIsLoading(true); // Loading flag
      try {
        const response = await axios.get(url);

        setLocations(response.data.results);
        setNextUrl(response.data.info.next);
      } catch (error) {
        console.error("Error to fetch locations", error);
      } finally {
        setIsLoading(false);
      }
    };

    setLocations([]);
    getLocations();
  }, [url]);

  const handleLoadMoreLocations = async () => {
    if (!nextUrl) return;

    try {
      setIsLoading(true);
      const response = await axios.get(nextUrl);
      setLocations((prevLocations) => [
        ...prevLocations,
        ...response.data.results,
      ]);
      setNextUrl(response.data.info.next);
    } catch (error) {
      console.error("Error to fetch more locations", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="locations">
      <div className="container">
        <img
          className="locations--img"
          src="./img/locations.png"
          alt="Rick and Morty"
        />
        <div className="locations--search">
          <Search placeholder="Filter by name..." />
        </div>
        <ul className="locations--list">
          {locations.map((location) => (
            <LocationItem key={location.id} {...location} />
          ))}
        </ul>
        <button onClick={handleLoadMoreLocations} className="btn__load">
          {nextUrl && !isLoading ? <p>Load more</p> : <p>Loading...</p>}
        </button>
      </div>
    </section>
  );
}

export default Locations;
