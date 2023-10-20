import { TRACK_PROJECT } from "../actions/types";

const projectsTrackedReducer = (state = [], action) => {
  switch (action.type) {
    case TRACK_PROJECT:
      // Ensure you don't track the same project multiple times.
      // if (state.some(project => project.id === action.payload.id)) {
      //   return state;
      // }
      return action.payload.projectsTracked || state;
    default:
      return state;
  }
};

export default projectsTrackedReducer;
