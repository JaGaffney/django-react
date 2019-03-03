import { GET_JOBS, GET_ALL_JOBS, DELETE_JOB, ADD_JOB, UPDATE_JOB  } from '../actions/types.js'

const initialState = {
    jobs: [],
    allJobs: []
}

// probally not a good way of updating the state value but i couldnt work out a better way
 let updateStateInfo = (stateArray, action) => {
  let updatedJobs = []
  stateArray.filter(job => {
    if (job.id === action.payload.id) {
      updatedJobs = [...updatedJobs, action.payload]
    } else {
      updatedJobs = [...updatedJobs, job]
    }
  })
  return updatedJobs
  }

// can prob convert GET_ALL_JOBS to GET_JOBS
export default function(state = initialState, action) {
    // common convetion is to use a switch with cases
    switch (action.type) {
        case GET_JOBS:
            return {
                ...state,
                jobs: action.payload
            }
        case GET_ALL_JOBS:
            return {
                ...state,
                allJobs: action.payload
            }
        case DELETE_JOB:
            // can use .filter here due to removing the payload with the id that has been deleted
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== action.payload),
                allJobs: state.allJobs.filter(job => job.id !== action.payload)
            }
        case ADD_JOB:
            return {
                ...state,
                jobs: [...state.jobs, action.payload],
                allJobs: [...state.allJobs, action.payload]
            }
        case UPDATE_JOB:
        // probally not a good way of updating the state value but i couldnt work out a better way
          return {
            ...state,
            jobs: updateStateInfo(state.jobs, action),
            allJobs: updateStateInfo(state.allJobs, action)
          }
        default:
            return state
    }
}