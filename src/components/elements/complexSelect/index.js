import React, { Component } from "react";
import RPT from "prop-types";
import { Creatable } from "react-select";

class SelectElement extends Component {
  static propTypes = {
    options: RPT.array,
    value: RPT.array,
    name: RPT.string,
    multiple: RPT.bool,
    onChange: RPT.func
  };

  state = {
    value: this.props.value
  };

  onChange = data => {
    const { multiple, onChange } = this.props;
    this.setState({
      value: multiple ? data.map(({ value }) => value) : data
    });

    onChange && onChange(data);
  };

  render() {
    const { value } = this.state;
    const { name, multiple, options } = this.props;
    return (
      <Creatable
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
