import React from "react";
import styles from "./FilterItem.module.scss";

import { FilterOption } from "../Filter/index.tsx";

const FilterItem: React.FC<FilterOption> = ({
  label,
  value = "",
  options,
  onChange,
}) => {
  const [popupIsActive, setPopupIsActive] = React.useState(false);

  const handleSelect = (selected) => {
    onChange?.(selected || "");
    setPopupIsActive(false);
  };

  const handleTogglePopup = () => setPopupIsActive((prev) => !prev);

  const handleClear = (e) => {
    e.stopPropagation();
    handleSelect(null);
    setPopupIsActive(false);
  };

  const handlePopupClick = (e) => {
    e.stopPropagation(); // предотвращает закрытие попапа, если клик на выпадающий список
  };

  return (
    <div className={styles.sort__item} onClick={handleTogglePopup}>
      <div className={styles.sort__label}>
        <h2>{value || label}</h2>
        {value && value !== label && (
          <button onClick={handleClear}>
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
      {popupIsActive && (
        <div
          className={`${styles.sort__popup} ${styles.active}`}
          onClick={handlePopupClick}
        >
          <ul>
            {options.map((option) => (
              <li
                key={option}
                value={option}
                onClick={() => handleSelect(option)}
                className={styles.sort__popup_item}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterItem;
