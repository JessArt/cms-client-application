import { stringify } from "query-string";
import { store, actions } from "../index";

const prefix = "https://node-api.jess.gallery";

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    store.dispatch(actions.auth.status(false));
    localStorage.removeItem("token");
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function processURL(url, parameters) {
  const urlWithPrefix = `${prefix}${url}`;
  const stringifiedParams = parameters ? `?${stringify(parameters)}` : "";
  return urlWithPrefix + stringifiedParams;
}

export function get(url, parameters) {
  const processedURL = processURL(url, parameters);
  return fetch(processedURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Some test request"
    }
  })
    .then(checkStatus)
    .then(parseJSON);
}

export function post(url, form) {
  const processedURL = processURL(url);
  return fetch(processedURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Some test request"
    },
    body: form
  })
    .then(checkStatus)
    .then(parseJSON);
}

export function put(url, form) {
  const processedURL = processURL(url);
  return fetch(processedURL, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: "Some test request"
    },
    body: form
  })
    .then(checkStatus)
    .then(parseJSON);
}
