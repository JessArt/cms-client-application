import React, { Component } from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import ImageFilter from '../../ui/imageFilter';
import Loader from '../../elements/loader';
import Pagination from '../pagination';
import Picture from '../picture';
import { actions, selectors } from '../../../store';
import styles from './style.sass';

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

    const picturesList = pictures
      .data
      .map(picture => (
        <div className={styles.picture}>
          <Picture key={picture.id} picture={picture} />
        </div>
      ));

    return (
      <div>
        <ImageFilter />
        <Pagination {...pictures.meta} />
        <div className={styles.pictures}>
          {picturesList}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PicturesContainer);
