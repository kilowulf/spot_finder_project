import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="nav-item">
            <a className="nav-link" href="/auth/github">
              Login With GitHub
            </a>
          </li>
        );
      default:
        return [
          // Changed key 1 content to show something since it was empty.
          <li className="nav-item" key="1">
            User Profile
          </li>,
          <li className="nav-item" key="2">
            <a className="nav-link" href="/api/logout">
              Logout
            </a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav className="navbar custom-navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container">
          {" "}{/* Added container for center alignment */}
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="navbar-brand"
          >
            SpotFinder
          </Link>
          <ul className="navbar-nav ml-auto">
            {" "}{/* ml-auto to push content to the right */}
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// handle authorization state data
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
