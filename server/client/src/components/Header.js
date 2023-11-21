import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../img/spotfinder_logo_inverse_color_drk_lt.jpg";
import { VscGithubInverted } from "react-icons/vsc";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="nav-top">
            <a className="nav-link-top" href="/auth/github">
              <VscGithubInverted className="github-icon" />
              Login with GitHub
            </a>
          </li>
        );
      default:
        return [
          <li className="nav-top d-flex align-items-center" key="1">
            <img
              src={this.props.auth.avatarImgUrl}
              alt={this.props.auth.username}
              className="user-profile-image"
            />
            <Link to="/profile" className="nav-link-top">
              {this.props.auth.username}
            </Link>
          </li>,
          <li className="nav-top" key="2">
            <a
              className="nav-link-log"
              href="/api/logout"
              style={{ fontSize: "12px", marginTop: "4px" }}
            >
              Logout
            </a>
          </li>
        ];
    }
  }

  renderSubNavbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <ul className="navbar-nav ml-auto">
            <li>
              <Link to="/search-page" className="nav-link">
                Search Projects
              </Link>
            </li>
            <li>
              <Link to="/help-page" className="nav-link">
                Help
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </nav>
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar custom-navbar navbar-expand-lg navbar-light">
          <div className="container">
            {" "}{/* Added container for center alignment */}
            <Link to={this.props.auth ? "/" : "/"} className="navbar-brand">
              <img
                src={logo}
                alt="SpotFinder Logo"
                className="spotfinder-logo"
              />
              <span>SpotFinder</span>
            </Link>
            <ul className="navbar-nav ml-auto ">
              {" "}{/* ml-auto to push content to the right */}
              {this.renderContent()}
            </ul>
          </div>
        </nav>
        {this.renderSubNavbar()}
      </div>
    );
  }
}

// handle authorization state data
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
