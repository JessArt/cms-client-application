import React from "react";
import RPT from "prop-types";
import { Link } from "react-router-dom";
import routes from "../../../routing/routes";
import styles from "./style.sass";

const PictureElement = ({ picture, link }) => {
  const Element = link ? Link : "span";
  return (
    <Element to={routes.createPictureURL(picture.id)}>
      <img className={styles.image} src={picture.small_url} />
      <div>{picture.title}</div>
    </Element>
  );
};

PictureElement.propTypes = {
  picture: RPT.object,
  link: RPT.bool
};

export default PictureElement;
