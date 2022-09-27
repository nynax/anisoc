import produce from "immer"
import {requestAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    data: {
        "id": null,
        "login": null,
        "email": null
    },
    'isAuth': false
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return produce(state, draft => {
                draft.data = action.data
                draft.isAuth = true
            })
        default:
            return state
    }
}

export const setAuthDataAC = (data) => ({type: SET_USER_DATA, data: data})

export const setAuthData = () => {
    return (dispatch) => {
        requestAPI.authMe().then(response => {
            if (response.data.resultCode === 0){
                dispatch(setAuthDataAC(response.data.data))
            }
        })
    }
}