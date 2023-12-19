import { UserAction } from "../../types/types";
import * as actionTypes from "../constant/actionTypes";
const initState = {};

const users = (state = initState, action: UserAction) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default users;
