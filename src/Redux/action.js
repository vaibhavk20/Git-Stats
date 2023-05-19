import * as types from "./actionTypes";

export const getData = (payload) => {
  return { type: types.GET_DATA, payload: payload };
};
