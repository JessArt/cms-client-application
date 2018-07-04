import { createStore, applyMiddleware } from "redux";
import { createEntities, createMiddleware } from "redux-tiles";
import tiles from "./tiles";
import history from "../routing/history";
import routes from "../routing/routes";
import * as api from "./utils/api";

export const { actions, reducer, selectors } = createEntities(tiles);

const { middleware } = createMiddleware({
  actions,
  selectors,
  api,
  history,
  routes
});

const middlewares = [middleware];

if (__LOCAL__) {
  const logger = require("redux-logger").default;
  middlewares.push(logger);
}

export const store = createStore(reducer, applyMiddleware(...middlewares));

const token = localStorage.getItem("token");

if (token) {
  store.dispatch(actions.auth.status(token));
}
