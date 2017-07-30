import { stringify } from 'query-string';

const prefix = 'https://cms.jess.gallery';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}


function processURL(url, parameters) {
  const urlWithPrefix = `${prefix}${url}`;
  const stringifiedParams = parameters ? `?${stringify(parameters)}` : '';
  return urlWithPrefix + stringifiedParams;
}

export function get(url, parameters) {
  const processedURL = processURL(url, parameters);
  return fetch(processedURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Some test request',
    },
  })
    .then(checkStatus)
    .then(parseJSON);
}

export function post(url, form) {
  const processedURL = processURL(url);
  return fetch(processedURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Some test request',
    },
    body: form,
  })
    .then(checkStatus)
    .then(parseJSON);
}

