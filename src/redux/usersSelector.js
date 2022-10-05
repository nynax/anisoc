import {createSelector} from "reselect";

const getUsersSelector = (state) => {
    return state.pageUsers.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users
})

const getFollowInProgressSelector = (state) => {
    return state.pageUsers.followInProgress
}

export const getFollowInProgress = createSelector(getFollowInProgressSelector, (followInProgress) => {
    return followInProgress
})

const getShowPreloaderSelector = (state) => {
    return state.pageUsers.showPreloader
}

export const getShowPreloader = createSelector(getShowPreloaderSelector, (showPreloader) => {
    return showPreloader
})

const getUsersPerPageSelector = (state) => {
    return state.pageUsers.usersPerPage
}

export const getUsersPerPage = createSelector(getUsersPerPageSelector, (usersPerPage) => {
    return usersPerPage
})

const getCurrentPageSelector = (state) => {
    return state.pageUsers.currentPage
}

export const getCurrentPage = createSelector(getCurrentPageSelector, (currentPage) => {
    return currentPage
})

const getTotalUsersSelector = (state) => {
    return state.pageUsers.totalUsers
}

export const getTotalUsers = createSelector(getTotalUsersSelector, (totalUsers) => {
    return totalUsers
})

