// Data layer control: Redux - state management

// import css
import "./styles/App.css";

// Data layer control: boot up, Redux service
import React from "react";
import ReactDOM from "react-dom/client";
// import redux services
// React component that can read changes to state / store. changes will cascade to children components
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// implements action creators that can return a function in place of an action
// performs async operations
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

// create a store for state
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Get a reference to the root element
const rootElement = document.getElementById("root");

// Create a root
const root = ReactDOM.createRoot(rootElement);

// Render the App into the root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
