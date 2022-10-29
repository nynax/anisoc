import css from "./Profile.module.css";
import {NavLink} from "react-router-dom";
import photo from "../../../images/dart.png";
import React, {FC} from "react";
import ProfileContacts from "./ProfileContacts";
import UpdateInputOnClick from "./UpdateInputOnClick";
import UploadPhoto from "./UploadPhoto";
import AddPost from "./AddPost";
import {AllProfileContainerType} from "./ProfileContainer";


const ProfileInfo : FC<AllProfileContainerType> = React.memo ((props) => {

    //generate content from auth info. Owner can edit mine profile, but cant edit profile data other users
    let isAuth = false
    if (props.profile && props.profile.userId === props.myUserId){
        isAuth = true
    }
    return (
        <div>
            <div className={css.profileInfo}>
                <div className={css.status}><NavLink to={'/profile/25964'}>&lt;&lt;</NavLink>&emsp;&emsp;&emsp;&emsp;&ensp;
                    <NavLink to={'/profile/26002'}>&gt;&gt;</NavLink></div>
                <div className={css.dashboard}>
                    <div className={css.photo}>
                        <img src={props.profile !== null && props.profile.photos.large ? props.profile.photos.large : photo} alt='ohuenno'/>
                    </div>
                    <div>
                        <div className={css.fullName}>
                            {isAuth ? <UpdateInputOnClick textValue={props.profile!.fullName} setValue={props.updateProfile} inputName="fullName"/>
                                    : props.profile !== null && props.profile.fullName}
                        </div>
                        <div className={css.aboutMe}>
                            {isAuth ? <UpdateInputOnClick textValue={props.profile!.aboutMe} setValue={props.updateProfile} inputName="aboutMe"/>
                                    : props.profile !== null && props.profile.aboutMe}
                        </div>
                        <div className={css.status}>
                            {isAuth ? <UpdateInputOnClick textValue={props.status} setValue={props.updateProfile} inputName="status"/>
                                    : props.status}
                        </div>
                        <div className={css.lookingForAJob}>
                            {props.profile !== null && props.profile.lookingForAJob}
                        </div>
                        <div className={css.lookingForAJobDescription}>
                            {isAuth ? <UpdateInputOnClick textValue={props.profile!.lookingForAJobDescription} setValue={props.updateProfile} inputName="lookingForAJobDescription"/>
                                    : props.profile !== null && props.profile.lookingForAJobDescription}
                        </div>
                    </div>
                </div>

                {isAuth && <><UploadPhoto updatePhoto={props.updatePhoto}/><AddPost addPost={props.addPost}/></>}

            </div>
            <div className={css.profileContacts}>
                <div className={css.contacts}><ProfileContacts contacts={props.profile!.contacts} isAuth={isAuth} setValue={props.updateProfile} profileError={props.profileError as string} setProfileError={props.setProfileError}/></div>
            </div>
        </div>
    )
})

export default ProfileInfo