import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };
  render() {
    return (
      <div class="showcase-container">
        <div class="row">
          <div class="col s12 m10 offset-m1 center">
            <h5>Welcome To MicDrop</h5>
            <h1>
              1. Mic Up
              <br />
              2. Team Up
              <br />
              3. Drop Down
            </h1>
            <p>International Platform That Ensures Seamless Matchmaking</p>
            <br />
            <br />
            <a
              href="about.html"
              class="btn btn-large white blue-text waves-effect waves-blue"
            >
              Learn More
            </a>
            <a
              href="myprofile.html"
              class="btn btn-large amber white-text waves-effect waves-light"
            >
              My Profile
            </a>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
