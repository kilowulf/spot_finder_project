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
          <li className="nav-item d-flex align-items-center" key="1">
            <img
              src={this.props.auth.avatarImgUrl}
              alt={this.props.auth.username}
              className="user-profile-image"
            />
            <Link to="/profile" className="nav-link">
              {this.props.auth.username}
            </Link>
          </li>,
          <li className="nav-item" key="2">
            <a className="nav-link" href="/api/logout">
              Logout
            </a>
          </li>
        ];
    }
  }

  renderSubNavbar() {
    return (
      <nav className="navbar sub-navbar navbar-expand-lg navbar-light">
        <div className="container">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/searchpage" className="nav-link">
                Search Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/someRoute2" className="nav-link">
                Glossary
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
            <Link
              to={this.props.auth ? "/surveys" : "/"}
              className="navbar-brand"
            >
              SpotFinder
            </Link>
            <ul className="navbar-nav ml-auto navbar-light">
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
