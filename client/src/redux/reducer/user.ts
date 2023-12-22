import { UserAction } from "../../types/types";
import * as actionTypes from "../constant/actionTypes";
const initState = JSON.parse(localStorage.getItem("user") || "{}");

const user = (state = initState, action: UserAction) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default user;
