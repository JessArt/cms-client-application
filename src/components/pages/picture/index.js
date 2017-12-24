import React, { Component } from "react";
import RPT from "prop-types";
import { connect } from "react-redux";
import Loader from "../../elements/loader";
import PictureForm from "../../forms/picture";
import ContainerLayout from "../../layouts/container";
import { actions, selectors } from "../../../store";

const mapStateToProps = (state, { match: { params: { id } } }) => {
  const { data, isPending: isPicturePending, error } = selectors.api.picture(
    state,
    { id }
  );
  const { isPending: isTagsPending } = selectors.api.tags(state);
  const { isPending: isImageTagsPending } = selectors.api.imageTags(state, {
    id
  });
  return {
    data,
    isPending: isPicturePending || isTagsPending || isImageTagsPending,
    error
  };
};

const mapDispatchToProps = {
  fetchPicture: actions.api.picture,
  fetchTags: actions.api.tags,
  fetchPictureTags: actions.api.imageTags
};

class PicturePage extends Component {
  static propTypes = {};

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const {
      match: { params: { id } },
      fetchPicture,
      fetchTags,
      fetchPictureTags
    } = this.props;
    fetchPicture({ id }, { forceAsync: true });
    fetchTags(undefined, { forceAsync: true });
    fetchPictureTags({ id }, { forceAsync: true });
  };

  render() {
    const { isPending, data } = this.props;

    if (isPending || !data) {
      return <Loader />;
    }

    return (
      <ContainerLayout>
        <PictureForm picture={data} callback={this.fetch} />
      </ContainerLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PicturePage);
