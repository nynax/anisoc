import Users from "./Users";
import {connect} from "react-redux";
import {
    setCurrentPage,
    setFollowInProgress,
    requestUsers,
    followAndUnfollow, changePage
} from "../../../redux/usersReducer";
import React, {useEffect} from "react";
import {
    getCurrentPage,
    getFollowInProgress,
    getShowPreloader,
    getTotalUsers,
    getUsers,
    getUsersPerPage
} from "../../../redux/usersSelector";

const UsersContainer = (props) => {

    useEffect(() => {
        props.requestUsers(props.usersPerPage, props.currentPage)
    },[props.currentPage]);

    //console.log(props)
    return <Users {...props} />
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalUsers: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        usersPerPage: getUsersPerPage(state),
        showPreloader: getShowPreloader(state),
        followInProgress: getFollowInProgress(state)
    }
}

export default connect(mapStateToProps, {
    setCurrentPage,
    setFollowInProgress,
    requestUsers,
    followAndUnfollow,
    changePage
})(UsersContainer)

