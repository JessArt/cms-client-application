import React, { Component } from 'react';
import RPT from 'prop-types';

class FormElement extends Component {
  static propTypes = {
    children: RPT.node,
    onSubmit: RPT.func,
    className: RPT.string,
  };

  onSubmit = (e) => {
    const { onSubmit } = this.props;
    e.preventDefault();
    const form = this._form;
    onSubmit(new FormData(form));
  }

  render() {
    const { children, className } = this.props;
    
    return (
      <form className={className} ref={node => this._form = node} onSubmit={this.onSubmit}>
        {children}
      </form>
    );
  }
}
export default FormElement;
