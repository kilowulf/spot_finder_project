import React, { Component } from "react";
import { connect } from "react-redux";

class ProfilePrefCard extends Component {
  // set state
 state = {
    isEditing: false,
    experienceLevel: this.props.auth?.experienceLevel || "",
    languages: this.props.auth?.languages || [],
    frameworks: this.props.auth?.frameworks || []
    
  };

  handleEditToggle = () => {
    // Handle the editing logic
     this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  };

  // save changes mde in user preferences
  handleSave = () => {
    const { experienceLevel, languages, frameworks } = this.state;
    this.props.onSave({ experienceLevel, languages, frameworks });
    this.handleEditToggle();
  };
  // 
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

  // Cancel button in user preferences modal
  handleCancelPreferences = () => {
    this.setState({
        experienceLevel: this.props.auth?.experienceLevel || "",
        languages: this.props.auth?.languages || [],
        frameworks: this.props.auth?.frameworks || []
    });
    this.handleEditToggle();
};




  renderUserPreferences() {
   if (!this.props.userPreferences && !this.props.auth) return null;

    if (this.state.isEditing) {
      return (
        <div className="user-preferences">
          <div className="user-preferences-header">Open Source Project Preferences</div>

          <div className="user-preferences-content">
            <label>
              <span className="describer-text">User Experience:</span>
              <select
                name="experienceLevel"
                value={this.state.experienceLevel}
                onChange={this.handlePreferenceChange}
              >
                <option value="Beginner">Beginner (1 year or less)</option>
                <option value="Experienced">
                  Experienced (1 year to 2 years)
                </option>
                <option value="Professional">
                  Professional (3 years or more)
                </option>
              </select>
            </label>

            <div>
              <span className="describer-text">Languages:</span>
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
              <span className="describer-text">Frameworks:</span>
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

            <button className="user-preferences-save-btn" onClick={this.handleSave}>Save Preferences</button>
            <button className="user-preferences-cancel-btn" onClick={this.handleCancelPreferences}>Cancel</button>

          </div>
        </div>
      );
    } else {
      return (
        <div className="user-preferences">
           <div className="user-preferences-header">Open Source Project Preferences</div>
          <p>
            <span className="describer-text">User Experience:</span> {this.state.experienceLevel}
          </p>
          <p>
            <span className="describer-text">Languages:</span> {this.state.languages.join(", ")}
          </p>
          <p>
            <span className="describer-text">Frameworks:</span> {this.state.frameworks.join(", ")}
          </p>
          <button className="user-preferences-edit-btn" onClick={this.handleEditToggle}>
            Edit Preferences
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderUserPreferences()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    userPreferences: state.userPreferences
  };
};

export default connect(mapStateToProps)(ProfilePrefCard);