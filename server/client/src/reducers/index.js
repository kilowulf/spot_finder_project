import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userPreferencesReducer from "./userPreferencesReducer";
import storeSearchResults from "./searchResultsReducer";
import projectsTrackedReducer from "./projectsTrackedReducer";

export default combineReducers({
  auth: authReducer,
  userPreferences: userPreferencesReducer,
  searchResults: storeSearchResults,
  projectsTracked: projectsTrackedReducer
});
