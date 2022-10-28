import React from "react"
import Header from "./Header";
import {connect} from "react-redux";
import {logoutMe} from "../../redux/authReducer";
import {getAuthData, getIsAuth} from "../../redux/authSelector";
import {AppStateType} from "../../redux/reduxStore";
import {AuthDataType} from "../../types/types";

type StateToPropsType = {
    auth: AuthDataType
    isAuth: boolean
}

type DispatchToPropsType = {
    logoutMe: () => void
}

const mapStateToProps = (state : AppStateType) => {
    //console.log(state)
    return {
        auth:getAuthData(state),
        isAuth:getIsAuth(state)
    }
}

export default connect<StateToPropsType, DispatchToPropsType, {}, AppStateType> (mapStateToProps, {logoutMe})(Header)


