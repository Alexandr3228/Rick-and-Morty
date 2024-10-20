import React from "react";
import axios from "axios";

import Search from "../components/Search";
import FilterBar from "../components/FilterBar";

function Locations() {
  const url = `https://rickandmortyapi.com/api/location`;

  const [locationData, setLocationData] = React.useState([]);

  React.useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.get(url);
        const data = response;

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getLocations();
  }, [locationData]);

  console.log(locationData);
  return (
    <section className="main">
      <div className="container">
        <img
          className="main__img"
          src="./img/locations.png"
          alt="Rick and Morty"
        />
        <div className="filter__bar">
          <Search />
          <FilterBar />
        </div>

        {/* <button className="btn__load">
          <p>Load more</p>
        </button> */}
      </div>
    </section>
  );
}

export default Locations;
