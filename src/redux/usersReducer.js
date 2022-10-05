import produce from "immer";
import {requestAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_USERS = 'SET_TOTAL_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const CALL_PRELOADER = 'CALL_PRELOADER'
const SET_FOLLOW_IN_PROGRESS = 'SET_FOLLOW_IN_PROGRESS'

let initialState = {
    users: [],
    totalUsers: 0,
    currentPage: 1,
    usersPerPage: 20,
    showPreloader: true,
    followInProgress: []
}

export const usersReducer = (state = initialState, action) => {
    //debugger
    switch (action.type){

        case FOLLOW:
           return produce(state, draft => {
                draft.users.map(x => {
                    if (x.id === action.userId){
                        x.followed = true
                    }
                    return x
                })

            })
        case UNFOLLOW:
            return produce(state, draft => {
                draft.users.map(x => {
                    if (x.id === action.userId){
                        x.followed = false
                    }
                    return x
                })
            })
        case SET_FOLLOW_IN_PROGRESS:
            return produce(state, draft => {
                let i = draft.followInProgress.indexOf(action.userId); //ищем индекс по значению
                if(i >= 0) {
                    draft.followInProgress.splice(i,1);//удаляем 1 элемент
                }else{
                    draft.followInProgress.splice(0, 0, action.userId)//добавляем...
                }
            })
        case SET_USERS:
            return produce(state, draft => {
                draft.users = action.users
            })
        case SET_TOTAL_USERS:
            return produce(state, draft => {
                draft.totalUsers = action.totalUsers
            })
        case SET_CURRENT_PAGE:
            return produce(state, draft => {
                draft.currentPage = action.currentPage
            })
        case CALL_PRELOADER:
            return produce(state, draft => {
                draft.showPreloader = action.showPreloader
            })
        default:
            //debugger
            return state
    }
}

export const follow = (userId) => ({type: FOLLOW, userId})
export const unfollow = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setTotalUsers = (totalUsers) => ({type: SET_TOTAL_USERS, totalUsers})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const callPreloader = (showPreloader) => ({type: CALL_PRELOADER, showPreloader})
export const setFollowInProgress = (userId) => ({type: SET_FOLLOW_IN_PROGRESS, userId})


//thunks
export const requestUsers = (usersPerPage, currentPage) => {
    return (dispatch) => {
        dispatch(callPreloader(true))
        requestAPI.getUsers(usersPerPage, currentPage).then(response => {
            dispatch(callPreloader(false))
            dispatch(setUsers(response.data.items))
            dispatch(setTotalUsers(response.data.totalCount))
        })
    }
}

export const changePage = (pageNumber) => {
    return (dispatch) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(requestUsers(initialState.usersPerPage, pageNumber))
    }
}

export const followAndUnfollow = (isFollow, userId) => {
    return (dispatch) => {
        dispatch(setFollowInProgress(userId))
        if (isFollow){
            requestAPI.follow(userId).then(response => {
                if (response.data.resultCode === 0) {
                    console.log('follow')
                    dispatch(follow(userId))
                }
                dispatch(setFollowInProgress(userId))
            })
        }else{
            requestAPI.unfollow(userId).then(response => {
                if (response.data.resultCode === 0) {
                    console.log('unfollow')
                    dispatch(unfollow(userId))
                }
                dispatch(setFollowInProgress(userId))
            })
        }

    }
}