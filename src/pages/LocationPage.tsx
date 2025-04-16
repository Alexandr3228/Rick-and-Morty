import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import CharacterItem from "../components/CharacterItem";

import { LocationItemType } from "../pages/Locations";
import { CharacterItemType } from "../redux/slices/characterSlice";

const LocationPage: React.FC = () => {
  const [location, setLocation] = React.useState<LocationItemType | null>(null);
  const [characterData, setCharacterData] = React.useState<
    CharacterItemType[] | null
  >(null);
  const [characterUrls, setCharacterUrls] = React.useState<string[]>([]);
  const { id } = useParams();
  const locationUrl = `https://rickandmortyapi.com/api/location/` + id;

  React.useEffect(() => {
    //Fetch Location
    const getLocation = async () => {
      try {
        const response = await axios.get(locationUrl);
        setLocation(response.data);
        setCharacterUrls(response.data.residents);
      } catch (error) {
        console.log(error);
      }
    };
    getLocation();
  }, [locationUrl]);

  React.useEffect(() => {
    if (characterUrls.length > 0) {
      const getCharacterData = async () => {
        try {
          const character = await Promise.all(
            characterUrls.map((url) => axios.get(url))
          );
          setCharacterData(character.map((res) => res.data));
        } catch (error) {
          console.log(error);
        }
      };
      getCharacterData();
    }
  }, [characterUrls]);

  return (
    <section className="locationPage">
      <div className="container">
        <Link to={"/locations"} className="btn__back-link">
          <button className="locationPage--btn btn__back">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
                fill="black"
              />
            </svg>
            <p>Go back</p>
          </button>
        </Link>
        <div className="locationPage--info">
          <h2>{location?.name}</h2>
          <div className="locationPage--subInfo">
            <div className="locationPage--subInfo--item">
              <p>Type</p>
              <span>{location?.type}</span>
            </div>
            <div className="locationPage--subInfo--item">
              <p>Dimension</p>
              <span>{location?.dimension}</span>
            </div>
          </div>
        </div>
        <div className="locationPage--residents">
          <h3>Residents</h3>
          <ul className="locationPage--residents--list">
            {characterData ? (
              characterData.map((character) => (
                <CharacterItem key={character.id} {...character} />
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LocationPage;
