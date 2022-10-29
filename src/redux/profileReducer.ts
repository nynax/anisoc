import produce from "immer";
import {ApiCodesEnum, requestAPI} from "../api/api";
import {callPreloaderAC, CallPreloaderACType} from "./usersReducer";
import {PhotoType, PostsType, ProfileType} from "../types/types";
import {Dispatch} from "redux";

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

export const profileReducer = (state = initialState, action : ActionType) : ProfileInitialStateType => {

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

type AddPostACType = {
    type: typeof ADD_POST
    postMsg: string
}
type SetCurrentProfileACType = {
    type: typeof SET_CURRENT_PROFILE
    currentProfile: ProfileType | null
}
type SetProfileStatusACType = {
    type: typeof SET_STATUS
    status: string | null
}
type StProfilePhotoACType = {
    type: typeof SET_PHOTOS
    photos: PhotoType
}
type SetProfileErrorACType = {
    type: typeof SET_PROFILE_ERROR
    errorMsg: string | null
}

type ActionType = AddPostACType | SetCurrentProfileACType | SetProfileStatusACType | StProfilePhotoACType | SetProfileErrorACType | CallPreloaderACType

//ACs
const addPostAC = (postMsg : string):AddPostACType => ({type: ADD_POST, postMsg})
const setCurrentProfileAC = (currentProfile : ProfileType | null) : SetCurrentProfileACType => ({type: SET_CURRENT_PROFILE, currentProfile})
const setProfileStatusAC = (status : string | null) : SetProfileStatusACType => ({type: SET_STATUS, status})
const setProfilePhotoAC = (photos : PhotoType) : StProfilePhotoACType => ({type: SET_PHOTOS, photos})
const setProfileErrorAC = (errorMsg : string | null) : SetProfileErrorACType => ({type: SET_PROFILE_ERROR, errorMsg})

//Thunks
export type AddPostType = (postMsg : string) =>  any
export const addPost : AddPostType = (postMsg : string) => (dispatch : any) => {
    return dispatch(addPostAC(postMsg))
}

export type SetProfileErrorType = (errorMsg : string | null) =>  any
export const setProfileError : SetProfileErrorType = (errorMsg : string | null) => (dispatch : any) => {
    return dispatch(setProfileErrorAC(errorMsg))
}

export type SetProfileType = (userId : number | null) =>  any
export const setProfile : SetProfileType = (userId : number | null) => {
    return async (dispatch : Dispatch<ActionType>) => {
        if(userId === null){
            dispatch(setCurrentProfileAC(null))
        }else{
            dispatch(callPreloaderAC(true))
            console.log('requestAPI')
            let resData = await requestAPI.getProfile(userId)
            dispatch(getStatus(userId))
            dispatch(setCurrentProfileAC(resData))
        }
    }
}

export type UpdateProfileType = (value : string | null, inputName : string) =>  any
export const updateProfile : UpdateProfileType = (value : string | null, inputName : string) => {

    return async (dispatch : Dispatch<ActionType>, getState : any) => {
        let profile = {...getState().pageProfile.profile}

        switch (inputName) {
            case "status":
                console.log('requestAPI (setStatus)')
                let resStatusData = await requestAPI.setStatus(value)
                if (resStatusData.resultCode !== ApiCodesEnum.Success) {
                    dispatch(setProfileErrorAC(resStatusData.messages[0]))
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
                    dispatch(setProfileErrorAC(resProfileData.messages[0]))
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
export const getStatus : GetStatusType = (userId : number) => {
    return async (dispatch : Dispatch<ActionType>) => {
        console.log('requestAPI (getStatus)')
        let resData = await requestAPI.getStatus(userId)
        dispatch(setProfileStatusAC(resData))
        dispatch(callPreloaderAC(false))
    }
}

export type UpdatePhotoType = (photo : PhotoType) =>  any
export const updatePhoto : UpdatePhotoType = (photo : PhotoType) => {
    return async (dispatch : Dispatch<ActionType>) => {
        console.log('requestAPI (setPhoto)')
        let resData = await requestAPI.setPhoto(photo)
        dispatch(setProfilePhotoAC(resData.data.photos))
    }
}
