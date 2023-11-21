// Rendering layer control: React Router service
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Profile from "./Profile";
import SearchPage from "./SearchPage";
import ProjectDetailsCard from "./ProjectDetailsCard";
import Chatbot from "./Chatbot";
// connect allows components to call action creators
import { connect } from "react-redux";
// import action creators
import * as actions from "../actions";

// const Dashboard = () => <h2>Dashboard</h2>;
// const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  // lifecycle method to call action creator
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/search-page" component={SearchPage} />
            <Route
              path="/project/:projectId"
              render={props =>
                <ProjectDetailsCard
                  key={props.match.params.projectId}
                  auth={this.props.auth}
                  fetchUser={this.props.fetchUser}
                  {...props}
                />}
            />
            <Chatbot username={this.props.username} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth?.username ? state.auth.displayname : "User"
  };
};

export default connect(mapStateToProps, actions)(App);
