import React, { Component } from "react";
import RPT from "prop-types";

import { connect } from "react-redux";
import { actions, selectors } from "../../../store";

import FixedControls from "../../ui/fixedControls";
import Button from "../../elements/button";
import BulkEditingParamsForm from "../../forms/bulkEditingParams";
import BulkEditingChoosing from "../../ui/bulkEditingChoosing";
import BulkEditingUpdating from "../../ui/bulkEditingUpdating";

const mapStateToProps = state => ({
  chosenPictures: selectors.bulk.editing.choosing.getAll(state),
  isUpdating: selectors.bulk.update(state).isPending
});

const mapDispatchToProps = {
  updateImages: actions.bulk.update,
  fetchImageTags: actions.api.imageTags,
  resetState: actions.bulk.editing.state.reset,
  resetImages: actions.bulk.editing.choosing.reset,
  resetDefaults: actions.bulk.editing.params.reset
};

class BulkEditingPage extends Component {
  static propTypes = {
    isUpdating: RPT.bool,
    updateImages: RPT.func,
    fetchImageTags: RPT.func
  };

  state = {
    state: "choosing"
  };

  componentDidMount() {
    const { chosenPictures, fetchImageTags } = this.props;
    Object.keys(chosenPictures)
      .map(id => chosenPictures[id])
      .filter(Boolean)
      .forEach(picture => {
        fetchImageTags(picture);
      });
  }

  componentWillUnmount() {
    this.props.resetDefaults();
    this.props.resetState();
    this.props.resetImages();
  }

  choosePictures = () => {
    this.setState({ state: "updating" });
  };

  updateImages = () => {
    const forms = document.querySelectorAll('form[name="pictureForm"]');

    if (forms) {
      const numberOfForms = forms.length;
      const imagesWithForm = [];

      for (let i = 0; i < numberOfForms; i++) {
        const form = forms[i];
        const formData = new FormData(form);
        const id = formData.get("id");
        imagesWithForm.push({
          id,
          form: formData
        });
      }

      this.props.updateImages(imagesWithForm);
    }
  };

  renderUpdating() {
    return (
      <div>
        <BulkEditingUpdating />
        <FixedControls>
          <Button loading={this.props.isUpdating} onClick={this.updateImages}>
            {"Update pictures"}
          </Button>
        </FixedControls>
      </div>
    );
  }

  renderChoosing() {
    return (
      <div>
        <BulkEditingParamsForm />
        <BulkEditingChoosing />
        <FixedControls>
          <Button onClick={this.choosePictures}>{"Go to updating"}</Button>
        </FixedControls>
      </div>
    );
  }

  render() {
    const { state } = this.state;

    if (state === "choosing") {
      return this.renderChoosing();
    }

    if (state === "updating") {
      return this.renderUpdating();
    }

    return <div>{"Bulk editing"}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkEditingPage);
