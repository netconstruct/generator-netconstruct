export const DEFAULT = 'example.default';
export const HOME = 'example.home';

/** Navigate to home route. */
export function toHome(filters = {}) {
  return (dispatch, getState) => {
    const { example } = getState().app;

    const payload = {
      exampleParam: example.exampleParam,
      ...filters,
    };

    return dispatch({ type: HOME, payload });
  };
}
