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
import { FETCH_USER, UPDATE_USER_PREFERENCES } from "./types";

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
