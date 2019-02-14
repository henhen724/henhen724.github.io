import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Navbar, Icon } from 'react-materialize';

class MyNavbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const logout = (
      <li>
        <NavLink onClick={this.onLogoutClick} to="/login">
          <img
            className="rounded-circle"
            style={{ width: '25px', marginRight: '5px' }}
            src={user.avatar}
            alt={user.name}
            title="You must have a Gravatar connected to your email to display an image."
          />
          Logout
        </NavLink>
      </li>
    );
    const profile = (
      <li>
        <NavLink to="/dashboard">My Profile</NavLink>
      </li>
    );
    const register = (
      <li>
        <NavLink to="/register">Sign Up</NavLink>
      </li>
    );
    const login = (
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    );

    return (
      <Navbar brand="MicDrop" className="transparent" left>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        {isAuthenticated ? [profile, logout] : [register, login]}
      </Navbar>
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
)(MyNavbar);
