import React from "react";
import axios from "axios";

import styles from "./HomeBar.module.scss";
// import { fetchSpecies } from "../../utils/fetchAllSpecies";

// function HomeFilter({
//   searchValue,
//   speciesFilter,
//   genderFilter,
//   statusFilter,
// }) {
//   // return (
//   <div className={styles.root}>
//     <div className={styles.filterBarItem}>
//       <div className={styles.filterBarLabel}>
//         <span className={styles.filterBarSelector}>Species</span>
//         <button
//           onClick={() => setPopupIsActive(!popupIsActive)}
//           className={styles.filterBarSelectorButton}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="10"
//             height="5"
//             viewBox="0 0 10 5"
//             fill="none"
//           >
//             <path d="M0 0L5 5L10 0H0Z" fill="black" opacity="0.54" />
//           </svg>
//         </button>
//       </div>
//       <ul
//         style={{ display: popupIsActive ? "block" : "none" }}
//         className={styles.filterBarPopup}
//       >
//         {/* {species.map((spec) => ( */}
//         <li
//           // key={spec.id}
//           className={styles.filterBarPopupItem}
//           // onClick={() => setSpecies(spec)}
//         >
//           {/* {spec} */}
//         </li>
//         {/* ))} */}
//       </ul>
//     </div>
//     <div className={styles.filterBarItem}>
//       <div className={styles.filterBarLabel}>
//         <span className={styles.filterBarSelector}>Gender</span>
//         <button className={styles.filterBarSelectorButton}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="10"
//             height="5"
//             viewBox="0 0 10 5"
//             fill="none"
//           >
//             <path d="M0 0L5 5L10 0H0Z" fill="black" opacity="0.54" />
//           </svg>
//         </button>
//       </div>
//       <div className={styles.filterBarPopup}>
//         <div className={styles.filterBarPopupItem}>Male</div>
//         <div className={styles.filterBarPopupItem}>Female</div>
//         <div className={styles.filterBarPopupItem}>Genderless</div>
//         <div className={styles.filterBarPopupItem}>Unknown</div>
//       </div>
//     </div>
//     <div className={styles.filterBarItem}>
//       <div className={styles.filterBarLabel}>
//         <span className={styles.filterBarSelector}>Status</span>
//         <button className={styles.filterBarSelectorButton}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="10"
//             height="5"
//             viewBox="0 0 10 5"
//             fill="none"
//           >
//             <path d="M0 0L5 5L10 0H0Z" fill="black" opacity="0.54" />
//           </svg>
//         </button>
//       </div>
//       <div className={styles.filterBarPopup}>
//         <div className={styles.filterBarPopupItem}>Alive</div>
//         <div className={styles.filterBarPopupItem}>Dead</div>
//         <div className={styles.filterBarPopupItem}>Unknown</div>
//       </div>
//     </div>
//   </div>
// );

function HomeFilter({
  species,
  status,
  gender,
  setSpeciesFilter,
  setGenderFilter,
  setStatusFilter,
}) {
  const [speciesPopupIsActive, setSpeciesPopupIsActive] = React.useState(false);
  const [genderPopupIsActive, setGenderPopupIsActive] = React.useState(false);
  const [statusPopupIsActive, setStatusPopupIsActive] = React.useState(false);

  // console.log(popupIsActive);

  // const onSelectSort = (value) => {
  //   setSpecies(value);
  //   setPopupIsActive(false);
  // };

  return (
    <div className={styles.sort}>
      <div
        className={styles.sort__item}
        onChange={(e) => setSpeciesFilter(e.target.value)}
      >
        <div className={styles.sort__label}>
          <h2>Species</h2>
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
          <div
            className={`${styles.sort__popup} ${
              speciesPopupIsActive ? styles.active : ""
            }`}
          >
            <ul>
              {species.map((species) => (
                <li key={species} value={species}>
                  {species}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div
        className={styles.sort__item}
        onChange={(e) => setGenderFilter(e.target.value)}
      >
        <div className={styles.sort__label}>
          <h2>Gender</h2>
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
          <div
            className={`${styles.sort__popup} ${
              genderPopupIsActive ? styles.active : ""
            }`}
          >
            <ul>
              {status.map((gender) => (
                <li key={gender} value={gender}>
                  {gender}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div
        className={styles.sort__item}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <div className={styles.sort__label}>
          <h2>Status</h2>
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
          <div
            className={`${styles.sort__popup} ${
              statusPopupIsActive ? styles.active : ""
            }`}
          >
            <ul>
              {status.map((status) => (
                <li key={status} value={status}>
                  {status}
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
