import React from 'react';
import RPT from 'prop-types';
import { parse } from 'query-string';
import { withRouter } from 'react-router-dom';
import Button from '../../elements/button';
import styles from './style.sass';
import { processURL } from '../../../utils/urls';

const PaginationElement = ({ history, location, offset, page_size: pageSize, total }) => {
  const numberOfPages = Math.ceil(total / pageSize);
  const currentPage = offset / pageSize;
  const currentQueryParams = parse(location.search);

  function changePage(page) {
    const newURL = processURL(location.pathname, {
      ...currentQueryParams,
      page,
    });
    history.replace(newURL);
  }

  const buttons = [];
  for (let i = 0; i < numberOfPages; i++) {
    const className = `${styles.button} ${currentPage === i ? styles.active : ''}`;
    buttons.push(
      <Button onClick={changePage.bind(null, i)} className={className} key={i}>
        {i + 1}
      </Button>,
    );
  }

  return (
    <div className={styles.container}>
      {buttons}
    </div>
  );
};

PaginationElement.propTypes = {
  history: RPT.shape({
    replace: RPT.func,
  }),
  location: RPT.shape({
    pathname: RPT.string,
    search: RPT.string,
  }),
  offset: RPT.number,
  page_size: RPT.number,
  total: RPT.number,
};

export default withRouter(PaginationElement);
