import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { auth } = this.props;

    if (!auth) {
      return <div>Loading...</div>; // Or you can redirect to a login page
    }

    return (
      <div className="profile-container mt-4">
        <div className="card">
          <div className="card-header bg-dark text-white">
            <h3>
              {auth.displayname}'s GitHub Profile
            </h3>
          </div>
          <div className="card-body">
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
              <a
                href={auth.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub Profile
              </a>
            </p>
            <p>
              <strong>Credits:</strong> {auth.credits}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Profile);
