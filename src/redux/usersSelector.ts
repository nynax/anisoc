import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

const getUsersSelector = (state : AppStateType) => {
    return state.pageUsers.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users
})

const getFollowInProgressSelector = (state: AppStateType) => {
    return state.pageUsers.followInProgress
}

export const getFollowInProgress = createSelector(getFollowInProgressSelector, (followInProgress) => {
    return followInProgress
})

const getShowPreloaderSelector = (state: AppStateType) => {
    return state.pageUsers.showPreloader
}

export const getShowPreloader = createSelector(getShowPreloaderSelector, (showPreloader) => {
    return showPreloader
})

const getUsersPerPageSelector = (state: AppStateType) => {
    return state.pageUsers.usersPerPage
}

export const getUsersPerPage = createSelector(getUsersPerPageSelector, (usersPerPage) => {
    return usersPerPage
})

const getCurrentPageSelector = (state: AppStateType) => {
    return state.pageUsers.currentPage
}

export const getCurrentPage = createSelector(getCurrentPageSelector, (currentPage) => {
    return currentPage
})

const getTotalUsersSelector = (state: AppStateType) => {
    return state.pageUsers.totalUsers
}

export const getTotalUsers = createSelector(getTotalUsersSelector, (totalUsers) => {
    return totalUsers
})

const getLastQuerySelector = (state: AppStateType) => {
    return state.pageUsers.lastQuery
}

export const getLastQuery = createSelector(getLastQuerySelector, (lastQuery) => {
    return lastQuery
})

