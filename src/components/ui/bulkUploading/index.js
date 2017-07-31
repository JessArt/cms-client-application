import React from 'react';
import RPT from 'prop-types';
import PictureForm from '../../forms/picture';
import styles from './style.sass';

const BulkUploading = ({ images }) => {
  const imagesMarkup = images.map(image => (
    <div key={image.fakeId} className={styles.element}>
      <PictureForm small picture={image} />
    </div>
  ));

  return (
    <div className={styles.container}>
      {imagesMarkup}
    </div>
  );
};

BulkUploading.propTypes = {
  images: RPT.array,
};

export default BulkUploading;
