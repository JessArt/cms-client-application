import React from 'react';
import RPT from 'prop-types';

const OptionElement = ({ children, id, selected }) => (
  <option value={id} defaultValue={selected}>
    {children}
  </option>
);

OptionElement.propTypes = {
  id: RPT.string,
  children: RPT.node,
  selected: RPT.bool,
};

export default OptionElement;
