import axios from "axios";
import { returnError } from './messages'
import { tokenConfig } from './auth'

import { GET_USERS} from "./types";


export const getUsers = () => (dispatch, getState) => {
    axios
        .get("/api/auth/userlist", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnError(err.response.data, err.response.status)));
}