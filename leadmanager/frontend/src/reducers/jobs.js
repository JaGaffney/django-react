import { GET_JOBS, DELETE_JOB, ADD_JOB  } from '../actions/types.js'

const initialState = {
    jobs: []
}

export default function(state = initialState, action) {
    // common convetion is to use a switch with cases
    switch(action.type) {
        case GET_JOBS:
            return {
                ...state,
                jobs: action.payload
            }
        case DELETE_JOB:
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== action.payload)
            }
        case ADD_JOB:
            return {
                ...state,
                jobs: [...state.jobs, action.payload]
            }
        default:
            return state
    }
}