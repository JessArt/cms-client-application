import { createTile, createSyncTile } from "redux-tiles";

export const authorizedTile = createSyncTile({
  type: ["auth", "status"],
  initialState: false
});

export const submitAuthForm = createTile({
  type: ["auth", "submitForm"],
  fn: ({ api, params }) => api.post("/login", params)
});

export const authorize = createTile({
  type: ["auth", "authorize"],
  fn: async ({
    dispatch,
    actions,
    params,
    selectors,
    getState,
    history,
    routes
  }) => {
    const { data, error } = await dispatch(
      actions.auth.submitForm(params.form)
    );
    if (error) {
      throw new Error(error);
    }
    localStorage.setItem("token", data.token);
    dispatch(actions.auth.status(data.token));
    history.push(params.from || routes.home);
    return data;
  }
});

export default [authorizedTile, submitAuthForm, authorize];
