import { redirect } from 'redux-first-router';
import { example, routes } from 'actions';

export default {
  [routes.example.DEFAULT]: {
    path: '/',
    thunk: (dispatch) => {
      const { toHome } = routes.example;
      dispatch(redirect(toHome()));
    },
  },
  [routes.example.HOME]: {
    path: '/:exampleParam',
    thunk: (dispatch, getState) => {
      const {
        fetchExample,
      } = example;

      const { location } = getState();

      const {
        exampleParam,
      } = location.payload;

      // Fetch all example then apply the filter.
      return Promise.all([
        dispatch(fetchExample({
          exampleParam,
        })),
      ]);
    },
  },
};
