import React, { Component } from "react";
import RPT from "prop-types";
import { connect } from "react-redux";
import Article from "./article";
import ContainerLayout from "../layouts/container";
import Loader from "../elements/loader";
import ErrorContainer from "./errorContainer";
import { actions, selectors } from "../../store";

const mapStateToProps = state => {
  const { isPending, data, error } = selectors.api.articles(state);
  return {
    isPending,
    data,
    error
  };
};

const mapDispatchToProps = {
  fetch: actions.api.articles
};

class ArticlesContainer extends Component {
  static propTypes = {
    fetch: RPT.func,
    isPending: RPT.bool,
    data: RPT.array,
    error: RPT.object
  };

  componentWillMount() {
    this.props.fetch();
  }

  render() {
    const { isPending, data, error, fetch } = this.props;

    if (error) {
      return <ErrorContainer refresh={fetch} />;
    }

    if (isPending || !data) {
      return <Loader />;
    }

    const articles = (data || []).map(article => (
      <Article key={article.id} article={article} />
    ));

    return <ContainerLayout>{articles}</ContainerLayout>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesContainer);
