import React, { PropTypes as RPT } from "react";
import countries from "../../../utils/countries";
import ComplexSelect from "../../elements/complexSelect";

import styles from "./style.sass";

const CountrySelect = ({ value }) => {
  const options = countries.map(({ name, code }) => ({
    value: code,
    label: name
  }));
  return (
    <div className={styles.countryContainer}>
      <div className={styles.label}>{"Country"}</div>
      <ComplexSelect name={""} options={options} value={value} />
    </div>
  );
};

CountrySelect.propTypes = {
  value: RPT.any
};

export default CountrySelect;
