import { CategoriesAction, Category } from "../../types/types";
import * as actionTypes from "../constant/actionTypes";
const initState: Category[] = [];

const categories = (state = initState, action: CategoriesAction) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
export default categories;
