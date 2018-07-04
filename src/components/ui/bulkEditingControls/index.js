import React, { Component } from "react";
import RPT from "prop-types";

import { connect } from "react-redux";
import { actions, selectors } from "../../../store";

import routes from "../../../routing/routes";

import { Link } from "react-router-dom";
import Button from "../../elements/button";

import styles from "./style.sass";

const mapStateToProps = state => ({
  state: selectors.bulk.editing.state(state)
});

const mapDispatchToProps = {
  choose: actions.bulk.editing.state.choose,
  cancel: actions.bulk.editing.state.cancel
};

class BulkEditingControls extends Component {
  static propTypes = {
    state: RPT.string,
    choose: RPT.func,
    cancel: RPT.func
  };

  render() {
    const { state, choose, cancel } = this.props;

    const content =
      state === "choose" ? (
        <div>
          <Button onClick={cancel}>{"Cancel"}</Button>
          <Link className={styles.link} to={routes.bulkEditing}>
            {"Edit"}
          </Link>
        </div>
      ) : (
        <Button onClick={choose}>{"Bulk"}</Button>
      );

    return <div className={styles.container}>{content}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  BulkEditingControls
);
