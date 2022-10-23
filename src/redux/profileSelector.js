import {createSelector} from "reselect";

const getPageProfilePostsSelector = (state) => {
    return state.pageProfile.posts
}

export const getPageProfilePosts = createSelector(getPageProfilePostsSelector, (pageProfilePosts) => {
    return pageProfilePosts
})

const getPageProfileProfileSelector = (state) => {
    return state.pageProfile.profile
}

export const getPageProfileProfile = createSelector(getPageProfileProfileSelector, (pageProfileProfile) => {
    return pageProfileProfile
})

const getPageProfileStatusSelector = (state) => {
    return state.pageProfile.status
}

export const getPageProfileStatus = createSelector(getPageProfileStatusSelector, (pageProfileStatus) => {
    return pageProfileStatus
})

const getPageProfileErrorSelector = (state) => {
    return state.pageProfile.profileError
}

export const getPageProfileError = createSelector(getPageProfileErrorSelector, (pageProfileError) => {
    return pageProfileError
})