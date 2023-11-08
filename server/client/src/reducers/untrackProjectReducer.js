import { UNTRACK_PROJECT } from "../actions/types";

const initialState = {
  experienceLevel: "",
  languages: [],
  frameworks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UNTRACK_PROJECT:
      return { ...state, projectsTracked: action.payload };
    default:
      return state;
  }
}
