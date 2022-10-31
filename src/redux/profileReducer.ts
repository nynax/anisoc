import produce from "immer";
import {ApiCodesEnum, requestAPI} from "../api/api";
import {callPreloaderAC} from "./usersReducer";
import {PhotoType, PostsType, ProfileType} from "../types/types";
import {Dispatch} from "redux";
import {InferActionsTypes} from "./reduxStore";

const ADD_POST = 'PROFILE/ADD-POST'
const SET_CURRENT_PROFILE = 'PROFILE/SET_CURRENT_PROFILE'
const SET_STATUS = 'PROFILE/SET_STATUS'
const SET_PHOTOS = 'PROFILE/SET_PHOTOS'
const SET_PROFILE_ERROR = 'PROFILE/SET_PROFILE_ERROR'

let initialState = {
    posts: [
        {id: 1, msg: "Hello", likes: 3},
        {id: 2, msg: "Fuck you", likes: 5},
        {id: 3, msg: "I need help", likes: 7},
        {id: 4, msg: "My name is Victor", likes: 12},
        {id: 5, msg: "Iam fine", likes: 1},
        {id: 6, msg: "Lets go", likes: 4},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: null as string | null,
    profileError: null as string | null,
}

export type ProfileInitialStateType = typeof initialState

export const profileReducer = (state = initialState, action : ActionsType) : ProfileInitialStateType => {

    switch (action.type){
        case ADD_POST:
            let newPost = {
                id: 7,
                msg: action.postMsg,
                likes: 0
            }
            return produce(state, draft => {
                draft.posts.push(newPost)
            })
        case SET_CURRENT_PROFILE:
            return produce(state, draft => {
                draft.profile = action.currentProfile
            })
        case SET_PHOTOS:
            return produce(state, draft => {
                if (draft.profile !== null){
                    draft.profile.photos = action.photos
                }
            })
        case SET_STATUS:
            return produce(state, draft => {
                draft.status = action.status
            })
        case SET_PROFILE_ERROR:
            return produce(state, draft => {
                draft.profileError = action.errorMsg
            })
        default:
            //debugger
            return state
    }
}


//ACs
const actions = {
    addPostAC: (postMsg: string) => ({type: ADD_POST, postMsg} as const),
    setCurrentProfileAC: (currentProfile: ProfileType | null) => ({
        type: SET_CURRENT_PROFILE,
        currentProfile
    } as const),
    setProfileStatusAC: (status: string | null) => ({type: SET_STATUS, status} as const),
    setProfilePhotoAC: (photos: PhotoType) => ({type: SET_PHOTOS, photos} as const),
    setProfileErrorAC: (errorMsg: string | null) => ({type: SET_PROFILE_ERROR, errorMsg} as const),
    callPreloaderAC
}

//Create type by Object [actions] structure
type ActionsType = InferActionsTypes<typeof actions>

//Thunks
export type AddPostType = (postMsg : string) => (dispatch : Dispatch<ActionsType>) =>  any
export const addPost : AddPostType = (postMsg) => (dispatch) => {
    return dispatch(actions.addPostAC(postMsg))
}

export type SetProfileErrorType = (errorMsg : string | null) => (dispatch : Dispatch<ActionsType>) =>  any
export const setProfileError : SetProfileErrorType = (errorMsg) => (dispatch) => {
    return dispatch(actions.setProfileErrorAC(errorMsg))
}

export type SetProfileType = (userId : number | null) =>  any
export const setProfile : SetProfileType = (userId) => {
    return async (dispatch : Dispatch<ActionsType>) => {
        if(userId === null){
            dispatch(actions.setCurrentProfileAC(null))
        }else{
            dispatch(callPreloaderAC(true))
            console.log('requestAPI')
            let resData = await requestAPI.getProfile(userId)
            dispatch(getStatus(userId))
            dispatch(actions.setCurrentProfileAC(resData))
        }
    }
}

export type UpdateProfileType = (value : string | null, inputName : string) =>  any
export const updateProfile : UpdateProfileType = (value, inputName) => {

    return async (dispatch : Dispatch<ActionsType>, getState : any) => {
        let profile = {...getState().pageProfile.profile}

        switch (inputName) {
            case "status":
                console.log('requestAPI (setStatus)')
                let resStatusData = await requestAPI.setStatus(value)
                if (resStatusData.resultCode !== ApiCodesEnum.Success) {
                    dispatch(actions.setProfileErrorAC(resStatusData.messages[0]))
                }else{
                    dispatch(setProfile(profile.userId))
                }

                return
            case "lookingForAJobDescription":
            case "fullName":
            case "aboutMe":
            case "contacts":

                //method API required aboutMe forever!
                if (inputName === "aboutMe" && value === ""){
                        value = "Tell me about you, baby ;)"
                }
                profile[inputName] = value

                if (!profile.aboutMe){
                    profile.aboutMe = "Tell me about you, baby ;)"
                }

                let resProfileData = await requestAPI.setProfile(profile)
                if (resProfileData.resultCode !== ApiCodesEnum.Success) {
                    dispatch(actions.setProfileErrorAC(resProfileData.messages[0]))
                }else{
                    dispatch(setProfile(profile.userId))
                }

                return
            default:
                //debugger
                return
        }
    }
}

export type GetStatusType = (userId : number) =>  any
export const getStatus : GetStatusType = (userId) => {
    return async (dispatch : Dispatch<ActionsType>) => {
        console.log('requestAPI (getStatus)')
        let resData = await requestAPI.getStatus(userId)
        dispatch(actions.setProfileStatusAC(resData))
        dispatch(callPreloaderAC(false))
    }
}

export type UpdatePhotoType = (photo : PhotoType) =>  any
export const updatePhoto : UpdatePhotoType = (photo) => {
    return async (dispatch : Dispatch<ActionsType>) => {
        console.log('requestAPI (setPhoto)')
        let resData = await requestAPI.setPhoto(photo)
        dispatch(actions.setProfilePhotoAC(resData.data.photos))
    }
}
