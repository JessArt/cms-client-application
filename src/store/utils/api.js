import { stringify } from "query-string";
import { store, actions } from "../index";

const prefix = __LOCAL__
  ? "http://localhost:4003"
  : "https://node-api.jess.gallery";

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
      Accept: "application/json"
    }
  })
    .then(checkStatus)
    .then(parseJSON);
}

export function post(url, form) {
  const processedURL = processURL(url);
  const isForm = form instanceof FormData;
  return fetch(processedURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": isForm ? "" : "application/json"
    },
    body: isForm ? form : JSON.stringify(form)
  })
    .then(checkStatus)
    .then(parseJSON);
}

export function put(url, form) {
  const processedURL = processURL(url);
  return fetch(processedURL, {
    method: "PUT",
    headers: {
      Accept: "application/json"
    },
    body: form
  })
    .then(checkStatus)
    .then(parseJSON);
}

// we use `deleteRequest` instead of `delete`
// because it is a reserved word in javascript
export function deleteRequest(url) {
  const processedURL = processURL(url);

  return fetch(processedURL, {
    method: "DELETE",
    headers: {
      Accept: "application/json"
    }
  })
    .then(checkStatus)
    .then(parseJSON);
}
