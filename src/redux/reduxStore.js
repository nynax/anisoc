import {applyMiddleware, combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import thunkMiddleware from "redux-thunk";



let reducers = combineReducers({
    pageProfile: profileReducer,
    pageDialogs: dialogsReducer,
    pageUsers: usersReducer,
    auth: authReducer
})

//Создаем store. Добавляем reducers и включаем thunk
let store = configureStore({reducer: reducers}, applyMiddleware(thunkMiddleware))

export default store