import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../routing/routes';
import styles from './style.sass';

const Article = ({ article: { id, title, subtitle } }) => (
  <div className={styles.container}>
    <Link className={styles.link} to={routes.createArticleURL(id)}>
      {title}
    </Link>
    <div className={styles.description}>
      {subtitle}
    </div>
  </div>
);

export default Article;
