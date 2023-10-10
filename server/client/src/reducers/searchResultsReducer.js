import { STORE_SEARCH_RESULTS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case STORE_SEARCH_RESULTS:
      return action.payload;
    default:
      return state;
  }
}
