import React, { Component } from "react";
import Tags from "../../ui/tags";
import { parse } from "query-string";

export default class TagsPage extends Component {
  render() {
    const {
      location: { search }
    } = this.props;
    return (
      <div>
        <Tags params={parse(search)} />
      </div>
    );
  }
}
