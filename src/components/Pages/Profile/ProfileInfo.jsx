import css from "./Profile.module.css";
import {NavLink} from "react-router-dom";
import photo from "../../../images/dart.png";
import React from "react";
import ProfileOwner from "./ProfileOwner";


const ProfileInfo = (props) => {

    // Add post form hook

    if (props.profile && props.profile.userId === props.myUserId){
        return <ProfileOwner {...props}/>
    }else{
        return (
            <div>
                <div className={css.profileInfo}>
                    <div className={css.status}><NavLink to={'/profile/25964'}>&lt;&lt;</NavLink>&emsp;&emsp;&emsp;&ensp;
                        <NavLink to={'/profile/26002'}>&gt;&gt;</NavLink></div>
                    <div className={css.dashboard}>
                        <div className={css.photo}><img
                            src={props.profile.photos.large ? props.profile.photos.large : photo} alt='ohuenno'/></div>
                        <div>
                            <div className={css.fullName}>{props.profile.fullName}</div>
                            <div className={css.aboutMe}>{props.profile.aboutMe}</div>
                        </div>
                    </div>
                </div>
                <div className={css.profileContacts}>
                <div className={css.contacts}>hello</div>
            </div>
            </div>
        )
    }



}

export default ProfileInfo