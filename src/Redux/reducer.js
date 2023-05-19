import * as types from "./actionTypes";

const initialState = {
  data: [],
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  // console.log(type, payload);
  switch (type) {
    case types.GET_DATA:
      return {
        ...state,
        data: payload,
      };

    default:
      return state;
  }
};
