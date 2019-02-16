import { GET_USERS  } from '../actions/types.js'

const initialState = {
    users: []
}

export default function(state = initialState, action) {
    // common convetion is to use a switch with cases
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}