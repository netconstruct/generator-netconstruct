export const API_KEY = Symbol('API Key');

/** Cached responses. */
const cache = {};

/** Create new action from base action and given data. */
function actionWith(action, data) {
  const finalAction = Object.assign({}, action, data);
  delete finalAction[API_KEY];
  return finalAction;
}

/** Check response and handle error codes. */
function handleJsonResponse(res) {
  if (!res.ok) {
    return Promise.reject(res);
  }
  return res.json();
}

/** Fetch with default configuration. */
function fetchWithDefaults(url, config) {
  const headers = new Headers();
  headers.append('Accept', 'application/json');

  const locals = {
    ...config,
    headers,
    credentials: 'same-origin',
    mode: 'same-origin',
  };

  return fetch(url, locals);
}

/** Check cached responses. */
function checkCache(url, config, useCache) {
  if (!useCache) {
    return Promise.reject(url, config);
  }

  if (!cache[url]) {
    return Promise.reject(url, config);
  }

  return Promise.resolve(cache[url]);
}

/** Store response in cache. */
function updateCache(url, data) {
  cache[url] = data;
  return Promise.resolve(data);
}

// eslint-disable-next-line no-unused-vars
const middleware = store => next => (action) => {
  const apiPayload = action[API_KEY];

  if (typeof apiPayload === 'undefined') {
    return next(action);
  }

  // Get API configuration.
  const {
    cache: useCache = true,
    config,
    types,
    url,
  } = apiPayload;

  // Get action types.
  const [requestType, successType, errorType] = types;

  // Dispatch request action.
  next(actionWith(action, { type: requestType }));

  // Call API and dispatch success or error actions.
  return checkCache(url, config, useCache)
    .then(
      data => data,
      () => fetchWithDefaults(url, config)
        .then(res => handleJsonResponse(res))
        .then(data => updateCache(url, data)),
    )
    .then(
      data => next(actionWith(action, {
        payload: data,
        type: successType,
      })),
      error => next(actionWith(action, {
        error: new Error(`Status ${error.status}: ${error.statusText}`),
        type: errorType,
      })),
    );
};

export default middleware;
