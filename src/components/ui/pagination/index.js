import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../../elements/button';
import styles from './style.sass';
import qs from 'query-string';

const PaginationElement = ({ history, location, offset, page_size: pageSize, total }) => {
  const numberOfPages = Math.ceil(total / pageSize);
  const currentPage = offset / pageSize;

  function changePage(page) {
    history.replace({
      pathname: location.pathname,
      query: {
        ...location.query,
        page,
      },
    });
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
    <div>
      {buttons}
    </div>
  );
};

export default withRouter(PaginationElement);
