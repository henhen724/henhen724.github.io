import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Login - Get User Token

export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //Save to local storage
            const { token } = res.data;
            // Set token to localstorage
            localStorage.setItem('jwtToken', token);
            //Set the token to the auth header
            setAuthToken(token);
            //decode token into get user data
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

//Logout user action
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}