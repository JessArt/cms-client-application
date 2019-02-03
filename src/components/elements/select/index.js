import React from "react";
import RPT from "prop-types";

const SelectElement = ({ value, children, name }) => (
  <select name={name} defaultValue={value}>
    {children}
  </select>
);

SelectElement.propTypes = {
  children: RPT.node,
  name: RPT.string,
  value: RPT.string
};

export default SelectElement;
