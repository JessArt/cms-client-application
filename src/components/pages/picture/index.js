import React, { Component } from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../elements/loader';
import PictureForm from '../../forms/picture';
import { actions, selectors } from '../../../store';

const mapStateToProps = (state, { match: { params: { id } } }) => {
  const { data, isPending, error } = selectors.api.picture(state, { id });
  return {
    data, isPending, error,
  };
};

const mapDispatchToProps = {
  fetch: actions.api.picture,
};

class PicturePage extends Component {
  static propTypes = {

  };

  componentDidMount() {
    const { match: { params: { id} }, fetch } = this.props;
    fetch({ id });
  }

  render() {
    const { isPending, data } = this.props;

    if (isPending || !data) {
      return <Loader />;
    }

    return (
      <div>
        <PictureForm picture={data} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PicturePage);
