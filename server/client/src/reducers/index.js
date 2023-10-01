import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userPreferencesReducer from "./userPreferencesReducer";

export default combineReducers({
  auth: authReducer,
  userPreferences: userPreferencesReducer
});
