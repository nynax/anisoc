import produce from "immer"
import {requestAPI} from "../api/api";
import {callPreloader} from "./usersReducer";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_AUTH_ERROR = 'SET_AUTH_ERROR'
const SET_CAPTCHA = 'SET_CAPTCHA'


let initialState = {
    data: {
        id: null,
        login: null,
        email: null
    },
    isAuth: false,
    authError: null,
    captcha: null
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return produce(state, draft => {
                draft.data = action.data
                draft.isAuth = action.isAuth
            })
        case SET_AUTH_ERROR:
            return produce(state, draft => {
                draft.authError = action.errorMsg
            })
        case SET_CAPTCHA:
            return produce(state, draft => {
                draft.captcha = action.captchaUrl
            })
        default:
            return state
    }
}

export const setAuthDataAC = (data, isAuth) => ({type: SET_USER_DATA, data: data, isAuth: isAuth})
export const setAuthErrorAC = (errorMsg) => ({type: SET_AUTH_ERROR, errorMsg})
export const setCaptchaAC = (captchaUrl) => ({type: SET_CAPTCHA, captchaUrl})

export const setAuthData = () => (dispatch) => {

        return requestAPI.authMe().then(response => {
            if (response.data.resultCode === 0){
                dispatch(setAuthDataAC(response.data.data, true))
            }
        })
}

export const setAuthError = (errorMsg) => (dispatch) => {
    return dispatch(setAuthErrorAC(errorMsg))
}

export const setCaptcha = (captchaUrl) => (dispatch) => {
    return dispatch(setCaptchaAC(captchaUrl))
}

export const login = (email, password, rememberMe = false, captcha) => {

    return (dispatch) => {
        dispatch(callPreloader(true))
        dispatch(setCaptcha(null))
        requestAPI.authLogin(email, password, rememberMe, captcha).then(response => {
            if (response.data.resultCode === 0){
                dispatch(setAuthData())
            }else{
                // if captcha error, do request for image with captcha code
                if (response.data.messages[0] === "Incorrect anti-bot symbols"){
                    requestAPI.getCaptcha().then(response => {
                        console.log(response)
                        dispatch(setCaptcha(response.data.url))
                    })
                }
                dispatch(setAuthError(response.data.messages[0]))

            }
            dispatch(callPreloader(false))
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
        dispatch(callPreloader(false))
    }
}