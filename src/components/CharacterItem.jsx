import React from "react";

function CharacterItem({
  ...character
  // , image, name, species
}) {
  return (
    <li key={character.id} className="characters__item">
      <img
        className="characters__img"
        src={character.image}
        alt="Character img"
      />
      <div className="characters__info">
        <p className="characters__title">{character.name}</p>
        <p className="characters__subtitle">
          {character.species}
          {character.id}
        </p>
      </div>
    </li>
  );
}

export default CharacterItem;
