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
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
  // res = return updated user instance
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// action creator: handles token transfer
export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
