import React from "react";
import RPT from "prop-types";
import styles from "./style.sass";

const InputElement = ({ label, hint, tag: Element = "input", ...props }) => (
  <label className={styles.container}>
    {label && <div className={styles.label}>{label}</div>}
    <div>
      <Element className={styles.input} {...props} />
    </div>
    {hint && <div className={styles.hint}>{hint}</div>}
  </label>
);

InputElement.propTypes = {
  label: RPT.node,
  hint: RPT.node,
  tag: RPT.oneOf(["input", "textarea"])
};

export default InputElement;
