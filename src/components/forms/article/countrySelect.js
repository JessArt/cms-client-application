import React, { PropTypes as RPT } from 'react';
import countries from '../../../utils/countries';
import ComplexSelect from '../../elements/complexSelect';

const CountrySelect = ({ value }) => {
  const options = countries.map(({ name, code }) => ({
    value: code,
    label: name,
  }));
  return (
    <ComplexSelect name={''} options={options} value={value} />
  );
};

CountrySelect.propTypes = {
  value: RPT.any,
};

export default CountrySelect;
