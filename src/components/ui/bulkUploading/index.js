import React, { Component } from "react";
import RPT from "prop-types";

import { connect } from "react-redux";
import { selectors, actions } from "../../../store";

import PictureForm from "../../forms/picture";

import styles from "./style.sass";

const mapStateToProps = state => ({
  bulkParams: selectors.bulk.params.getAll(state)
});

const mapDispatchToProps = {
  resetDefaults: actions.bulk.params.reset
};

class BulkUploading extends Component {
  static propTypes = {
    images: RPT.array,
    bulkParams: RPT.object,
    resetDefaults: RPT.func
  };

  componentWillUnmount() {
    // this.props.resetDefaults();
  }

  render() {
    const { images, bulkParams } = this.props;
    const imagesMarkup = images.map(image => (
      <div key={image.fakeId} className={styles.element}>
        <PictureForm defaults={bulkParams} small picture={image} />
      </div>
    ));

    return <div className={styles.container}>{imagesMarkup}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkUploading);
