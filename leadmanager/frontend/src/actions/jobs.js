import axios from "axios";
import { createMessage, returnError } from './messages'
import { tokenConfig } from './auth'
import { tokenConfigJobs } from './auth'

import { GET_JOBS, DELETE_JOB, ADD_JOB } from "./types";

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