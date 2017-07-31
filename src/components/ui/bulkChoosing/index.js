import React from 'react';
import RPT from 'prop-types';
import styles from './style.sass';

const BulkChoosingElement = ({ images, toggleImage }) => {
  const imagesMarkup = images.map(image => (
    <div
      className={`${styles.element} ${image.selected && styles.selected}`}
      key={image.fakeId}
      onClick={() => toggleImage(image.fakeId)}
    >
      <img className={styles.image} src={image.url} />
    </div>
  ));
  return (
    <div className={styles.container}>
      {imagesMarkup}
    </div>
  );
};

BulkChoosingElement.propTypes = {
  images: RPT.array,
  toggleImage: RPT.func,
};

export default BulkChoosingElement;
