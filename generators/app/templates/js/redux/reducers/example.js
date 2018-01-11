import { example, routes } from 'actions';

const INITIAL_STATE = {
  exampleParam: 0,
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    /** Routes */
    case routes.example.HOME: {
      return {
        ...state,
        exampleParam: action.payload.exampleParam,
      };
    }

    /** Actions */
    case example.ALL.FETCH_SUCCESS: {
      return {
        ...state,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
