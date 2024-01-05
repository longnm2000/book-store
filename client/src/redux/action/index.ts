import { Category, User } from "../../types/types";
import * as actionTypes from "../constant/actionTypes";

export const act_setUser = (value: User) => {
  return {
    type: actionTypes.SET_USER,
    payload: value,
  };
};
export const act_setAdmin = (value: User) => {
  return {
    type: actionTypes.SET_ADMIN,
    payload: value,
  };
};

export const act_setCategories = (value: Category[]) => {
  return {
    type: actionTypes.SET_CATEGORIES,
    payload: value,
  };
};
