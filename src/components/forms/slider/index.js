import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../../elements/form";
import ImageSelector from "../../elements/imageSelector";
import Button from "../../elements/button";

import { actions, selectors } from "../../../store";

import styles from "./style.sass";

const mapStateToProps = state => {
  const { isPending } = selectors.api.updateSliderImages(state);
  return {
    isPending
  };
};

const mapDispatchToProps = {
  updateSliderImages: actions.api.updateSliderImages
};

class SliderForm extends Component {
  state = {
    selectors: (this.props.data || []).map(url => ({ url }))
  };

  onSubmit = () => {
    const { selectors } = this.state;
    const { updateSliderImages } = this.props;

    const images = selectors.map(({ url }) => url);

    updateSliderImages({
      images
    });
  };

  addImage = () => {
    this.setState(({ selectors }) => ({
      selectors: selectors.concat({ url: "" })
    }));
  };

  render() {
    const { selectors } = this.state;

    const imageSelectors = selectors.map((selector, i) => {
      return (
        <div key={i} className={styles.imageContainer}>
          <ImageSelector
            onChange={newValue => {
              this.setState(state => {
                const newSelectors = state.selectors.map(selectorItem => {
                  if (selector === selectorItem) {
                    return Object.assign({}, selectorItem, { url: newValue });
                  }

                  return selectorItem;
                });

                return { selectors: newSelectors };
              });
            }}
            label={`Slider Image #${i + 1}`}
            name={"images"}
            value={selector.url}
          />
          {selectors.length > 1 && (
            <Button
              className={styles.removeButton}
              flavour={"danger"}
              onClick={() => {
                this.setState(({ selectors }) => ({
                  selectors: selectors.filter(
                    selectorItem => selectorItem !== selector
                  )
                }));
              }}
            >
              {"Remove this image"}
            </Button>
          )}
        </div>
      );
    });

    const validURLs = selectors
      .map(({ url }) => url)
      .filter(url => url || url.includes("//"));

    return (
      <Form name="slider_form" onSubmit={this.onSubmit}>
        {imageSelectors}
        <Button className={styles.addMore} onClick={this.addImage}>
          + Add one more image
        </Button>
        <Button loading={false} type={"submit"}>
          {"Update slider"}
        </Button>
        {Boolean(validURLs.length) && (
          <div>
            <h3>Images:</h3>
            {validURLs.map(url => (
              <img className={styles.image} key={url} src={url} />
            ))}
          </div>
        )}
      </Form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderForm);
