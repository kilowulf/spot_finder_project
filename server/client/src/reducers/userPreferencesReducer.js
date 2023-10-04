import { UPDATE_USER_PREFERENCES } from "../actions/types";

const initialState = {
  experienceLevel: "",
  languages: [],
  frameworks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_PREFERENCES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
