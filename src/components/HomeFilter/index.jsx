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
      <div
        className={styles.sort__item}
        onClick={() => setSpeciesPopupIsActive(!speciesPopupIsActive)}
      >
        <div className={styles.sort__label}>
          <h2>{selectedSpecies}</h2>
          {selectedSpecies === "Species" ? (
            <></>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFilterClick("species", null);
              }}
            >
              <svg
                className={styles.sort__svg}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 24 24"
              >
                <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
              </svg>
            </button>
          )}
        </div>
        {speciesPopupIsActive && (
          <div className={`${styles.sort__popup} ${styles.active}`}>
            <ul>
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
      <div
        className={styles.sort__item}
        onClick={() => setGenderPopupIsActive(!genderPopupIsActive)}
      >
        <div className={styles.sort__label}>
          <h2>{selectedGender}</h2>
          {selectedGender === "Gender" ? (
            <></>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFilterClick("gender", null);
              }}
            >
              <svg
                className={styles.sort__svg}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 24 24"
              >
                <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
              </svg>
            </button>
          )}
        </div>
        {genderPopupIsActive && (
          <div className={`${styles.sort__popup} ${styles.active}`}>
            <ul>
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
      <div
        className={styles.sort__item}
        onClick={() => setStatusPopupIsActive(!statusPopupIsActive)}
      >
        <div className={styles.sort__label}>
          <h2>{selectedStatus}</h2>
          {selectedStatus === "Status" ? (
            <></>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFilterClick("status", null);
              }}
            >
              <svg
                className={styles.sort__svg}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 24 24"
              >
                <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
              </svg>
            </button>
          )}
        </div>
        {statusPopupIsActive && (
          <div className={`${styles.sort__popup} ${styles.active}`}>
            <ul>
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
