import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";

const getPageProfilePostsSelector = (state : AppStateType) => {
    return state.pageProfile.posts
}

export const getPageProfilePosts = createSelector(getPageProfilePostsSelector, (pageProfilePosts) => {
    return pageProfilePosts
})

const getPageProfileProfileSelector = (state : AppStateType) => {
    return state.pageProfile.profile
}

export const getPageProfileProfile = createSelector(getPageProfileProfileSelector, (pageProfileProfile) => {
    return pageProfileProfile
})

const getPageProfileStatusSelector = (state : AppStateType) => {
    return state.pageProfile.status
}

export const getPageProfileStatus = createSelector(getPageProfileStatusSelector, (pageProfileStatus) => {
    return pageProfileStatus
})

const getPageProfileErrorSelector = (state : AppStateType) => {
    return state.pageProfile.profileError
}

export const getPageProfileError = createSelector(getPageProfileErrorSelector, (pageProfileError) => {
    return pageProfileError
})