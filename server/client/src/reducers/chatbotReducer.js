import { ADD_USER_MESSAGE, ADD_BOT_MESSAGE } from "../actions/types";

// chatbotReducer.js

const initialState = {
  messages: [{
    type: 'bot',
    text: 'Welcome to SpotFinder. How can i help you today?'
  }],
  
};

const chatbotReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_USER_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { type: 'user', text: action.payload }]
      };
    case ADD_BOT_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { type: 'bot', text: action.payload }]
      };    
    default:
      return state;
  }
};

export default chatbotReducer;
