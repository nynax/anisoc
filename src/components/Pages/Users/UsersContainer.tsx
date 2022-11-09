import Users from "./Users";
import {connect} from "react-redux";
import {
    setFollowInProgress,
    requestUsers,
    followAndUnfollow,
    changePage,
    FollowAndUnfollowType,
    RequestUsersType,
    SetFollowInProgressType,
    ChangePageType,
    UsersStateType
} from "../../../redux/usersReducer";
import React, {FC, useEffect} from "react";
import {
    getCurrentPage,
    getFollowInProgress, getLastQuery,
    getShowPreloader,
    getTotalUsers,
    getUsers,
    getUsersPerPage
} from "../../../redux/usersSelector";
import {AppStateType} from "../../../redux/reduxStore";


export type UsersContainerType = UsersStateType & DispatchToPropsType

const UsersContainer : FC<UsersContainerType> = (props) => {

    useEffect(() => {
        props.requestUsers(props.currentPage, props.lastQuery.term, props.lastQuery.friend)
    },[props.currentPage]);

    //console.log(props)
    return <Users {...props} />
}

const mapStateToProps = (state : AppStateType) : StateToPropsType=> {
    return {
        users: getUsers(state),
        totalUsers: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        usersPerPage: getUsersPerPage(state),
        showPreloader: getShowPreloader(state),
        followInProgress: getFollowInProgress(state),
        lastQuery: getLastQuery(state)
    }
}

type StateToPropsType = UsersStateType

type DispatchToPropsType = {
    setFollowInProgress:SetFollowInProgressType
    requestUsers:RequestUsersType
    followAndUnfollow:FollowAndUnfollowType
    changePage:ChangePageType
}

export default connect<StateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    setFollowInProgress,
    requestUsers,
    followAndUnfollow,
    changePage
})(UsersContainer)

