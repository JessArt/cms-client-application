import { createSyncTile } from "redux-tiles";

export const notifications = createSyncTile({
  type: ["ui", "notifications"],
  initialState: [],
  fns: {
    add: ({ params, dispatch, actions, selectors, getState, api }) => {
      const currentNotifications = selectors.ui.notifications(getState());
      setTimeout(() => {
        dispatch(actions.ui.notifications.close(params));
      }, params.timeout || 3000);
      return currentNotifications.concat(params);
    },
    close: ({ selectors, getState, params }) => {
      const currentNotifications = selectors.ui.notifications(getState());
      return currentNotifications.filter(({ id }) => id !== params.id);
    },
    closeAll: () => []
  }
});

export default [notifications];
