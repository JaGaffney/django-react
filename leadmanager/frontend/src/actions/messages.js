import { CREATE_MESSAGE, GET_ERRORS } from './types'

// CREATE MESSAGE
// not connecting to a server or api doesnt need a dispatch or axios(fetch)
export const createMessage = msg => {
    return {
        type: CREATE_MESSAGE,
        payload: msg
    }
}

// RETURN ERRORS
export const returnErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    }
}