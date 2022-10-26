import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

const getDataSelector = (state : AppStateType) => {
    return state.auth.data
}

export const getAuthData = createSelector(getDataSelector, (data) => {
    return data
})

const getIsAuthSelector = (state : AppStateType) => {
    return state.auth.isAuth
}

export const getIsAuth = createSelector(getIsAuthSelector, (isAuth) => {
    return isAuth
})

const getCaptchaSelector = (state : AppStateType) => {
    return state.auth.captcha
}

export const getCaptcha = createSelector(getCaptchaSelector, (captcha) => {
    return captcha
})

const getAthErrorSelector = (state : AppStateType) => {
    return state.auth.authError
}

export const getAuthError = createSelector(getAthErrorSelector, (authError) => {
    return authError
})