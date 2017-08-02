import React, { Component } from 'react';
import RPT from 'prop-types';
import Select from 'react-select';

class SelectElement extends Component {
  static propTypes = {
    options: RPT.array,
    value: RPT.array,
    name: RPT.string,
    multiple: RPT.bool,
  }

  state = {
    value: this.props.value,
  }

  onChange = (data) => {
    this.setState({
      value: data.map(({ value }) => value),
    });
  }

  render() {
    const { value } = this.state;
    const { name, multiple, options } = this.props;
    return (
      <Select
        value={value}
        name={name}
        multi={multiple}
        onChange={this.onChange}
        options={options}
      />
    );
  }
}

export default SelectElement;