import {createSelector} from "reselect";

const getDataSelector = (state) => {
    return state.auth.data
}

export const getAuthData = createSelector(getDataSelector, (data) => {
    return data
})

const getIsAuthSelector = (state) => {
    return state.auth.isAuth
}

export const getIsAuth = createSelector(getIsAuthSelector, (isAuth) => {
    return isAuth
})