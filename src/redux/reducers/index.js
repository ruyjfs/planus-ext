import { combineReducers } from "redux";
import notifications from "./notifications";
import user from "./user";
import users from "./users";
import auth from "./auth";
import layout from "./layout";

export default combineReducers({ notifications, user, users, auth, layout });