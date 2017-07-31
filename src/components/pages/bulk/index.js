import React, { Component } from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../elements/button';
import BulkChoosing from '../../ui/bulkChoosing';
import BulkUploading from '../../ui/bulkUploading';
import FixedControls from '../../ui/fixedControls';
import { selectors } from '../../../store';

const mapStateToProps = state => ({
  images: selectors.bulk.choosing(state).data,
});

class BulkPage extends Component {
  state = {
    state: 'choosing',
    images: (this.props.images || []).map(image => {
      const fakeId = Math.random();

      return {
        selected: true,
        fakeId,
        ...image,
      };
    }),
  }

  toggleImage = (id) => {
    this.setState({
      images: this.state.images.map((image) => {
        if (id === image.fakeId) {
          return { ...image, selected: !image.selected };
        }

        return image;
      }),
    });
  }

  filterImages = () => {
    this.setState({
      images: this.state.images.filter(image => image.selected === true),
      state: 'uploading',
    });
  }

  renderChoosing() {
    const { images } = this.state;
    return (
      <div>
        <BulkChoosing images={images} toggleImage={this.toggleImage} />
        <FixedControls>
          <Button onClick={this.filterImages}>
            {'Go to upload'}
          </Button>
        </FixedControls>
      </div>
    );
  }

  renderUploading() {
    const { images } = this.state;
    return (
      <div>
        <BulkUploading images={images} />
        <FixedControls>
          <Button onClick={this.filterImages}>
            {'Upload pictures'}
          </Button>
        </FixedControls>
      </div>
    );
  }

  render() {
    const { state } = this.state;

    if (state === 'choosing') {
      return this.renderChoosing();
    }

    if (state === 'uploading') {
      return this.renderUploading();
    }

    return null;
  }
}

export default connect(mapStateToProps)(BulkPage);
