import React from 'react';
import RPT from 'prop-types';

const SelectElement = ({ children, name }) => (
  <select name={name}>
    {children}
  </select>
);

SelectElement.propTypes = {
  children: RPT.node,
  name: RPT.string,
};

export default SelectElement;
