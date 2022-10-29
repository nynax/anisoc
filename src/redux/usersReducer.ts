import produce from "immer";
import {ApiCodesEnum, requestAPI} from "../api/api";
import {UserType} from "../types/types";
import {Dispatch} from "redux";

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
export type UsersStateType = InitialStateType

export const usersReducer = (state = initialState, action : ActionsType) : InitialStateType => {
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

type FollowACType = {
    type: typeof FOLLOW
    userId: number
}

type UnfollowACType = {
    type: typeof UNFOLLOW
    userId: number
}

type SetUsersACType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

type SetTotalUsersACType = {
    type: typeof SET_TOTAL_USERS
    totalUsers: number
}

type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export type CallPreloaderACType = {
    type: typeof CALL_PRELOADER
    showPreloader: boolean
}

type SetFollowInProgressACType = {
    type: typeof SET_FOLLOW_IN_PROGRESS
    userId: number
}

type ActionsType = FollowACType | UnfollowACType | SetUsersACType | SetTotalUsersACType | SetCurrentPageACType | CallPreloaderACType | SetFollowInProgressACType

//ACs
const followAC = (userId : number) : FollowACType => ({type: FOLLOW, userId})
const unfollowAC = (userId : number) : UnfollowACType => ({type: UNFOLLOW, userId})
const setUsersAC = (users : Array<UserType>) : SetUsersACType => ({type: SET_USERS, users})
const setTotalUsersAC = (totalUsers : number) : SetTotalUsersACType => ({type: SET_TOTAL_USERS, totalUsers})
const setCurrentPageAC = (currentPage : number) : SetCurrentPageACType => ({type: SET_CURRENT_PAGE, currentPage})
export const callPreloaderAC = (showPreloader : boolean) : CallPreloaderACType => ({type: CALL_PRELOADER, showPreloader})
const setFollowInProgressAC = (userId : number) : SetFollowInProgressACType => ({type: SET_FOLLOW_IN_PROGRESS, userId})


//Thunks
export type SetFollowInProgressType = (userId : number) =>  any
export const setFollowInProgress : SetFollowInProgressType = (userId : number) => (dispatch:Dispatch<ActionsType>) => {
    return dispatch(setFollowInProgressAC(userId))
}

export type RequestUsersType = (usersPerPage : number, currentPage : number) => any
export const requestUsers : RequestUsersType = (usersPerPage : number, currentPage : number) => {
    return async (dispatch : Dispatch<ActionsType>) => {
        dispatch(callPreloaderAC(true))

        let resData = await requestAPI.getUsers(usersPerPage, currentPage)
        dispatch(callPreloaderAC(false))
        dispatch(setUsersAC(resData.items))
        dispatch(setTotalUsersAC(resData.totalCount))
    }
}

export type ChangePageType = (pageNumber : number) => (dispatch: Dispatch<ActionsType>) => any
export const changePage : ChangePageType  = (pageNumber : number) => {
    return (dispatch : Dispatch<ActionsType>) => {
        dispatch(setCurrentPageAC(pageNumber))
        dispatch(requestUsers(initialState.usersPerPage, pageNumber))
    }
}

export type FollowAndUnfollowType = (isFollow : boolean, userId : number) => (dispatch: Dispatch<ActionsType>) => any
export const followAndUnfollow : FollowAndUnfollowType = (isFollow : boolean, userId : number) => {
    return async (dispatch : Dispatch<ActionsType>) => {
        dispatch(setFollowInProgressAC(userId))
        if (isFollow){
            let resData = await requestAPI.follow(userId)

            if (resData.resultCode === ApiCodesEnum.Success) {
                console.log('follow')
                dispatch(followAC(userId))
            }
            dispatch(setFollowInProgressAC(userId))

        }else{
            let resData = await requestAPI.unfollow(userId)

            if (resData.resultCode === ApiCodesEnum.Success) {
                console.log('unfollow')
                dispatch(unfollowAC(userId))
            }
            dispatch(setFollowInProgressAC(userId))
        }
    }
}