import React, {useEffect} from "react";
import {addPost, getStatus, setCurrentProfile, setProfile, updateProfile, updatePhoto} from "../../../redux/profileReducer";
import ProfilePage from "./ProfilePage";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getAuthData, getIsAuth} from "../../../redux/authSelector";
import {getPageProfilePosts, getPageProfileProfile, getPageProfileStatus} from "../../../redux/profileSelector";
import {getShowPreloader} from "../../../redux/usersSelector";



const ProfileContainer = (props) => {

    //if userid for profile page was changed, update profile global state
    useEffect(() => {
        let userId = props.userId ? props.userId : props.myUserId
        props.setProfile(userId)
    },[props.userId]);


    if (!props.showPreloader){
        return <ProfilePage {...props} />
    }

}

const mapStateToProps = (state) => {

    return {
        posts: getPageProfilePosts(state),
        profile: getPageProfileProfile(state),
        myUserId: getAuthData(state).id,
        isAuth: getIsAuth(state),
        status: getPageProfileStatus(state),
        showPreloader: getShowPreloader(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        addPost,
        setCurrentProfile,
        setProfile,
        updateProfile,
        getStatus,
        updatePhoto
    }),
    withAuthRedirect
)(ProfileContainer)