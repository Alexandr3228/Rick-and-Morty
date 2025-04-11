import React from "react";
import styles from "./HomeBar.module.scss";

function HomeFilter({
  species = [],
  status = [],
  gender = [],
  onSpeciesChange,
  onGenderChange,
  onStatusChange,
}) {
  const [speciesPopupIsActive, setSpeciesPopupIsActive] = React.useState(false);
  const [genderPopupIsActive, setGenderPopupIsActive] = React.useState(false);
  const [statusPopupIsActive, setStatusPopupIsActive] = React.useState(false);
  const [selectedSpecies, setSelectedSpecies] = React.useState("Species");
  const [selectedGender, setSelectedGender] = React.useState("Gender");
  const [selectedStatus, setSelectedStatus] = React.useState("Status");

  const handleFilterClick = (type, value) => {
    const defaultLabels = {
      species: "Species",
      gender: "Gender",
      status: "Status",
    };

    switch (type) {
      case "species":
        setSelectedSpecies(value || defaultLabels.species);
        onSpeciesChange?.(value || "");
        setSpeciesPopupIsActive(false);
        break;
      case "gender":
        setSelectedGender(value || defaultLabels.gender);
        onGenderChange?.(value || "");
        setGenderPopupIsActive(false);
        break;
      case "status":
        setSelectedStatus(value || defaultLabels.status);
        onStatusChange?.(value || "");
        setStatusPopupIsActive(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sort__item}>
        <div className={styles.sort__label}>
          <h2>{selectedSpecies}</h2>
          <button
            onClick={() => setSpeciesPopupIsActive(!speciesPopupIsActive)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="5"
              viewBox="0 0 10 5"
              fill="none"
            >
              <path d="M0 0L5 5L10 0H0Z" fill="black" opacity="0.54" />
            </svg>
          </button>
        </div>
        {speciesPopupIsActive && (
          <div className={`${styles.sort__popup} ${styles.active}`}>
            <ul>
              <li
                onClick={() => handleFilterClick("species", null)}
                className={styles.sort__popup_item}
              >
                Reset
              </li>
              {species.map((item) => (
                <li
                  key={item}
                  onClick={() => handleFilterClick("species", item)}
                  className={styles.sort__popup_item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.sort__item}>
        <div className={styles.sort__label}>
          <h2>{selectedGender}</h2>
          <button onClick={() => setGenderPopupIsActive(!genderPopupIsActive)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="5"
              viewBox="0 0 10 5"
              fill="none"
            >
              <path d="M0 0L5 5L10 0H0Z" fill="black" opacity="0.54" />
            </svg>
          </button>
        </div>
        {genderPopupIsActive && (
          <div className={`${styles.sort__popup} ${styles.active}`}>
            <ul>
              <li
                onClick={() => handleFilterClick("gender", null)}
                className={styles.sort__popup_item}
              >
                Reset
              </li>
              {gender.map((item) => (
                <li
                  key={item}
                  onClick={() => handleFilterClick("gender", item)}
                  className={styles.sort__popup_item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.sort__item}>
        <div className={styles.sort__label}>
          <h2>{selectedStatus}</h2>
          <button onClick={() => setStatusPopupIsActive(!statusPopupIsActive)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="5"
              viewBox="0 0 10 5"
              fill="none"
            >
              <path d="M0 0L5 5L10 0H0Z" fill="black" opacity="0.54" />
            </svg>
          </button>
        </div>
        {statusPopupIsActive && (
          <div className={`${styles.sort__popup} ${styles.active}`}>
            <ul>
              <li
                onClick={() => handleFilterClick("status", null)}
                className={styles.sort__popup_item}
              >
                Reset
              </li>
              {status.map((item) => (
                <li
                  key={item}
                  onClick={() => handleFilterClick("status", item)}
                  className={styles.sort__popup_item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeFilter;
