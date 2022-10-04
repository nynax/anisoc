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
                draft.isAuth = action.isAuth
            })
        default:
            return state
    }
}

export const setAuthDataAC = (data, isAuth) => ({type: SET_USER_DATA, data: data, isAuth: isAuth})

export const setAuthData = () => (dispatch) => {

        return requestAPI.authMe().then(response => {
            if (response.data.resultCode === 0){
                dispatch(setAuthDataAC(response.data.data, true))
            }
        })

}

export const login = (email, password, rememberMe = false) => {
    return (dispatch) => {
        requestAPI.authLogin(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0){
                dispatch(setAuthData())
            }
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        requestAPI.authLogout().then(response => {
            if (response.data.resultCode === 0){
                dispatch(setAuthDataAC(initialState.data, false ))
            }
        })
    }
}