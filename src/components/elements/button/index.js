import React from "react";
import RPT from "prop-types";
import { Link } from "react-router-dom";
import styles from "./style.sass";

const ButtonElement = ({
  to,
  type,
  flavour,
  children,
  className = "",
  loading,
  style,
  ...props
}) => {
  let Element = "div";
  const buttonProps = {
    ...props
  };

  if (type === "button") {
    Element = "button";
  }

  if (type === "submit") {
    Element = "button";
    buttonProps.type = "submit";
  }

  if (to) {
    Element = Link;
    buttonProps.to = to;
  }

  if (loading) {
    buttonProps.disabled = true;
  }

  return (
    <Element
      style={style}
      className={`${styles.button} ${
        flavour ? styles[flavour] : ""
      } ${className || ""}`}
      {...buttonProps}
    >
      {loading ? "processing..." : children}
    </Element>
  );
};

ButtonElement.propTypes = {
  children: RPT.node,
  type: RPT.oneOf(["div", "button", "submit"]),
  props: RPT.any,
  loading: RPT.bool,
  to: RPT.string,
  className: RPT.string,
  flavour: RPT.oneOf(["danger"]),
  style: RPT.any
};

ButtonElement.defaultProps = {
  type: "div"
};

export default ButtonElement;
