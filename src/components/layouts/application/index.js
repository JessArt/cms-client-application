import React from "react";
import RPT from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { selectors } from "../../../store";
import Menu from "../../ui/menu";
import Notifications from "../../ui/notifications";
import styles from "./style.sass";

const mapStateToProps = state => ({
  isAuthorized: selectors.auth.status(state)
});

const ApplicationLayout = ({ isAuthorized, children }) => (
  <div className={styles.container}>
    <Notifications />
    {isAuthorized && (
      <div>
        <div className={`${styles.menu} ${styles.invisible}`}>
          <Menu />
        </div>
        <div className={styles.menu}>
          <Menu />
        </div>
      </div>
    )}
    <div className={styles.content}>{children}</div>
  </div>
);

ApplicationLayout.propTypes = {
  children: RPT.node,
  isAuthorized: RPT.bool
};

export default withRouter(connect(mapStateToProps)(ApplicationLayout));
