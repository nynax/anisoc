import axios from "axios";

const config = (path, method, data = null, contentType = null) => {
    let config = {
        url: 'https://social-network.samuraijs.com/api/1.0/' + path,
        method: method,
        headers: {
            'API-KEY': '906b77de-4d9f-49ba-b479-baf195e5855b'
        },
        withCredentials: true,
        data: data ? data : null
    }

    if (contentType){
        config.headers['Content-Type'] = contentType
    }

    return config
}

export const requestAPI =  {

    follow(userId){
        return axios(config('follow/' + userId, 'post'))
    },
    unfollow(userId){
        return axios(config('follow/' + userId, 'delete'))
    },
    authMe(){
        return axios(config('auth/me', 'get'))
    },
    authLogin(email, password, rememberMe, captcha){
        console.log(captcha)
        return axios(config('auth/login', 'post', {email, password, rememberMe, captcha}))
    },
    authLogout(){
        return axios(config('auth/login', 'delete'))
    },
    getUsers(count, page){
        return axios(config(`users/?count=${count}&page=${page}`, 'get'))
    },
    getProfile(userId){
        return axios(config('profile/' + userId, 'get'))
    },
    setStatus(status){
        return axios(config('profile/status', 'put', {status: status}))
    },
    getStatus(userId){
        return axios(config('profile/status/' + userId, 'get'))
    },
    setPhoto(image){
        return axios(config('profile/photo', 'put',{image: image[0]}, 'multipart/form-data'))
    },
    getCaptcha(){
        return axios(config('security/get-captcha-url', 'get'))
    }
}