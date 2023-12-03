import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchUser,
  updateUserPreferences,
  searchRecommendedProjects,
  updateRecommendedProjects
} from "../actions";

import { fetchRecommendedProjectsUtil } from "../utils/fetchRecommendedProjectsUtil";
import ProfilePrefCard from "./ProfilePrefCard";
import ProfileProjCard from "./ProfileProjCard";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";

class Profile extends Component {
  componentDidMount() {
    this.props.fetchUser().then(() => {
      this.setState({
        experienceLevel: this.props.auth.experienceLevel,
        languages: this.props.auth.languages || [],
        frameworks: this.props.auth.frameworks || []
      });
      fetchRecommendedProjectsUtil(
        this.props.auth,
        this.props.searchRecommendedProjects
      );
    });
  } 

  /**Component state properties */
  state = {
    isEditingProfile: false,
    displayname: "",
    username: "",
    isEditingPreferences: false,
    experienceLevel: "",
    languages: [],
    frameworks: [],
    sortCategory: "createdAt", // default sort category
    sortOrder: "ascending" // default sort order
  };

  /**renderProfileDetails:: Functions for handling profile details */
  handleEditProfileToggle = () => {
    const { auth } = this.props;

    this.setState(prevState => {
      const newEditingState = !prevState.isEditingProfile;
      return {
        isEditingProfile: newEditingState,
        displayname: newEditingState ? auth.displayname : prevState.displayname,
        username: newEditingState ? auth.username : prevState.username
      };
    });

    if (!this.state.isEditingProfile) {
      this.setState({
        displayname: auth.displayname,
        username: auth.username
        // ... Set any other fields you wish to edit ...
      });
    }

    this.setState(prevState => ({
      isEditingProfile: !prevState.isEditingProfile
    }));
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSavePreferences = preferences => {
    // Here you can use the 'updateUserPreferences' action to save preferences.
    // Assuming updateUserPreferences accepts a preferences object.
    this.props.updateUserPreferences(preferences);
    fetchRecommendedProjectsUtil(
      this.props.auth,
      this.props.searchRecommendedProjects
    );
  };

  // Sort tracked projects
  sortProjects = projects => {
    const { sortCategory, sortOrder } = this.state;

    const getValue = project => {
      const value = project[sortCategory];
      // Convert date strings to Date objects for comparison
      if (sortCategory === "createdAt" || sortCategory === "latestMergedPR") {
        return new Date(value);
      }
      // Convert to lowercase strings for case-insensitive comparison
      if (typeof value === "string") {
        return value.toLowerCase();
      }
      // Return the value as is for numbers
      return value;
    };

    return projects.sort((a, b) => {
      const valueA = getValue(a);
      const valueB = getValue(b);

      if (sortOrder === "ascending") {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      } else {
        // descending
        if (valueA > valueB) return -1;
        if (valueA < valueB) return 1;
        return 0;
      }
    });
  };

  // Sort Options::
  renderSortOptions() {
    return (
      <div className="sort-options">
        <h2>Projects Tracked</h2>
        <div className="sort-controls">
          <select
            value={this.state.sortCategory}
            onChange={e => this.setState({ sortCategory: e.target.value })}
          >
            <option value="" disabled>
              Choose a field
            </option>
            <option value="createdAt">Created</option>
            <option value="latestMergedPR">Last Pull Request Date</option>
            <option value="mentionableUsersCount">
              Number of Contributors
            </option>
            {/* Add other sort categories as needed */}
          </select>
          <button onClick={() => this.setState({ sortOrder: "ascending" })}>
            <HiArrowSmUp />
          </button>
          <button
            onClick={() =>
              this.setState({
                sortOrder: "descending"
              })}
          >
            <HiArrowSmDown />
          </button>
        </div>
      </div>
    );
  }

  /** renderUserPreferences:: Functions for handling user preferences */

  renderProfileDetails() {
    const { auth } = this.props;
    const { isEditingProfile } = this.state;

    if (!auth) return null;

    if (isEditingProfile) {
      return (
        <div className="profile-details">
          <input
            type="text"
            name="displayname"
            value={this.state.displayname}
            onChange={this.handleInputChange}
            placeholder="Display Name"
          />
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            placeholder="Username"
          />
          {/* Add any other input fields for editable details here */}
          <button onClick={this.handleEditProfileToggle}>Save</button>
        </div>
      );
    } else {
      return (
        <div className="profile-details">
          <img
            src={auth.avatarImgUrl}
            alt={auth.username}
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <h3 className="mt-2">
            {auth.username}
          </h3>
          <h4 className="mt-2">
            {auth.bio}
          </h4>
          <p>
            <strong>GitHub ID:</strong> {auth.githubId}
          </p>
          <p>
            <strong>Provider:</strong> {auth.provider}
          </p>
          <p>
            <a href={auth.profileUrl} target="_blank" rel="noopener noreferrer">
              View GitHub Profile
            </a>
          </p>
          {/* <button onClick={this.handleEditProfileToggle}>Edit</button> */}
        </div>
      );
    }
  }

  // Tracked Projects::
  renderTrackedProjects() {
    const { auth } = this.props;
    if (!auth || !auth.projectsTracked) return null;

    const sortedProjects = this.sortProjects([...auth.projectsTracked]);

    return sortedProjects.map((project, index) =>
      <ProfileProjCard
        key={index}
        project={project}
        sortCategory={this.state.sortCategory}
        sortOrder={this.state.sortOrder}
      />
    );
  }

  render() {
    const { auth } = this.props;

    if (!auth) {
      return <div>Loading...</div>;
    }

    return (
      <div className="profile-container mt-4">
        {/* Profile Details */}
        <div className="profile-details-container">
          {this.renderProfileDetails()}
          {/* User Preferences just beneath Profile Details */}
          <ProfilePrefCard auth={auth} onSave={this.handleSavePreferences} />
        </div>
        {/*Top component: placeholder */}

        {/* Centered: Tracked Projects (Previously Middle) */}
        <div className="profile-projects-container">
          {/* Sorting Options */}
          {this.renderSortOptions()}
          {this.renderTrackedProjects()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    userPreferences: state.userPreferences
  };
}

const mapDispatchToProps = {
  fetchUser,
  updateUserPreferences,
  searchRecommendedProjects,
  updateRecommendedProjects
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
