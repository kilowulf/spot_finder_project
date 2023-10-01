import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUserPreferences } from "../actions";

class Profile extends Component {
  componentDidMount() {
    // Dispatch an action to fill the Redux store with user data
    this.props.fetchUser(); // or whatever action you use to get user data
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

  /** renderUserPreferences:: Functions for handling user preferences */

  handleEditPreferencesToggle = () => {
    if (!this.state.isEditingPreferences) {
      this.setState({
        experienceLevel: this.props.userPreferences.experience,
        languages: this.props.userPreferences.languages,
        frameworks: this.props.userPreferences.frameworks
      });
    }

    this.setState(prevState => ({
      isEditingPreferences: !prevState.isEditingPreferences
    }));
  };

  savePreferences = () => {
    const { experienceLevel, languages, frameworks } = this.state;
    this.props.updateUserPreferences({
      experience: experienceLevel,
      languages: languages,
      frameworks: frameworks
    });
    this.handleEditPreferencesToggle();
  };

  handlePreferenceChange = event => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      const newArray = [...this.state[name]];
      if (newArray.includes(value)) {
        const index = newArray.indexOf(value);
        newArray.splice(index, 1);
      } else {
        newArray.push(value);
      }
      this.setState({ [name]: newArray });
    } else {
      this.setState({ [name]: value });
    }
  };

  renderProfileDetails() {
    const { auth } = this.props;
    const { isEditingProfile } = this.state;

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
          <h4 className="mt-2">
            {auth.username}
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
          <button onClick={this.handleEditProfileToggle}>Edit</button>
        </div>
      );
    }
  }

  renderUserPreferences() {
    if (this.state.isEditingPreferences) {
      return (
        <div className="user-preferences">
          <div className="user-preferences-header">User Preferences</div>

          <div className="user-preferences-content">
            <label>
              User Experience:
              <select
                name="experience"
                value={this.state.experienceLevel}
                onChange={this.handlePreferenceChange}
              >
                <option value="beginner">Beginner (1 year or less)</option>
                <option value="experienced">
                  Experienced (1 year to 2 years)
                </option>
                <option value="professional">
                  Professional (3 years or more)
                </option>
              </select>
            </label>

            <div>
              Languages:
              <label>
                <input
                  type="checkbox"
                  name="languages"
                  value="python"
                  checked={this.state.languages.includes("python")}
                  onChange={this.handlePreferenceChange}
                />{" "}
                Python
              </label>
              <label>
                <input
                  type="checkbox"
                  name="languages"
                  value="javascript"
                  checked={this.state.languages.includes("javascript")}
                  onChange={this.handlePreferenceChange}
                />{" "}
                JavaScript
              </label>
              <label>
                <input
                  type="checkbox"
                  name="languages"
                  value="ruby"
                  checked={this.state.languages.includes("ruby")}
                  onChange={this.handlePreferenceChange}
                />{" "}
                Ruby
              </label>
            </div>

            <div>
              Frameworks:
              <label>
                <input
                  type="checkbox"
                  name="frameworks"
                  value="vue"
                  checked={this.state.frameworks.includes("vue")}
                  onChange={this.handlePreferenceChange}
                />{" "}
                Vue
              </label>
              <label>
                <input
                  type="checkbox"
                  name="frameworks"
                  value="react"
                  checked={this.state.frameworks.includes("react")}
                  onChange={this.handlePreferenceChange}
                />{" "}
                React
              </label>
              <label>
                <input
                  type="checkbox"
                  name="frameworks"
                  value="angular"
                  checked={this.state.frameworks.includes("angular")}
                  onChange={this.handlePreferenceChange}
                />{" "}
                Angular
              </label>
            </div>

            <button onClick={this.savePreferences}>Save Preferences</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="user-preferences">
          <p>
            User Experience: {this.props.auth.experienceLevel}
          </p>
          <p>
            Languages: {this.props.auth.languages.join(", ")}
          </p>
          <p>
            Frameworks: {this.props.auth.frameworks.join(", ")}
          </p>
          <button onClick={this.handleEditPreferencesToggle}>
            Edit Preferences
          </button>
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
        <div className="profile-middle">
          {this.renderUserPreferences()}
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
