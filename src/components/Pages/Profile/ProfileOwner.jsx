import css from "./Profile.module.css";
import UpdateInputOnClick from "./UpdateInputOnClick";
import React from "react";
import {NavLink} from "react-router-dom";
import photo from "../../../images/dart.png";
import AddPost from "./AddPost";
import UploadPhoto from "./UploadPhoto";
import ProfileContacts from "./ProfileContacts";

const ProfileOwner = (props) => {
    console.log('ProfileOwner')
    console.log(props)

    return (
        <div>
            <div className={css.profileInfo}>
                <div className={css.status}><NavLink to={'/profile/25964'}>&lt;&lt;</NavLink>&emsp;&emsp;&emsp;&ensp;
                    <NavLink to={'/profile/26002'}>&gt;&gt;</NavLink></div>
                <div className={css.dashboard}>
                    <div className={css.photo}>
                        <img src={props.profile.photos.large ? props.profile.photos.large : photo} alt='ohuenno'/>

                    </div>
                    <div>
                        <div className={css.fullName}>
                            <UpdateInputOnClick textValue={props.profile.fullName} setValue={props.setStatus} inputName="fullName"/>
                        </div>
                        <div className={css.aboutMe}>
                            <UpdateInputOnClick textValue={props.profile.aboutMe} setValue={props.setStatus} inputName="aboutMe"/>
                        </div>
                        <div className={css.status}>
                            <UpdateInputOnClick textValue={props.status} setValue={props.setStatus} inputName="status"/>
                        </div>

                        <div className={css.lookingForAJob}>{props.profile.lookingForAJob}</div>

                        <div className={css.lookingForAJobDescription}>
                            <UpdateInputOnClick textValue={props.profile.lookingForAJobDescription} setValue={props.setStatus} inputName="lookingForAJobDescription"/>
                        </div>
                    </div>

                </div>

                <UploadPhoto {...props}/>


                <div className={css.addPost}>
                    <AddPost addPost={props.addPost}/>
                </div>

            </div>
            <div className={css.profileContacts}>
                <div className={css.contacts}><ProfileContacts contacts={props.profile.contacts}/></div>
            </div>
        </div>

    )
}

export default ProfileOwner