import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ALL_LEADS } from '../actions/types.js'

const initialState = {
    leads: [],
    allLeads: []
}

export default function(state = initialState, action) {
    // common convetion is to use a switch with cases
    switch(action.type) {
        case GET_LEADS:
            return {
                ...state,
                leads: action.payload
            }
        case GET_ALL_LEADS:
            return {
                ...state,
                allLeads: action.payload
            }
        case DELETE_LEAD:
            return {
                ...state,
                leads: state.leads.filter(lead => lead.id !== action.payload),
                allLeads: state.allLeads.filter(lead => lead.id !== action.payload)
            }
        case ADD_LEAD:
            return {
                ...state,
                leads: [...state.leads, action.payload],
                allLeads: [...state.allLeads, action.payload]
            }
        default:
            return state
    }
}