import React from "react";
import RPT from "prop-types";
import styles from "./style.sass";

import Button from "../../elements/button";

export default class ErrorContainer extends React.Component {
  static propTypes = {
    refresh: RPT.func
  };

  render() {
    const { refresh } = this.props;
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          {"Sorry, something went wrong. Please, try again."}
        </h1>
        {refresh && (
          <Button className={styles.button} onClick={refresh}>
            {"Try to load again"}
          </Button>
        )}
      </div>
    );
  }
}
