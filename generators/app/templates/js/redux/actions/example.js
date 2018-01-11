import { API_KEY } from 'middleware/api';

export const ALL = {
  FETCH: 'example.all.fetch',
  FETCH_SUCCESS: 'example.all.fetch.success',
  FETCH_ERROR: 'example.all.fetch.error',
};

/** Fetch all example. */
export const fetchExample = (payload) => {
  const {
    exampleParam,
  } = payload;

  return {
    [API_KEY]: {
      // eslint-disable-next-line max-len
      url: `/api/example/${exampleParam}`,
      config: {
        method: 'GET',
      },
      types: [ALL.FETCH, ALL.FETCH_SUCCESS, ALL.FETCH_ERROR],
    },
  };
};
