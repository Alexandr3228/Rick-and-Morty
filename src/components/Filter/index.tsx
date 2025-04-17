import React from "react";

import FilterItem from "../FilterItem/index.tsx";
import styles from "./Filter.module.scss";

export interface FilterOption {
  key: string;
  label: string;
  value?: string;
  options: string[]; // или другой тип, если options может быть не строкой
  onChange: (val: string) => void; // или (val: any), если тип val более гибкий
}

// Тип для пропсов компонента Filter
export interface FilterProps {
  filters: FilterOption[]; // filters это массив объектов FilterOption
}

const Filter: React.FC<FilterProps> = ({ filters = [] }) => {
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
};

export default Filter;
