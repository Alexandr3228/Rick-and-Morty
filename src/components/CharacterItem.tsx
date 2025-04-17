import React from "react";
import { Link } from "react-router-dom";

import { CharacterItemType } from "../redux/slices/characterSlice";

const CharacterItem: React.FC<CharacterItemType> = ({
  id,
  image,
  name,
  species,
}) => {
  return (
    <li key={id} className="characters__item">
      <Link key={id} to={`/character/${id}`}>
        <img className="characters__img" src={image} alt="Character img" />
      </Link>
      <div className="characters__info">
        <p className="characters__title">{name}</p>
        <p className="characters__subtitle">{species}</p>
      </div>
    </li>
  );
};

export default CharacterItem;
