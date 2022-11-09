import axios from "axios";
import {PhotoType, ProfileType} from "../types/types";

const config = (path : string, method : string, data : any = null, contentType : string|null = null) => {
    let config = {
        url: 'https://social-network.samuraijs.com/api/1.0/' + path,
        method: method,
        headers: {},
        withCredentials: true,
        data: data ? data : null
    }
    config.headers = {
        'API-KEY': '906b77de-4d9f-49ba-b479-baf195e5855b'
    }
    if (contentType){
        config.headers = {
            'API-KEY': '906b77de-4d9f-49ba-b479-baf195e5855b',
            'Content-Type': contentType
        }
    }

    return config
}

type DefaultApiType = {
    resultCode: number
    messages: Array<string>
}

type AuthMeType = {
    data: {
        id: number
        email: string
        login: string
    }
} & DefaultApiType

type AuthLoginType = {
    data: {
        userId: number
    }
} & DefaultApiType

export enum ApiCodesEnum {
    Success = 0,
    Error = 1
}

type GetCaptchaType = {
    url:string
}

type GetUserItemType = {
    name: string
    id: number
    photos: {
        small: string|null,
        large: string|null
    },
    status: string|null,
    followed: boolean
}

type GetUsersType = {
    items: Array<GetUserItemType>,
    totalCount: number
    error: string|null
}

type SetPhotoType = {
    data: { photos: PhotoType}
} & DefaultApiType


export const requestAPI =  {

    follow(userId:number){
        return axios(config('follow/' + userId, 'post')).then<DefaultApiType>(res => (res.data))
    },
    unfollow(userId:number){
        return axios(config('follow/' + userId, 'delete')).then<DefaultApiType>(res => (res.data))
    },
    authMe(){
        return axios(config('auth/me', 'get')).then<AuthMeType>(res => (res.data))/*.then(res => (res.data))*/
    },
    authLogin(email:string, password:string, rememberMe:boolean, captcha:string|null){
        return axios(config('auth/login', 'post', {email, password, rememberMe, captcha})).then<AuthLoginType>(res => (res.data))
    },
    authLogout(){
        return axios(config('auth/login', 'delete')).then<DefaultApiType>(res => (res.data))
    },
    getUsers(count:number, page:number, term:string, friend:'null'|'true'|'false'){
        let termQuery = term ? `&term=${term}` : ''
        let friendQuery = friend !== 'null' ? `&friend=${friend}` : ''

        return axios(config(`users/?count=${count}&page=${page}` + termQuery + friendQuery, 'get')).then<GetUsersType>(res => (res.data))
    },
    getProfile(userId:number){
        return axios(config('profile/' + userId, 'get')).then<ProfileType>(res => (res.data))
    },
    setStatus(status:string|null){
        return axios(config('profile/status', 'put', {status: status})).then<DefaultApiType>(res => (res.data))
    },
    getStatus(userId:number){
        return axios(config('profile/status/' + userId, 'get')).then<string>(res => (res.data))
    },
    setPhoto(image:any){
        return axios(config('profile/photo', 'put',{image: image[0]}, 'multipart/form-data')).then<SetPhotoType>(res => (res.data))
    },
    getCaptcha(){
        return axios(config('security/get-captcha-url', 'get')).then<GetCaptchaType>(res => (res.data))
    },
    setProfile(profile:ProfileType){
        return axios(config('profile', 'put', profile)).then<DefaultApiType>(res => (res.data))
    }
}