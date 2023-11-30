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
  TRACK_PROJECT,
  ADD_USER_MESSAGE,
  ADD_BOT_MESSAGE,
  UNTRACK_PROJECT,
  UPDATE_RECOMMENDED_PROJECTS
} from "./types";

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
    // const repositories = response.data.edges.map(edge => edge.node);
    // const flattenedResults = normalizeQueryResultData(
    //   response.data.data.search.edges
    // );

    const flattenedResults = response.data.data;
    console.log("flattenedResults", flattenedResults);

    // Log to ensure we are dispatching the right data
    //console.log("Extracted repositories:", repositories);

    dispatch({ type: STORE_SEARCH_RESULTS, payload: flattenedResults });
    
    console.log("Dispatching search results: ", flattenedResults);
  } catch (error) {
    // Handle errors accordingly.
    console.log("Error from searchProjects action f", error);
  }
};

// Search action to GraphQL / Github Service - github API call
export const searchRecommendedProjects = params => async dispatch => {
  try {
    // Assuming backend will form the GraphQL query based on provided parameters.
    const response = await axios.post("/api/github_search", params);
    // Extract repositories from the response
    // const repositories = response.data.edges.map(edge => edge.node);
    // const flattenedResults = normalizeQueryResultData(
    //   response.data.data.search.edges
    // );

    const flattenedResults = response.data.data;
    console.log("flattenedResults", flattenedResults);

    // Log to ensure we are dispatching the right data
    //console.log("Extracted repositories:", repositories);
    
    dispatch({ type: UPDATE_RECOMMENDED_PROJECTS, payload: flattenedResults });
    console.log("Dispatching search results: ", flattenedResults);
  } catch (error) {
    // Handle errors accordingly.
    console.log("Error from searchProjects action f", error);
  }
};

// track and dispatch project to user object property: projectsTracked
export const trackProject = project => async (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    try {
      const projectsTracked = getState().projectsTracked;
      console.log("projectsTracked", projectsTracked);
      const isAlreadyTracked = projectsTracked.some(p => p.id === project.id);

      if (isAlreadyTracked) {
        resolve(); // exit and resolve promise
        return;
      }

      const res = await axios.put("/api/track_project", project);

      if (res.status === 200) {
        dispatch({ type: TRACK_PROJECT, payload: res.data });
        console.log("Dispatching trackProject action: ", res.data);
        resolve();
      } else {
        reject(new Error("Failed to track project"));
      }
    } catch (error) {
      console.error("Error tracking project:", error);
      reject(error);
    }
  });
};

// Update Recommended Projects
export const updateRecommendedProjects = projects => {
  return {
    type: UPDATE_RECOMMENDED_PROJECTS,
    payload: projects
  };
};

// Remove Project from projectsTracked array property of user object
export const untrackProject = projectId => async (dispatch, getState) => {
  try {
    const res = await axios.put("/api/untrack_project", { projectId });

    dispatch({
      type: UNTRACK_PROJECT,
      payload: res.data.projectsTracked
    });
    dispatch(fetchUser());
  } catch (error) {
    console.error("Error un-tracking project:", error);
  }
};

// Chatbox Action makes call to backend service
export const sendMessage = message => async dispatch => {
  const response = await fetch("/api/openAI", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question: message })
  });

  const data = await response.json();
  dispatch({ type: ADD_BOT_MESSAGE, payload: data.answer });

  return data.answer;
};
// Chatbot action for user message retention
export const addUserMessage = message => {
  return {
    type: ADD_USER_MESSAGE,
    payload: message
  };
};
// Chatbot action for bot message retention
export const addBotMessage = message => {
  return {
    type: ADD_BOT_MESSAGE,
    payload: message
  };
};
