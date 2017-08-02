import React from 'react';
import RPT from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import { processURL } from '../../../utils/urls';
import { DEFAULT_IMAGE_TYPE } from '../../../utils/constants';
import styles from './style.sass';

const constructLink = ({ pathname, type }) => processURL(pathname, {
  type,
  page: 0,
});

const ImageFilter = ({ location: { pathname, search } }) => {
  const currentParams = parse(search);
  const activeSection = currentParams.type || DEFAULT_IMAGE_TYPE;
  const artLink = constructLink({ pathname, type: 'art' });
  const photoLink = constructLink({ pathname, type: 'photo' });
  const otherLink = constructLink({ pathname, type: 'other' });
  return (
    <div className={styles.container}>
      <Link className={styles.elem} to={artLink}>
        {'Art'}
      </Link>
      <Link className={styles.elem} to={photoLink}>
        {'Photo'}
      </Link>
      <Link className={styles.elem} to={otherLink}>
        {'Other'}
      </Link>
    </div>
  );
};

ImageFilter.propTypes = {
  location: RPT.shape({
    pathname: RPT.string,
    search: RPT.string,
  }),
};

export default withRouter(ImageFilter);
