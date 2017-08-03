import React from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import { actions, selectors } from '../../../store';
import styles from './style.sass';

const mapStateToProps = state => ({
  notifications: selectors.ui.notifications(state),
});

const mapDispatchToProps = {
  closeNotification: actions.ui.notifications.close,
  closeAll: actions.ui.notifications.closeAll,
};

const NotificationsElement = ({ notifications, closeNotification, closeAll }) => {
  const closeFactory = id => () => closeNotification({ id });
  const notificationsMarkup = notifications.map(({ id, message, type }) => {
    console.log(type, styles[type])
    return (
    <div key={id} className={`${styles.elem} ${styles[type]}`}>
      <div className={styles.close} onClick={closeFactory(id)}>
        {'x'}
      </div>
      {message}
    </div>
  );
  });
  const closeAllMarkup = notifications.length > 3 ? (
    <div className={styles.closeAll} onClick={closeAll}>
      {'Close all notifications'}
    </div>
  ) : null;

  return (
    <div className={styles.container}>
      {notificationsMarkup}
      {closeAllMarkup}
    </div>
  );
};

NotificationsElement.propTypes = {
  notifications: RPT.array,
  closeNotification: RPT.func,
  closeAll: RPT.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsElement);
