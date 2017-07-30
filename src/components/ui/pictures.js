import React, { Component } from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../elements/loader';
import Pagination from './pagination';
import { actions, selectors } from '../../store';

const mapStateToProps = (state) => {
  const { data, isPending } = selectors.api.pictures(state);
  return {
    pictures: data,
    isPending,
  };
};

const mapDispatchToProps = {
  fetch: actions.api.pictures,
};

class PicturesContainer extends Component {
  static propTypes = {
    isPending: RPT.bool,
    pictures: RPT.object,
    fetch: RPT.func,
  }

  componentWillMount() {
    this.fetch(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.params.page !== this.props.params.page) {
      this.fetch(props);
    }
  }

  fetch(props) {
    const { params, fetch } = props;
    fetch(params);
  }

  render() {
    const { pictures, isPending } = this.props;

    if (isPending || !pictures) {
      return <Loader />;
    }

    return (
      <div>
        <Pagination {...pictures.meta} />
        {'coming soon...'}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PicturesContainer);
