export type DataType = {
    id: number | null,
    login: string | null,
    email: string | null
}

export type MsgType = {
    id: number,
    msg: string,
    likes: number,
    ts: string
}

export type ChatsType = {
    id: number,
    name: string,
    likes: number
}

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type PhotoType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: ContactsType
    photos: PhotoType | null
}

export type PostsType = {
    id: number
    msg: string
    likes: number
}

export type UserType = {
    name: string
    id: number
    photos: PhotoType
    status: string | null
    followed: boolean
}