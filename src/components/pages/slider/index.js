import React from "react";
import { connect } from "react-redux";
import { actions, selectors } from "../../../store";
import ContainerLayout from "../../layouts/container";
import SliderForm from "../../forms/slider";
import Button from "../../elements/button";

const mapStateToProps = state => {
  return selectors.api.sliderImages(state);
};

const mapDispatchToProps = {
  fetchSliderImages: actions.api.sliderImages
};
class SliderImages extends React.Component {
  componentDidMount() {
    this.fetch();
  }
  fetch = () => {
    this.props.fetchSliderImages();
  };
  renderContent() {
    const { fetched, data, error, isPending } = this.props;

    if (error) {
      return (
        <div>
          <h1>Error!</h1>
          Sorry, something went wrong.
          <Button onClick={this.fetch}>Try again</Button>
        </div>
      );
    }

    if (isPending) {
      return <h1>Loading...</h1>;
    }

    if (fetched) {
      return <SliderForm data={data} />;
    }

    return null;
  }
  render() {
    return <ContainerLayout>{this.renderContent()}</ContainerLayout>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderImages);
