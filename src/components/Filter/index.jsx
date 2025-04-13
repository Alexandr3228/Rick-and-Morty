import React from "react";

import FilterItem from "../FilterItem";
import styles from "./Filter.module.scss";

function Filter({ filters = [] }) {
  const [selected, setSelected] = React.useState({});

  const handleChange = (key, val) => {
    setSelected((prev) => ({ ...prev, [key]: val }));
    filters.find((f) => f.key === key)?.onChange?.(val);
  };

  return (
    <div className={styles.sort}>
      {filters.map(({ key, label, options }) => (
        <FilterItem
          key={key}
          label={label}
          value={selected[key] || label}
          options={options}
          onChange={(val) => handleChange(key, val)}
        />
      ))}
    </div>
  );
}

export default Filter;
