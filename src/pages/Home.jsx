import React from "react";

import Search from "../components/Search";
import FilterBar from "../components/FilterBar";
import Characters from "../components/Characters";

function Home() {
  return (
    <section className="main">
      <div className="container">
        <img
          className="main__img"
          src="./img/rickandmorty.png"
          alt="Rick and Morty"
        />
        <div className="filter__bar">
          <Search />
          <FilterBar />
        </div>
        <Characters />
        <button className="btn__load">
          <p>Load more</p>
        </button>
      </div>
    </section>
  );
}

export default Home;
