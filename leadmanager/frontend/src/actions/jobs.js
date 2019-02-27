import axios from "axios";
import { createMessage, returnError } from './messages'
import { tokenConfig } from './auth'

import { GET_JOBS, GET_ALL_JOBS, DELETE_JOB, ADD_JOB, UPDATE_JOB } from "./types";

// GET Jobs
export const getJobs = () => (dispatch, getState) => {
    axios
        .get("/api/jobs/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_JOBS,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnError(err.response.data, err.response.status)));
}

export const getAllJobs = () => (dispatch, getState) => {
    axios
        .get("/api/alljobs/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ALL_JOBS,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnError(err.response.data, err.response.status)));
}

// DELETE JOBS
export const deleteJob = id => (dispatch, getState) => {
    axios
        .delete(`/api/jobs/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteJob: 'Job Deleted' }))
            dispatch({
            type: DELETE_JOB,
            payload: id
            })
        })
        .catch(err => console.log(err));
}

export const deleteJobFromAll = id => (dispatch, getState) => {
    axios
        .delete(`/api/alljobs/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteJobFromAll: 'Job Deleted' }))
            dispatch({
            type: DELETE_JOB,
            payload: id
            })
        })
        .catch(err => console.log(err));
}

// Add Job
export const addJob = (job) => (dispatch, getState) => {
    axios
        .post("/api/jobs/", job, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addJob: 'Job Added' }))
            dispatch({
                type: ADD_JOB,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnError(err.response.data, err.response.status)))
}

// Update Job
export const updateJob = (id, job) => (dispatch, getState) => {
    axios
        .put(`/api/jobs/${id}/`, job, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addJob: 'Job Updated' }))
            dispatch({
            type: UPDATE_JOB,
            payload: job 
            })
        })
        .catch(err => console.log(err));
}