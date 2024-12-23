import React from "react";
import { Link } from "react-router-dom";

function LocationItem({ id, name, type }) {
  return (
    <li key={id} className="location__item">
      <Link key={id} to={`/location/${id}`}>
        <div className="location__item--info">
          <h2>{name}</h2>
          <p>{type}</p>
        </div>
      </Link>
    </li>
  );
}

export default LocationItem;
