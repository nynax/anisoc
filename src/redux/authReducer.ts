import produce from "immer"
import {ApiCodesEnum, requestAPI} from "../api/api";
import {callPreloaderAC} from "./usersReducer";
import {AuthDataType, AuthType} from "../types/types";
import {Dispatch} from "redux";
import {InferActionsTypes} from "./reduxStore";

const SET_USER_DATA = 'AUTH/SET_USER_DATA'
const SET_AUTH_ERROR = 'AUTH/SET_AUTH_ERROR'
const SET_CAPTCHA = 'AUTH/SET_CAPTCHA'

type InitDataType = {
    data: AuthDataType
}

type InitStateType = AuthType & InitDataType

let initialState: InitStateType = {
    data: {
        id: null,
        login: null,
        email: null
    },
    isAuth: false,
    authError: null,
    captcha: null
}

export const authReducer = (state = initialState, action : ActionsType) : InitStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            //debugger
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

//ACs
export const actions = {
    setAuthDataAC: (data:AuthDataType, isAuth : boolean) => ({type: SET_USER_DATA, data: data, isAuth: isAuth} as const),
    setAuthErrorAC: (errorMsg : string|null)  => ({type: SET_AUTH_ERROR, errorMsg} as const),
    setCaptchaAC: (captchaUrl : string|null)  => ({type: SET_CAPTCHA, captchaUrl} as const),
    callPreloaderAC: callPreloaderAC
}

//Create type by Object [actions] structure
type ActionsType = InferActionsTypes<typeof actions>

//Thunks
export const setAuthData : () => any = () => async (dispatch : Dispatch<ActionsType>) => {

    let resData = await requestAPI.authMe()
    if (resData.resultCode === ApiCodesEnum.Success){
        dispatch(actions.setAuthDataAC(resData.data, true))
    }
}

export type SetAuthErrorType = (errorMsg: string | null) => any
export const setAuthError : SetAuthErrorType = (errorMsg) => (dispatch:Dispatch<ActionsType>) => {
    return dispatch(actions.setAuthErrorAC(errorMsg))
}

export type SetCaptchaType = (captchaUrl: string | null) => any
export const setCaptcha : SetCaptchaType = (captchaUrl) => (dispatch:Dispatch<ActionsType>) => {
    return dispatch(actions.setCaptchaAC(captchaUrl))
}

export type LoginMeType =  (email: string, password: string, rememberMe: boolean, captcha: string | null) => any
export const loginMe : LoginMeType = (email, password, rememberMe = false, captcha) => {
    return async (dispatch:Dispatch<ActionsType>) => {
        dispatch(actions.callPreloaderAC(true))
        dispatch(actions.setCaptchaAC(null))

        let resData = await requestAPI.authLogin(email, password, rememberMe, captcha)
        if (resData.resultCode === ApiCodesEnum.Success){
            dispatch(setAuthData())
        }else{
            // if captcha error, do request for image with captcha code
            if (resData.messages[0] === "Incorrect anti-bot symbols"){
                let resCaptcha = await requestAPI.getCaptcha()
                    dispatch(actions.setCaptchaAC(resCaptcha.url))
            }
            dispatch(actions.setAuthErrorAC(resData.messages[0]))
        }
        dispatch(actions.callPreloaderAC(false))
    }
}

export const logoutMe : () => void = () => {
    return async (dispatch:Dispatch<ActionsType>) => {

        let resData = await requestAPI.authLogout()
        if (resData.resultCode === ApiCodesEnum.Success){
            dispatch(actions.setAuthDataAC(initialState.data, false ))
        }
        dispatch(actions.callPreloaderAC(false))
    }
}