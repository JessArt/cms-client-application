import React, { Component } from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import ImageFilter from '../ui/imageFilter';
import Loader from '../elements/loader';
import Pagination from './pagination';
import { actions, selectors } from '../../store';

const mapStateToProps = (state, { params }) => {
  const { data, isPending } = selectors.api.pictures(state, params);
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
    const isDifferentPage = props.params.page !== this.props.params.page;
    const isDifferentType = props.params.type !== this.props.params.type;
   if (isDifferentPage || isDifferentType) {
      this.fetch(props);
    }
  }

  fetch(props) {
    const { params, fetch } = props || this.props;
    fetch(params);
  }

  render() {
    const { pictures, isPending } = this.props;

    if (isPending || !pictures) {
      return <Loader />;
    }

    return (
      <div>
        <ImageFilter />
        <Pagination {...pictures.meta} />
        {'coming soon...'}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PicturesContainer);
