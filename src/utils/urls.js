import { stringify } from 'query-string';

export function processURL(url, parameters) {
  const stringifiedParams = parameters ? `?${stringify(parameters)}` : '';
  return url + stringifiedParams;
}