import React, {FC, useEffect} from "react";
import {
    addPost,
    setProfile,
    updateProfile,
    updatePhoto,
    setProfileError,
    SetProfileType,
    ProfileInitialStateType,
    AddPostType,
    UpdateProfileType,
    UpdatePhotoType, SetProfileErrorType
} from "../../../redux/profileReducer";
import ProfilePage from "./ProfilePage";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {getAuthData} from "../../../redux/authSelector";
import {
    getPageProfileError,
    getPageProfilePosts,
    getPageProfileProfile,
    getPageProfileStatus
} from "../../../redux/profileSelector";
import {getShowPreloader} from "../../../redux/usersSelector";
import {AppStateType} from "../../../redux/reduxStore";

type ProfileContainerType = {
    myUserId: number | null
    userId?: number
    showPreloader: boolean
}

export type AllProfileContainerType = ProfileContainerType & ProfileInitialStateType & DispatchToPropsType
const ProfileContainer : FC<AllProfileContainerType>= (props) => {

    //if userid for profile page was changed, update profile global state
    useEffect(() => {
        let userId = props.userId ? props.userId : props.myUserId
        props.setProfile(userId)
    },[props.userId]);


    if (!props.showPreloader){
        return <ProfilePage {...props} />
    }
    return <></>

}

type StateToPropsType = ProfileContainerType & ProfileInitialStateType

const mapStateToProps = (state : AppStateType) : StateToPropsType => {
console.log(state)
    return {
        posts: getPageProfilePosts(state),
        profile: getPageProfileProfile(state),
        myUserId: getAuthData(state).id,
        status: getPageProfileStatus(state),
        showPreloader: getShowPreloader(state),
        profileError: getPageProfileError(state)
    }
}

type DispatchToPropsType = {
    addPost:AddPostType
    setProfile:SetProfileType
    updateProfile:UpdateProfileType
    updatePhoto:UpdatePhotoType
    setProfileError:SetProfileErrorType
}

export default withAuthRedirect(connect<StateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps,{
    addPost,
    setProfile,
    updateProfile,
    updatePhoto,
    setProfileError})(ProfileContainer))

