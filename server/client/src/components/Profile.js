import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUserPreferences } from "../actions";
import ProfilePrefCard from "./ProfilePrefCard";

class Profile extends Component {
  componentDidMount() {
    this.props.fetchUser().then(() => {
      this.setState({
        experienceLevel: this.props.auth.experienceLevel,
        languages: this.props.auth.languages || [],
        frameworks: this.props.auth.frameworks || []
      });
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
    frameworks: []
    // ... Add any other state fields you wish to edit ...
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
  };

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
          <h2 className="mt-2">
            {auth.bio}
          </h2>
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
          <button onClick={this.handleEditProfileToggle}>Edit</button>
        </div>
      );
    }
  }

  renderTrackedProjects() {
    // ... Implement the tracked projects section ...
  }

  render() {
    const { auth } = this.props;

    if (!auth) {
      return <div>Loading...</div>;
    }

    return (
      <div className="profile-container mt-4">
        {/* Left: User Profile Details */}
        <div className="profile-left">
          {this.renderProfileDetails()}
        </div>

        {/* Middle: User Preferences */}
        <div className="profile-container">
          {/* Other components */}
          <ProfilePrefCard auth={auth} onSave={this.handleSavePreferences} />
        </div>

        {/* Right: Tracked Projects */}
        <div className="profile-right">
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
  updateUserPreferences
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
