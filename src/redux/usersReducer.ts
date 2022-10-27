import produce from "immer";
import {requestAPI} from "../api/api";
import {UserType} from "../types/types";

const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const SET_USERS = 'USERS/SET_USERS'
const SET_TOTAL_USERS = 'USERS/SET_TOTAL_USERS'
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE'
const CALL_PRELOADER = 'USERS/CALL_PRELOADER'
const SET_FOLLOW_IN_PROGRESS = 'USERS/SET_FOLLOW_IN_PROGRESS'


let initialState = {
    users: [] as Array<UserType>,
    totalUsers: 0,
    currentPage: 1,
    usersPerPage: 20,
    showPreloader: false,
    followInProgress: [] as Array<number>
}

type InitialStateType = typeof initialState

export const usersReducer = (state = initialState, action : any):InitialStateType => {
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

type FollowType = {
    type: typeof FOLLOW
    userId: number
}

type UnfollowType = {
    type: typeof UNFOLLOW
    userId: number
}

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<number>
}

type SetTotalUsersType = {
    type: typeof SET_TOTAL_USERS
    totalUsers: number
}

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export type CallPreloaderType = {
    type: typeof CALL_PRELOADER
    showPreloader: boolean
}

type SetFollowInProgressType = {
    type: typeof SET_FOLLOW_IN_PROGRESS
    userId: number
}

//ACs
export const follow = (userId : number) : FollowType => ({type: FOLLOW, userId})
export const unfollow = (userId : number) : UnfollowType => ({type: UNFOLLOW, userId})
export const setUsers = (users : Array<number>) : SetUsersType => ({type: SET_USERS, users})
export const setTotalUsers = (totalUsers : number) : SetTotalUsersType => ({type: SET_TOTAL_USERS, totalUsers})
export const setCurrentPage = (currentPage : number) : SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})
export const callPreloader = (showPreloader : boolean) : CallPreloaderType => ({type: CALL_PRELOADER, showPreloader})
export const setFollowInProgress = (userId : number) : SetFollowInProgressType => ({type: SET_FOLLOW_IN_PROGRESS, userId})


//thunks
export const requestUsers = (usersPerPage : number, currentPage : number) => {
    return (dispatch : any) => {
        dispatch(callPreloader(true))
        requestAPI.getUsers(usersPerPage, currentPage).then(response => {
            dispatch(callPreloader(false))
            dispatch(setUsers(response.data.items))
            dispatch(setTotalUsers(response.data.totalCount))
        })
    }
}

export const changePage = (pageNumber : number) => {
    return (dispatch : any) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(requestUsers(initialState.usersPerPage, pageNumber))
    }
}

export const followAndUnfollow = (isFollow : boolean, userId : number) => {
    return (dispatch : any) => {
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