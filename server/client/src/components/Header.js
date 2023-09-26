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
              Login With Google
            </a>
          </li>
        );
      default:
        return [
          <li className="nav-item" key="1" style={{ margin: "0 10px" }} />,
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
      <nav className="navbar custom-navbar">
        <div className="navbar navbar-expand-lg navbar-light custom-nav-bg">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="navbar-brand"
          />
          <ul className="navbar-nav ml-auto">
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
