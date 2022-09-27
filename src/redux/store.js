//import {profileReducer} from "./profileReducer";
//import {dialogsReducer} from "./dialogsReducer";

let store = {

    _state: {
        pageProfile: {
            posts: [
                {id: 1, msg: "Hello", likes: 3},
                {id: 2, msg: "Fuck you", likes: 5},
                {id: 3, msg: "I need help", likes: 7},
                {id: 4, msg: "My name is Victor", likes: 12},
                {id: 5, msg: "Iam fine", likes: 1},
                {id: 6, msg: "Lets go", likes: 4},
            ],
            postTextarea: ''
        },
        pageDialogs: {
            msg: [
                {id: 1, msg: "Hello", likes: 3, ts: '15:43'},
                {id: 2, msg: "Hi", likes: 5, ts: '15:45'},
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
            ],
            msgTextarea: ''
        }

    },
    getState () {
        return this._state
    },
    // Переназначается в функцию renderApp через вызов subscriber в index.js
    _callSubscriber (){
        console.log()
    },
    subscriber (observer) {
        this._callSubscriber = observer
    },

    dispatch(action){

        profileReducer(this._state.pageProfile, action)
        dialogsReducer(this._state.pageDialogs, action)

        this._callSubscriber(this._state)

    }
}



export default store