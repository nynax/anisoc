import produce from "immer";
import {ApiCodesEnum, requestAPI} from "../api/api";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {InferActionsTypes} from "./reduxStore";

const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const SET_USERS = 'USERS/SET_USERS'
const SET_TOTAL_USERS = 'USERS/SET_TOTAL_USERS'
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE'
const CALL_PRELOADER = 'USERS/CALL_PRELOADER'
const SET_FOLLOW_IN_PROGRESS = 'USERS/SET_FOLLOW_IN_PROGRESS'
const SET_LAST_QUERY = 'USERS/SET_LAST_QUERY'


let initialState = {
    users: [] as Array<UserType>,
    totalUsers: 0,
    currentPage: 1,
    usersPerPage: 20,
    showPreloader: false,
    followInProgress: [] as Array<number>,
    lastQuery: {page: 1, term: '', friend:'null' as 'null' | 'false' | 'true', query: false}
}

type LastQueryType = typeof initialState.lastQuery
type InitialStateType = typeof initialState
//export type UsersStateType = InitialStateType

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
                let i = draft.followInProgress.indexOf(action.userId); //search index by value
                if(i >= 0) {
                    draft.followInProgress.splice(i,1);//remove one element
                }else{
                    draft.followInProgress.splice(0, 0, action.userId)//adding...
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
        case SET_LAST_QUERY:
            return produce(state, draft => {
                draft.lastQuery = action.lastQuery
            })
        default:
            //debugger
            return state
    }
}

//Create type by Object [actions] structure
type ActionsType = InferActionsTypes<typeof actions>

//ACs
const actions = {
    followAC: (userId : number) => ({type: FOLLOW, userId} as const),
    unfollowAC: (userId : number) => ({type: UNFOLLOW, userId} as const),
    setUsersAC: (users : Array<UserType>) => ({type: SET_USERS, users} as const),
    setTotalUsersAC: (totalUsers : number) => ({type: SET_TOTAL_USERS, totalUsers} as const),
    setCurrentPageAC: (currentPage : number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    callPreloaderAC: (showPreloader : boolean) => ({type: CALL_PRELOADER, showPreloader} as const),
    setFollowInProgressAC: (userId : number) => ({type: SET_FOLLOW_IN_PROGRESS, userId} as const),
    setLastQueryAC: (lastQuery : LastQueryType ) => ({type: SET_LAST_QUERY, lastQuery} as const)
}

export const callPreloaderAC = actions.callPreloaderAC;

//Thunks
/*export type SetFollowInProgressType = (userId : number) => (dispatch:Dispatch<ActionsType>) =>  any
const setFollowInProgress : SetFollowInProgressType = (userId) => (dispatch) => {
    return dispatch(actions.setFollowInProgressAC(userId))
}*/

export type RequestUsersType = (page : number, term : string, friend : 'null' | 'false' | 'true') => any
export const requestUsers : RequestUsersType = (page, term= '', friend= 'null') => {
    //debugger
    return async (dispatch : Dispatch<ActionsType>) => {
        dispatch(callPreloaderAC(true))
        //dispatch(actions.setLastQueryAC({page, term, friend, query:true}))
        //dispatch(actions.setCurrentPageAC(currentPage))

        let resData = await requestAPI.getUsers(initialState.usersPerPage, page, term, friend)
        dispatch(callPreloaderAC(false))

        dispatch(actions.setUsersAC(resData.items))
        dispatch(actions.setTotalUsersAC(resData.totalCount))
    }
}

//Don't need dispatch(requestUsers...), because using useEffect in UserContainer
export type SetLastQueryType = (page : number, term : string, friend : 'null' | 'false' | 'true', query? : boolean) => any
export const setLastQuery : SetLastQueryType  = (page, term, friend, query = true) => {
    //debugger
    return (dispatch : Dispatch<ActionsType>) => {
        //let lastQuery = {...getState().pageUsers.lastQuery}
       /* if (term === false) {
            term = lastQuery.term
        }
        if (friend === false) {
            friend = lastQuery.friend
        }*/

        dispatch(actions.setLastQueryAC({page, term, friend, query}))
        //debugger
        //dispatch(actions.setCurrentPageAC(pageNumber))
    }
}

export type FollowAndUnfollowType = (isFollow : boolean, userId : number) => any
export const followAndUnfollow : FollowAndUnfollowType = (isFollow, userId) => {
    return async (dispatch : Dispatch<ActionsType>) => {
        dispatch(actions.setFollowInProgressAC(userId))
        if (isFollow){
            let resData = await requestAPI.follow(userId)

            if (resData.resultCode === ApiCodesEnum.Success) {
                console.log('follow')
                dispatch(actions.followAC(userId))
            }
            dispatch(actions.setFollowInProgressAC(userId))

        }else{
            let resData = await requestAPI.unfollow(userId)

            if (resData.resultCode === ApiCodesEnum.Success) {
                console.log('unfollow')
                dispatch(actions.unfollowAC(userId))
            }
            dispatch(actions.setFollowInProgressAC(userId))
        }
    }
}