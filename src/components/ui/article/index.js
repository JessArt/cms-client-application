import React from "react";
import RPT from "prop-types";
import { Link } from "react-router-dom";
import routes from "../../../routing/routes";
import styles from "./style.sass";

const Article = ({ article: { id, title, subtitle, published_on } }) => (
  <div className={styles.container}>
    <Link className={styles.link} to={routes.createArticleURL(id)}>
      {title}
    </Link>
    <div className={styles.description}>{subtitle}</div>
    {!published_on && (
      <div className={styles.unpublished}>{"Not published"}</div>
    )}
    {published_on && <div className={styles.published}>{"Published"}</div>}
  </div>
);

Article.propTypes = {
  article: RPT.shape({
    id: RPT.number,
    title: RPT.string,
    subtitle: RPT.string,
    published_on: RPT.string
  }).isRequired
};

export default Article;
