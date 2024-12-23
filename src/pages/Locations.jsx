import React from "react";
import axios from "axios";

import LocationItem from "../components/LocationItem";
import Search from "../components/Search";
import { useParams } from "react-router-dom";
// import FilterBar from "../components/HomeFilter";

function Locations() {
  const { id } = useParams();
  const url = `https://rickandmortyapi.com/api/location`;

  const [locationsData, setLocationsData] = React.useState([]);

  React.useEffect(() => {
    const getEpisodes = async () => {
      try {
        const response = await axios.get(url);
        setLocationsData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getEpisodes();
  }, [url]);

  // console.log(locationsData);

  return (
    <section className="locations">
      <div className="container">
        <img
          className="locations--img"
          src="./img/locations.png"
          alt="Rick and Morty"
        />
        <div className="locations--search">
          <Search />
        </div>
        <ul className="locations--list">
          {locationsData.map((location) => (
            <LocationItem key={location.id} {...location} />
          ))}
        </ul>
        <button className="btn__load">
          <p>Load more</p>
        </button>
      </div>
    </section>
  );
}

export default Locations;
