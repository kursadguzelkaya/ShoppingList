import axios from 'axios';
import { returnErorrs } from './ErrorActions';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, LOGOUT_SUCCESS } from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState)=> {
    // Load user
    dispatch({ type: USER_LOADING })

    axios.get('/api/auth/user', configToken(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErorrs(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// Get token, set config&headers
export const configToken = getState => {
    // Get token
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    
    // If token add headers
    if(token) {
        config.headers['x-auth-token'] = token;
    };

    return config;
}