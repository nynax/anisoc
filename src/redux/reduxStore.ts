import {applyMiddleware, combineReducers, compose, createStore} from "redux";
//import {configureStore} from "@reduxjs/toolkit";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import {appReducer} from "./appReducer";
import thunkMiddleware from "redux-thunk";

let rootReducer = combineReducers({
    pageProfile: profileReducer,
    pageDialogs: dialogsReducer,
    pageUsers: usersReducer,
    auth: authReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

//Создаем store. Добавляем reducers и включаем thunk
//let store = configureStore({reducer: reducers}, applyMiddleware(thunkMiddleware))

// @ts-ignore:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)
));


export default store