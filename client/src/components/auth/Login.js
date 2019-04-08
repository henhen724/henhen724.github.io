import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-materialize';
import TextFieldGroup from '../common/TextFieldGroup';

import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };
  render() {
    const { errors } = this.state;
    return (
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Row>
                <Col s={12} m={10} className='center'>
                  <h1 className='display-4 text-center'>Log In</h1>
                  <p className='lead text-center'>
                    Sign in to your MicDrop account
                  </p>
                  <form onSubmit={this.onSubmit} className='center'>
                    <TextFieldGroup
                      type='email'
                      placeholder='Email Address'
                      name='email'
                      error={errors.email}
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <TextFieldGroup
                      type='password'
                      placeholder='Password'
                      name='password'
                      error={errors.password}
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    <Col s={3} />
                    <Col s={3}>
                      <input
                        type='submit'
                        className='btn btn-info btn-block mt-4 center'
                      />
                    </Col>
                    <Col s={3}>
                      <Link to='/register'>
                        <Button className='btn btn-info btn-block mt-5 center'>
                          Sign Up
                        </Button>
                      </Link>
                    </Col>
                    <Col s={3} />
                  </form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
