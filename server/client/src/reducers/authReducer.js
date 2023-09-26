// Authreducer: decides whether a user is logged in or not
// allows us to access : this.props.auth - user model instance and its properties ie. credits
import { FETCH_USER } from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // if payload is empty string, return false. If payload is not empty string, return payload.
    default:
      return state;
  }
}
