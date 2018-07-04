import React, { Component } from "react";
import RPT from "prop-types";

import { connect } from "react-redux";
import { actions, selectors } from "../../../store";

import styles from "./style.sass";

const mapStateToProps = state => ({
  pictures: selectors.bulk.editing.choosing.getAll(state)
});

class BulkEditingChoosing extends Component {
  static propTypes = {
    pictures: RPT.object
  };

  render() {
    const { pictures } = this.props;
    const picturesArray = Object.keys(pictures)
      .map(id => pictures[id])
      .filter(Boolean);

    const picturesMarkup = picturesArray.map(picture => (
      <div key={picture.id} className={styles.imageContainer}>
        <img className={styles.image} src={picture.small_url} />
      </div>
    ));
    return <div className={styles.container}>{picturesMarkup}</div>;
  }
}

export default connect(mapStateToProps)(BulkEditingChoosing);
