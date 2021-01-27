import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';
import { returnErorrs } from './ErrorActions';
import { configToken } from './AuthActions';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items')
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))
        .catch(err => dispatch(returnErorrs(err.response.data, err.response.status)));
};

export const addItem = item => (dispatch, getState) => {
    axios.post('api/items', item, configToken(getState))
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            }))
        .catch(err => dispatch(returnErorrs(err.response.data, err.response.status)));    
};

export const deleteItem = id => (dispatch, getState) => {
    axios.delete(`api/items/${id}`, configToken(getState))
        .then(res => 
            dispatch({
                type: DELETE_ITEM,
                payload: id
            }))
        .catch(err => dispatch(returnErorrs(err.response.data, err.response.status)));        
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}