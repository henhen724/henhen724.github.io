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
      <div>
        <Row>
          <Col s={12} m={10} offset='m1' className='center'>
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
            <Link to='/about'>
              <Button waves='teal' className='white blue-text' large={true}>
                Learn More
              </Button>
            </Link>
          </Col>
        </Row>

        <br />
        <br />
        <br />
        <br />

        <Row>
          <Col s={12} m={4} className='blue-text card-panel'>
            <h5>Make Friends</h5>
            <p>
              Find your friends to social network around gaming. See how you
              rank among your friends and the international population of
              gamers.
            </p>
            <br />
          </Col>
          <Col s={12} m={4} className='blue-text card-panel'>
            <h5>Team Up</h5>
            <p>
              MicDrop provides the platform for you to either get paid playing
              with someone at a lower level or pay to play with someone at a
              higher level
            </p>
            <br />
          </Col>
          <Col s={12} m={4} className='blue-text card-panel'>
            <h5>Fast Matchmaking</h5>
            <p>
              MicDrop matches you fast, to efficiently permit gaming, payment,
              and fun
            </p>
            <br />
          </Col>
        </Row>

        <Row>
          <h4>Play Your Favorite Games</h4>
          <br />
          <Col s={2} className='responsive-img'>
            <p>put image here</p>
          </Col>
        </Row>
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
