import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/spotfinder_logo_large.jpg";
import { searchProjects, fetchUser } from "../actions";
import { connect } from "react-redux";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-page">
        {/* Header */}
        <div className="landing-header">
          <img src={logo} alt="SpotFinder Logo" className="spotfinder-logo" />
          <h1>SpotFinder</h1>
          <p>Find your spot in the open source world!</p>
        </div>

        {/* Wiki Section */}
        <section className="landing-wiki">
          <h2>Open Source FAQ's</h2>
          <p>
            Dive into the common terms, tags, and parlance in open source
            projects hosted on GitHub.{" "}
            <Link to="/help-page">Explore our FAQ / Help page</Link> and find your way to being a open source contributor.
          </p>
        </section>

        {/* Search Section */}
        <section className="landing-search">
          <h2>Find a Project</h2>
          <p>
            Ready to jump into the action?{" "}
            <Link to="/search-page">Search for projects</Link> that match your
            interest and skills.
          </p>
        </section>

        {/* Signup / Profile Creation */}
        <section className="landing-signup">
          <h2>Join the Community</h2>
          <p>
            Start your journey with SpotFinder.{" "}
            <a href="https://github.com/">Create a Github account</a>   to enjoy
            the full services of SpotFinder
          </p>
        </section>

        {/* Description Section */}
        <section className="landing-description">
          <h2>About SpotFinder</h2>
          <p>
            SpotFinder is your springboard to the world of open source on
            GitHub. Whether you're a newbie looking to dip your toes or an
            experienced developer aiming to contribute, we guide you to
            understand the standards, expectations, and processes of finding and
            collaborating on GitHub open source projects.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Landing;
