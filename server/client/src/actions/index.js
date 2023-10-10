/**
 * DISPATCHERS: Redux store function
 * Responsible for sending actions to all reducers in redux store
 * causes instant update of values in the store
 * 
 * 
 * ACTIONS:
 * action creator service to modify state within redux store
   action creators return actions that are sent to reducers
   reducers create new values for state , updating state in redux store
   redux store then sends updated state to react components * 
 * **/
import axios from "axios";
import {
  FETCH_USER,
  UPDATE_USER_PREFERENCES,
  STORE_SEARCH_RESULTS,
  TRACK_PROJECT
} from "./types";
import { normalizeQueryResultData } from "../utils/normalizeQueryResultData";

export const fetchUser = () => async dispatch => {
  // res = return updated user instance
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateUserPreferences = preferences => async dispatch => {
  try {
    // Update the user preferences on the server using a PUT request
    const res = await axios.put("/api/update_user_preferences", preferences);

    // If update successful, dispatch the action to update the Redux store.
    if (res.status === 200) {
      dispatch({ type: UPDATE_USER_PREFERENCES, payload: preferences });
      dispatch(fetchUser());
    }
  } catch (error) {
    console.error("Error updating user preferences:", error);
  }
};

// store search results redux
export const storeSearchResults = data => ({
  type: STORE_SEARCH_RESULTS,
  payload: data
});

// Search action to GraphQL / Github Service - github API call
export const searchProjects = params => async dispatch => {
  try {
    // Assuming backend will form the GraphQL query based on provided parameters.
    const response = await axios.post("/api/github_search", params);
    // Extract repositories from the response
    const repositories = response.data.data.search.edges.map(edge => edge.node);
    const flattenedResults = normalizeQueryResultData(
      response.data.data.search.edges
    );

    // Log to ensure we are dispatching the right data
    //console.log("Extracted repositories:", repositories);

    dispatch({ type: STORE_SEARCH_RESULTS, payload: flattenedResults });
    console.log("Dispatching search results: ", repositories);
  } catch (error) {
    // Handle errors accordingly.
    console.log("Error from searchProjects action f", error);
  }
};

// track and dispatch project to user object property: projectsTracked
export const trackProject = project => async (dispatch, getState) => {
  try {
    // get current State
    const projectsTracked = getState().projectsTracked;
    // check if project already tracked
    const isAlreadyTracked = projectsTracked.some(p => p.id === project.id);
    // if tracked, exit
    if (isAlreadyTracked) {
      return;
    }

    // call to server
    const res = await axios.put("/api/track_project", project);
    if (res.status === 200) {
      // store results
      dispatch({ type: TRACK_PROJECT, payload: res.data });
    }
  } catch (error) {
    console.error("Error tracking project:", error);
  }
};
