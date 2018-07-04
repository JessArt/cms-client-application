import React, { Component } from "react";
import RPT from "prop-types";
import { connect } from "react-redux";
import ImageFilter from "../../ui/imageFilter";
import Loader from "../../elements/loader";
import Pagination from "../pagination";
import Picture from "../picture";
import Button from "../../elements/button";
import ErrorContainer from "../errorContainer";
import { stringify } from "query-string";
import routes from "../../../routing/routes";
import { actions, selectors } from "../../../store";
import styles from "./style.sass";

const mapStateToProps = (state, { params }) => {
  const { data, isPending, error } = selectors.api.pictures(state, params);
  return {
    choosing: selectors.bulk.editing.state(state) === "choose",
    chosenPictures: selectors.bulk.editing.choosing.getAll(state),
    pictures: data,
    isPending,
    error
  };
};

const mapDispatchToProps = {
  fetch: actions.api.pictures,
  toggle: actions.bulk.editing.choosing.toggle
};

class PicturesContainer extends Component {
  static propTypes = {
    isPending: RPT.bool,
    pictures: RPT.object,
    fetch: RPT.func,
    toggle: RPT.func,
    choosing: RPT.bool,
    chosenPictures: RPT.object,
    PictureComponent: RPT.any,
    error: RPT.object,
    params: RPT.object.isRequired
  };

  static defaultProps = {
    PictureComponent: Picture
  };

  componentWillMount() {
    this.fetch(this.props);
  }

  componentWillReceiveProps(props) {
    const isDifferentPage = props.params.page !== this.props.params.page;
    const isDifferentType = props.params.type !== this.props.params.type;
    const oldTags = this.props.params.tags || "";
    const newTags = props.params.tags || "";
    const differentParams = newTags.toString() !== oldTags.toString();
    if (isDifferentPage || isDifferentType || differentParams) {
      this.fetch(props);
    }
  }

  fetch(props) {
    const { params, fetch } = props || this.props;
    fetch(params);
  }

  renderZeroPictures() {
    const { params } = this.props;

    if (params && params.type) {
      const stringifiedQuery = stringify({
        ...params,
        type: params.type === "art" ? "photo" : "art"
      });
      const link = `${routes.pictures}?${stringifiedQuery}`;
      return (
        <div>
          <p>{"There are no pictures by given parameters :("}</p>
          <Button to={link}>
            {"Search in "}
            {params.type === "art" ? "photos" : "art"}
          </Button>
        </div>
      );
    }

    return "There are no pictures by given parameters :(";
  }

  render() {
    const {
      pictures,
      isPending,
      choosing,
      chosenPictures,
      toggle,
      PictureComponent,
      error
    } = this.props;

    if (error) {
      return <ErrorContainer refresh={() => this.fetch()} />;
    }

    if (isPending || !pictures) {
      return <Loader />;
    }

    const picturesList = pictures.data.length
      ? pictures.data.map(picture => {
          const moreProps = {};

          if (choosing) {
            moreProps.style = {
              opacity: chosenPictures[picture.id] ? 1 : 0.5
            };

            moreProps.onClick = () => toggle(picture);
          }

          return (
            <div key={picture.id} className={styles.picture} {...moreProps}>
              <PictureComponent link={!choosing} picture={picture} />
            </div>
          );
        })
      : this.renderZeroPictures();

    const paginationMarkup = <Pagination {...pictures.meta} />;

    return (
      <div>
        <ImageFilter />
        {paginationMarkup}
        <div className={styles.pictures}>{picturesList}</div>
        {paginationMarkup}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PicturesContainer);
