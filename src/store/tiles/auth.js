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
  fn: async ({ dispatch, actions, params, history, routes }) => {
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

// This tile is responsible for token validation. What is important
// for us, is that in case of unauthorized user, `api.get` will
// redirect to the login page. Result is not important at all.
export const validateToken = createTile({
  type: ["auth", "validateToken"],
  fn: ({ getState, selectors, api }) => {
    const token = selectors.auth.status(getState());

    return api.get("/validate_token", { token });
  }
});

export default [authorizedTile, submitAuthForm, authorize, validateToken];
