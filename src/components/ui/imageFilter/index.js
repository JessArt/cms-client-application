import React, { Component } from "react";
import RPT from "prop-types";

import { connect } from "react-redux";
import { actions, selectors } from "../../../store";
import { Link, withRouter } from "react-router-dom";

import ComplexSelect from "../../elements/complexSelect";

import { parse } from "query-string";
import { processURL } from "../../../utils/urls";
import { DEFAULT_IMAGE_TYPE } from "../../../utils/constants";

import styles from "./style.sass";

const constructLink = ({ pathname, type, tags }) =>
  processURL(pathname, {
    type,
    tags,
    page: 0
  });

const mapStateToProps = state => ({
  tags: selectors.api.tags(state)
});

const mapDispatchToProps = {
  fetchTags: actions.api.tags
};

class ImageFilter extends Component {
  static propTypes = {
    location: RPT.shape({
      pathname: RPT.string,
      search: RPT.string
    }),
    fetchTags: RPT.func,
    tags: RPT.object
  };

  componentDidMount() {
    this.props.fetchTags();
  }

  handleTags = tags => {
    const { location: { pathname, search }, history } = this.props;
    const currentParams = parse(search);
    const newLink = constructLink({
      pathname,
      type: currentParams.type,
      tags: tags.map(({ value }) => value)
    });

    history.push(newLink);
  };

  renderTags() {
    const { tags, location: { search } } = this.props;

    const currentParams = parse(search);

    if (tags.isPending || !tags.data) {
      return;
    }

    const tagOptions = (tags.data || []).map(tag => ({
      value: tag.id,
      label: tag.name.toLowerCase()
    }));

    let value = [];
    if (currentParams.tags) {
      value = Array.isArray(currentParams.tags)
        ? currentParams.tags
        : [currentParams.tags];
    }

    return (
      <div className={styles.tags}>
        <ComplexSelect
          onChange={this.handleTags}
          multiple
          name={"tags"}
          options={tagOptions}
          value={value}
        />
      </div>
    );
  }

  render() {
    const { location: { pathname, search }, data } = this.props;

    const currentParams = parse(search);
    const activeSection = currentParams.type || DEFAULT_IMAGE_TYPE;
    const artLink = constructLink({ pathname, type: "art" });
    const photoLink = constructLink({ pathname, type: "photo" });
    const otherLink = constructLink({ pathname, type: "other" });
    return (
      <div>
        <div className={styles.container}>
          <Link className={styles.elem} to={artLink}>
            {"Art"}
          </Link>
          <Link className={styles.elem} to={photoLink}>
            {"Photo"}
          </Link>
          <Link className={styles.elem} to={otherLink}>
            {"Other"}
          </Link>
        </div>
        {this.renderTags()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ImageFilter)
);
