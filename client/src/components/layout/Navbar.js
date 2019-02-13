import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  componentWillMount = () => {
    this.$el = $(this.el);
    this.$el.chosen();
    $(".button-collapse").sideNav();
    $(".modal").modal();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <li>
        <a
          href=""
          onClick={this.onLogoutClick}
          className="btn amber waves-effect waves-light"
          to="/login"
        >
          <img
            className="rounded-circle"
            style={{ width: "25px", marginRight: "5px" }}
            src={user.avatar}
            alt={user.name}
            title="You must have a Gravatar connected to your email to display an image."
          />
          Logout
        </a>
      </li>
    );

    const guestLinks = (
      <div>
        <li>
          <Link className="btn amber waves-effect waves-light" to="/register">
            Sign Up
          </Link>
        </li>
        <li>
          <Link className="btn amber waves-effect waves-light" to="/login">
            Login
          </Link>
        </li>
      </div>
    );

    return (
      <nav class="transparent" ref={el => (this.el = el)}>
        <div class="container">
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">
              MicDrop
            </a>
            <a href="#" data-activates="mobile-nav" class="button-collapse">
              <i class="fa fa-bars" />
            </a>
            <ul class="right hide-on-med-and-down">
              <li>
                <a class="active-link" href="index.html">
                  Home
                </a>
              </li>
              <li>
                <a href="about.html">About</a>
              </li>
              <li>
                <a href="myprofile.html">My Profile</a>
              </li>
              <li>
                <a
                  href="#login-modal"
                  class="btn amber modal-trigger btn-waves waves-light"
                >
                  Login
                </a>
              </li>
              <li>
                <a href="https://facebook.com">
                  <i class="fab fa-facebook" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com">
                  <i class="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com">
                  <i class="fab fa-instagram" />
                </a>
              </li>
            </ul>
            <ul class="side-nav" id="mobile-nav">
              <h4 class="purple-text text-darken-4 center">MicDrop</h4>
              <li>
                <div class="divider" />
              </li>
              <li>
                <a href="index.html">
                  <i class="fa fa-home grey-text text-darken-4" /> Home
                </a>
              </li>
              <li>
                <a href="about.html">
                  <i class="fa fa-cog grey-text text-darken-4" /> About
                </a>
              </li>
              <li>
                <a href="myprofile.html">
                  <i class="fa fa-users grey-text text-darken-4" /> My Profile
                </a>
              </li>
              <li>
                <div class="divider" />
              </li>
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </div>
        <script />
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
