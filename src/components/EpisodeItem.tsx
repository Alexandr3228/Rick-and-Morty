import React from "react";
import { Link } from "react-router-dom";

import { EpisodeItemType } from "../pages/Episodes";

const EpisodeItem: React.FC<EpisodeItemType> = ({
  id,
  name,
  air_date,
  episode,
}) => {
  return (
    <li key={id} className="episode__item">
      <Link key={id} to={`/episode/${id}`}>
        <div className="episode__info">
          <h2 className="episode__info--title">{name}</h2>
          <p className="episode__info--date">{air_date}</p>
          <p className="episode__info--created">{episode}</p>
        </div>
      </Link>
    </li>
  );
};

export default EpisodeItem;
