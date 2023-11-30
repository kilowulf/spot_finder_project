import { UPDATE_RECOMMENDED_PROJECTS } from "../actions/types";

const recommendedProjectsReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_RECOMMENDED_PROJECTS:
      return action.payload;
    default:
      return state;
  }
};

export default recommendedProjectsReducer;
