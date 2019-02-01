import { combineReducers } from 'redux'
import leads from './leads'
import errors from './errors'
import messages from './messages'

// can be like 
// leads: leads
// or 
// leads
// as the key is the same as the gfield
export default combineReducers( {
    leads: leads,
    errors,
    messages
})