import React, { Component } from "react";
import RPT from "prop-types";
import { connect } from "react-redux";

import Loader from "../../elements/loader";
import TagForm from "../../forms/tag";
import TopTagsForm from "../../forms/topTags";
import ErrorContainer from "../errorContainer";

import { actions, selectors } from "../../../store";

import styles from "./style.sass";

const mapStateToProps = state => {
  const tags = selectors.api.tags(state);
  const topPhotoTags = selectors.api.topTags(state, { type: "photo" });
  const topArtTags = selectors.api.topTags(state, { type: "art" });
  return {
    tags: tags.data,
    topPhotoTags: topPhotoTags.data,
    topArtTags: topArtTags.data,
    isPending: tags.isPending || topPhotoTags.isPending || topArtTags.isPending,
    error: tags.error && topPhotoTags.error && topArtTags.error
  };
};

const mapDispatchToProps = {
  fetchTags: actions.api.tags,
  fetchTopTags: actions.api.topTags
};

class Tags extends Component {
  static propTypes = {
    tags: RPT.array,
    topPhotoTags: RPT.array,
    topArtTags: RPT.array,
    isPending: RPT.bool,
    params: RPT.object,
    error: RPT.object,

    fetchTags: RPT.func,
    fetchTopTags: RPT.func
  };

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const { fetchTags, fetchTopTags } = this.props;
    fetchTags({ expand: true }, { forceAsync: true });
    fetchTopTags({ type: "photo" });
    fetchTopTags({ type: "art" });
  }

  render() {
    const {
      tags,
      topPhotoTags,
      topArtTags,
      isPending,
      params,
      error
    } = this.props;

    if (error) {
      return <ErrorContainer refresh={() => this.fetch()} />;
    }

    if (isPending || !tags || !topPhotoTags || !topArtTags) {
      return <Loader />;
    }

    const tagsForSelect = tags.map(tag => ({ value: tag.id, label: tag.name }));
    const tagsMarkup = tags.map(tag => (
      <div key={tag.id} className={styles.formContainer}>
        <TagForm params={params} tag={tag} tags={tagsForSelect} />
      </div>
    ));

    const topArtTagsMarkup = (
      <div className={styles.tagContainer}>
        <h3 className={styles.tagTitle}>
          {"Top Art categories"}{" "}
          <a
            style={{ opacity: 0.7, fontSize: "80%" }}
            href={"https://jess.gallery/paint"}
            rel="noopener noreferrer"
            target="_blank"
          >
            {"link"}
          </a>
        </h3>
        <TopTagsForm tags={tagsForSelect} type={"art"} topTags={topArtTags} />
      </div>
    );

    const topPhotoTagsMarkup = (
      <div className={styles.tagContainer}>
        <h3 className={styles.tagTitle}>
          {"Top Photo categories"}{" "}
          <a
            style={{ opacity: 0.7, fontSize: "80%" }}
            href={"https://jess.gallery/photo"}
            rel="noopener noreferrer"
            target="_blank"
          >
            {"link"}
          </a>
        </h3>
        <TopTagsForm
          tags={tagsForSelect}
          type={"photo"}
          topTags={topPhotoTags}
        />
      </div>
    );

    return (
      <div>
        <div className={styles.topTags}>
          {topArtTagsMarkup}
          {topPhotoTagsMarkup}
        </div>
        <div className={styles.container}>{tagsMarkup}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags);
