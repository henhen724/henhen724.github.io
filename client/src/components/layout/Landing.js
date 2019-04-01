import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-materialize';

class Landing extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };
  render() {
    return (
      <Row>
        <Col s={12} m={10} offset="m1" className="center">
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
          <Link to="/about">
            <Button waves="teal" className="white blue-text" large={true}>
              Learn More
            </Button>
          </Link>
        </Col>
      </Row>
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
