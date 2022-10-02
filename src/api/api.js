import axios from "axios";

const config = (path, method, data = null) => {
    return {
        url: 'https://social-network.samuraijs.com/api/1.0/' + path,
        method: method,
        headers: {
            'API-KEY': '906b77de-4d9f-49ba-b479-baf195e5855b'
        },
        withCredentials: true,
        data: data ? data : null
    }
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
    getUsers(count, page){
        return axios(config(`users/?count=${count}&page=${page}`, 'get'))
    },
    getProfile(userId){
        return axios(config('profile/' + userId, 'get'))
    },
    updateStatus(status){
        return axios(config('/profile/status', 'put', {status: status}))
    },
    getStatus(userId){
        return axios(config('/profile/status/' + userId, 'get'))
    }
}