// Rendering layer control: React Router service
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Profile from "./Profile";
import SearchPage from "./SearchPage";
import ProjectDetailsCard from "./ProjectDetailsCard";
// connect allows components to call action creators
import { connect } from "react-redux";
// import action creators
import * as actions from "../actions";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

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
            <Route exact path="/searchpage" component={SearchPage} />

            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
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
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
