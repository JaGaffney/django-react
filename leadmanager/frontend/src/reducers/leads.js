import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ALL_LEADS, UPDATE_LEAD } from '../actions/types.js'

const initialState = {
    leads: [],
    allLeads: []
}

// set job
let updateStateInfo = (stateArray, action) => {
  let updatedLead = []
  stateArray.filter(lead => {
    if (lead.id === action.payload.id) {
      updatedLead = [...updatedLead, action.payload]
    } else {
      updatedLead = [...updatedLead, lead]
    }
  })
  return updatedLead
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
        case UPDATE_LEAD:
        // probally not a good way of updating the state value but i couldnt work out a better way
          return {
            ...state,
            leads: updateStateInfo(state.leads, action),
            allLeads: updateStateInfo(state.allLeads, action)
          }
        default:
            return state
    }
}