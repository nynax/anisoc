import produce from "immer";
const ADD_MSG = 'ADD-MSG'

let initialState = {
    msg: [
        {id: 1, msg: "Helli", likes: 3, ts: '15:43'},
        {id: 2, msg: "I dd help", likes: 5, ts: '15:45'},
        {id: 3, msg: "I need help", likes: 7, ts: '15:49'},
        {id: 4, msg: "WTF?", likes: 12, ts: '15:51'},
        {id: 5, msg: "Iam die", likes: 1, ts: '15:55'},
        {id: 6, msg: ":)", likes: 4, ts: '16:01'}],
    chats: [
        {id: 1, name: "Victor", likes: 3},
        {id: 2, name: "Ivan", likes: 5},
        {id: 3, name: "Sveta", likes: 7},
        {id: 4, name: "Masha", likes: 12},
        {id: 5, name: "Vanya", likes: 1},
        {id: 6, name: "Dima", likes: 4}
    ]
}

export const dialogsReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_MSG:
            let newMsg = {
                id: 7,
                msg: action.dialogMsg,
                likes: 0,
                ts: '22:01'
            }
            return produce(state, draft => {
                draft.msg.push(newMsg)
            })
        default:
            return state
    }
}

export const addMsg = (dialogMsg) => ({type: ADD_MSG, dialogMsg})
