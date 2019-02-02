import axios from 'axios'
import { returnErrors } from './messages'

import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './types'

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING })

    // load the user
    axios
        .get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
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
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    console.log("did lotout get here")
    // load the user
    // Mote have to pass null as replacement for body or it wont work
    axios
        .post('/api/auth/logout/', null, tokenConfig(getState))
        .then(res => {
            console.log("did lotout get success")
            dispatch({
                type: LOGOUT_SUCCESS
            })
        })
        .catch(err => {
            console.log("did lotout get here error")
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}


// Setup config with token and user deatils - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token

    // HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // IF token add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}