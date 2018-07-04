import React, { Component } from "react";

import { connect } from "react-redux";
import { actions, selectors } from "../../../store";

import PictureForm from "../../forms/picture";

import styles from "./style.sass";

const mapStateToProps = state => ({
  pictures: selectors.bulk.editing.choosing.getAll(state),
  defaults: selectors.bulk.editing.params.getAll(state)
});

class BulkEditingUpdate extends Component {
  render() {
    const { pictures, defaults } = this.props;

    const picturesArray = Object.keys(pictures)
      .map(id => pictures[id])
      .filter(Boolean);

    const formsMarkup = picturesArray.map(picture => (
      <div key={picture.id} className={styles.pictureContainer}>
        <PictureForm defaults={defaults} small picture={picture} />
      </div>
    ));

    return <div className={styles.container}>{formsMarkup}</div>;
  }
}

export default connect(mapStateToProps)(BulkEditingUpdate);
