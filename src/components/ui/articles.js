import React, { Component } from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import Article from './article';
import ContainerLayout from '../layouts/container';
import Loader from '../elements/loader';
import { actions, selectors } from '../../store';

const mapStateToProps = (state) => {
  const { isPending, data } = selectors.api.articles(state);
  return {
    isPending,
    data,
  };
};

const mapDispatchToProps = {
  fetch: actions.api.articles,
};

class ArticlesContainer extends Component {
  static propTypes = {
    fetch: RPT.func,
    isPending: RPT.bool,
    data: RPT.array,
  }

  componentWillMount() {
    this.props.fetch();
  }

  render() {
    const { isPending, data } = this.props;

    if (isPending || !data) {
      return <Loader />;
    }

    const articles = (data || []).map(article => <Article key={article.id} article={article} />);


    return (
      <ContainerLayout>
        {articles}
      </ContainerLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer);
