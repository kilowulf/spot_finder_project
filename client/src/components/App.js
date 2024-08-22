// Rendering layer control: React Router service
import client from "../apolloClient"
import { ApolloProvider } from "@apollo/client";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Profile from "./Profile";
import SearchPage from "./SearchPage";
import ProjectDetailsCard from "./ProjectDetailsCard";
import Chatbot from "./Chatbot";
import HelpPage from "./HelpPage";
import { HelpProvider} from "../utils/helpContext"
import {fetchRecommendedProjectsUtil} from "../utils/fetchRecommendedProjectsUtil";
// connect allows components to call action creators
import { connect } from "react-redux";
// import action creators
import * as actions from "../actions";

// const Dashboard = () => <h2>Dashboard</h2>;
// const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  // set state for recommended projects
  state = {
    recommendedProjects: []
  };
  // lifecycle method to call action creator
  componentDidMount() {
    this.props.fetchUser().then(() => {
      if (this.props.auth) {
        fetchRecommendedProjectsUtil(this.props.auth, this.props.searchRecommendedProjects)
          .then(recommendedProjects => {
            this.setState({ recommendedProjects });
          });
      }    
    });    
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <HelpProvider>
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/search-page" render={() => (
              <SearchPage 
                recommendedProjects={this.props.recommendedProjects} 
              />
            )} />
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
            <Route exact path="/help-page" component={HelpPage} />
          </div>
        </BrowserRouter>
      </div>
      </HelpProvider>
      </ApolloProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth?.username ? state.auth.displayname : "User",
    auth: state.auth,
    recommendedProjects: state.recommendedProjects
  };
};

export default connect(mapStateToProps, actions)(App);
