import axios from 'axios'
import { returnError } from './messages'

import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, CLEAR_LEADS } from './types'

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ 
        type: USER_LOADING 
    })

    // load the user
    axios
        .get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnError(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// LOGIN USER
export const login = (username, password) => dispatch => {

    // HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({
        username: username,
        password: password
    })

    // load the user
    axios
        .post("/api/auth/login", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// REGISTER USER
export const register = ({ username, password, email }) => dispatch => {

    // HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({
        username: username,
        password: password,
        email, email
    })

    // load the user
    axios
        .post("/api/auth/register", body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios
      .post("/api/auth/logout/", null, tokenConfig(getState))
      .then(res => {
        dispatch({ 
            type: CLEAR_LEADS
        });
        dispatch({
          type: LOGOUT_SUCCESS
        })
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };


// Setup config with token and user deatils - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token
  
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    // If token, add to headers config
    if (token) {
      config.headers["Authorization"] = `Token ${token}`
    }
  
    return config;
}
