import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return errors
export const returnErorrs = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
};

// Clear erorrs
export const clearErorrs = () => {
    return {
        type: CLEAR_ERRORS
    };
};
