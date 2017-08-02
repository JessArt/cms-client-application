import React, { Component } from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../elements/button';
import BulkChoosing from '../../ui/bulkChoosing';
import BulkUploading from '../../ui/bulkUploading';
import FixedControls from '../../ui/fixedControls';
import Loader from '../../elements/loader';
import { actions, selectors } from '../../../store';

const mapStateToProps = state => ({
  isTagsPending: selectors.api.tags(state).isPending,
  images: selectors.bulk.choosing(state).data,
});

const mapDispatchToProps = {
  fetchTags: actions.api.tags,
};

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

  componentDidMount() {
    this.props.fetchTags();
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

  uploadImages = () => {
    const forms = document.querySelectorAll('form[name="pictureForm"]');
    console.log('aaa')

    if (forms) {
      const numberOfForms = forms.length;

      for (let i = 0; i < numberOfForms; i++) {
        const form = forms[i];
        form.dispatchEvent(new Event('submit'));
      }
    }
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
          <Button onClick={this.uploadImages}>
            {'Upload pictures'}
          </Button>
        </FixedControls>
      </div>
    );
  }

  render() {
    const { isTagsPending } = this.props;
    const { state } = this.state;

    if (isTagsPending) {
      return <Loader />;
    }

    if (state === 'choosing') {
      return this.renderChoosing();
    }

    if (state === 'uploading') {
      return this.renderUploading();
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkPage);
