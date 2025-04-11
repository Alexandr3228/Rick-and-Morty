import React from "react";

import FilterItem from "../FilterItem";
import styles from "./Filter.module.scss";

function Filter({
  species = [],
  status = [],
  gender = [],
  onSpeciesChange,
  onGenderChange,
  onStatusChange,
}) {
  const [selectedSpecies, setSelectedSpecies] = React.useState("Species");
  const [selectedGender, setSelectedGender] = React.useState("Gender");
  const [selectedStatus, setSelectedStatus] = React.useState("Status");

  return (
    <div className={styles.sort}>
      <FilterItem
        label="Species"
        value={selectedSpecies}
        options={species}
        onChange={(val) => {
          setSelectedSpecies(val);
          onSpeciesChange?.(val);
        }}
      />
      <FilterItem
        label="Gender"
        value={selectedGender}
        options={gender}
        onChange={(val) => {
          setSelectedGender(val);
          onGenderChange?.(val);
        }}
      />
      <FilterItem
        label="Status"
        value={selectedStatus}
        options={status}
        onChange={(val) => {
          setSelectedStatus(val);
          onStatusChange?.(val);
        }}
      />
    </div>
  );
}

export default Filter;
