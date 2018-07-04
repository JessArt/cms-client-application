import React, { Component } from "react";
import RPT from "prop-types";

class FormElement extends Component {
  static propTypes = {
    children: RPT.node,
    onSubmit: RPT.func,
    className: RPT.string,
    name: RPT.string,
    refFn: RPT.func
  };

  onSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    const form = this._form;
    onSubmit(new FormData(form));
  };

  render() {
    const { children, className, name, refFn } = this.props;

    return (
      <form
        name={name}
        className={className}
        ref={node => {
          refFn && refFn(node);
          this._form = node;
        }}
        onSubmit={this.onSubmit}
      >
        {children}
      </form>
    );
  }
}
export default FormElement;
