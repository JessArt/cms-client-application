import React, { Component } from "react";
import RPT from "prop-types";
import { connect } from "react-redux";
import ArticleForm from "../forms/article";
import ContainerLayout from "../layouts/container";
import Loader from "../elements/loader";
import { actions, selectors } from "../../store";

const mapStateToProps = (
  state,
  {
    match: {
      params: { id }
    }
  }
) => {
  const { data, isPending } = selectors.api.article(state, { id });
  return {
    article: data,
    isPending
  };
};

const mapDispatchToProps = {
  fetch: actions.api.article
};

class ArticlePage extends Component {
  static propTypes = {
    fetch: RPT.func,
    match: RPT.shape({
      params: RPT.shape({
        id: RPT.string
      })
    }),
    isPending: RPT.bool,
    article: RPT.object
  };

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const {
      fetch,
      match: {
        params: { id }
      }
    } = this.props;
    if (id !== "new") {
      fetch({ id });
    }
  }

  render() {
    const {
      isPending,
      article,
      match: {
        params: { id }
      }
    } = this.props;

    if (id !== "new" && (isPending || !article)) {
      return <Loader />;
    }

    return (
      <ContainerLayout>
        <ArticleForm refresh={() => this.fetch()} article={article} />
      </ContainerLayout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePage);
