import {createSelector} from "reselect";

const getPageDialogsSelector = (state) => {
    return state.pageDialogs
}

export const getPageDialogs = createSelector(getPageDialogsSelector, (pageDialogs) => {
    return pageDialogs
})

const getPageDialogsMsgSelector = (state) => {
    return state.pageDialogs.msg
}

export const getPageDialogsMsg = createSelector(getPageDialogsMsgSelector, (pageDialogsMsg) => {
    return pageDialogsMsg
})

const getPageDialogsChatsSelector = (state) => {
    return state.pageDialogs.chats
}

export const getPageDialogsChats = createSelector(getPageDialogsChatsSelector, (pageDialogsChats) => {
    return pageDialogsChats
})