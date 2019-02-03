import React from "react";
import { Link } from "react-router-dom";
import ContainerLayout from "../../layouts/container";
import routes from "../../../routing/routes";
import styles from "./style.sass";

const MenuUIElement = () => (
  <div className={styles.container}>
    <ContainerLayout>
      <Link className={styles.elem} to={routes.slider}>
        {"Slider"}
      </Link>
      <Link className={styles.elem} to={`${routes.pictures}?type=photo`}>
        {"Pictures"}
      </Link>
      <Link className={styles.elem} to={routes.articles}>
        {"Articles"}
      </Link>
      <Link className={styles.elem} to={routes.tags}>
        {"Tags"}
      </Link>
    </ContainerLayout>
  </div>
);

export default MenuUIElement;
