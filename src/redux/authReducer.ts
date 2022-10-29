import produce from "immer"
import {ApiCodesEnum, requestAPI} from "../api/api";
import {callPreloaderAC, CallPreloaderACType} from "./usersReducer";
import {AuthDataType, AuthType} from "../types/types";
import {Dispatch} from "redux";

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

type SetAuthDataACType = {
    type: typeof SET_USER_DATA,
    data: AuthDataType,
    isAuth: boolean
}

type SetAuthErrorACType = {
    type: typeof SET_AUTH_ERROR,
    errorMsg: string | null
}

type SetCaptchaACType = {
    type: typeof SET_CAPTCHA,
    captchaUrl: string | null
}

type ActionsType = SetAuthDataACType | SetAuthErrorACType | SetCaptchaACType | CallPreloaderACType

//ACs
const setAuthDataAC = (data:AuthDataType, isAuth : boolean) : SetAuthDataACType => ({type: SET_USER_DATA, data: data, isAuth: isAuth})
const setAuthErrorAC = (errorMsg : string|null) : SetAuthErrorACType => ({type: SET_AUTH_ERROR, errorMsg})
const setCaptchaAC = (captchaUrl : string|null) : SetCaptchaACType => ({type: SET_CAPTCHA, captchaUrl})

//Thunks
export const setAuthData : () => any = () => async (dispatch : Dispatch<ActionsType>) => {

    let resData = await requestAPI.authMe()
    if (resData.resultCode === ApiCodesEnum.Success){
        dispatch(setAuthDataAC(resData.data, true))
    }
}

export type SetAuthErrorType = (errorMsg: string | null) => any
export const setAuthError : SetAuthErrorType = (errorMsg:string|null) => (dispatch:Dispatch<ActionsType>) => {
    return dispatch(setAuthErrorAC(errorMsg))
}

export type SetCaptchaType = (captchaUrl: string | null) => any
export const setCaptcha : SetCaptchaType = (captchaUrl:string|null) => (dispatch:Dispatch<ActionsType>) => {
    return dispatch(setCaptchaAC(captchaUrl))
}

export type LoginMeType =  (email: string, password: string, rememberMe: boolean, captcha: string | null) => any
export const loginMe : LoginMeType = (email:string, password:string, rememberMe = false, captcha:string|null) => {
    return async (dispatch:Dispatch<ActionsType>) => {
        dispatch(callPreloaderAC(true))
        dispatch(setCaptchaAC(null))

        let resData = await requestAPI.authLogin(email, password, rememberMe, captcha)
        if (resData.resultCode === ApiCodesEnum.Success){
            dispatch(setAuthData())
        }else{
            // if captcha error, do request for image with captcha code
            if (resData.messages[0] === "Incorrect anti-bot symbols"){
                let resCaptcha = await requestAPI.getCaptcha()
                    dispatch(setCaptchaAC(resCaptcha.url))
            }
            dispatch(setAuthErrorAC(resData.messages[0]))
        }
        dispatch(callPreloaderAC(false))
    }
}

export const logoutMe : () => void = () => {
    return async (dispatch:Dispatch<ActionsType>) => {

        let resData = await requestAPI.authLogout()
        if (resData.resultCode === ApiCodesEnum.Success){
            dispatch(setAuthDataAC(initialState.data, false ))
        }
        dispatch(callPreloaderAC(false))
    }
}