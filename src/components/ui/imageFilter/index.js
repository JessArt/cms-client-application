import React from 'react';
import RPT from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import { processURL } from '../../../utils/urls';
import { DEFAULT_IMAGE_TYPE } from '../../../utils/constants';

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
    <div>
      <Link to={artLink}>
        {'Choose art'}
      </Link>
      <Link to={photoLink}>
        {'Choose photo'}
      </Link>
      <Link to={otherLink}>
        {'Choose other links'}
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
