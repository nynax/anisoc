import produce from "immer"
import {requestAPI} from "../api/api";
import {callPreloader, CallPreloaderType} from "./usersReducer";
import {DataType} from "../types/types";
import {Dispatch} from "redux";

const SET_USER_DATA = 'AUTH/SET_USER_DATA'
const SET_AUTH_ERROR = 'AUTH/SET_AUTH_ERROR'
const SET_CAPTCHA = 'AUTH/SET_CAPTCHA'

export type InitAuthType = {
    isAuth: boolean
    authError: string | null
    captcha: string | null
}

type InitDataType = {
    data: DataType
}

type InitStateType = InitAuthType & InitDataType

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
    data: DataType,
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

type ActionsType = SetAuthDataACType | SetAuthErrorACType | SetCaptchaACType | CallPreloaderType

//ACs
const setAuthDataAC = (data:DataType, isAuth : boolean) : SetAuthDataACType => ({type: SET_USER_DATA, data: data, isAuth: isAuth})
const setAuthErrorAC = (errorMsg : string|null) : SetAuthErrorACType => ({type: SET_AUTH_ERROR, errorMsg})
const setCaptchaAC = (captchaUrl : string|null) : SetCaptchaACType => ({type: SET_CAPTCHA, captchaUrl})

//Thunks
export const setAuthData : () => any = () => (dispatch : Dispatch<ActionsType>) => {
    return requestAPI.authMe().then(response => {
        if (response.data.resultCode === 0){
            dispatch(setAuthDataAC(response.data.data, true))
        }
    })
}

export type SetAuthErrorType = (errorMsg: string | null) => (dispatch: Dispatch<ActionsType>) => any

export const setAuthError : SetAuthErrorType = (errorMsg:string|null) => (dispatch:Dispatch<ActionsType>) => {
    return dispatch(setAuthErrorAC(errorMsg))
}

export type SetCaptchaType = (captchaUrl: string | null) => (dispatch: Dispatch<ActionsType>) => any

export const setCaptcha : SetCaptchaType = (captchaUrl:string|null) => (dispatch:Dispatch<ActionsType>) => {
    return dispatch(setCaptchaAC(captchaUrl))
}

export type LoginMeType =  (email: string, password: string, rememberMe: boolean, captcha: string | null) => (dispatch: Dispatch<ActionsType>) => any

export const loginMe : LoginMeType = (email:string, password:string, rememberMe = false, captcha:string|null) => {
    return (dispatch:Dispatch<ActionsType>) => {
        dispatch(callPreloader(true))
        dispatch(setCaptchaAC(null))
        requestAPI.authLogin(email, password, rememberMe, captcha).then(response => {
            if (response.data.resultCode === 0){
                dispatch(setAuthData())
            }else{
                // if captcha error, do request for image with captcha code
                if (response.data.messages[0] === "Incorrect anti-bot symbols"){
                    requestAPI.getCaptcha().then(response => {
                        console.log(response)
                        dispatch(setCaptchaAC(response.data.url))
                    })
                }
                dispatch(setAuthErrorAC(response.data.messages[0]))
            }
            dispatch(callPreloader(false))
        })
    }
}

export const logoutMe = () => {
    return (dispatch:Dispatch<ActionsType>) => {
        requestAPI.authLogout().then(response => {
            if (response.data.resultCode === 0){
                dispatch(setAuthDataAC(initialState.data, false ))
            }
        })
        dispatch(callPreloader(false))
    }
}