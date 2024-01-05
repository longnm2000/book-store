import { combineReducers } from "redux";
import user from "./user";
import categories from "./category";
import admin from "./admin";

export const reducer = combineReducers({ user, categories, admin });
