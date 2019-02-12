import { combineReducers } from 'redux'
import leads from './leads'
import jobs from './jobs'
import errors from './errors'
import messages from './messages'
import auth from './auth'

// can be like 
// leads: leads
// or 
// leads
// as the key is the same as the gfield
export default combineReducers( {
    leads: leads,
    jobs,
    errors,
    messages,
    auth
})