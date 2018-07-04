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

  renderArticles() {
    const { data } = this.props;

    if (data.length === 0) {
      return (
        <div>{"There are no articles – probably something happened."}</div>
      );
    }

    return data.map(article => <Article key={article.id} article={article} />);
  }

  render() {
    const { isPending, data, error, fetch } = this.props;

    if (error) {
      return <ErrorContainer refresh={fetch} />;
    }

    if (isPending || !data) {
      return <Loader />;
    }

    return <ContainerLayout>{this.renderArticles()}</ContainerLayout>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesContainer);
