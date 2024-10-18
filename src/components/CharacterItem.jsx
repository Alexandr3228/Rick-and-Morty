import React from "react";

function CharacterItem({ id, image, name, species }) {
  return (
    <li key={id} className="characters__item">
      <img className="characters__img" src={image} alt="Character img" />
      <div className="characters__info">
        <p className="characters__title">{name}</p>
        <p className="characters__subtitle">{species}</p>
      </div>
    </li>
  );
}

export default CharacterItem;
