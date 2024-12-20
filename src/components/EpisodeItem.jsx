import React from "react";
import { Link } from "react-router-dom";

function EpisodeItem({ id, episode, air_date, created }) {
  return (
    <li key={id} className="episode__item">
      <Link key={id} to={`/episode/${id}`}>
        <div className="episode__info">
          <h2 className="episode__info--title">{episode}</h2>
          <p className="episode__info--date">{air_date}</p>
          <p className="episode__info--created">{created}</p>
        </div>
      </Link>
    </li>
  );
}

export default EpisodeItem;
