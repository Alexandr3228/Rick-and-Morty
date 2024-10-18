import React from "react";

import styles from "./FilterBar.module.scss";

function FilterBar({ species, setSpecies, setPopupIsActive, popupIsActive }) {
  return (
    <div className={styles.root}>
      <div className={styles.filterBarItem}>
        <div className={styles.filterBarLabel}>
          <span className={styles.filterBarSelector}>Species</span>
          <button
            onClick={() => setPopupIsActive(!popupIsActive)}
            className={styles.filterBarSelectorButton}
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
        <ul
          style={{ display: popupIsActive ? "block" : "none" }}
          className={styles.filterBarPopup}
        >
          {/* {species.map((specie) => ( */}
          <li
            // key={specie}
            className={styles.filterBarPopupItem}
            // onClick={() => setSpecies(specie)}
          >
            {/* {specie} */}
          </li>
          {/* ))} */}
          {/* <li className={styles.filterBarPopupItem}>Human</li>
          <li className={styles.filterBarPopupItem}>Alien</li>
          <li className={styles.filterBarPopupItem}>Humanoid</li>
          <li className={styles.filterBarPopupItem}>Poopybutthole</li>
          <li className={styles.filterBarPopupItem}>Mythological</li>
          <li className={styles.filterBarPopupItem}>Unknown</li> */}
        </ul>
      </div>
      <div className={styles.filterBarItem}>
        <div className={styles.filterBarLabel}>
          <span className={styles.filterBarSelector}>Gender</span>
          <button className={styles.filterBarSelectorButton}>
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
        <div className={styles.filterBarPopup}>
          <div className={styles.filterBarPopupItem}>Male</div>
          <div className={styles.filterBarPopupItem}>Female</div>
          <div className={styles.filterBarPopupItem}>Genderless</div>
          <div className={styles.filterBarPopupItem}>Unknown</div>
        </div>
      </div>
      <div className={styles.filterBarItem}>
        <div className={styles.filterBarLabel}>
          <span className={styles.filterBarSelector}>Status</span>
          <button className={styles.filterBarSelectorButton}>
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
        <div className={styles.filterBarPopup}>
          <div className={styles.filterBarPopupItem}>Alive</div>
          <div className={styles.filterBarPopupItem}>Dead</div>
          <div className={styles.filterBarPopupItem}>Unknown</div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
