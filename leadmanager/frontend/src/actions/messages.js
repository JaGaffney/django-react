import { CREATE_MESSAGE } from './types'

// CREATE MESSAGE
// not connecting to a server or api doesnt need a dispatch or axios(fetch)
export const createMessage = msg => {
    return {
        type: CREATE_MESSAGE,
        payload: msg
    }
}