import axios from "axios";
import { createMessage, returnError } from './messages'
import { tokenConfig } from './auth'

import { GET_LEADS, GET_ALL_LEADS, DELETE_LEAD, ADD_LEAD, UPDATE_LEAD } from "./types";

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
    axios
        .get("/api/leads/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnError(err.response.data, err.response.status)));
}

export const getAllLeads = () => (dispatch, getState) => {
    axios
        .get("/api/allleads/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ALL_LEADS,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnError(err.response.data, err.response.status)));
}

// DELETE LEADS
export const deleteLead = id => (dispatch, getState) => {
    axios
        .delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Lead Deleted' }))
            dispatch({
            type: DELETE_LEAD,
            payload: id
            })
        })
        .catch(err => console.log(err));
}

// Add LEAD
export const addLead = (lead) => (dispatch, getState) => {
    axios
        .post("/api/leads/", lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addLead: 'Lead Added' }))
            dispatch({
                type: ADD_LEAD,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnError(err.response.data, err.response.status)))
}


// Update Job
export const updateLead = (id, lead) => (dispatch, getState) => {
    axios
        .put(`/api/leads/${id}/`, lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addLead: 'Lead Updated' }))
            dispatch({
            type: UPDATE_LEAD,
            payload: lead 
            })
        })
        .catch(err => console.log(err));
}