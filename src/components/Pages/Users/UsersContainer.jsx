import Users from "./Users";
import {connect} from "react-redux";
import {
    setCurrentPage,
    setFollowInProgress,
    getUsers,
    followAndUnfollow
} from "../../../redux/usersReducer";
import React from "react";
import preloader from '../../../avatars/Running_dog.gif'


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.usersPerPage, this.props.currentPage)
    }

    changePage = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(this.props.usersPerPage, pageNumber)
    }

    render() {
        //debugger
        return <>
        <div>{this.props.showPreloader ? <img src={preloader} alt='bla bla bla'/> : null}</div>
        <Users totalUsers={this.props.totalUsers}
               usersPerPage={this.props.usersPerPage}
               currentPage={this.props.currentPage}
               changePage={this.changePage}
               users={this.props.users}
               followInProgress={this.props.followInProgress}
               setFollowInProgress={this.props.setFollowInProgress}
               followAndUnfollow={this.props.followAndUnfollow}
        />
        </>}
}


const mapStateToProps = (state) => {
    return {
        users: state.pageUsers.users,
        totalUsers: state.pageUsers.totalUsers,
        currentPage: state.pageUsers.currentPage,
        usersPerPage: state.pageUsers.usersPerPage,
        showPreloader: state.pageUsers.showPreloader,
        followInProgress: state.pageUsers.followInProgress
    }
}



export default connect(mapStateToProps, {
    setCurrentPage,
    setFollowInProgress,
    getUsers,
    followAndUnfollow
})(UsersContainer)

